const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProducts() {
  return prisma.product.findMany();
}

module.exports = {
  getAllProducts,
};
