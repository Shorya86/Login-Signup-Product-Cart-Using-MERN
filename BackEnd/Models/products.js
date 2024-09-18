const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
    },
    photo: {
      type: String,
    },
  },
  { versionKey: false }
);

const ProdcutsModel = mongoose.model("products", ProductsSchema);

module.exports = ProdcutsModel;
