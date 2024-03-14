const jwt = require("jsonwebtoken");
require("dotenv").config();

async function auth(req, res, next) {
  if (
    req.headers.autherization &&
    req.headers.autherization.startsWith("bearer")
  ) {
    const token = req.headers.autherization.split(" ")[1];
    if (token === "null") res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_KEY, (err, name) => {
      if (err) return res.sendStatus(403);
      req.name = name;
      next();
    });
  } else {
    res.sendStatus(401);
  }
  //   const token = req.header("auth-token");
  //   if (!token) return res.status(401).send("Access Denied");

  //   try {
  //     const verified = jwt.verify(token, process.env.TOKEN_KEY);
  //     req.user = verified;
  //     next();
  //   } catch (err) {
  //     res.status(400).send("Invalid Token");
  //   }
}
module.exports = {
  auth,
};
