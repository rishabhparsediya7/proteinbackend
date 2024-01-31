const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController");
router.post("/getUserOrders", UserController.getUserOrder);

module.exports = router;
