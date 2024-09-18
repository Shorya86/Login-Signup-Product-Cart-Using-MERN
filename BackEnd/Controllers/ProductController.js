const ProdcutsModel = require("../Models/products");

// CREATE
const createProduct = async (req, res) => {
  try {
    const { title, desc, price, photo } = req.body;
    const user = await ProdcutsModel.create({ title, desc, price, photo });
    res.status(200).json({ message: "Added Succesfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await ProdcutsModel.find({});
    //   console.log(users);

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, getAllProducts };
