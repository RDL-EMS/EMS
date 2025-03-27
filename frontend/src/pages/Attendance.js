import React, { useState, useEffect } from "react";
import { 
  Box, TextField, Button, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Grid 
} from "@mui/material";

const Attendance = ({ onAttendanceUpdate }) => {
  const [employeeID, setEmployeeID] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // Load previous records from localStorage
    const storedRecords = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendanceRecords(storedRecords);
  }, []);

  // ✅ Function to get formatted time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // ✅ Sign In Function
  const handleSignIn = () => {
    if (!employeeID.trim()) return;

    const newRecord = {
      id: Date.now(),
      employeeID,
      signInTime: getCurrentTime(),
      signOutTime: "",
    };

    const updatedRecords = [...attendanceRecords, newRecord];
    setAttendanceRecords(updatedRecords);
    localStorage.setItem("attendance", JSON.stringify(updatedRecords));

    // ✅ Notify the dashboard about attendance update
    if (onAttendanceUpdate) {
      onAttendanceUpdate(updatedRecords);
    }

    setEmployeeID("");
  };

  // ✅ Sign Out Function
  const handleSignOut = () => {
    if (!employeeID.trim()) return;

    const updatedRecords = attendanceRecords.map((record) =>
      record.employeeID === employeeID && !record.signOutTime
        ? { ...record, signOutTime: getCurrentTime() }
        : record
    );

    setAttendanceRecords(updatedRecords);
    localStorage.setItem("attendance", JSON.stringify(updatedRecords));

    // ✅ Notify the dashboard about attendance update
    if (onAttendanceUpdate) {
      onAttendanceUpdate(updatedRecords);
    }

    setEmployeeID("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Employee Attendance
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Employee Time-Book</Typography>
            <TextField
              label="Enter Employee ID"
              variant="outlined"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="success" fullWidth onClick={handleSignIn}>
              SIGN IN
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Employee Time-Book</Typography>
            <TextField
              label="Enter Employee ID"
              variant="outlined"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="error" fullWidth onClick={handleSignOut}>
              SIGN OUT
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Attendance History Table */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Today Attendance History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>SN</b></TableCell>
              <TableCell><b>Employee ID</b></TableCell>
              <TableCell><b>Sign In Time</b></TableCell>
              <TableCell><b>Sign Out Time</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record, index) => (
                <TableRow key={record.id}> 
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{record.employeeID}</TableCell>
                  <TableCell>{record.signInTime}</TableCell>
                  <TableCell>{record.signOutTime || "Not Signed Out"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No records available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;
