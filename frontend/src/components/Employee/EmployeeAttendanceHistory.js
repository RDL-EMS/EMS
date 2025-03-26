import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const EmployeeAttendanceHistory = () => { // Fixed component name
  const employeeId = localStorage.getItem("employeeId");
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/attendance-history", { params: { employeeId } })
      .then(response => {
        setAttendanceHistory(response.data);
      })
      .catch(() => {}); // Removed toast notification
  }, [employeeId]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "10px", color: "black" }}>
        My Attendance History
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#000000 !important" }}>SN</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#000000 !important" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#000000 !important" }}>Punch In</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#000000 !important" }}>Punch Out</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {attendanceHistory.length > 0 ? (
              attendanceHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "black" }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: "black" }}>{record.date}</TableCell>
                  <TableCell sx={{ color: "black" }}>{record.punchIn || "--"}</TableCell>
                  <TableCell sx={{ color: "black" }}>{record.punchOut || "--"}</TableCell>
                </TableRow>
              ))
            ) : (
              // No Record Found Message
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" sx={{ color: "yellow", fontWeight: "bold", padding: "20px" }}>
                    No Record found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeAttendanceHistory; // Fixed export
