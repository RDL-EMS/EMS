const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static admin credentials
const adminCredentials = {
  username: "admin",
  password: "123456",
};

// ✅ Base Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Employee Management System API is running!" });
});

// ✅ Authentication Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    return res.status(200).json({ success: true, message: "Login Successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid Credentials" });
  }
});

// ✅ Attendance API Route
app.use("/api/attendance", require("./routes/attendanceRoutes"));

// ✅ Leave API Route (Fixes 404 error)
app.use("/api/leave", require("./routes/leaveRoutes"));

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
