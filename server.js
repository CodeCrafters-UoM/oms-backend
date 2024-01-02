const express = require("express");
const app = express();

const sellerRoutes = require("./src/routes/seller.routes");

app.use(express.json());

app.use(sellerRoutes);

app.listen(8000, () => {
  console.log("Server is running on port", 8000);
});
