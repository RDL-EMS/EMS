import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // ✅ Sidebar State

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, ml: isOpen ? "250px" : "60px" }}>
        {/* Header */}
        <Header toggleSidebar={() => setIsOpen(!isOpen)} /> 

        {/* Page Content */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
