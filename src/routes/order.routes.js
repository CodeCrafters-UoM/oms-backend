const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");

//set the page name
router.get(
  "/orders",
  auth.protected.check([Role.SELLER, Role.ADMIN]),
  orderController.getAllOrders
);
router.put(
  "/orders",
  auth.protected.check([Role.SELLER, Role.ADMIN]),
  orderController.updateStatus
);

module.exports = router;
