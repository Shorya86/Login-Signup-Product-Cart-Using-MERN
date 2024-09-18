import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Forms/Login";
import SignUp from "./components/Forms/SignUp";
import Home from "./components/User";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import ProtectedRouter from "./components/Routes/ProtectedRouter";
import Products from "./components/Products";
import Contact from "./components/Contact";
import About from "./components/About";
import PublicRoute from "./components/Routes/PublicRoute";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./components/Forms/Store/userStore";


function App() {
  const isLoggedIn = localStorage.getItem("jwtToken");
  const userType = localStorage.getItem("Role");

  return (
    <>
    <Provider store={store}>
      <Navbar />

      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes: Users can't access these if they are already logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Public Routes that don't require authentication */}
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRouter allowedRoles={["user", "admin"]}>
              <Home />
            </ProtectedRouter>
          }
        />

        {/* Cart Route for Users */}
        <Route
          path="/cart"
          element={
            <ProtectedRouter allowedRoles={["user"]}>
              <Cart />
            </ProtectedRouter>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRouter allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRouter>
          }
        />
      </Routes>
      </Provider>
    </>
  );
}

export default App;
