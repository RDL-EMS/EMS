import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleIcon from "@mui/icons-material/People";
import Sidebar from "../Layout/Sidebar";  // ✅ Fix the path
import Header from "../Layout/Header";    // ✅ Fix the path
   // ✅ Import Header

const CSODashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Sidebar State

  // ✅ Load attendance records from localStorage
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendanceData(storedRecords);
  }, []);

  // ✅ Calculate attendance metrics
  const totalAttendance = attendanceData.length;
  const punctualCount = attendanceData.filter((record) => record.signInTime && record.signOutTime).length;
  const lateCount = totalAttendance - punctualCount;

  // ✅ Pie chart data
  const pieData = [
    { name: "Punctual", value: punctualCount, color: "#5e5e5e" },
    { name: "Late", value: lateCount, color: "#d2d2d2" },
  ];

  // ✅ Bar chart data (weekly trend simulation)
  const barData = [
    { day: "Mon", punctual: 30, late: 10 },
    { day: "Tue", punctual: 35, late: 8 },
    { day: "Wed", punctual: 40, late: 5 },
    { day: "Thu", punctual: 32, late: 7 },
    { day: "Fri", punctual: 38, late: 6 },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      {/* ✅ Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* ✅ Main Content Area */}
      <Box sx={{ flexGrow: 1, ml: isSidebarOpen ? "250px" : "60px", transition: "margin 0.3s ease-in-out" }}>
        <Header />
        <Box sx={{ mt: 8, p: 3 }}>
          {/* Summary Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6">Punctual Today</Typography>
                  <Typography variant="h4">{punctualCount}</Typography>
                  <CheckCircleIcon fontSize="large" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6">Late Today</Typography>
                  <Typography variant="h4">{lateCount}</Typography>
                  <CancelIcon fontSize="large" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6">Total Attendance</Typography>
                  <Typography variant="h4">{totalAttendance}</Typography>
                  <PeopleIcon fontSize="large" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Attendance Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Attendance Trends</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="punctual" fill={pieData[0].color} />
                    <Bar dataKey="late" fill={pieData[1].color} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CSODashboard;
