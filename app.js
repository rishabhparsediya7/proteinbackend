const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const upload = multer({ storage: multer.memoryStorage() });
const authRoute = require("./Routes/UserRoutes/AuthRoute");
const userRoutes = require("./Routes/UserRoutes/UserRoute");
const orderRoute = require("./Routes/UserRoutes/OrderRoute");
const productRoute = require("./Routes/UserRoutes/ProductRoutes");
const paymentRoutes = require("./Routes/UserRoutes/PaymentRoute");

const adminProduct = require("./Routes/AdminRoutes/AdminProductRoute");
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

app.use("/user/v1/auth", authRoute);
app.use("/user/v1/products", productRoute);
app.use("/user/v1/payment", paymentRoutes);
app.use("/user/v1/user", userRoutes);
app.use("/user/v1/orders", orderRoute);

app.use("/admin/v1/products", adminProduct);

app.listen(port, () => {
  console.log(`App is listening at the port ${port}`);
});
