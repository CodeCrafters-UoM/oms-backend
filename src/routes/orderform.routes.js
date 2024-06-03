const express = require("express");
const router = express.Router();
const orderformController = require("../controllers/orderform.controller");

router.get("/customquestions/:linkId", orderformController.getCustomQuestions);

module.exports = router;
