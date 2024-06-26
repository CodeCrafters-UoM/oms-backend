const { PrismaClient } = require("@prisma/client");
const { request } = require("http");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const { sendEmail } = require("./mail.service");

async function sendOtp(username, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        seller: true,
      },
    });

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found" });
    }

    const otp = crypto.randomBytes(3).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const passwordReset = await prisma.passwordReset.upsert({
      where: {
        userId: user.id,
      },
      update: {
        otp,
        expiresAt,
        used: false,
      },
      create: {
        userId: user.id,
        otp,
        expiresAt,
      },
    });
    if (!passwordReset) {
      console.log("Failed to create OTP record");
      return res.status(500).json({ message: "Failed to generate OTP" });
    }
    sendEmail(user.email, user.name, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function verifyOtp(username, otp, res) {
  console.log("username", username);
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        userId: user.id,
        otp: user.otp,
        used: false,
        expiresAt: {
          gt: new Date(), // Check if the OTP is not expired
        },
      },
    });

    if (!passwordReset) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark the OTP as used
    await prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { used: true },
    });

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function resetPassword(username, newPassword, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  sendOtp,
  resetPassword,
  verifyOtp,
};
