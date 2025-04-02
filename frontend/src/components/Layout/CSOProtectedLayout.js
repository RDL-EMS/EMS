import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const CSOProtectedLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // ✅ Sidebar state

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> {/* ✅ Sidebar should only be here */}
      <Box sx={{ flexGrow: 1, ml: isOpen ? "250px" : "60px", transition: "margin-left 0.3s" }}>
        <Header />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default CSOProtectedLayout;
