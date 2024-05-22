const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProducts(id) {
  return prisma.product.findMany({
    where: {
      sellerId: id,
    },
  });
}

async function createProduct(data) {
  const availableOrderLink = await prisma.productOrderLink.findUnique({
    where: {
      id: data.orderLink,
    },
    include: {
      product: true,
    },
  });

  if (!availableOrderLink) {
    throw new Error("Invalid order link");
  }

  if (availableOrderLink.product) {
    throw new Error("Order link is already associated with another product");
  }
  return prisma.product.create({
    data: {
      productCode: data.productCode,
      name: data.name,
      description: data.description,
      price: data.price,
      sellerId: data.sellerId,
      productOrderLinkId: data.orderLink,
    },
  });
}

async function deleteProduct(productCode) {
  const product = await prisma.product.findUnique({
    where: {
      productCode: productCode,
    },
  });

  if (!product) {
    return { success: false, error: "Product not found" };
  }
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
  const product = await prisma.product.findUnique({
    where: {
      productCode: productCode,
    },
  });

  if (!product) {
    return { success: false, error: "Product not found" };
  }
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
  createProduct,
  deleteProduct,
  updateProduct,
};
