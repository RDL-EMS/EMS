import React, { useState, useEffect } from "react";
import { 
  Box, Typography, TextField, Button, Paper, Table, TableHead, TableRow, 
  TableCell, TableBody, TableContainer, CircularProgress, Alert 
} from "@mui/material";
import axios from "axios";

const TimeBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllAttendance(); // Load all records initially
  }, []);

  // ✅ Fetch All Attendance Records
  const fetchAllAttendance = async () => {
    setLoading(true);
    setError(""); // Reset error before fetching

    try {
      const response = await axios.get("http://localhost:5000/api/attendance/all");
      setAttendanceData(response.data.attendance || []);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("Failed to load attendance records.");
    }
    
    setLoading(false);
  };

  // ✅ Fetch Attendance for a Specific Employee
  const fetchEmployeeAttendance = async () => {
    if (!searchTerm.trim()) {
      fetchAllAttendance(); // If no search term, load all data
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:5000/api/attendance/${searchTerm}`);
      setAttendanceData(response.data.attendance || []);
    } catch (error) {
      console.error("Error fetching employee attendance:", error);
      setError("No records found for this employee ID.");
      setAttendanceData([]);
    }
    
    setLoading(false);
  };

  return (
    <Box sx={{ bgcolor: "#e8eaf6", minHeight: "100vh", p: 10 }}> 
      <Typography variant="body2" sx={{ mb: 5 }}>
        Home / <b>Time-book</b>
      </Typography>

      {/* Search Bar */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6">Search Employee Attendance</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Employee ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={fetchEmployeeAttendance}>
            Search
          </Button>
        </Box>
      </Paper>

      {/* Error Message */}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Attendance Table */}
      <Typography variant="h6" sx={{ mb: 2 }}>Employee Attendance History</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#3f51b5" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}><b>#</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>EmpId</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Date</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Punch In</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Punch Out</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : attendanceData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No records found</TableCell>
              </TableRow>
            ) : (
              attendanceData.map((entry, index) => (
                <TableRow key={entry._id} sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>{entry.empId || "N/A"}</TableCell>
                  <TableCell>{entry.date || "N/A"}</TableCell>
                  <TableCell>{entry.punchIn || "N/A"}</TableCell>
                  <TableCell sx={{ color: entry.punchOut === "Active" ? "green" : "black" }}>
                    {entry.punchOut || "Not Punched Out"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeBook;
