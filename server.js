const express = require("express");
const app = express();
const cors = require("cors");

const sellerRoutes = require("./src/routes/seller.routes");
const productRoutes = require("./src/routes/product.routes");
const orderlinkRoutes = require("./src/routes/orderlink.routes");

app.use(express.json());

app.use(cors());

app.use(sellerRoutes);
app.use(productRoutes);
app.use(orderlinkRoutes);

app.listen(8000, () => {
  console.log("Server is running on port", 8000);
});
