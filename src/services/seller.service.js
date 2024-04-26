const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createSeller(data) {
  return prisma.seller.create({ data });
}

async function getAllSellers() {
  return prisma.seller.findMany();
}

module.exports = {
  getAllSellers, 
  createSeller,
};
