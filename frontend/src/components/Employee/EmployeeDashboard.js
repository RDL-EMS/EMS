import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Card, CardContent, Grid, CircularProgress } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const employeeData = [
  { name: "Wasim Jaffer", attendance: 96.15 },
  { name: "Carlos Diaz", attendance: 94.56 },
  { name: "Lars Peterson", attendance: 93.47 },
  { name: "Ava Tullip", attendance: 91.67 },
  { name: "Regina Murphy", attendance: 90.12 }
];

const barData = [...Array(30).keys()].map(day => ({ day: day + 1, attendance: Math.floor(Math.random() * 25) }));

const cardStyle = { 
  backgroundColor: "#fff", 
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", 
  minHeight: "200px", // Set fixed height
  display: "flex", 
  flexDirection: "column",
  alignItems: "center", 
  justifyContent: "center", 
  textAlign: "center",
};

const EmployeeDashboard = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" style={{ backgroundColor: "#007bff" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
            Employee Attendance Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          {/* Summary Cards */}
          {["Total Employees: 30", "Absences: 175", "Unapproved Leaves: 12"].map((text, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>{text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Top Employees */}
          <Grid item xs={12} md={6}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h6">Top 5 Employees by Attendance</Typography>
                {employeeData.map((emp, index) => (
                  <Typography key={index}>{emp.name}: {emp.attendance}%</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Employee Attendance Trend */}
          <Grid item xs={12} md={6}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h6">Employee Attendance Trend</Typography>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={barData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Employee Shift Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h6">Employee Shift</Typography>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={[{ name: "Office", value: 58 }, { name: "Home", value: 42 }]} dataKey="value" outerRadius={70}>
                      <Cell fill="#007bff" />
                      <Cell fill="#ff5733" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Attendance Percentage Gauge */}
          <Grid item xs={12} md={6}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h6">Overall Attendance Percentage</Typography>
                <CircularProgress variant="determinate" value={85} size={80} thickness={5} color="success" />
                <Typography variant="h6" style={{ marginTop: "10px" }}>85%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EmployeeDashboard;