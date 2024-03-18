const express = require("express");
const router = express.Router();
const UserController = require("../../Controller/UserController");
router.post("/getUserOrders", UserController.getUserOrder);
router.get("/getUserDetail/:userId", UserController.getUser);
router.put("/updateUser", UserController.updateUser);

module.exports = router;
