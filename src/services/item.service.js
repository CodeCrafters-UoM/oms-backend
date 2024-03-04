const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// exports.getAllItems=() => {
//   return prisma.product.findMany();
// }

exports.getItemById = async (productCode) => {
  
  try {
    // Use Prisma to query for the item with the specified productId
    const item = await prisma.product.findUnique({
      where: {
        id: productCode
      }
    });

    return item; // Return the item if found, or null if not found
  } catch (error) {
    throw error; // Propagate the error to the caller
  }
};

// async function getAllItems() {
//   return prisma.product.findMany();
// }

// module.exports = {
//   getAllItems
// };
