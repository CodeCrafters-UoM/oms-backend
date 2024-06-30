const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(data, res) {
  try {
    const existingUsername = await prisma.user.findUnique({
      where: {
        username: data.user.username,
      },
    });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: data.user.email,
      },
    });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newUser = await prisma.user.create({
      data: {
        username: data.user.username,
        password: data.user.password,
        email: data.user.email,
        role: data.user.role,
        name: data.user.name,
      },
    });

    let roleData;
    if (newUser.role === Role.ADMIN) {
      roleData = await prisma.admin.create({
        data: {
          user: {
            connect: { id: newUser.id },
          },
        },
      });
    } else if (newUser.role === Role.SELLER) {
      roleData = await prisma.seller.create({
        data: {
          user: {
            connect: { id: newUser.id },
          },
          businessName: data.seller.businessName,
          contactNumber: data.seller.contactNumber,
        },
      });
    }

    return res.status(201).json({ user: newUser, roleData });
  } catch (error) {
    console.log("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.username,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(req.password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: "1d",
      });
      const formattedUser = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        image: user.image,
      };
      return { token, user: formattedUser };
    } else {
      throw new Error("Incorrect password");
    }
  } catch (error) {
    console.log("service ", error.message);
    throw new Error(error.message);
  }
}

async function getProfileDetails(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        seller: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const profileData = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      businessName: user.seller ? user.seller.businessName : null,
      contactNumber: user.seller ? user.seller.contactNumber : null,
    };

    return profileData;
  } catch (error) {
    throw new Error("Error getting user profile:", error);
  }
}

async function updateProfileDetails(id, data) {
  const { name, email, businessName, contactNumber } = data;

  try {
    const [user, seller] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          email: email,
        },
      }),
      prisma.seller.update({
        where: {
          userId: id,
        },
        data: {
          businessName: businessName,
          contactNumber: contactNumber,
        },
      }),
    ]);
    return { user, seller };
  } catch (error) {
    throw new Error("Error updating user profile:", error);
  }
}

module.exports = {
  register,
  login,
  getProfileDetails,
  updateProfileDetails,
};
