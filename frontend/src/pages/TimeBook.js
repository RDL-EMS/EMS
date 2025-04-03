import React, { useState, useEffect } from "react";
import { 
  Box, Typography, TextField, Button, Paper, Table, TableHead, TableRow, 
  TableCell, TableBody, TableContainer, CircularProgress, Alert 
} from "@mui/material";

const TimeBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load attendance from localStorage (removing dummy data)
  useEffect(() => {
    let storedRecords = JSON.parse(localStorage.getItem("attendance")) || [];
    
    // ✅ Remove dummy entries (where empId is missing or "N/A")
    storedRecords = storedRecords.filter(entry => entry.empId && entry.empId !== "N/A");

    setAttendanceData(storedRecords);
    setFilteredData(storedRecords); 
  }, []);

  // ✅ Handle search function
  const handleSearch = () => {
    setLoading(true);
    setError("");

    if (!searchTerm.trim()) {
      setFilteredData(attendanceData); // Show all records if search is empty
      setLoading(false);
      return;
    }

    const results = attendanceData.filter((entry) =>
      entry.empId && entry.empId.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length === 0) {
      setError("No records found for this Employee ID.");
    }

    setFilteredData(results);
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
          <Button variant="contained" color="primary" onClick={handleSearch}>
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
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No records found</TableCell>
              </TableRow>
            ) : (
              filteredData.map((entry, index) => (
                <TableRow key={index} sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>{entry.empId || "N/A"}</TableCell>
                  <TableCell>{entry.date || "N/A"}</TableCell>
                  <TableCell>{entry.punchIn || "N/A"}</TableCell>
                  <TableCell sx={{ color: entry.punchOut ? "black" : "red" }}>
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
