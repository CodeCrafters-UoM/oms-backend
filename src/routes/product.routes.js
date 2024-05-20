const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const orderlinkController = require("../controllers/orderlink.controller");
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");

router.post("/product/addProduct", auth.protected.check([Role.SELLER, Role.ADMIN]), productController.createProduct);
router.get("/products", auth.protected.check([Role.SELLER, Role.ADMIN]), productController.getAllProducts);
router.delete("/product/:productCode", auth.protected.check([Role.SELLER, Role.ADMIN]), productController.deleteProduct);
router.put("/product/:productCode", auth.protected.check([Role.SELLER, Role.ADMIN]), productController.updateProduct);

router.get("/availableorderlinks",auth.protected.check([Role.SELLER, Role.ADMIN]),orderlinkController.getAllOrderlinks);


module.exports = router;
