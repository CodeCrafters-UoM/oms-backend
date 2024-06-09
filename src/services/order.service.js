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
  try {
    // Check if the customer already exists based on the mobile number
    let customer = await prisma.customer.findUnique({
      where: {
        contactNumber: order["Your phone number : "],
      },
    });

    // If customer doesn't exist, create a new customer
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName: order["Your first name : "],
          lastName: order["Your last name : "],
          email: order["Your email address : "],
          contactNumber: order["Your phone number : "],
        },
      });
    }
    console.log(customer);
    const newOrder = await prisma.order.create({
      data: {
        productId: order.product,
        quantity: parseInt(order["Quantity you need : "]),
        deliveryAddress: order["Your delivery address : "],
        paymentMethod: order["Your preferred payment method : "],
        orderStatus: "New",
        size: order["Size of the item : "],
        color: order["Color of the item : "],
        comments: order["Comments : "],
        sellerId: order.seller,
        customerId: order["Your phone number : "],
        customisedAnswers: order.customisedAnswers,
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
