import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  Business,
  Event,
  Person,
  MonetizationOn,
  CheckCircle,
  Home,
  History,
  BarChart,
  Menu,
  Close,
} from "@mui/icons-material";

const drawerWidth = 250;

// Sidebar menu items
const SidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/hr-dashboard" },
  { text: "Department", icon: <Business />, path: "/hr/department" },
  { text: "Leave", icon: <Event />, path: "/hr/leave" },
  { text: "Leave Request", icon: <CheckCircle />, path: "/hr/leave-request" },
  { text: "Employee", icon: <Person />, path: "/hr/employee" },
  { text: "Payroll", icon: <MonetizationOn />, path: "/hr/payroll" },
  { text: "Attendance List", icon: <CheckCircle />, path: "/hr/attendance-list" },
  { text: "Attendance History", icon: <History />, path: "/hr/attendance-history" },
  { text: "Attendance Report", icon: <BarChart />, path: "/hr/attendance-report" },
  { text: "Home Page", icon: <Home />, path: "/" },
];

const HRSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current path for active highlighting

  // Handle navigation & close sidebar on mobile
  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768 && setSidebarOpen) setSidebarOpen(false); // ✅ Auto-close on small screens
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        transition: "width 0.3s ease-in-out",
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? drawerWidth : 0,
          background: "#1E1E2F",
          color: "white",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
        },
      }}
      open={sidebarOpen}
    >
      {/* Sidebar Header */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          HR Panel
        </Typography>
        {setSidebarOpen && (
          <IconButton onClick={() => setSidebarOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        )}
      </Toolbar>
      <Divider sx={{ backgroundColor: "gray" }} />

      {/* Sidebar Menu Items */}
      <List>
        {SidebarItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                color: "white",
                background: location.pathname === item.path ? "#44475A" : "inherit", // ✅ Highlight active item
                "&:hover": { background: "#56597D" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default HRSidebar;
