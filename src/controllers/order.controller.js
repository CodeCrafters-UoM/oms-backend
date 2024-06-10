const orderService = require("../services/order.service");
const { sendNotification } = require("../../notificationService");

async function getAllOrders(req, res) {
  const id = req.user.id;
  const orders = await orderService.getAllOrders(id);
  res.json(orders);
}

const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const changeStatus = orderService.updateStatus(parseInt(id), status);
    res.status(200).json(changeStatus);
  } catch (error) {
    res.status(500).json({ messageee: error.message });
  }
};
const createOrder = async (req, res) => {
  try {
    const order = req.body; 
    const newOrder = orderService.createOrder(order);

     // Send WebSocket notification
     sendNotification("New order added");

     res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  updateStatus,
};
