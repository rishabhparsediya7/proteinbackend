const ProductModel = require("../../Models/Product");
const productsList = require("../../constant/ConstantBackend");
const products = require("../../constant/WholeProductListDummy");

const createProducts = async (req, res) => {
  const index = Math.floor(Math.random() * products.length);
  const pro = products[index % products.length];
  const { name, type, category, company, price_INR } = pro;
  try {
    const product = new ProductModel({
      name: name,
      type: type,
      category: category,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      company: company,
      price_INR: price_INR,
    });
    const savedProduct = await product.save();
    res.status(201).json({ product: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ product: savedProduct });
  }
};

module.exports = {
  createProducts,
};
