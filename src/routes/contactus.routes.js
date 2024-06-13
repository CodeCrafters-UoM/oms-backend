const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");
const contactusController = require("../controllers/contactus.controller");

router.post("/contactus",auth.protected.check([Role.SELLER]), contactusController.contactus);


module.exports = router;