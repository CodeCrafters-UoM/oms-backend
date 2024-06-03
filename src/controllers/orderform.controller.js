const orderformService = require("../services/orderform.service");

async function getCustomQuestions(req, res) {
  const id = req.params.linkId;
  console.log("id", id);
  const customQuestions = await orderformService.getCustomQuestions(id);
  res.json(customQuestions);
}

module.exports = {
  getCustomQuestions,
};
