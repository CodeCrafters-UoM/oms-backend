const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller.controller");

router.post("/sellerregister", sellerController.createSeller);
// router.get("/api/sellers", sellerController.getAllSellers);
router.post("/login", sellerController.login);

module.exports = router;
