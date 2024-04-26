const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProducts() {
  return prisma.product.findMany();
}

async function getProduct(productCode){
  return prisma.product.findUnique({
    where: {productCode: productCode},
  });
}

async function createProduct(data) {
  console.log(data);
  return prisma.product.create({ data });
}

async function deleteProduct(productCode) {
  // Find the product based on the productCode
  const product = await prisma.product.findUnique({
    where: {
      productCode: productCode,
    },
  });

  if (!product) {
    // Product not found
    return { success: false, error: 'Product not found' };
  }

  // Delete the product using its id
  try {
    await prisma.product.delete({
      where: {
        id: product.id,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function updateProduct(productCode, newData) {
  // Find the product based on the productCode
  const product = await prisma.product.findUnique({
    where: {
      productCode: productCode,
    },
  });

  if (!product) {
    // Product not found
    return { success: false, error: 'Product not found' };
  }

  // Update the product with new data
  try {
    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: newData,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
