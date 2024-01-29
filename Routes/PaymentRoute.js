const express = require("express");
const router = express.Router();
const PaymentController = require("../Controller/PaymentController");

router.post("/order", PaymentController.order);

router.post("/success", PaymentController.PaymentSuccessHandler);
module.exports = router;
