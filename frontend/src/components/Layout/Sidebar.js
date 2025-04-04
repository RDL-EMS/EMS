import React from "react";
import { Box, Typography, Divider, IconButton, Tooltip, Button } from "@mui/material";
import { Menu, Dashboard, Book, AccessTime, ChevronLeft, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  // ✅ Ensure toggle works properly
  const toggleSidebar = () => {
    if (typeof setIsOpen === "function") {
      setIsOpen((prev) => !prev);
    } else {
      console.error("setIsOpen is not a function");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: isOpen ? 250 : 60,
        bgcolor: "black",
        color: "white",
        height: "100vh",
        position: "fixed",
        transition: "width 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        zIndex: 1300,
        top: 0,
        left: 0,
      }}
    >
      {/* ✅ Sidebar Header & Toggle Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          p: 2,
          backgroundColor: "#222",
        }}
      >
        {isOpen && (
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            CSO Dashboard
          </Typography>
        )}
        <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
          {isOpen ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: "gray" }} />

      {/* ✅ Sidebar Menu Items */}
      <Box sx={{ flexGrow: 1, p: 1 }}>
        <SidebarItem icon={<Dashboard />} label="Dashboard" to="/cso-dashboard" isOpen={isOpen} />
        <SidebarItem icon={<Book />} label="Time Book" to="/time-book" isOpen={isOpen} />
        <SidebarItem icon={<AccessTime />} label="Attendance" to="/cso/attendance" isOpen={isOpen} />
      </Box>

      <Divider sx={{ bgcolor: "gray" }} />

      {/* ✅ Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            display: "flex",
            justifyContent: isOpen ? "flex-start" : "center",
          }}
        >
          {isOpen ? "LOG OUT" : ""}
        </Button>
      </Box>
    </Box>
  );
};

// ✅ Sidebar Item Component
const SidebarItem = ({ icon, label, to, isOpen }) => (
  <Tooltip title={!isOpen ? label : ""} placement="right">
    <Box
      component={Link}
      to={to}
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        p: 1.5,
        borderRadius: 1,
        textDecoration: "none",
        color: "white",
        transition: "background 0.3s",
        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
      }}
    >
      {icon}
      {isOpen && <Typography sx={{ ml: 2 }}>{label}</Typography>}
    </Box>
  </Tooltip>
);

export default Sidebar;
