const { PrismaClient } = require("@prisma/client");
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
const createOrders = async () => {
  return await prisma.order.update({
    where: {
      orderId: 1,
    },
    data: {
      orderStatus: "success" ,
    },
  });
}


// async function createOrders(orderStatus) {
//   try {
//     const newData = await prisma.data.create({
//       data: {
//         orderStatus,
//       },
//     });
//     return { success: true, data: newData };
//   } catch (error) {
//     return { success: false, error: 'Error storing data' };
//   }
// }




module.exports = {
  getAllOrders,
  createOrders
};
