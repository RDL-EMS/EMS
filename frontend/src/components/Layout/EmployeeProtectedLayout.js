import React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import EmployeeSidebar from "../Employee/EmployeeSidebar"; // ✅ Import Sidebar

// ✅ Check authentication
const isAuthenticated = () => !!localStorage.getItem("token");

const EmployeeProtectedLayout = ({ children }) => {
  return isAuthenticated() ? (
    <Box sx={{ display: "flex" }}>
      <EmployeeSidebar />
      <Box sx={{ flex: 1, padding: "20px" }}>{children}</Box>
    </Box>
  ) : (
    <Navigate to="/" replace />
  );
};

export default EmployeeProtectedLayout;
