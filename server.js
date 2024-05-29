const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/routes/user.routes");
const sellerRoutes = require("./src/routes/seller.routes");
const productRoutes = require("./src/routes/product.routes");
const orderlinkRoutes = require("./src/routes/orderlink.routes");
const orderRoutes = require("./src/routes/order.routes");
const { initWebSocketServer } = require("./notificationService");

const app = express();
const httpServer = require("http").createServer(app);

// Initialize WebSocket server
initWebSocketServer(httpServer);

// Middleware
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
app.use(productRoutes);
app.use(orderlinkRoutes);
app.use(orderRoutes);

// Start HTTP server
httpServer.listen(8000, () => {
  console.log("Server is running on port", 8000);
});
