const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");

router.post("/register", userController.register);
// router.get(
//   "/users",
//   auth.protected.check([Role.SELLER, Role.ADMIN]),
//   userController.getAllUsers
// );
router.post("/login", userController.login);

module.exports = router;
