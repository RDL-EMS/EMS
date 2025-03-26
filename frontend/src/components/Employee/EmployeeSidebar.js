import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  Box, List, ListItemButton, ListItemIcon, ListItemText, Button 
} from "@mui/material";
import { 
  Home as HomeIcon, Person as PersonIcon, Event as EventIcon, AccessTime as AccessTimeIcon, ExitToApp as ExitToAppIcon 
} from "@mui/icons-material";

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employeeId = localStorage.getItem("employeeId");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", { employeeId });
      localStorage.removeItem("token");
      localStorage.removeItem("employeeId");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
    { text: "My Profile", icon: <PersonIcon />, path: "/change-password" },
    { text: "Leave History", icon: <EventIcon />, path: "/leave-history" },
    { text: "Time Book", icon: <AccessTimeIcon />, path: "/attendance-history" },
  ];

  return (
    <Box sx={{ width: 250, bgcolor: "#1976d2", color: "white", height: "100vh", p: 2 }}>
      <Box sx={{ fontSize: 22, fontWeight: "bold", textAlign: "center", mb: 2 }}></Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton 
            key={item.text} 
            selected={location.pathname === item.path} 
            onClick={() => navigate(item.path)}
            sx={{
              bgcolor: location.pathname === item.path ? "#0d47a1" : "inherit",
              color: location.pathname === item.path ? "#ffffff" : "white",
              borderRadius: 1,
              fontWeight: location.pathname === item.path ? "bold" : "normal",
              transition: "background-color 0.3s ease",
              "&:hover": { bgcolor: "#1e88e5" },
              "&.Mui-selected": {
                bgcolor: "#0d47a1 !important",
                color: "#ffffff",
                fontWeight: "bold"
              }
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? "#ffffff" : "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Button 
        variant="contained" 
        color="secondary" 
        fullWidth 
        startIcon={<ExitToAppIcon />} 
        onClick={handleLogout} 
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default EmployeeSidebar;
