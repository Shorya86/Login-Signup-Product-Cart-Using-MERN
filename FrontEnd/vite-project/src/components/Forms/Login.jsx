import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSuccess, handleError } from "../utils.jsx"; // Assuming you saved the toast handlers in a file named `toastHandlers.js`
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { addUser } from "./Store/userSlice.jsx";


const SignUp = () => {
  const [logInInfo, setlogInInfo] = useState({
    email: "",
    password: "",
  });
  
  const dispatch = useDispatch()
  const addUserRedux = (e)=>{
    // console.log(e);
    dispatch(addUser(e))
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    let copyLogIn = { ...logInInfo };
    copyLogIn[name] = value;
    setlogInInfo(copyLogIn);
  };

  // console.log("User Info---------", signUpInfo);

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const {email, password } = logInInfo;
    if (!email || !password) {
      return handleError("email password are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInInfo),
      });
      const result = await response.json();
      console.log(result);
      
      // dispatch(result.name,result.email)
      const { message, success, jwtToken, name, error, role,email} = result;
      if (success) {
        handleSuccess(message);
        addUserRedux(result)
        localStorage.setItem('jwtToken',jwtToken)
        localStorage.setItem("UserName", name)
        localStorage.setItem("Role", role)
        localStorage.setItem("Email", email)
        setTimeout(() => {
          // Check the user's role and navigate accordingly
          if (role === "admin") {
            navigate("/admin"); // Navigate to admin page
          } else if (role === "user") {
            navigate("/home"); // Navigate to home page for regular users
          }
        }, 2000);
      }
      else{
        const details = error?.details[0].message
        handleError(details)
      }
      // console.log(result);
      
    } catch (error) {
      handleError(error);
    }
  };

  
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fixed"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1511796638626-185958765b0f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={handleSignup}
        className="w-full max-w-lg bg-[#1f2937] p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Login</h2>

        

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            id="email"
            placeholder="Enter your email"
            value={logInInfo.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className=" text-white block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Enter your password"
            value={logInInfo.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-center text-white mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
