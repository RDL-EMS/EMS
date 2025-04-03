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
import { Edit, Add, Close } from "@mui/icons-material";
import HRSidebar from "../Layout/HRSidebar";
import HRNav from "../Layout/HRNav";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: "", status: "Active" });

  // ✅ Fetch Departments from API
  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/departments");
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("🚨 Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value });
  };

  // ✅ Handle Add Department
  const handleAddDepartment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDepartment),
      });
      const data = await res.json();
      setDepartments([...departments, data]);
      setOpenModal(false);
      setNewDepartment({ name: "", status: "Active" });
    } catch (err) {
      console.error("🚨 Error adding department:", err);
    }
  };

  // ✅ Handle Status Change
  const handleStatusChange = async (deptId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/departments/${deptId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      // ✅ Update UI after successful status change
      setDepartments((prev) =>
        prev.map((dept) => (dept.id === deptId ? { ...dept, status: newStatus } : dept))
      );
    } catch (err) {
      console.error("🚨 Error updating department status:", err);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ✅ Sidebar */}
      <HRSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* ✅ Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <HRNav handleSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Toolbar />

        {/* ✅ Breadcrumb Navigation */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/hr-dashboard" style={{ textDecoration: "none", color: "#555" }}>
            Home
          </Link>
          <Typography color="textPrimary">Department</Typography>
        </Breadcrumbs>

        {/* ✅ Page Header with Add Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
          <Typography variant="h5" fontWeight="bold">
            Departments
          </Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenModal(true)}>
            Add Department
          </Button>
        </Box>

        {/* ✅ Department Table */}
        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell><b>SN</b></TableCell>
                    <TableCell><b>Department</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departments.length > 0 ? (
                    departments.map((dept, index) => (
                      <TableRow key={dept.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Link to={`/hr/department/${dept.id}`} style={{ textDecoration: "none", color: "blue" }}>
                            {dept.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={dept.status}
                            size="small"
                            onChange={(e) => handleStatusChange(dept.id, e.target.value)}
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <IconButton color="primary">
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No departments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* ✅ Add Department Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>
            Add New Department
            <IconButton onClick={() => setOpenModal(false)} style={{ float: "right" }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Department Name"
              fullWidth
              name="name"
              value={newDepartment.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <Select
              fullWidth
              name="status"
              value={newDepartment.status}
              onChange={handleInputChange}
              style={{ marginTop: "15px" }}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} style={{ backgroundColor: "red", color: "white" }}>
              Cancel
            </Button>
            <Button onClick={handleAddDepartment} style={{ backgroundColor: "orange", color: "white" }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Department;
