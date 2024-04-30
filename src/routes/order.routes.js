const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

//set the page name
router.get("/orders", orderController.getAllOrders);
router.put("/orders" , orderController.createOrders) ;

module.exports = router;