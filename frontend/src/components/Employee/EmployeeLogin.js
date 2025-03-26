import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  Card,
} from "@mui/material";
import { Visibility, VisibilityOff, Google, Facebook, GitHub, LinkedIn } from "@mui/icons-material";

const EmployeeLogin = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (employeeId.trim() && password.trim()) {
      localStorage.setItem("employeeId", employeeId);
      alert("Login Successful!");
      window.location.href = "/dashboard";
    } else {
      alert("Please enter valid Employee ID and Password");
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
      <Container maxWidth="md">
        <Card
          sx={{
            display: "flex",
            borderRadius: 3,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              width: "40%",
              backgroundColor: "#5a7ec7",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 3,
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
            }}
          >
            <Typography variant="h4" fontWeight="bold">Hello, Welcome!</Typography>
          </Box>

          {/* Right Panel */}
          <Box sx={{ width: "60%", padding: 4 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Employee Login
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Employee ID"
                variant="outlined"
                sx={{ mb: 2 }}
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                sx={{ textAlign: "right", mb: 2, cursor: "pointer", color: "#1976d2" }}
              >
                Forgot Password?
              </Typography>
              <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                LOGIN
              </Button>
              <Typography textAlign="center" mt={2}>
                or login with social platforms
              </Typography>
              <Grid container spacing={2} justifyContent="center" mt={1}>
                {[Google, Facebook, GitHub, LinkedIn].map((Icon, index) => (
                  <Grid item key={index}>
                    <IconButton sx={{ border: "2px solid #ccc", borderRadius: 2 }}>
                      <Icon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default EmployeeLogin;
