const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllOrders() {
  return prisma.order.findMany(
    {
      include:{
        customer:{
          select:{
            firstName:true,
            lastName:true,
            orders:true,
            contactNumber:true,
          },
        },
        product:{
          select:{
            productCode:true,
            name:true,  
          },
        },
      },
    },
  );

}

async function getOrderDetails(orderId){
  return prisma.order.findUnique({
    where: {orderId: orderId},
  })
}


module.exports = {
  getAllOrders,
  getOrderDetails
};
