const orderService = require("../services/order.service");

async function getAllOrders(req, res) {
  const orders = await orderService.getAllOrders();
  res.json(orders);
}

module.exports = {
    getAllOrders
  };