const ProductModel = require("../Models/Product");
const productsList = require("../constant/ConstantBackend");

const createProducts = async (req, res) => {
  const companyNames = [
    "Optimum Nutrition (ON)",
    "MuscleBlaze",
    "Ultimate Nutrition",
    "Dymatize",
    "BSN",
    "Labrada",
    "MyProtein",
    "MuscleTech",
    "Scivation",
    "Isopure",
    "Big Muscles Nutrition",
    "Protein World",
    "Incredio",
    "ABB (American Body Building)",
    "RSP Nutrition",
  ];
  try {
    const a = Object.keys(productsList.categories)
      .map((e) => {
        const listCategories = productsList.categories[e];
        const newOne = listCategories.map((l) => {
          const index = Math.floor(Math.random() * companyNames.length);
          return { ...l, company: companyNames[index] };
        });
        return newOne;
      })
      .flat();
    console.log(a);
    const options = { ordered: true };
    const result = await ProductModel.insertMany(a, options);
    res.json({ list: `${result.insertedCount} documents were inserted` });
  } catch (error) {
    console.log(error);
  }
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
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json({ message: "could not find products" });
  }
};

const updateAllProducts = async (req, res) => {};

module.exports = {
  createProducts,
  getProducts,
  getProductByCategory,
  getProductById,
};
