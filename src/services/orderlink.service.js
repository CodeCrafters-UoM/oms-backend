const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllOrderlinks(id) {
  try {
    const orderLinks = await prisma.productOrderLink.findMany({
      where: {
        sellerId: id,
      },
    });
    return orderLinks;
  } catch (error) {
    console.error("Error fetching order links:", error);
    throw error;
  }
}

async function createOrderlink(data) {
  console.log(data);
  return prisma.productOrderLink.create({ data });
}
async function deleteOrderlink(id) {
  return prisma.productOrderLink.delete({
    where: {
      id: id,
    },
  });
}
async function copyOrderlink(id) {
  const orderLink = await prisma.productOrderLink.findUnique({
    where: {
      id: id,
    },
  });
}
async function searchOrderlink(key) {
  const orderLinks = await prisma.productOrderLink.findMany({
    where: {
      name: {
        contains: key,
      },
    },
  });
  return orderLinks;
}

module.exports = {
  getAllOrderlinks,
  createOrderlink,
  deleteOrderlink,
  searchOrderlink,
};
