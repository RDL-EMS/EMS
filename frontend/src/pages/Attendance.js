import React, { useState, useEffect } from "react";
import { 
  Box, TextField, Button, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Grid 
} from "@mui/material";
import Layout from "../components/Layout/Layout";  

const Attendance = ({ onAttendanceUpdate }) => {
  const [signInID, setSignInID] = useState("");  // 🔹 Separate state for Sign-In
  const [signOutID, setSignOutID] = useState(""); // 🔹 Separate state for Sign-Out
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendanceRecords(storedRecords);
  }, []);

  // ✅ Get formatted date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString(); // MM/DD/YYYY
  };

  // ✅ Get formatted time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // ✅ Sign In Function
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

    console.log("Signed In: ", newRecord);
    setSignInID(""); // ✅ Reset Sign-In input after sign-in
  };

  // ✅ Sign Out Function
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

    console.log("Signed Out: ", signOutID);
    setSignOutID(""); // ✅ Reset Sign-Out input after sign-out
  };

  return (
    <Layout>
      <Box sx={{ p: 4, ml: -20, transition: "all 0.3s ease-in-out" }}>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Employee Attendance
        </Typography>

        <Grid container spacing={2}>
          {/* Sign-In Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Employee Time-Book (Sign-In)</Typography>
              <TextField
                label="Enter Employee ID"
                variant="outlined"
                value={signInID}  // ✅ Linked to Sign-In Only
                onChange={(e) => setSignInID(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="success" fullWidth onClick={handleSignIn}>
                SIGN IN
              </Button>
            </Paper>
          </Grid>

          {/* Sign-Out Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Employee Time-Book (Sign-Out)</Typography>
              <TextField
                label="Enter Employee ID"
                variant="outlined"
                value={signOutID} // ✅ Linked to Sign-Out Only
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

        {/* Attendance History Table */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Today Attendance History
        </Typography>
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
    </Layout>
  );
};

export default Attendance;
