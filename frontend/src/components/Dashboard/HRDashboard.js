import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { People, AttachMoney } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";

// ✅ Import Layout Components
import HRNav from "../Layout/HRNav";
import HRSidebar from "../Layout/HRSidebar";

// ✅ Import Attendance & HR Components
import AttendanceList from "../Attendance/AttendanceList";
import AttendanceHistory from "../Attendance/AttendanceHistory";
import AttendanceReport from "../Attendance/AttendanceReport";
import LeaveRequestForm from "../LeaveManagement/LeaveRequestForm";
import LeaveStatus from "../LeaveManagement/LeaveStatus";
import AddEmployeeForm from "../HRPanel/AddEmployeeForm";

// ✅ Import Department & Leave Components (Replace with actual components if available)
const Department = () => <Typography variant="h5">📂 Department Section (Component Here)</Typography>;
const Leave = () => <Typography variant="h5">📝 Leave Section (Component Here)</Typography>;

const HRDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [attendanceData, setAttendanceData] = useState({
    totalEmployees: 0,
    monthly: [],
    today: [],
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Attendance Summary
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/attendance-summary");
        console.log("✅ Attendance Data:", response.data);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("🚨 Error fetching attendance:", error.response?.data?.message || error.message);
        alert("Error fetching attendance. Check backend logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  // ✅ Section Rendering Logic
  const renderSection = () => {
    switch (selectedSection) {
      case "addEmployee":
        return <AddEmployeeForm />;
      case "attendanceList":
        return <AttendanceList />;
      case "attendanceHistory":
        return <AttendanceHistory />;
      case "attendanceReport":
        return <AttendanceReport />;
      case "leaveRequest":
        return <LeaveRequestForm />;
      case "leaveStatus":
        return <LeaveStatus />;
      case "department":
        return <Department />; // ✅ Department Component
      case "leave":
        return <Leave />; // ✅ Leave Component
      default:
        return (
          <>
            {/* Dashboard Cards */}
            <Grid container spacing={3}>
              {[
                { title: "Total Employees", value: attendanceData.totalEmployees || 0, icon: <People /> },
                { title: "Payroll Processed", value: "95%", icon: <AttachMoney /> },
              ].map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ textAlign: "center", boxShadow: 3, p: 2 }}>
                    <CardContent>
                      {card.icon}
                      <Typography variant="h6">{card.title}</Typography>
                      <Typography variant="h5">{card.value}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {/* Bar Chart - Monthly Attendance */}
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, p: 2 }}>
                  <Typography variant="h6">Employee Attendance</Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={attendanceData.monthly || []}>
                      <XAxis dataKey="_id" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="present" fill="#1976D2" />
                      <Bar dataKey="absent" fill="#D32F2F" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>

              {/* Pie Chart - Today's Attendance */}
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, p: 2 }}>
                  <Typography variant="h6">Today's Attendance</Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={attendanceData.today || []} dataKey="value" outerRadius={80} isAnimationActive={false}>
                        {(attendanceData.today || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>
            </Grid>
          </>
        );
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F4F7FC", minHeight: "100vh" }}>
      <CssBaseline />

      {/* ✅ Sidebar (Always Visible) */}
      <HRSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />

      {/* ✅ Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <HRNav handleSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Toolbar />

        {/* ✅ Title */}
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#33354A" }}>
          HR Dashboard
        </Typography>

        {/* ✅ Loading Indicator */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ mt: 3 }}>{renderSection()}</Box>
        )}
      </Box>
    </Box>
  );
};

export default HRDashboard;
