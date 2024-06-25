const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const MAX_DESCRIPTION_LENGTH = 255;

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

  if (data.description.length > MAX_DESCRIPTION_LENGTH) {
    throw new Error(`Description should not exceed ${MAX_DESCRIPTION_LENGTH} characters.`);
  }

  if (!availableOrderLink) {
    throw new Error("Invalid order link");
  }

  if (availableOrderLink.product) {
    throw new Error("Order link is already associated with another product");
  }
  try {
    return await prisma.product.create({
      data: {
        productCode: data.productCode,
        name: data.name,
        description: data.description,
        price: data.price,
        sellerId: data.sellerId,
        productOrderLinkId: data.orderLink,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error("Product code already exists");
    } else if (error.code === 'P2000' && error.meta.column_name === 'description') {
      throw new Error(`Description should not exceed ${MAX_DESCRIPTION_LENGTH} characters.`);
    }
    else {
      throw error;
    }
  }
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
