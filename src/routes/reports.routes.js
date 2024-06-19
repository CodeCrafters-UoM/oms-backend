const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");
const reportsController = require("../controllers/reports.controller");

router.get(
    "/reports",
    auth.protected.check(Role.SELLER),
    reportsController.getReportDetails
);

module.exports = router;