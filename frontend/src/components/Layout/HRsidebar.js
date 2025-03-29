import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  Business,
  Event,
  Person,
  MonetizationOn,
  CheckCircle,
  Report,
  Home,
} from "@mui/icons-material";

const drawerWidth = 250;

const SidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, route: "/hr/dashboard" },
  { text: "Department", icon: <Business />, route: "/department" },
  { text: "Leave", icon: <Event />, route: "/leave" },
  { text: "Leave Request", icon: <CheckCircle />, route: "/leave-request" },
  { text: "Employee", icon: <Person />, route: "/AddEmployeeForm" }, 
  { text: "Payroll", icon: <MonetizationOn />, route: "/payroll" },
  { text: "Attendance List", icon: <CheckCircle />, route: "/hr/attendance-list" },
  { text: "Attendance History", icon: <Report />, route: "/hr/attendance-history" },
  { text: "Attendance Report", icon: <Report />, route: "/hr/attendance-report" },
  { text: "Home Page", icon: <Home />, route: "/" },
];

const HRSidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? drawerWidth : 0,
          background: "#1E1E2F",
          color: "white",
          transition: "width 0.3s ease",
        },
      }}
      open={sidebarOpen}
    >
      <Toolbar>
        <ListItemText
          primary="Admin Panel"
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        />
      </Toolbar>
      <Divider sx={{ backgroundColor: "gray" }} />
      <List>
        {SidebarItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.route)}
              sx={{
                color: "white",
                "&:hover": { background: "#33354A" },
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
