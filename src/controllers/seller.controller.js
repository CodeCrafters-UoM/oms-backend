const sellerService = require("../services/seller.service");

async function createSeller(req, res) {
  const seller = await sellerService.createSeller(req.body);
  res.json(seller).status(201);
}

async function getAllSellers(req, res) {
  const sellers = await sellerService.getAllSellers();
  res.json(sellers);
}



module.exports = {
  getAllSellers,
  createSeller,
};
