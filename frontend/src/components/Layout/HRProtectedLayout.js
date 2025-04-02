import React from "react";
import { Navigate } from "react-router-dom";
import HRSidebar from "./HRSidebar"; // Ensure the correct import path

const HRProtectedLayout = ({ children }) => {
  const isAuthenticated = true; // Replace with actual authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/employee-login" />;
  }

  return (
    <div style={{ display: "flex" }}>
      <HRSidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};


export default HRProtectedLayout;
