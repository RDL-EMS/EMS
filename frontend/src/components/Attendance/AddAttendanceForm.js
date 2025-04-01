import React, { useState } from "react";
import { TextField, Button, MenuItem, Paper, Typography, Grid } from "@mui/material";
import axios from "axios";

const AddAttendanceForm = ({ onClose, fetchAttendance }) => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    dateTimeIn: "",
    timeOut: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.empId || !formData.name || !formData.dateTimeIn || !formData.status) {
      alert("⚠️ Please fill in all required fields!");
      setLoading(false);
      return;
    }

    // Extract date and time separately from dateTimeIn
    const [date, timeIn] = formData.dateTimeIn.split("T");

    // Prepare attendance data object
    const attendanceData = {
      employeeId: formData.empId, // ✅ Rename empId to employeeId
      name: formData.name,
      date,  // ✅ Extracted date
      timeIn,  // ✅ Extracted time
      timeOut: formData.timeOut || null, // ✅ Handle empty timeOut properly
      status: formData.status,
    };

    console.log("📤 Submitting Attendance Data:", attendanceData);

    try {
      const response = await axios.post("http://localhost:5000/api/attendance/add", attendanceData);
      if (response.data.success) {
        console.log("✅ Attendance added successfully!");
        fetchAttendance(); // Refresh attendance list
        onClose(); // Close modal after submission
      } else {
        alert("❌ Failed to add attendance: " + response.data.message);
      }
    } catch (error) {
      alert("🚨 Error adding attendance: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 450,
        padding: 3,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        margin: "auto",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", textAlign: "center", mb: 2 }}>
        Add Attendance
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Emp ID" name="empId" value={formData.empId} onChange={handleChange} variant="outlined" required />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} variant="outlined" required />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date-Time In"
              name="dateTimeIn"
              type="datetime-local"
              value={formData.dateTimeIn}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Time Out (Optional)"
              name="timeOut"
              type="datetime-local"
              value={formData.timeOut}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField select fullWidth label="Status" name="status" value={formData.status} onChange={handleChange} variant="outlined" required>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Present">Present</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
            </TextField>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ flex: 1, mr: 1 }} disabled={loading}>
              {loading ? "Saving..." : "Save Attendance"}
            </Button>
            <Button variant="outlined" color="error" sx={{ flex: 1 }} onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddAttendanceForm;
