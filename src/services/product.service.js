const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProducts() {
  return prisma.product.findMany();
}

async function createProduct(data) {
  console.log(data);
  return prisma.product.create({ data });
}

async function deleteProduct(productCode) {
  return prisma.product.delete({
    where: {
      id: parseInt(productCode)
    }
  });
}

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
};
