const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller.controller");
const auth = require("../middlewares/auth");

router.post("/sellerregister", sellerController.createSeller);
router.get("/sellers", auth.auth, sellerController.getAllSellers);
router.post("/login", sellerController.login);
router.post("/token", sellerController.getToken);
router.delete("/logout", sellerController.logout);

module.exports = router;
