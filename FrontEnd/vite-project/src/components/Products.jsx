import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "./utils";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addtoCart } from "./Forms/Store/cartSlice";

const Products = () => {
  const [products, setproducts] = useState("");

  const [role, setrole] = useState("");
  // console.log(role);
  
  const userRole = localStorage.getItem("Role");

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products/all";
      const response = await axios.get(url);
      // console.log(response);
      setproducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchProductsID = async (id) => {
  //   if (userRole) {
  //     // setproductId(id);
  //     try {
  //       const url = "http://localhost:8080/items/create/order";
  //       const response = await axios.post(
  //         url,
  //         {
  //           product_id: id, // Sending product_id in the body
  //         },
  //         {
  //           headers: {
  //             authorization: localStorage.getItem("jwtToken"), // Sending the token as Authorization header
  //             "Content-Type": "application/json", // Ensuring correct content type
  //           },
  //         }
  //       );
  //       setTimeout(() => {
  //         handleSuccess("Product Added SuccesFully");
  //       }, 1000);
  //       console.log(response)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     handleError("Login to add Products");
  //   }
  // };

  const addItems = () => {};

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    setrole(userRole);
  }, [userRole]);

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
        <div className="flex justify-center items-center min-h-screen ">
          <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              Products List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={index}
                    className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <a>
                      <img
                        className="p-8 rounded-t-lg"
                        src={product.photo}
                        alt="product image"
                      />
                    </a>
                    <div className="px-5 pb-5">
                      <a>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {product.title}
                        </h5>
                      </a>
                      <p className="text-base text-gray-700 dark:text-gray-400">
                        {product.desc}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {product.price}
                        </span>
                        <a
                          // onClick={() => fetchProductsID(product._id)}
                          // onClick={() => addToCart(product._id)}
                          onClick={() => {
                            role === "user"
                              ? setTimeout(() => {
                                  handleSuccess("Product Added Successfully");
                                  dispatch(
                                    addtoCart({
                                      title: product.title,
                                      photo: product.photo,
                                      price: product.price,
                                      id: product._id,
                                    })
                                  );
                                }, 500)
                              : handleError("Login to add Products")
                          }}
                          className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-center">Loading products...</p>
              )}
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
