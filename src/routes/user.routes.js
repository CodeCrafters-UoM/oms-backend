const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");

// router.post("/register", userController.register);
// router.get(
//   "/users",userController.getAllUsers
// );
router.post("/login", userController.login);

router.get("/profile/viewprofile/:userId",userController.getProfileDetails);

module.exports = router;
