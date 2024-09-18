const OrderProductModel = require("../Models/order");
const ProdcutsModel = require("../Models/products"); // Assuming you have a product model

// CREATE Order
const createOrder = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { products, totalPrice } = req.body;

    const orderProducts = [];

    // Loop through each product in the request body
    for (let item of products) {
      const product = await ProdcutsModel.findById(item.product_id);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product_id} not found` });
      }

      const { title } = product;

      // Add the product details to the orderProducts array
      orderProducts.push({
        product_id: item.product_id,
        title,
        quantity: item.quantity,
        price: item.price,
      });
    }

    // Create the order with the accumulated products and total price
    const newOrder = await OrderProductModel.create({
      user_id,
      products: orderProducts,
      totalPrice,
    });

    res.status(200).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const orderDetails = async (req, res) => {
  try {
    const details = await OrderProductModel.find({
      _id: req.body.item_id,
    }).populate("product_id user_id");
    res.send(details);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrder, orderDetails };
