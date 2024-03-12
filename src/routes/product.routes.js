const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.post("/product/addProduct", productController.createProduct);
router.get("/products", productController.getAllProducts);

// Add route for deleting a product by Product Code
router.delete("/product/:productCode", productController.deleteProduct);

// PUT route to update an existing product
router.put("/product/:productCode", productController.updateProduct);


module.exports = router;
