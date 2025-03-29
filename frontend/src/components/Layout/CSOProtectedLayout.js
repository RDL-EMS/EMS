import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const CSOProtectedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Box sx={{ flexGrow: 1, ml: isSidebarOpen ? "250px" : "60px", transition: "margin 0.3s ease-in-out" }}>
        <Header />
        <Box sx={{ mt: 8, p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default CSOProtectedLayout;
