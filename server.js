const express = require("express");

const cors = require("cors");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/routes/user.routes");

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

app.use("/api/v1", userRoutes);

app.listen(8000, () => {
  console.log("Server is running on port", 8000);
});
