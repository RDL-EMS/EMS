// src/components/Attendance/AttendanceList.js
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Add, Edit, Delete, CheckCircle, Cancel } from "@mui/icons-material";

const AttendanceList = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [newAttendance, setNewAttendance] = useState({ empId: "", name: "", date: "", timeIn: "", timeOut: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setNewAttendance({ ...newAttendance, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ background: "#0B2447", color: "#fff", '&:hover': { background: "#082032" }, position: "absolute", right: 20, top: 20 }}
        startIcon={<Add />}
        onClick={handleOpen}
      >
        Add Attendance
      </Button>
      <TableContainer component={Paper} sx={{ background: "#fff", borderRadius: 2, boxShadow: 3, mt: 4 }}>
        <Table>
          <TableHead sx={{ background: "#0B2447" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>SN</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Emp ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Time In</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Time Out</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:hover': { background: "#f5f5f5" }, background: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                <TableCell>#{index + 1}</TableCell>
                <TableCell>{row.empId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.timeIn}</TableCell>
                <TableCell>{row.timeOut}</TableCell>
                <TableCell>{row.status === "Present" ? <CheckCircle sx={{ color: "green" }} /> : <Cancel sx={{ color: "red" }} />}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: "#0B2447" }}><Edit /></IconButton>
                  <IconButton sx={{ color: "red" }}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Attendance</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Emp ID" name="empId" fullWidth onChange={handleChange} />
          <TextField margin="dense" label="Name" name="name" fullWidth onChange={handleChange} />
          <TextField margin="dense" label="Date" name="date" type="date" fullWidth onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField margin="dense" label="Time In" name="timeIn" type="time" fullWidth onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField margin="dense" label="Time Out" name="timeOut" type="time" fullWidth onChange={handleChange} InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" sx={{ background: "#0B2447", color: "#fff", '&:hover': { background: "#082032" } }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttendanceList;
