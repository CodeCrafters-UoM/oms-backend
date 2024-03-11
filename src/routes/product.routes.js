const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.post("/product/get", productController.createProduct);
router.get("/products", productController.getAllProducts);


module.exports = router;
