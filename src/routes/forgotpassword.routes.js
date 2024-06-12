const express = require("express");
const router = express.Router();
const forgotpasswordController = require("../controllers/forgotpassword.controller");

router.post("/forgotpassword", forgotpasswordController.sendOtp);
router.post("/verifyotp", forgotpasswordController.verifyOtp);
router.post("/resetpassword", forgotpasswordController.resetPassword);

module.exports = router;
