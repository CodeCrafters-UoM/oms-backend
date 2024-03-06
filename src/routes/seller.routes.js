const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller.controller");

router.post("/api/sellerreg", sellerController.createSeller);
router.get("/api/sellers", sellerController.getAllSellers);


module.exports = router;