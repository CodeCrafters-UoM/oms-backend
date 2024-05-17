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
const createOrder = async (order) => {
  console.log(order);
  try {
    // Check if the customer already exists based on the mobile number
    let customer = await prisma.customer.findUnique({
      where: {
        contactNumber: order.question_5,
      },
    });

    // If customer doesn't exist, create a new customer
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName: order.question_1,
          lastName: order.question_2,
          email: order.question_4,
          contactNumber: order.question_5,
        },
      });
    }
    const newOrder = await prisma.order.create({
      data: {
        productId: "cfff37d3-96d3-4c64-8ea1-db8dfeabe472",
        quantity: parseInt(order.question_6),
        deliveryAddress: order.question_3,
        paymentMethod: order.question_7,
        orderStatus: "New",
        size: order.question_8,
        color: order.question_9,
        comments: order.question_10,
        sellerId: order.seller,
        customerId: order.question_5,
      },
    });
    console.log(newOrder);
    return newOrder;
  } catch (error) {
    throw new Error(`Error creating order and customer: ${error}`);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  updateStatus,
};
