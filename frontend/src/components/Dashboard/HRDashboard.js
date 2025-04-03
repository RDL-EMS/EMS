import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { People, HourglassEmpty, AttachMoney } from "@mui/icons-material";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HRNav from "../Layout/HRNav";
import HRSidebar from "../Layout/HRSidebar";
import AttendanceList from "../Attendance/AttendanceList";
import AttendanceHistory from "../Attendance/AttendanceHistory";
import AttendanceReport from "../Attendance/AttendanceReport";
import LeaveRequestForm from "../LeaveManagement/LeaveRequestForm";
import LeaveStatus from "../LeaveManagement/LeaveStatus";
import AddEmployeeForm from "../HRPanel/AddEmployeeForm";

const HRDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [attendanceData, setAttendanceData] = useState({ totalEmployees: 0, monthly: [], today: [] });
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/HRLogin");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const [attendanceRes, leaveRes] = await Promise.all([
          axios.get("http://localhost:5000/api/attendance-summary", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:5000/api/leave-requests", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setAttendanceData(attendanceRes.data);
        setLeaveData(leaveRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const renderSection = () => {
    switch (selectedSection) {
      case "addEmployee": return <AddEmployeeForm />;
      case "attendanceList": return <AttendanceList />;
      case "attendanceHistory": return <AttendanceHistory />;
      case "attendanceReport": return <AttendanceReport />;
      case "leaveRequest": return <LeaveRequestForm />;
      case "leaveStatus": return <LeaveStatus />;
      default:
        return (
          <>
            <Grid container spacing={3}>
              {[{ title: "Total Employees", value: attendanceData.totalEmployees, icon: <People /> }, { title: "Pending Leaves", value: leaveData.length, icon: <HourglassEmpty /> }, { title: "Payroll Processed", value: "95%", icon: <AttachMoney /> }].map((card, index) => (
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
                    <BarChart data={attendanceData.monthly}>
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
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, p: 2 }}>
                  <Typography variant="h6">Today's Attendance</Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={attendanceData.today} dataKey="value" outerRadius={80}>
                        {attendanceData.today.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
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
          </>
        );
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F4F7FC", minHeight: "100vh" }}>
      <CssBaseline />
      <HRSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <HRNav handleSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Toolbar />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#33354A" }}>HR Dashboard</Typography>
        {loading ? <CircularProgress /> : <Box sx={{ mt: 3 }}>{renderSection()}</Box>}
      </Box>
    </Box>
  );
};

export default HRDashboard;