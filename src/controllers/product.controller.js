const productService = require("../services/product.service");

async function getAllProducts(req, res) {
  const id = req.user.id;
  console.log(id);
  const products = await productService.getAllProducts(id);
  res.json(products);
}

async function createProduct(req, res) {
  const product = await productService.createProduct(req.body);
  res.json(product).status(200);
}

async function deleteProduct(req, res) {
  try {
    console.log(req.params);
    const { productCode } = req.params;
    await productService.deleteProduct(productCode);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { productCode } = req.params;
    const newData = req.body;
    const result = await productService.updateProduct(productCode, newData);
    if (result.success) {
      res
        .status(200)
        .json({ success: true, message: "Product updated successfully" });
    } else {
      res.status(404).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
