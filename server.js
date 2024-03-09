const express = require("express");

const cors = require("cors");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const sellerRoutes = require("./src/routes/seller.routes");

const app = express();
app.use(express.json()); //converts incoming request data to JSON

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(sellerRoutes);

app.listen(8000, () => {
  console.log("Server is running on port", 8000);
});
