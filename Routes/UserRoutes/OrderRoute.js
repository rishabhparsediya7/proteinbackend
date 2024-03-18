const express = require("express");
const router = express.Router();
const OrderController = require("../../Controller/OrderController");

router.post("/getUserOrders", OrderController.getALLOrderForUser);
module.exports = router;
