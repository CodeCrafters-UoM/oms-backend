const { PrismaClient } = require("@prisma/client");
const { ReadStream } = require("fs");
const { request } = require("http");
const prisma = new PrismaClient();

async function getAllOrders(id) {
  try {
    const ordersWithCustomer = await prisma.order.findMany({
      where: {
        sellerId: id,
      },
      include: {
        customer: {
          select: {
            id: true,
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
            description: true,
          },
        },
      },
    });
    const orders = ordersWithCustomer.map((order) => {
      const customerOrders = order.customer.orders;
      const customerOrdersForSeller = customerOrders.filter(o => o.sellerId === id);
      const customerReturnOrders = customerOrders.filter(o => o.orderStatus === 'RETURN');
      const customerReturnOrdersForSeller = customerReturnOrders.filter(o => o.sellerId === id);
      let decodedCustomisedAnswers = {};
      if (typeof order.customisedAnswers === 'string') {
        try {
          decodedCustomisedAnswers = JSON.parse(order.customisedAnswers);
        } catch (error) {
          console.error(`Error parsing customisedAnswers for order ${order.orderId}:`, error);
        }
      } else if (typeof order.customisedAnswers === 'object' && order.customisedAnswers !== null) {
        decodedCustomisedAnswers = order.customisedAnswers;
      }

      return {
        ...order,
        customerName: `${order.customer.firstName} ${order.customer.lastName}`,
        contactNumber: order.customer.contactNumber,
        productCode: order.product.productCode,
        productName: order.product.name,
        unitPrice: order.product.price,
        description: order.product.description,
        totalOrdersForCustomer: customerOrders.length,
        totalOrdersForCustomerForSeller: customerOrdersForSeller.length,
        totalReturnOrdersForCustomer: customerReturnOrders.length,
        totalReturnOrdersForCustomerForSeller: customerReturnOrdersForSeller.length,
        customisedAnswers: decodedCustomisedAnswers,
      };
    });
    console.log(orders);
    return orders;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error}`);
  }
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
    let customer = await prisma.customer.findUnique({
      where: {
        contactNumber: order["Your phone number : "],
      },
    });

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

    const newOrder = await prisma.order.create({
      data: {
        productId: order.product,
        quantity: parseInt(order["Quantity you need : "]),
        deliveryAddress: order["Your delivery address : "],
        paymentMethod: order["Your preferred payment method : "],
        orderStatus: "NEW",
        sellerId: order.seller,
        customerId: order["Your phone number : "],
        customisedAnswers: JSON.stringify(order.customisedAnswers),
      },
    });
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
