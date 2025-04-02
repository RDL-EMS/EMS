import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Sidebar State

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // ✅ Clean State Update
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar (Only One Instance) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          transition: "margin 0.3s ease-in-out",
          marginLeft: isSidebarOpen ? "250px" : "60px",
          width: "100%",
        }}
      >
        {/* Header with Toggle Sidebar Button */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
