const orderlinkService = require("../services/orderlink.service");

async function getAllOrderlinks(req, res) {
  const orderLinks = await orderlinkService.getAllOrderlinks();
  res.json(orderLinks);
}

async function createOrderlink(req, res) {
  console.log(req.body);
  const newOrderLink = await orderlinkService.createOrderlink(req.body);
  res.json(newOrderLink).status(201);
}
async function deleteOrderlink(req, res) {
  try {
    const { id } = req.params;
    await orderlinkService.deleteOrderlink(id);
    res
      .status(200)
      .json({ success: true, message: "Orderlink deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
module.exports = {
  getAllOrderlinks,
  createOrderlink,
  deleteOrderlink,
};
