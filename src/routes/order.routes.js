const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.get("/orders", orderController.getAllOrders);

router.get("/orders/:orderId", orderController.getOrderDetails);


module.exports = router;