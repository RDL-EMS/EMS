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
  Button,
} from "@mui/material";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Attendance Report Data
  const fetchAttendanceReport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendance/report");
      if (response.data.success) {
        setAttendanceData(response.data.attendance);
      } else {
        setAttendanceData([]);
      }
    } catch (error) {
      console.error("Error fetching attendance report:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Data on Component Mount
  useEffect(() => {
    fetchAttendanceReport();
  }, []);

  // ✅ Generate Report Function (Export as CSV)
  const generateCSV = () => {
    const header = ["SN, Emp ID, Name, Date, Time In, Time Out, Status"];
    const rows = attendanceData.map((record, index) => 
      `${index + 1}, ${record.empId}, ${record.name}, ${record.date}, ${record.timeIn}, ${record.timeOut || "N/A"}, ${record.status}`
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Attendance Report
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Generate attendance reports for employees.
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={generateCSV}>
        Download Report (CSV)
      </Button>

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
            ) : attendanceData.length > 0 ? (
              attendanceData.map((record, index) => (
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

export default AttendanceReport;
