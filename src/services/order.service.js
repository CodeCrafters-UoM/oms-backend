const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllOrders() {
  const ordersWithCustomer = await prisma.order.findMany({
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
          contactNumber: true,
        },
      },
    },
  });

  // Transforming the data to include the customerName
  const orders = ordersWithCustomer.map(order => ({
    ...order,
    customerName: `${order.customer.firstName} ${order.customer.lastName}`,
    contactNumber: `${order.customer.contactNumber}`,
  }));

  return orders;
}


module.exports = {
  getAllOrders,
};
