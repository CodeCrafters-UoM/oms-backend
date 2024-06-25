const productService = require("../services/product.service");
const orderLinkService = require("../services/orderlink.service");

async function getAllProducts(req, res) {
  const id = req.user.id;
  const products = await productService.getAllProducts(id);
  res.json(products);
}

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.message === "Product code already exists") {
      res.status(400).json({ message: error.message });
    } else if (error.message === "Invalid order link" || error.message === "Order link is already associated with another product") {
      res.status(400).json({ message: error.message });
    } else if (error.message.includes('Description should not exceed')) {
      return res.status(400).json({ message: error.message });
    }
    else {
      console.error("Internal server error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

async function deleteProduct(req, res) {
  try {
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
