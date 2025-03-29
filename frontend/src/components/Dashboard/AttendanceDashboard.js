import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const AttendanceDashboard = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>HR Attendance Management</Typography>
      <Button variant="contained" component={Link} to="/attendance/add" sx={{ m: 1 }}>
        Add Attendance
      </Button>
      <Button variant="contained" component={Link} to="/attendance/history" sx={{ m: 1 }}>
        View History
      </Button>
      <Button variant="contained" component={Link} to="/attendance/list" sx={{ m: 1 }}>
        Attendance List
      </Button>
      <Button variant="contained" component={Link} to="/attendance/report" sx={{ m: 1 }}>
        Generate Report
      </Button>
    </Box>
  );
};

export default AttendanceDashboard;
