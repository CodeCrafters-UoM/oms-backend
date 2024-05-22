const orderlinkService = require("../services/orderlink.service");

async function getAllOrderlinks(req, res) {
  const id = req.user.id;
  const orderLinks = await orderlinkService.getAllOrderlinks(id);
  res.json(orderLinks);
}

async function createOrderlink(req, res) {
  try {
    const newOrderLink = await orderlinkService.createOrderlink(req.body);
    res.json(newOrderLink).status(200);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
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
async function searchOrderlink(req, res) {
  try {
    const key = req.query.key;
    const orderLinks = await orderlinkService.searchOrderlink(key);
    res.status(200).json(orderLinks);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
async function updateOrderlink(req, res) {
  try {
    const { id } = req.params;
    const newLinkParams = req.body;
    const result = await orderlinkService.updateOrderlink(id, newLinkParams);
    if (result.success) {
      res
        .status(200)
        .json({ success: true, message: "Orderlink updated successfully" });
    } else {
      res.status(404).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
async function getAvailableOrderlinks(req, res) {
  const orderLinks = await orderlinkService.getAvailableOrderlinks();
  res.json(orderLinks);
}
module.exports = {
  getAllOrderlinks,
  createOrderlink,
  deleteOrderlink,
  searchOrderlink,
  updateOrderlink,
  getAvailableOrderlinks,
};
