const reportsService = require("../services/reports.service");

async function getReportDetails(req, res) {
    const id = req.user.id
    const orders = await reportsService.getReportDetails(id);
    res.json(orders);
  }

module.exports = {
    getReportDetails,
};
