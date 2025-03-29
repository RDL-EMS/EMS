import React, { useState, useEffect } from "react";
import {
  Box, CssBaseline, Toolbar, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, TextField, Select, 
  MenuItem, Typography, Card, CardContent, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; // ✅ Import Icons
import HRNav from "../Layout/HRNav.js";
import HRSidebar from "../Layout/HRSidebar.js";
import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

const AddEmployeeForm = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    EMPiD: "",
    Name: "",
    Joindate: "",
    Address: "",
    Email: "",
    Contact: "",
    Profile: null, // ✅ Changed to File Object
    Role: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch employees from MongoDB
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "Profile") {
      setFormData({ ...formData, Profile: e.target.files[0] }); // ✅ Store file
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit form data (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Convert formData to FormData Object
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("✅ Employee added successfully!");
        
        // ✅ Refresh employees
        fetchEmployees();

        // ✅ Clear form fields
        setFormData({
          EMPiD: "",
          Name: "",
          Joindate: "",
          Address: "",
          Email: "",
          Contact: "",
          Profile: null,
          Role: "",
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "❌ Failed to save employee.");
    }
  };

  // Edit employee data
  const handleEdit = (id) => {
    const employee = employees.find(emp => emp._id === id);
    if (employee) {
      setFormData({ ...employee, Profile: null }); // ✅ Clear profile file to avoid re-upload issues
      setEditingId(id);
    }
  };

  // Delete employee from MongoDB
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F4F7FC", minHeight: "100vh" }}>
      <CssBaseline />
      <HRNav handleSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <HRSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />

        {/* ✅ Centered Employee Form in Card */}
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#33354A", textAlign: "center" }}>
                {editingId ? "Edit Employee" : "Add Employee"}
              </Typography>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <TextField label="EMPiD" name="EMPiD" value={formData.EMPiD} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Name" name="Name" value={formData.Name} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="date" label="Join Date" name="Joindate" value={formData.Joindate} onChange={handleChange} fullWidth margin="normal" required InputLabelProps={{ shrink: true }} />
                <TextField label="Address" name="Address" value={formData.Address} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="email" label="Email" name="Email" value={formData.Email} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="tel" label="Contact" name="Contact" value={formData.Contact} onChange={handleChange} fullWidth margin="normal" required />
                
                {/* ✅ Profile Upload (File Input) */}
                <Typography sx={{ mt: 2 }}>Upload Profile Picture</Typography>
<input 
  type="file" 
  name="Profile" 
  onChange={handleChange} 
  accept="image/*" 
  required 
/>                
<Select 
  name="Role" 
  value={formData.Role} 
  onChange={handleChange} 
  fullWidth 
  required 
  sx={{ mt: 2 }}
  displayEmpty
>
  <MenuItem value="" disabled>Select Role</MenuItem> {/* Default Disabled Option */}
  <MenuItem value="Admin">Admin</MenuItem>
  <MenuItem value="Manager">Manager</MenuItem>
  <MenuItem value="Employee">Employee</MenuItem>
</Select>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  {editingId ? "Update Employee" : "Add Employee"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>

        {/* ✅ Employee List Table */}
        <Typography variant="h5" sx={{ mt: 4 }}>Employee List</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#333", color: "#fff" }}> {/* ✅ Changed Table Header Color */}
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>EMPiD</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Join Date</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Address</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Contact</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Profile</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Role</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp._id}>
                  <TableCell>{emp.EMPiD}</TableCell>
                  <TableCell>{emp.Name}</TableCell>
                  <TableCell>{emp.Joindate}</TableCell>
                  <TableCell>{emp.Address}</TableCell>
                  <TableCell>{emp.Email}</TableCell>
                  <TableCell>{emp.Contact}</TableCell>
                  <TableCell>
                    {emp.Profile && <img src={emp.Profile} alt="Profile" width="50" />}
                  </TableCell>
                  <TableCell>{emp.Role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(emp._id)} color="primary"><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(emp._id)} color="error"><Delete /></IconButton>
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

export default AddEmployeeForm;
