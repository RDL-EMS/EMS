import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon, Notifications, AccountCircle } from "@mui/icons-material";

const HRNav = ({ handleSidebarToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#33354A" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleSidebarToggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <IconButton color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
          <MenuItem onClick={handleProfileMenuClose}>Edit Profile</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Change Password</MenuItem>
          <MenuItem onClick={() => console.log("Logging out...")}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HRNav;
