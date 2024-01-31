const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const upload = multer({ storage: multer.memoryStorage() });
const authRoute = require("./Routes/AuthRoute");
const userRoutes = require("./Routes/UserRoute");
const orderRoute = require("./Routes/OrderRoute");
const productRoute = require("./Routes/ProductRoutes");
const paymentRoutes = require("./Routes/PaymentRoute");
require("dotenv").config();
require("./database/setup");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/payment", paymentRoutes);
app.use("/user", userRoutes);
app.use("/orders", orderRoute);
app.listen(port, () => {
  console.log(`App is listening at the port ${port}`);
});
