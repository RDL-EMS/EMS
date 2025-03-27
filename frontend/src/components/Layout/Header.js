import React from "react";
import { AppBar, Toolbar, IconButton, Box, Avatar } from "@mui/material";
import { Notifications } from "@mui/icons-material";

const Header = ({ isOpen }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "black", // Change header color to black
        color: "white",
        width: isOpen ? "calc(100% - 250px)" : "calc(100% - 60px)", // Dynamic width
        ml: isOpen ? "250px" : "60px", // Align with Sidebar
        transition: "width 0.3s ease-in-out, margin-left 0.3s ease-in-out",
        boxShadow: "none", // Remove shadow for clean UI
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}>
        {/* Notifications */}
        <IconButton sx={{ color: "white" }}>
          <Notifications />
        </IconButton>

        {/* Profile Avatar */}
        <Avatar alt="Profile" src="/path-to-profile-image.jpg" sx={{ ml: 2 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
