const express = require("express");
const router = express.Router();
const authController = require("../../Controller/AuthController");

router.post("/phone", authController.getMobileOTP);
router.post("/mail-otp", authController.getMailOTP);
router.post("/verify-otp", authController.verifyOTP);

router.post("/create", authController.createUser);
router.post("/login", authController.getUser);
router.post("/userExists", authController.userExists);

module.exports = router;
