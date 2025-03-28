const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan"); // ✅ Logging middleware
const connectDB = require("./config/db");

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // ✅ Logs incoming requests

// ✅ Static admin credentials
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

const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/api/attendance", attendanceRoutes);


// ✅ Leave API Route (Fixes 404 error)
app.use("/api/leave", require("./routes/leaveRoutes"));

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Graceful Shutdown Handling
process.on("SIGINT", async () => {
  console.log("⚠️ Closing server and database connection...");
  await mongoose.connection.close();
  server.close(() => process.exit(0));
});

// ✅ Handle Uncaught Exceptions & Rejections
process.on("uncaughtException", (err) => {
  console.error("⚠️ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("⚠️ Unhandled Rejection:", err);
  process.exit(1);
});
