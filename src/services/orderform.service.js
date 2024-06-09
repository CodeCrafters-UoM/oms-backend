const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getOrderformDetails(linkId) {
  const cleanedLinkId = linkId.trim();

  console.log("service clean", cleanedLinkId);
  console.log("service", linkId);
  try {
    const orderFormDetails = await prisma.productOrderLink.findUnique({
      where: {
        id: cleanedLinkId,
      },
      select: {
        customisedQuestions: true,
        name: true,
        selectedQuestions: true,
        paymentMethodOptions: true,
        sizeOptions: true,
        colorOptions: true,
        sellerId: true,
        product: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return orderFormDetails;
  } catch (error) {
    console.error("Error fetching customised questions:", error);
    throw error;
  }
}

module.exports = {
  getOrderformDetails,
};
