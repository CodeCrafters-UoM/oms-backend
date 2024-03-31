const orderService = require("../services/order.service");

async function getAllOrders(req, res) {
  const orders = await orderService.getAllOrders();
  res.json(orders);
}

const createOrders = async (req, res) => {
  try {
    const {id,status} = req.body
    const changeStatus =  orderService.createOrders(parseInt(id),status)
    res.status(200).json(changeStatus);
  } catch (error) {
    res.status(500).json({ messageee: error.message });
  }
};

module.exports = {
    getAllOrders ,
    createOrders ,
  };