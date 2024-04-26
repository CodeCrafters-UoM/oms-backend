const orderService = require("../services/order.service");

async function getAllOrders(req, res) {
  const orders = await orderService.getAllOrders();
  res.json(orders);
}

async function getOrderDetails(req, res){
  const{orderId} = req.params;
  const orderIdNum = parseInt(orderId, 10);
  console.log(orderIdNum);
  const order = await orderService.getOrderDetails(orderIdNum);
  res.json(order);
}

module.exports = {
  getAllOrders,
  getOrderDetails
};
