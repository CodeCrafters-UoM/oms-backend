const express = require("express");
const router = express.Router();
const orderformController = require("../controllers/orderform.controller");

router.get(
  "/orderformquestions/:linkId",
  orderformController.getOrderformDetails
);

module.exports = router;
