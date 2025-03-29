import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const AttendanceHistory = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Past Attendance Data
  const fetchAttendanceHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendance/history");
      if (response.data.success) {
        setAttendanceHistory(response.data.attendance);
      } else {
        setAttendanceHistory([]);
      }
    } catch (error) {
      console.error("Error fetching attendance history:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Data on Component Mount
  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Attendance History
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        View past attendance records.
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["SN", "Emp ID", "Name", "Date", "Time In", "Time Out", "Status"].map((heading) => (
                <TableCell key={heading} sx={{ color: "white", fontWeight: "bold" }}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : attendanceHistory.length > 0 ? (
              attendanceHistory.map((record, index) => (
                <TableRow key={record._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{record.empId}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.timeIn}</TableCell>
                  <TableCell>{record.timeOut || "N/A"}</TableCell>
                  <TableCell>{record.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No attendance records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendanceHistory;
