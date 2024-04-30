// const sellerService = require("../services/seller.service");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const salt = 10;
// require("dotenv").config();

// const createToken = (user_id) => {
//   return jwt.sign({ user_id }, process.env.TOKEN_KEY, { expiresIn: "3d" });
// };

// async function createSeller(req, res) {
//   const hashedPwd = await bcrypt.hash(req.body.password, salt);
//   req.body.password = hashedPwd;
//   try {
//     const seller = await sellerService.createSeller(req.body);
//     if (!seller) {
//       throw new Error("Error creating seller");
//     }
//     res.status(200).json({ userId: seller.id });
//   } catch (error) {
//     if (error.message === "Username already exists") {
//       res.status(400).json({ error: "Username already exists" });
//     } else {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }
// async function login(req, res) {
//   try {
//     const user = await sellerService.login(req.body);
//     const formattedUser = {
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       image: user.image,
//     };

//     res.status(200).json(formattedUser);
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//     console.log(err);
//   }
// }

// async function getAllSellers(req, res) {
//   try {
//     const sellers = await sellerService.getAllSellers();
//     res.status(200).json(sellers);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// module.exports = {
//   getAllSellers,
//   createSeller,
//   login,
// };
