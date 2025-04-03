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
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Google, Facebook, GitHub, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HRLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const adminCredentials = {
    username: "hradmin",
    password: "123456",
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setMessage({ text: "Please enter both username and password.", type: "error" });
      return;
    }

    if (
      credentials.username === adminCredentials.username &&
      credentials.password === adminCredentials.password
    ) {
      localStorage.setItem("authToken", "hr_authenticated");
      setMessage({ text: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/HRDashboard"), 1500);
    } else {
      setMessage({ text: "Invalid username or password.", type: "error" });
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #dfe9f3, #ffffff)",
    }}>
      <Container maxWidth="md">
        <Card sx={{ display: "flex", borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
          <Box sx={{
            width: "40%",
            backgroundColor: "#7494ec",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 3,
          }}>
            <Typography variant="h4" fontWeight="bold">Welcome HR!</Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
              Sign in to manage employees and payroll.
            </Typography>
          </Box>

          <Box sx={{ width: "60%", padding: 4 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              HR Login
            </Typography>

            {message.text && <Alert severity={message.type} sx={{ mt: 2 }}>{message.text}</Alert>}

            <Box component="form" sx={{ mt: 3 }} onSubmit={handleLogin}>
              <TextField fullWidth label="Username" name="username" variant="outlined" sx={{ mb: 2 }} onChange={handleChange} />
              <TextField fullWidth label="Password" name="password" variant="outlined" type={showPassword ? "text" : "password"} sx={{ mb: 2 }} onChange={handleChange}
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

              <Typography sx={{ textAlign: "right", mb: 2, cursor: "pointer", color: "#1976d2" }}>
                Forgot Password?
              </Typography>

              <Button variant="contained" color="primary" fullWidth type="submit">
                Login
              </Button>

              <Typography textAlign="center" mt={2}>or login with social platforms</Typography>
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

export default HRLogin;
