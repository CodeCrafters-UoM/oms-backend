const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createSeller(data) {
  try {
    const existingSeller = await prisma.seller.findUnique({
      where: {
        username: data.username,
      },
    });

    if (existingSeller) {
      throw new Error("Username already exists");
    }
    const newSeller = await prisma.seller.create({ data });
    return newSeller;
  } catch (error) {
    console.log("Error creating seller:", error);
    throw error;
  }
}
async function getAllSellers() {
  return prisma.seller.findMany();
}

const bcrypt = require("bcrypt");

async function login(user) {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        username: user.username,
      },
    });

    if (!seller) {
      throw new Error("Seller not found");
    }

    const passwordMatch = await bcrypt.compare(user.password, seller.password);
    if (passwordMatch) {
      console.log("Logged in");
      console.log(user);
      return seller;
    } else {
      console.log("Incorrect password");
      throw new Error("Incorrect password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

module.exports = {
  getAllSellers,
  createSeller,
  login,
};
