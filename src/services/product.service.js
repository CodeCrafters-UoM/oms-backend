const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProducts() {
  return prisma.product.findMany();
}

async function createProduct(data) {
  return prisma.product.create({ data });
}

module.exports = {
  getAllProducts,
  createProduct,
};
