const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getReportDetails(id) {
  console.log("service");
  try {
    const orderStatusCounts = await prisma.order.groupBy({
      by: ['orderStatus'],
      where: {
        sellerId: id
      },
      _count: {
        orderStatus: true
      }
    });

    const sellerDetails = await prisma.seller.findUnique({
      where: { userId: id },
      select: {
        businessName: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });

    if (!sellerDetails) {
      throw new Error(`Seller with id ${id} not found`);
    }

    const userName = sellerDetails.user.name;
    const businessName = sellerDetails.businessName;

    const allOrderStatuses = ['NEW', 'ACCEPT', 'REJECT', 'DELIVER', 'RETURN'];
    const result = allOrderStatuses.map(status => {
      const found = orderStatusCounts.find(item => item.orderStatus === status);
      return {
        title: status,
        number: found ? found._count.orderStatus : 0
      };
    });

    const reportDetails = {
      userName: userName,
      businessName: businessName,
      orderStatusCounts: result
    };

    return reportDetails;
  } catch (error) {
      throw error;
  }
}

module.exports = {
  getReportDetails,
};
