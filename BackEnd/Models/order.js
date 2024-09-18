const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderedProducts = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, 
        },
        title:{
          type:String,
          required:true
        },
        price: {
          type: Number,
          required: true, 
        },
        _id:false
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  { versionKey: false }
);

const OrderProductModel = mongoose.model("Order Products", orderedProducts);

module.exports = OrderProductModel;
