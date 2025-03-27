import React, { useState, useEffect } from "react";
import { 
  Box, Typography, TextField, Button, Paper, Table, TableHead, TableRow, 
  TableCell, TableBody 
} from "@mui/material";
import Header from "../components/Layout/Header";
import axios from "axios"; // ✅ Import axios for API requests

const TimeBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  // ✅ Fetch Attendance Data from API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/attendance");
        setAttendanceData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setAttendanceData([]); // ✅ Prevents crash if API fails
      }
    };

    fetchAttendanceData();
  }, []);

  // ✅ Filter Data by Employee ID
  const filteredData = attendanceData.filter((entry) =>
    entry.empId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: "100vh", bgcolor: "#e8eaf6" }}> {/* ✅ Background color added */}
      <Header />
      <Box sx={{ p: 3, maxWidth: "80%", margin: "auto" }}> {/* ✅ Centered Content */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          Home / <b>Time-book</b>
        </Typography>

        {/* ✅ Search Bar Positioned at the Top */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6">Search Employee Attendance History</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Employee ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </Paper>

        {/* ✅ Attendance Table */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Employee Attendance History
        </Typography>
        <Table sx={{ bgcolor: "white", borderRadius: 2 }}>
          <TableHead sx={{ bgcolor: "#3f51b5", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}><b>SN</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>EmpId</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Full Name</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Date</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Punch In</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Punch Out</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((entry, index) => (
                <TableRow key={entry.id} sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>{entry.empId}</TableCell>
                  <TableCell>{entry.fullName}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.punchIn}</TableCell>
                  <TableCell sx={{ color: entry.punchOut === "Active" ? "green" : "black" }}>
                    {entry.punchOut}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default TimeBook;
