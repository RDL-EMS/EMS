import React, { useState } from 'react';
import { TextField, Button, MenuItem, Paper, Typography, Grid } from '@mui/material';

const AddAttendanceForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    dateTimeIn: '',
    timeOut: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attendance Data:', formData);
    onClose(); // Close modal after submission
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 450,
        padding: 3,
        borderRadius: 3,
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        margin: 'auto',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', mb: 2 }}>
        Add Attendance
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Emp ID"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              required
            />
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
              label="Time Out"
              name="timeOut"
              type="datetime-local"
              value={formData.timeOut}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              variant="outlined"
              required
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Present">Present</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
            </TextField>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" color="primary" sx={{ flex: 1, mr: 1 }}>
              Save Attendance
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
