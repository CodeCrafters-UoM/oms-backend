const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function register(req, res) {
  const hashedPwd = await bcrypt.hash(req.body.user.password, 10);
  req.body.user.password = hashedPwd;
  try {
    const user = await userService.register(req.body);
    if (!user) {
      throw new Error("Error creating seller");
    }
    res.status(200).json({ userId: user.userId });
  } catch (error) {
    console.log("error", error.message);
    if (error.message === "Error creating user:") {
      res.status(400).json({ error: "Username or email is already exists" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
async function login(req, res) {
  console.log(req.body);
  try {
    const user = await userService.login(req.body);
    res.status(200).json(user);
    console.log("user", user);
  } catch (err) {
    res.status(401).json({ error: err.message });
    console.log(err);
  }
}

async function getProfileDetails(req, res) {
  try {
    const user = await userService.getProfileDetails(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateProfileDetails(req, res) {
  try {
    const user = await userService.updateProfileDetails(
      req.params.userId,
      req.body
    );
    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  register,
  login,
  getProfileDetails,
  updateProfileDetails,
};
