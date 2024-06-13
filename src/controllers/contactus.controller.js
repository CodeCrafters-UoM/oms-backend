const contactusService = require("../services/contactus.service");

async function contactus(req, res) {
  console.log("req.body", req.body);
  const  values  = req.body;
  console.log(values);
  await contactusService.contactus(values, res);
}

module.exports = {
  contactus
};