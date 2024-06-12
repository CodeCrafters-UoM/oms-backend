const forgotpasswordService = require("../services/forgotpassword.service");

async function sendOtp(req, res) {
  console.log("req.body", req.body);
  const { username } = req.body;
  await forgotpasswordService.sendOtp(username, res);
}
async function verifyOtp(req, res) {
  const { username, otp } = req.body;
  await forgotpasswordService.verifyOtp(username, otp, res);
}
async function resetPassword(req, res) {
  const { username, newPassword } = req.body;
  await forgotpasswordService.resetPassword(username, newPassword, res);
}
module.exports = {
  sendOtp,
  resetPassword,
  verifyOtp,
};
