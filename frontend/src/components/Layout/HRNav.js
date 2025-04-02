import React, { useState } from "react";
import { AppBar, Toolbar, Menu, MenuItem } from "@mui/material";

const HRNav = ({ handleSidebarToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    setAnchorEl(null);
    console.log("Logging out...");
    // Implement logout functionality here
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
      <Toolbar>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
          <MenuItem onClick={handleProfileMenuClose}>Edit Profile</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Change Password</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HRNav;
