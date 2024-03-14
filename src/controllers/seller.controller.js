const sellerService = require("../services/seller.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const salt = 10;
require("dotenv").config();
let refreshTokens = [];

async function createSeller(req, res) {
  const hashedPwd = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPwd;
  try {
    const seller = await sellerService.createSeller(req.body);
    res.status(200).json(seller);
  } catch (error) {
    if (error.message === "Username already exists") {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

// async function login(req, res) {
//   try {
//     const user = await sellerService.login(req.body);
//     const name = req.body.username;
//     const accessToken = jwt.sign({ name }, process.env.TOKEN_KEY, {
//       expiresIn: "10s",
//     });
//     const refreshToken = jwt.sign({ name }, process.env.RE_TOKEN_KEY, {
//       expiresIn: "1h",
//     });
//     console.log(accessToken, user);
//     // res.cookie("token", accessToken, { httpOnly: true });
//     refreshTokens.push(refreshToken);
//     res.send({ accessToken, refreshToken });
//     const formattedUser = {
//       id: user.id,
//       username: user.username,
//       email: user.email,
//     };
//     res.status(200).json(formattedUser);
//     console.log(formattedUser);
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//     console.log();
//   }
// }
async function login(req, res) {
  try {
    const user = await sellerService.login(req.body);
    const username = req.body.username;
    const name = { name: username };
    // console.log(name);
    const accessToken = jwt.sign(name, process.env.TOKEN_KEY, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(name, process.env.RE_TOKEN_KEY, {
      expiresIn: "1h",
    });
    // console.log(accessToken, user);
    res.cookie("token", accessToken, { httpOnly: true });
    refreshTokens.push(refreshToken);

    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const response = {
      accessToken,
      refreshToken,
      name,
    };

    res.status(200).json(response);
    console.log(response);
  } catch (err) {
    res.status(401).json({ error: err.message });
    console.error(err);
  }
}

async function getAllSellers(req, res) {
  try {
    const sellers = await sellerService.getAllSellers();
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
  // const user = req.user;
  // console.log(user);
  // res.json(user);
}
async function getToken(req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.RE_TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ name: user.name }, process.env.TOKEN_KEY, {
      expiresIn: "10s",
    });
    res.send({ accessToken });
  });
}
async function logout(req, res) {
  const refreshToken = req.body.refreshToken;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
  res.sendStatus(204);
}

module.exports = {
  getAllSellers,
  createSeller,
  login,
  getToken,
  logout,
};
