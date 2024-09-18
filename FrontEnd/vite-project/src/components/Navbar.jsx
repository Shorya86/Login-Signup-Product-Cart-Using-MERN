import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogin, MdOutlineAppRegistration } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { handleError, handleSuccess } from "./utils";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillHome,
  AiOutlineInfoCircle,
  AiOutlineContacts,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [User, setUser] = useState("");
  const [role, setrole] = useState("");

  const storedUser = localStorage.getItem("UserName");
  const userRole = localStorage.getItem("Role");
  useEffect(() => {
    setUser(storedUser);
    setrole(userRole);
  }, [storedUser, userRole]);
  // console.log(User);

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

  const cartItems = useSelector((state) => state.cart.cart);

  return (
    <nav className="bg-gradient-to-r bg-[#1f2937] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <a href="#" className="flex items-center space-x-2">
              <IoMdPhonePortrait className="text-3xl" />
              <span>PhoneMarket</span>
            </a>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-6 text-white">
            <Link
              to="/about"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <AiOutlineInfoCircle className="text-xl" />
              <span>About</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <AiFillHome className="text-xl" />
              <span>Products</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <AiOutlineContacts className="text-xl" />
              <span>Contact</span>
            </Link>
          </div>
          <div className="flex gap-2">
            {role === "admin" ? (
              <>
                <div className="">
                  <Link to="admin">
                    <button className="bg-[#1f2937] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
                      All Users
                    </button>
                  </Link>

                  <Link to="/products">
                    <button className="bg-[#1f2937] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
                      Products
                    </button>
                  </Link>
                </div>
              </>
            ) : role === "user" ? (
              <Link to="/cart">
                <button className="relative bg-blue-500 flex items-center text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg">
                  <FaCartShopping className="text-2xl" />
                  {/* Cart Item Count */}
                  <div className="absolute -top-2 -right-2 bg-red-600 text-xs text-white font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartItems.length}
                  </div>
                </button>
              </Link>
            ) : null}

            {/* Auth Buttons */}
            {User ? (
              <div className="flex justify-center items-center gap-5">
                <Link to={"/home"}>
                  <p>
                    <b className="text-white">{User}</b>
                  </p>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-4">
                <button className="flex items-center space-x-1 text-white hover:text-gray-200">
                  <MdOutlineLogin className="text-xl" />
                  <Link to={"/signup"}>
                    <span>Sign In</span>
                  </Link>
                </button>
                <Link to={"/login"}>
                  <button className="  flex items-center space-x-1 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-[#c4afb2] ">
                    <MdOutlineAppRegistration className="text-xl" />
                    <span>Login</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="outline-none mobile-menu-button text-white"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "" : "hidden"} md:hidden mobile-menu`}>
        <ul className="bg-blue-500 text-white">
          <li>
            <a
              href="#"
              className=" text-sm px-2 py-4 hover:bg-blue-600 flex items-center space-x-1"
            >
              <AiOutlineInfoCircle className="text-lg" />
              <span>About</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className=" text-sm px-2 py-4 hover:bg-blue-600 flex items-center space-x-1"
            >
              <AiFillHome className="text-lg" />
              <span>Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className=" text-sm px-2 py-4 hover:bg-blue-600 flex items-center space-x-1"
            >
              <AiOutlineContacts className="text-lg" />
              <span>Contact</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className=" text-sm px-2 py-4 hover:bg-blue-600 flex items-center space-x-1"
            >
              <MdOutlineLogin className="text-lg" />
              <span>Sign In</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className=" text-sm px-2 py-4 hover:bg-blue-600 flex items-center space-x-1"
            >
              <MdOutlineAppRegistration className="text-lg" />

              <span>Login</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
