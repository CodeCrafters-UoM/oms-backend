const productService = require("../services/product.service");

async function getAllProducts(req, res) {
  const products = await productService.getAllProducts();
  res.json(products);
}

module.exports = {
  getAllProducts,
};
