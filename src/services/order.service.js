const { PrismaClient } = require("@prisma/client");
const { request } = require("http");
const prisma = new PrismaClient();

async function getAllOrders() {
  const ordersWithCustomer = await prisma.order.findMany({
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

  // Transforming the data to include the customerName
  const orders = ordersWithCustomer.map((order) => ({
    ...order,
    customerName: `${order.customer.firstName} ${order.customer.lastName}`,
    contactNumber: `${order.customer.contactNumber}`,
    allOrder: `${order.customer.orders}`,
    productCode: `${order.product.productCode}`,
    unitPrice: `${order.product.price}`,
    // productDescription: `${order.product.description}`,
  }));

  return orders;
}

// this is additional
const createOrders = async (id, status) => {
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
        contactNumber: order.customerContactNumber,
      },
    });

    // If customer doesn't exist, create a new customer
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName: order.customerFirstName,
          lastName: order.customerLastName,
          email: order.customerEmail,
          contactNumber: order.customerContactNumber,
        },
      });
    }

    // Create the order associated with the customer
    const newOrder = await prisma.order.create({
      data: {
        productId: order.productId,
        quantity: order.quantity,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
        orderStatus: order.orderStatus,
        deliveryMethod: order.deliveryMethod,
        size: order.size,
        color: order.color,
        comments: order.comments,
        sellerId: order.sellerId,
        customerId: customer.contactNumber, // Use customer's mobile number as foreign key
        // Add more fields as needed
      },
    });

    return newOrder;
  } catch (error) {
    throw new Error(`Error creating order and customer: ${error}`);
  }
};

module.exports = {
  getAllOrders,
  createOrders,
  createOrder,
};
