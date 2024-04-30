const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// async function getAllOrderlinks() {
//   return prisma.productOrderLink.findMany();
// }
async function getAllOrderlinks() {
  try {
    const orderLinksWithProducts = await prisma.productOrderLink.findMany({
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

module.exports = {
  getAllOrderlinks,
  createOrderlink,
  deleteOrderlink,
};
