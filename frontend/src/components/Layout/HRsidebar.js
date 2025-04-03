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
  { text: "Dashboard", icon: <Dashboard />, path: "/HRDashboard", section: "dashboard" },
  { text: "Department", icon: <Business />, path: "/hr/department", section: "department" },
  { text: "Leave", icon: <Event />, path: "/hr/leave", section: "leave" },
  { text: "Leave Request", icon: <CheckCircle />, path: "/hr/leave-request", section: "leaveRequest" },
  { text: "Employee", icon: <Person />, path: "/hr/add-employee", section: "employee" },
  { text: "Payroll", icon: <MonetizationOn />, path: "/hr/payroll", section: "payroll" },
  { text: "Attendance List", icon: <CheckCircle />, path: "/hr/attendance-list", section: "attendanceList" },
  { text: "Attendance History", icon: <History />, path: "/hr/attendance-history", section: "attendanceHistory" },
  { text: "Attendance Report", icon: <BarChart />, path: "/hr/attendance-report", section: "attendanceReport" },
  { text: "Home Page", icon: <Home />, path: "/", section: "home" },
];

const HRSidebar = ({ sidebarOpen, setSidebarOpen, selectedSection, setSelectedSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle navigation & close sidebar on small screens
  const handleNavigation = (path, section) => {
    navigate(path);
    setSelectedSection(section);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <Drawer
      variant="persistent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        transition: "width 0.3s ease-in-out",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "#1E1E2F",
          color: "white",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
        },
      }}
    >
      {/* Sidebar Header */}
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "10px", alignItems: "center" }}>
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
              onClick={() => handleNavigation(item.path, item.section)}
              sx={{
                color: "white",
                background: location.pathname === item.path ? "#44475A" : "inherit",
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
