import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("Role"); // Fetch role from localStorage

  if (!role) {
    // If no role is found, redirect to login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // If role is not in the allowedRoles, redirect to home
    return <Navigate to="/home" />;
  }

  // If the role is valid, render the children component (the protected route)
  return children;
};

export default ProtectedRouter;
