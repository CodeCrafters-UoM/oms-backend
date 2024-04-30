const express = require("express");
const router = express.Router();
const orderlinkController = require("../controllers/orderlink.controller");

router.get("/orderlinks", orderlinkController.getAllOrderlinks);
router.post("/orderlinks/createorderlink", orderlinkController.createOrderlink);
router.delete("/orderlinks/delete/:id", orderlinkController.deleteOrderlink);
router.get("/orderlinks/copy/:id", orderlinkController.copyOrderlink);

module.exports = router;
