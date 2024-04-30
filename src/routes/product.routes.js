const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");

router.post("/product/addProduct", auth.protected.check([Role.SELLER, Role.ADMIN]), productController.createProduct);
router.get("/products", auth.protected.check([Role.SELLER, Role.ADMIN]), productController.getAllProducts);
router.delete("/product/:productCode", auth.protected.check([Role.SELLER, Role.ADMIN]), productController.deleteProduct);
router.put("/product/:productCode", auth.protected.check([Role.SELLER, Role.ADMIN]), productController.updateProduct);


module.exports = router;


//router.get(
    //   "/users",
    //   auth.protected.check([Role.SELLER, Role.ADMIN]),
    //   userController.getAllUsers
    // );