const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

//set the page name
router.post("/order/addOrders", orderController.createOrders);
router.get("/orders", orderController.getAllOrders);
router.put("/orders", orderController.createOrders);
router.post("/placeorder", orderController.createOrder);

module.exports = router;
