const { PrismaClient } = require("@prisma/client");
const { request } = require("http");
const prisma = new PrismaClient();

async function getAllOrders() {
  const ordersWithCustomer = await prisma.order.findMany(
   {
    where: {
      sellerId: '1a37cefe-eebc-4761-9226-846c11c696de', 
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
  const orders = ordersWithCustomer.map(order => ({
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
  createOrders,
};
