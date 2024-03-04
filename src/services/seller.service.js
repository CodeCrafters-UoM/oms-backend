const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createSeller(data) {
  return prisma.seller.create({ data });
}

async function getAllSellers() {
  return prisma.seller.findMany();
}

async function getItemComponent() {
  return prisma.itemComponent.findMany();
}

module.exports = {
  getAllSellers,
  createSeller,
  getItemComponent,
};
