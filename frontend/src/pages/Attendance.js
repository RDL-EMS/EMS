import React, { useState, useEffect } from "react";
import { 
  Box, TextField, Button, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Grid 
} from "@mui/material";

const Attendance = ({ onAttendanceUpdate }) => {
  const [signInID, setSignInID] = useState("");
  const [signOutID, setSignOutID] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendanceRecords(storedRecords);
  }, []);

  const getCurrentDate = () => new Date().toLocaleDateString();
  const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const handleSignIn = () => {
    if (!signInID.trim()) {
      alert("Enter Employee ID for Sign-In!");
      return;
    }

    const newRecord = {
      id: Date.now(),
      employeeID: signInID,
      date: getCurrentDate(),
      signInTime: getCurrentTime(),
      signOutTime: "",
    };

    const updatedRecords = [...attendanceRecords, newRecord];
    setAttendanceRecords(updatedRecords);
    localStorage.setItem("attendance", JSON.stringify(updatedRecords));

    if (onAttendanceUpdate) {
      onAttendanceUpdate(updatedRecords);
    }

    setSignInID("");
  };

  const handleSignOut = () => {
    if (!signOutID.trim()) {
      alert("Enter Employee ID for Sign-Out!");
      return;
    }

    let found = false;
    const updatedRecords = attendanceRecords.map((record) => {
      if (record.employeeID === signOutID && !record.signOutTime) {
        found = true;
        return { ...record, signOutTime: getCurrentTime() };
      }
      return record;
    });

    if (!found) {
      alert("No matching sign-in found for this Employee ID!");
      return;
    }

    setAttendanceRecords(updatedRecords);
    localStorage.setItem("attendance", JSON.stringify(updatedRecords));

    if (onAttendanceUpdate) {
      onAttendanceUpdate(updatedRecords);
    }

    setSignOutID("");
  };

  return (
    <Box sx={{ ml: 5, p: 10, transition: "all 0.3s ease-in-out" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Employee Attendance</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Employee Time-Book (Sign-In)</Typography>
            <TextField
              label="Enter Employee ID"
              variant="outlined"
              value={signInID}
              onChange={(e) => setSignInID(e.target.value)}
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
            <Typography variant="h6">Employee Time-Book (Sign-Out)</Typography>
            <TextField
              label="Enter Employee ID"
              variant="outlined"
              value={signOutID}
              onChange={(e) => setSignOutID(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="error" fullWidth onClick={handleSignOut}>
              SIGN OUT
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Today Attendance History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#3f51b5", color: "white" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SN</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Employee ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sign In Time</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sign Out Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record, index) => (
                <TableRow key={record.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{record.employeeID}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.signInTime}</TableCell>
                  <TableCell>{record.signOutTime || "Not Signed Out"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
