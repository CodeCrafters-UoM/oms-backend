const orderformService = require("../services/orderform.service");

async function getOrderformDetails(req, res) {
  const id = req.params.linkId;
  const customQuestions = await orderformService.getOrderformDetails(id);
  res.json(customQuestions);
}

module.exports = {
  getOrderformDetails,
};
