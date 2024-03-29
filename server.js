const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/routes/user.routes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v1", userRoutes);
const sellerRoutes = require("./src/routes/seller.routes");
const productRoutes = require("./src/routes/product.routes");
const orderRoutes = require("./src/routes/order.routes");

app.use(express.json());

app.use(cors());

app.use(sellerRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.listen(8000, () => {
  console.log("Server is running on port", 8000);
});
