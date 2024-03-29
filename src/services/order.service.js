const { PrismaClient } = require("@prisma/client");
const { request } = require("http");
const prisma = new PrismaClient();

async function getAllOrders() {
  const ordersWithCustomer = await prisma.order.findMany(
    {
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
  const orders = ordersWithCustomer.map(order => ({
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
const createOrders = async (id,status) => {
  
  return await prisma.order.update({
    where: {
      orderId: id,
    },
    data: {
      orderStatus: status ,
    },
  });
}

module.exports = {
  getAllOrders,
  createOrders
};
