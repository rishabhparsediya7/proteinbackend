const ProductModel = require("../Models/Product");
const productsList = require("../constant/ConstantBackend");

const createProducts = async (req, res) => {
  console.log(productsList.categories);
  const p = productsList.categories;
  const allObjects = Object.keys(p);
  const a = allObjects
    .map((e) => {
      return productsList.categories[e];
    })
    .flat();
  const options = { ordered: true };
  const result = await ProductModel.insertMany(a, options);
  res.json({ list: `${result.insertedCount} documents were inserted` });
};

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ message: "could not find products" });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await ProductModel.find({ category: category });
    res
      .status(200)
      .json({ category: category, total: products.length, products: products });
  } catch (error) {
    res.status(500).json({ message: "could not find products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({ _id: id });
    res
      .status(200)
      .json({ product: product });
  } catch (error) {
    res.status(500).json({ message: "could not find products" });
  }
};

module.exports = {
  createProducts,
  getProducts,
  getProductByCategory,
  getProductById,
};
