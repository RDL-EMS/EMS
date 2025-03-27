import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, Grid, Avatar, Box } from "@mui/material";

const portals = [
  { title: "HR Portal", color: "rgba(255, 138, 128, 0.9)", path: "/hr" },
  { title: "Employee Portal", color: "rgba(129, 199, 132, 0.9)", path: "/employee-login" },
  { title: "CSO Portal", color: "rgba(100, 181, 246, 0.9)", path: "/cso" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/uploads/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: 400,
          p: 3,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.2)", 
          backdropFilter: "blur(10px)", 
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Logo */}
        <Avatar
          src="/uploads/logo.jpg"
          sx={{ width: 80, height: 80, margin: "auto" }}
          alt="Company Logo"
        />

        {/* Title */}
        <Typography variant="h6" sx={{ mt: 2, mb: 3, fontWeight: "bold", color: "black" }}>
          Employee Management System
        </Typography>

        {/* Portal Buttons */}
        <Grid container spacing={2} justifyContent="center">
          {portals.map((portal, index) => (
            <Grid item xs={8} key={index}>
              <Card
                sx={{
                  bgcolor: portal.color,
                  color: "white",
                  textAlign: "center",
                  cursor: "pointer",
                  minHeight: 45,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  borderRadius: 2,
                }}
                onClick={() => navigate(portal.path)}
              >
                <CardContent sx={{ padding: "6px" }}>
                  <Typography variant="subtitle2">{portal.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default Home;