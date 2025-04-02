import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton,
  Breadcrumbs,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Toolbar,
  Box,
  CssBaseline,
} from "@mui/material";
import { Edit, Delete, Add, Close } from "@mui/icons-material";
import HRSidebar from "../Layout/HRSidebar";
import HRNav from "../Layout/HRNav";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // ✅ State for new leave
  const [newLeave, setNewLeave] = useState({
    leaveType: "",
    days: "",
    status: "Active",
  });

  // ✅ Fetch Leaves from API
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leaves");
        if (!response.ok) throw new Error("Failed to fetch leaves");

        const data = await response.json();
        setLeaves(data);
      } catch (error) {
        console.error("🚨 Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  // ✅ Handle Add Leave
  const handleAddLeave = async () => {
    if (!newLeave.leaveType || !newLeave.days) {
      alert("❌ All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeave),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("🚨 Server Error Response:", data);
        alert(`❌ Error: ${data.message || "Failed to add leave"}`);
        return;
      }

      console.log("✅ Leave added successfully:", data);
      setLeaves([...leaves, data]); // ✅ Update UI with new leave
      setOpenModal(false);
      setNewLeave({ leaveType: "", days: "", status: "Active" }); // ✅ Reset form
    } catch (error) {
      console.error("🚨 Error adding leave:", error);
    }
  };

  // ✅ Handle Status Change
  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${leaveId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setLeaves(leaves.map((leave) =>
        leave._id === leaveId ? { ...leave, status: newStatus } : leave
      ));

      console.log(`✅ Leave ID ${leaveId} status updated to: ${newStatus}`);
    } catch (error) {
      console.error("🚨 Error updating status:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HRNav handleSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <HRSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Toolbar />

        {/* ✅ Breadcrumb Navigation */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/hr-dashboard" style={{ textDecoration: "none", color: "#555" }}>
            Home
          </Link>
          <Typography color="textPrimary">Leave Management</Typography>
        </Breadcrumbs>

        {/* ✅ Page Header with Add Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
          <Typography variant="h5" fontWeight="bold">
            Leave Management
          </Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenModal(true)}>
            Add Leave
          </Button>
        </Box>

        {/* ✅ Leave Table */}
        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell><b>SN</b></TableCell>
                    <TableCell><b>Leave Type</b></TableCell>
                    <TableCell><b>No. of Days</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaves.length > 0 ? (
                    leaves.map((leave, index) => (
                      <TableRow key={leave._id || index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{leave.leaveType}</TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell>
                          <Select
                            value={leave.status}
                            size="small"
                            onChange={(e) => handleStatusChange(leave._id, e.target.value)}
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <IconButton color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton color="error">
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No leave records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* ✅ Add Leave Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>
            Add New Leave
            <IconButton onClick={() => setOpenModal(false)} style={{ float: "right" }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Leave Type"
              fullWidth
              name="leaveType"
              value={newLeave.leaveType}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              label="No. of Days"
              type="number"
              fullWidth
              name="days"
              value={newLeave.days}
              onChange={handleInputChange}
              margin="normal"
            />
            <Select
              fullWidth
              name="status"
              value={newLeave.status}
              onChange={handleInputChange}
              style={{ marginTop: "15px" }}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="error">
              Cancel
            </Button>
            <Button onClick={handleAddLeave} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default LeaveManagement;
