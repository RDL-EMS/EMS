import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleIcon from "@mui/icons-material/People";
import Header from "../Layout/Header";

const CSODashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Attendance Data from Backend
  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/attendance/today");
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error("🚨 Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData(); // ✅ Load data on component mount

    // ✅ Poll for updates every 30 seconds (real-time update simulation)
    const interval = setInterval(fetchAttendanceData, 30000);
    return () => clearInterval(interval);
  }, []);

  const totalAttendance = attendanceData.length;
  const punctualCount = attendanceData.filter((record) => record.signInTime && record.signOutTime).length;
  const lateCount = totalAttendance - punctualCount;

  // ✅ Pie chart data
  const pieData = [
    { name: "Punctual", value: punctualCount, color: "#5e5e5e" },
    { name: "Late", value: lateCount, color: "#d2d2d2" },
  ];

  // ✅ Bar chart data (real-time simulation)
  const barData = attendanceData.map((record, index) => ({
    day: `Emp ${index + 1}`,
    punctual: record.signInTime && record.signOutTime ? 1 : 0,
    late: record.signOutTime ? 0 : 1,
  }));

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      <Header />
      <Box sx={{ mt: 8, p: 3 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default CSODashboard;
