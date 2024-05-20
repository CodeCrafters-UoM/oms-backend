const express = require("express");
const router = express.Router();
const orderlinkController = require("../controllers/orderlink.controller");
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");

router.get(
  "/orderlinks",
  auth.protected.check([Role.SELLER, Role.ADMIN]),
  orderlinkController.getAllOrderlinks
);
router.post(
  "/orderlinks/createorderlink",
  auth.protected.check(Role.SELLER),
  orderlinkController.createOrderlink
);
router.delete(
  "/orderlinks/delete/:id",
  auth.protected.check(Role.SELLER),
  orderlinkController.deleteOrderlink
);
router.get(
  "/orderlinks/search",
  auth.protected.check(Role.SELLER),
  orderlinkController.searchOrderlink
);

module.exports = router;
