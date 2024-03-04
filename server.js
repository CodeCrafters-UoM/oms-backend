const express = require("express");
const app = express();
const cors = require("cors");

const sellerRoutes = require("./src/routes/seller.routes");
const itemRoutes = require("./src/routes/Item.routes");

app.use(express.json());

app.use(cors());

app.use(sellerRoutes);
app.use(itemRoutes);

app.listen(8000, () => {
  console.log("Server is running on port", 8000);
});
