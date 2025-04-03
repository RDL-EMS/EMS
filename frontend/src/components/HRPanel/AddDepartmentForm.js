import React, { useState, useEffect } from "react";
import {
  Box, CssBaseline, Toolbar, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Select,
  MenuItem, Typography, Card, CardContent, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import HRNav from "../Layout/HRNav.js";
import HRSidebar from "../Layout/HRSidebar.js";
import axios from "axios";

const API_URL = "http://localhost:5000/api/departments";

const AddDepartmentForm = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    departmentName: "",
    status: "Active"
  });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(API_URL);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting:", formData, "Editing ID:", editingId); // Debug Log
  
      if (editingId) {
        const response = await axios.put(`${API_URL}/${editingId}`, formData);
        console.log("✅ Update Success:", response.data); // Debug Log
      } else {
        const response = await axios.post(API_URL, formData);
        console.log("✅ Department Added:", response.data); // Debug Log
      }
  
      alert(editingId ? "✅ Department updated successfully!" : "✅ Department added successfully!");
      setFormData({ departmentName: "", status: "Active" });
      setEditingId(null);
      fetchDepartments();
    } catch (error) {
      console.error("❌ Error:", error.response ? error.response.data : error.message);
      alert("❌ Failed to save department.");
    }
  };
  

  const handleEdit = (id) => {
    const department = departments.find(dep => dep._id === id);
    if (department) {
      setFormData({ departmentName: department.departmentName, status: department.status });
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
  
    try {
      console.log("🗑️ Deleting department with ID:", id); // Debug Log
  
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log("✅ Delete Success:", response.data); // Debug Log
  
      fetchDepartments(); // Refresh list
    } catch (error) {
      console.error("❌ Error deleting department:", error.response ? error.response.data : error.message);
      alert("❌ Failed to delete department.");
    }
  };
  

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F4F7FC", minHeight: "100vh" }}>
      <CssBaseline />
      <HRNav handleSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <HRSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#33354A", textAlign: "center" }}>
                {editingId ? "Edit Department" : "Add Department"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField label="Department Name" name="departmentName" value={formData.departmentName} onChange={handleChange} fullWidth margin="normal" required />
                <Select name="status" value={formData.status} onChange={handleChange} fullWidth required sx={{ mt: 2 }}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  {editingId ? "Update Department" : "Add Department"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" sx={{ mt: 4 }}>Department List</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#333", color: "#fff" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Department Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dep) => (
                <TableRow key={dep._id}>
                  <TableCell>{dep.departmentName}</TableCell>
                  <TableCell>{dep.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(dep._id)} color="primary"><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(dep._id)} color="error"><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AddDepartmentForm;
