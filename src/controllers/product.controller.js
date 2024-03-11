const productService = require("../services/product.service");

async function getAllProducts(req, res) {
  const products = await productService.getAllProducts();
  res.json(products);
}

async function createProduct(req, res) {
  const product = await sellerService.createProduct(req.body);
  res.json(product).status(201);
}

module.exports = {
  getAllProducts,
  createProduct,
};
