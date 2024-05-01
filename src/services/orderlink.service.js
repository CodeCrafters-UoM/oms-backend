const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllOrderlinks() {
  return prisma.productOrderLink.findMany();
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
  return orderLink;
}

module.exports = {
  getAllOrderlinks,
  createOrderlink,
  deleteOrderlink,
  copyOrderlink,
};
