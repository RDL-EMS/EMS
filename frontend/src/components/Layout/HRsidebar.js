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
  History,
  BarChart,
} from "@mui/icons-material";

const drawerWidth = 250;

const SidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, key: "dashboard" },
  { text: "Department", icon: <Business />, key: "department" },
  { text: "Leave", icon: <Event />, key: "leave" },
  { text: "Leave Request", icon: <CheckCircle />, key: "leaveRequest" },
  { text: "Employee", icon: <Person />, key: "employee" },
  { text: "Payroll", icon: <MonetizationOn />, key: "payroll" },
  { text: "Attendance List", icon: <CheckCircle />, key: "attendanceList" },
  { text: "Attendance History", icon: <History />, key: "attendanceHistory" },
  { text: "Attendance Report", icon: <BarChart />, key: "attendanceReport" },
  { text: "Home Page", icon: <Home />, key: "home" },
];

const HRSidebar = ({ sidebarOpen, setSidebarOpen, selectedSection, setSelectedSection }) => {
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
          primary="HR Panel"
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
              onClick={() => setSelectedSection(item.key)}
              sx={{
                color: "white",
                background: selectedSection === item.key ? "#33354A" : "inherit",
                "&:hover": { background: "#44475A" },
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
