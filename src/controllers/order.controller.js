const orderService = require("../services/order.service");

async function getAllOrders(req, res) {
  const orders = await orderService.getAllOrders();
  res.json(orders);
}

const createOrders = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log(id);
    const changeStatus = orderService.createOrders(parseInt(id), status);
    res.status(200).json(changeStatus);
    console.log(changeStatus);
  } catch (error) {
    res.status(500).json({ messageee: error.message });
  }
};
const createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const { order } = req.body;
    console.log(order);
    const newOrder = orderService.createOrder(order);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  createOrders,
  createOrder,
};
