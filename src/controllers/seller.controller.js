const sellerService = require("../services/seller.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const salt = 10;

async function createSeller(req, res) {
  const hashedPwd = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPwd;
  console.log(req.body.password);
  try {
    const seller = await sellerService.createSeller(req.body);
    res.status(200).json(seller);
  } catch (err) {
    res.status(500).json(seller);
  }
}

async function login(req, res) {
  try {
    const user = await sellerService.login(req.body);
    const name = req.body.username;
    console.log(name);
    const accessToken = jwt.sign({ name }, "jwt-secret-key", {
      expiresIn: "1d",
    });
    console.log(accessToken, user);
    res.cookie("token", accessToken, { httpOnly: true });
    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    res.status(200).json(formattedUser);
    console.log(formattedUser);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = {
  createSeller,
  login,
};
