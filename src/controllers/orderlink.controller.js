const orderlinkService = require("../services/orderlink.service");

async function getAllOrderlinks(req, res) {
  const orderLinks = await orderlinkService.getAllOrderlinks();
  res.json(orderLinks);
}

async function createOrderlink(req, res) {
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
async function copyOrderlink(req, res) {
  try {
    const { id } = req.params;
    const copiedOrderLink = await orderlinkService.copyOrderlink(id);
    res.json(copiedOrderLink.link).status(201);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
module.exports = {
  getAllOrderlinks,
  createOrderlink,
  deleteOrderlink,
  copyOrderlink,
};
