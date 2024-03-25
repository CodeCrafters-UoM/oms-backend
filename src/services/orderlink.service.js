const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllOrderlinks() {
  return prisma.orderLink.findMany();
}
async function createOrderlink(data) {
  console.log(data);
  return prisma.orderLink.create({ data });
}
async function deleteOrderlink(id) {
  return prisma.orderLink.delete({
    where: {
      id: id,
    },
  });
}
async function copyOrderlink(id) {
  const orderLink = await prisma.orderLink.findUnique({
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
