const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/routes/user.routes");
const productRoutes = require("./src/routes/product.routes");
const orderlinkRoutes = require("./src/routes/orderlink.routes");
const orderRoutes = require("./src/routes/order.routes");
const sellerRoutes = require("./src/routes/seller.routes");
const orderformRoutes = require("./src/routes/orderform.routes");
const forgotpasswordRoutes = require("./src/routes/forgotpassword.routes");
const contactusRoutes = require("./src/routes/contactus.routes");
const notificationRoutes = require("./src/routes/notification.routes");
const reportsRoutes = require("./src/routes/reports.routes");
const { initWebSocketServer } = require("./src/services/notification.service");
const helloworldRoutes = require("./src/routes/helloworld.routes");

const app = express();
const httpServer = require("http").createServer(app);

initWebSocketServer(httpServer);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://deleever.one"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderlinkRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", orderformRoutes);
app.use("/api/v1", forgotpasswordRoutes);
app.use("/api/v1", contactusRoutes);
app.use("/api/v1", notificationRoutes);
app.use("/api/v1", reportsRoutes);
app.use("/api/v1", helloworldRoutes);

httpServer.listen(8000, () => {
  console.log("Server is running on port", 8000);
});
