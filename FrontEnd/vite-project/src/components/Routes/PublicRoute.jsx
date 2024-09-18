import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("jwtToken");  // Check if the user is logged in
  const role = localStorage.getItem("Role");

  if (isLoggedIn) {
    // Redirect based on the role
    return role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/home" />;
  }

  // If not logged in, render the public route (Login or SignUp)
  return children;
};

export default PublicRoute;
