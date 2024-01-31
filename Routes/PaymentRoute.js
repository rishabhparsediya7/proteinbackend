const express = require("express");
const router = express.Router();
const PaymentController = require("../Controller/PaymentController");

router.post("/order", PaymentController.PaymentOrder);

router.post("/success", PaymentController.PaymentSuccessHandler);
module.exports = router;
