import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeFromCart } from "./Forms/Store/cartSlice";
import axios from "axios";
import { handleError, handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  // console.log(cartItems);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Prepare the data for the request
  const alldata = cartItems.map((item) => ({
    product_id: item.id, // Ensure 'id' matches your backend schema
    quantity: item.quantity,
    price: item.price,
  }));

  // console.log("Alldata to send:", alldata);

  const totalPrice = calculateTotal();

  const [products, setproducts] = useState();
  // console.log({ products }, totalPrice);

  const checkOut = async () => {
    if(cartItems.length===0){
      handleError("Please Add Products")
      // console.log("hey");
      
    }else{
      setTimeout(() => {
        handleSuccess("Order Succesfully")
        setproducts(cartItems);
      }, 1000);
    
    try {
      const url = "http://localhost:8080/items/create/order";
      const response = await axios.post(
        url,
        {
          products: alldata,
          totalPrice,
        },
        {
          headers: {
            authorization: localStorage.getItem("jwtToken"), // Sending the token as Authorization header
            "Content-Type": "application/json", // Ensuring correct content type
          },
        }
      );
      console.log("dataaa", response);
    } catch (error) {
      console.log("error", error);
    }
  }};

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-fixed"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511796638626-185958765b0f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto p-6 bg-white bg-opacity-90 shadow-lg rounded-lg max-w-3xl">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Shopping Cart
          </h1>
          <div className="flex flex-col space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white shadow-md p-6 rounded-lg"
              >
                <img
                  className="w-28 h-28 object-cover rounded-lg"
                  src={item.photo}
                  alt={"sorry"}
                />
                <div className="ml-6 flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-lg text-gray-600">Price: {item.price}</p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      onClick={() => dispatch(decrement({ id: item.id }))}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increment({ id: item.id }))}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-gray-800">
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    className="text-red-600 hover:text-red-800 font-medium mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="mt-8 p-6 bg-gray-100 shadow-md rounded-lg text-right">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: {calculateTotal()}
            </h2>
            <button
              onClick={checkOut}
              className="mt-6 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
        
      </div>
      <ToastContainer/>
    </>
  );
};

export default Cart;
