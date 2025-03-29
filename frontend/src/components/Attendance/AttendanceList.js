import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Add, Close, Delete, Edit } from "@mui/icons-material";
import AddAttendanceForm from "./AddAttendanceForm"; // Import the form component

const AttendanceList = () => {
  const [open, setOpen] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Attendance Data
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendance/all");
      if (response.data.success) {
        setAttendance(response.data.attendance || []);
      } else {
        setAttendance([]);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Data on Component Mount
  useEffect(() => {
    fetchAttendance();
  }, []);

  // ✅ Handle Dialog Open/Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ✅ Delete Attendance Record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/attendance/${id}`);
        fetchAttendance(); // Refresh data after deletion
      } catch (error) {
        console.error("Error deleting attendance:", error);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 3, backgroundColor: "#F5F6FA", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={600} color="#131313">
          Attendance Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ backgroundColor: "#0B5ED7", color: "#FFFFFF", "&:hover": { backgroundColor: "#0A4BC7" } }}
          onClick={handleOpen}
        >
          Add Attendance
        </Button>
      </Box>

      {/* Attendance Table */}
      <Card sx={{ borderRadius: "12px", boxShadow: 3, backgroundColor: "#FFFFFF" }}>
        <CardContent>
          <TableContainer component={Paper} sx={{ borderRadius: "8px", overflow: "hidden" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#0B5ED7" }}>
                <TableRow>
                  {["SN", "Emp ID", "Name", "Date", "Time In", "Time Out", "Status", "Actions"].map((header) => (
                    <TableCell key={header} sx={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : attendance.length > 0 ? (
                  attendance.map((record, index) => (
                    <TableRow key={record._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{record.empId}</TableCell>
                      <TableCell>{record.name || "N/A"}</TableCell>
                      <TableCell>{new Date(record.dateTimeIn).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(record.dateTimeIn).toLocaleTimeString()}</TableCell>
                      <TableCell>{record.timeOut ? new Date(record.timeOut).toLocaleTimeString() : "N/A"}</TableCell>
                      <TableCell>{record.status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" size="small">
                          <Edit />
                        </IconButton>
                        <IconButton color="error" size="small" onClick={() => handleDelete(record._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No attendance records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Attendance Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Add Attendance
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddAttendanceForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AttendanceList;
