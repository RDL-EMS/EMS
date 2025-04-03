import React from "react";
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

const SidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, section: "dashboard" },
  { text: "Department", icon: <Business />, section: "department" },
  { text: "Leave", icon: <Event />, section: "leave" },
  { text: "Leave Request", icon: <CheckCircle />, section: "leaveRequest" },
  { text: "Employee", icon: <Person />, section: "employee" },
  { text: "Payroll", icon: <MonetizationOn />, section: "payroll" },
  { text: "Attendance List", icon: <CheckCircle />, section: "attendanceList" },
  { text: "Attendance History", icon: <History />, section: "attendanceHistory" },
  { text: "Attendance Report", icon: <BarChart />, section: "attendanceReport" },
  { text: "Home Page", icon: <Home />, section: "home" },
];

const HRSidebar = ({ sidebarOpen, setSidebarOpen, selectedSection, setSelectedSection }) => {
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
        <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ color: "white" }}>
          {sidebarOpen ? <Close /> : <Menu />}
        </IconButton>
      </Toolbar>
      <Divider sx={{ backgroundColor: "gray" }} />

      <List>
        {SidebarItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => setSelectedSection(item.section)} // ✅ Updates the selected section
              sx={{
                color: "white",
                background: selectedSection === item.section ? "#44475A" : "inherit",
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
