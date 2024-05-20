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
  console.log(data);
  // Verify that the orderLink is available
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
  // Find the product based on the productCode
  const product = await prisma.product.findUnique({
    where: {
      productCode: productCode,
    },
  });

  if (!product) {
    // Product not found
    return { success: false, error: "Product not found" };
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
    return { success: false, error: "Product not found" };
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

async function getAllOrderlinks() {
  try {
    const orderLinksWithProducts = await prisma.productOrderLink.findMany({
      where:{
        product:null
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        seller: true,
      },
    });
    return orderLinksWithProducts;
  } catch (error) {
    console.error("Error fetching order links:", error);
    throw error;
  }
}


module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllOrderlinks,
};
