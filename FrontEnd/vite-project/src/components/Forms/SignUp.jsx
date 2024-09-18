import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSuccess, handleError } from "../utils.jsx"; // Assuming you saved the toast handlers in a file named `toastHandlers.js`
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    let copySignUp = { ...signUpInfo };
    copySignUp[name] = value;
    setSignUpInfo(copySignUp);
  };

  // console.log("User Info---------", signUpInfo);

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;
    if (!name || !email || !password) {
      return handleError("Name email password are required");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login")
        }, 2000);
      }
      else{
        const details = error?.details[0].message
        handleError(details)
        handleError(result.message)
      }
      console.log(result);
      
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
        className="w-full max-w-lg bg-[#1f2937] p-8 rounded-lg shadow-lg"      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="fullName">
            Full Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            value={signUpInfo.name}
          />
        </div>

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
            value={signUpInfo.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Enter your password"
            value={signUpInfo.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>
          <Link to={'/login'}>
          <button
            type="button"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          
          >
            Login
          </button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
