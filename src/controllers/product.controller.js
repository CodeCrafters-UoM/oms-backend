const productService = require("../services/product.service");

async function getAllProducts(req, res) {
  const products = await productService.getAllProducts();
  res.json(products);
}

async function createProduct(req, res) {
  const product = await productService.createProduct(req.body);
  res.json(product).status(200);
}

async function deleteProduct(req, res) {
  try {
    const { productCode } = req.params;
    await productService.deleteProduct(productCode);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
};
