const orderService = require("../services/order.service");

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

module.exports = {
  getAllOrders,
  updateStatus,
};
