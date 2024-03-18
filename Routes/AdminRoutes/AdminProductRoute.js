const express = require("express");
const router = express.Router();
const AdminProductController = require("../../Controller/AdminController/ProductCont");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create",
  upload.single("image"),
  AdminProductController.createProducts
);

module.exports = router;
