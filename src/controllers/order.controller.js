const orderService = require("../services/order.service");

async function getAllOrders(req, res) {
  const orders = await orderService.getAllOrders();
  res.json(orders);
}

// async function createOrders(req, res) {
//   const orders = await orderService.createOrders();
//   res.json(orders).status(200);
// }


// // this is new one
// const createOrder = async (req, res) => {
//   const { radioButtonValue } = req.body;
//   try {
//     const newData = await prisma.data.create({
//       data: {
//         radioButtonValue,
//       },
//     });
//     res.json(newData);
//   } catch (error) {
//     res.status(500).json({ error: 'Error storing data' });
//   }
// };
// convert one
// const orderService = require('./order.service');

// async function createOrders(req, res) {
//   try {
//     const { orderStatus } = req.body;
//     const newData = await orderService.createOrders(orderStatus);
//     res.status(200).json({ success: true, data: newData });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Error storing data' });
//   }
// }

const createOrders = async (req, res) => {
  try {
    const changeStatus = await orderService.createOrders
    res.status(200).json(changeStatus);
    console.log (changeStatus);
  } catch (error) {
    res.status(500).json({ messageee: error.message });
  }
};


module.exports = {
    getAllOrders ,
    createOrders
  };