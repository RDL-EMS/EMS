import React, { useRef,useState } from "react";
import { Box, CssBaseline, Toolbar, Grid, Card, CardContent, Typography, Button, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper } from "@mui/material";
import { People, HourglassEmpty, AttachMoney } from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import HRNav from "../Layout/HRNav.js";
import HRSidebar from "../Layout/HRsidebar.js";

const data = [
  { name: "Jan", Present: 100, Absent: 20 },
  { name: "Feb", Present: 110, Absent: 22 },
  { name: "Mar", Present: 95, Absent: 15 },
  { name: "Apr", Present: 130, Absent: 20 },
  { name: "May", Present: 140, Absent: 30 },
];

const pieData = [
  { name: "Present", value: 140, color: "#1976D2" },
  { name: "Absent", value: 30, color: "#D32F2F" },
];
const leaveData = [
  { id: 1, empId: "E001", name: "John Doe", fromDate: "2024-03-01", toDate: "2024-03-05" },
  { id: 2, empId: "E002", name: "Jane Smith", fromDate: "2024-03-10", toDate: "2024-03-12" },
];

const HRDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F4F7FC", minHeight: "100vh" }}>
      <CssBaseline />
      <HRNav handleSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <HRSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#33354A" }}>
          Welcome to the Admin Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[{ title: "Total Employees", value: 150, icon: <People /> }, { title: "Pending Leaves", value: 12, icon: <HourglassEmpty /> }, { title: "Payroll Processed", value: "95%", icon: <AttachMoney /> }].map((card, index) => (
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

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <Typography variant="h6">Employee Attendance</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Present" fill="#1976D2" />
                  <Bar dataKey="Absent" fill="#D32F2F" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <Typography variant="h6">Today's Attendance</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        <Card sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Leave Requests</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Emp ID</TableCell>
                  <TableCell>Emp Name</TableCell>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveData.map((leave, index) => (
                  <TableRow key={leave.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{leave.empId}</TableCell>
                    <TableCell>{leave.name}</TableCell>
                    <TableCell>{leave.fromDate}</TableCell>
                    <TableCell>{leave.toDate}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" size="small" sx={{ mr: 1 }}>Approve</Button>
                      <Button variant="contained" color="error" size="small">Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Box>
  );
};

export default HRDashboard;
