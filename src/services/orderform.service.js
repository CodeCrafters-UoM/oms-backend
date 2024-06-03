const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getCustomQuestions(linkId) {
  const cleanedLinkId = linkId.trim();

  console.log("service clean", cleanedLinkId);
  console.log("service", linkId);
  try {
    const customQuestions = await prisma.productOrderLink.findUnique({
      where: {
        id: cleanedLinkId,
      },
      select: {
        customisedQuestions: true,
      },
    });
    console.log(customQuestions);
    return customQuestions;
  } catch (error) {
    console.error("Error fetching customised questions:", error);
    throw error;
  }
}

module.exports = {
  getCustomQuestions,
};
