import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState("");
  const [email, setemail] = useState("");

  // console.log(products.map((x=>console.log(x,'jjj'))));

  useEffect(() => {
    setloggedInUser(localStorage.getItem("UserName"));
    setemail(localStorage.getItem("Email"));
  }, []);
  // console.log(loggedInUser);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("UserName");
    localStorage.removeItem("Role");
    localStorage.removeItem("Email");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const userInfo = useSelector((state) => state?.user);
  // console.log(userInfo);


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
        <div
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: "rgb(68 80 118 / 71%)" }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Welcome, {loggedInUser}
          </h1>

          <div className="mb-6">
            <div className="mb-4 p-4 border-b-2 border-gray-200 last:border-0">
              <h2>Name</h2>
              <p className="text-xl font-semibold mb-2">{loggedInUser}</p>

              <h2 className="mt-4">Email</h2>
              <p className="text-xl font-semibold ">{email}</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Logout
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
