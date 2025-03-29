import React from "react";
import { Navigate } from "react-router-dom";

const HRProtectedLayout = ({ children }) => {
  const isAuthenticated = true; // Replace with actual authentication logic

  return isAuthenticated ? children : <Navigate to="/employee-login" />;
};

export default HRProtectedLayout;
