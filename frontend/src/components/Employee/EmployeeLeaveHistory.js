import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";
import axios from "axios";

const EmployeeLeaveHistory = () => {
  const [open, setOpen] = useState(false);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave");
      setLeaveRecords(response.data);
    } catch (error) {
      console.error("Error fetching leave applications", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.toDate < formData.fromDate) {
      setErrorMessage("To Date should be after From Date");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/leave", formData);
      setSuccessMessage(response.data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchLeaveApplications();
      handleClose();
    } catch (error) {
      setErrorMessage("Failed to submit leave application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          Leave History
        </Typography>
        <Button variant="contained" onClick={handleOpen} startIcon={<AddCircleOutline />}>
          Add Application
        </Button>
      </Box>

      <Table sx={{ background: "white", borderRadius: 2, boxShadow: 3 }}>
        <TableHead sx={{ bgcolor: "#1976d2" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Leave Type</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>From Date</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>To Date</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveRecords.map((record) => (
            <TableRow key={record._id} sx={{ "&:hover": { bgcolor: "#f1f3f5" } }}>
              <TableCell>{record.leaveType}</TableCell>
              <TableCell>{record.fromDate.split("T")[0]}</TableCell>
              <TableCell>{record.toDate.split("T")[0]}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Add Leave Application</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField name="leaveType" label="Leave Type" fullWidth margin="normal" onChange={handleChange} required />
            <TextField
              name="fromDate"
              label="From Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              required
            />
            <TextField
              name="toDate"
              label="To Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              required
            />
            <TextField
              name="description"
              label="Description"
              multiline
              rows={3}
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Apply
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarSeverity === "success" ? successMessage : errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeLeaveHistory;
