import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Container,
  Card,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/employees/login", {
        employeeID: employeeID.trim(),
        email: email.trim().toLowerCase(),
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setMessage("✅ Login Successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setMessage("❌ Login Failed: No token received");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Login Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #dfe9f3, #ffffff)",
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ padding: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">Employee Login</Typography>
          {message && <Alert severity={message.includes("✅") ? "success" : "error"} sx={{ mt: 2 }}>{message}</Alert>}
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Employee ID"
              variant="outlined"
              sx={{ mb: 2 }}
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              sx={{ mb: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default EmployeeLogin;