const { PrismaClient } = require("@prisma/client");
const { request } = require("http");
const prisma = new PrismaClient();

async function getAllOrders(id) {
  const ordersWithCustomer = await prisma.order.findMany({
    where: {
      sellerId: id,
    },
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
          contactNumber: true,
          orders: true,
        },
      },
      product: {
        select: {
          productCode: true,
          name: true,
          price: true,
        },
      },
    },
  });
  const orders = ordersWithCustomer.map((order) => ({
    ...order,
    customerName: `${order.customer.firstName} ${order.customer.lastName}`,
    contactNumber: order.customer.contactNumber,
    allOrder: order.customer.orders,
    productCode: order.product.productCode,
    unitPrice: order.product.price,
  }));

  return orders;
}

// set the order status
const updateStatus = async (id, status) => {
  return await prisma.order.update({
    where: {
      orderId: id,
    },
    data: {
      orderStatus: status,
    },
  });
};

module.exports = {
  getAllOrders,
  updateStatus,
};
