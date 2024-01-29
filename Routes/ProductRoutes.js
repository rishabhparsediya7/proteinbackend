const express = require("express");
const router = express.Router();
const productController = require("../Controller/ProductController");

router.post("/", productController.createProducts);
router.get("/", productController.getProducts);
router.get("/category/:category", productController.getProductByCategory);
router.get("/id/:id", productController.getProductById);

module.exports = router;
