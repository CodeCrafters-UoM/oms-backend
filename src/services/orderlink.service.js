const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllOrderlinks(id) {
  try {
    const orderLinks = await prisma.productOrderLink.findMany({
      where: {
        sellerId: id,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return orderLinks;
  } catch (error) {
    console.error("Error fetching order links:", error);
    throw error;
  }
}

async function createOrderlink(data) {
  console.log("data", data);
  return prisma.productOrderLink.create({ data });
}
async function deleteOrderlink(id) {
  return prisma.productOrderLink.delete({
    where: {
      id: id,
    },
  });
}
async function searchOrderlink(key, id) {
  const orderLinks = await prisma.productOrderLink.findMany({
    where: {
      name: {
        contains: key,
      },
      sellerId: id,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return orderLinks;
}
async function updateOrderlink(id) {
  const orderLink = await prisma.productOrderLink.findUnique({
    where: {
      id: id,
    },
  });
  const oldLink = orderLink.link;
  try {
    await prisma.productOrderLink.update({
      where: {
        id: id,
      },
      data: {
        link: `${oldLink}&id=${id}`,
      },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}
async function getAvailableOrderlinks(id) {
  try {
    const orderLinksWithProducts = await prisma.productOrderLink.findMany({
      where: {
        sellerId: id,
        product: null,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            productCode: true,
          },
        },
      },
    });
    return orderLinksWithProducts;
  } catch (error) {
    console.error("Error fetching order links:", error);
    throw error;
  }
}

module.exports = {
  getAllOrderlinks,
  createOrderlink,
  deleteOrderlink,
  searchOrderlink,
  updateOrderlink,
  getAvailableOrderlinks,
};
