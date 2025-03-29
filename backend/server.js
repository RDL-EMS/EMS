import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB, PORT } from "./config/db.js";

// ✅ Load Environment Variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ✅ Static Admin Credentials (Use Environment Variables in Production)
const adminCredentials = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "123456",
};

// ✅ Base API Route
app.get("/api", (req, res) => {
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

// ✅ Import Routes
import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";

// ✅ API Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);

// ✅ Serve Frontend React Build Files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Start Server
const port = PORT || 5000;
const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
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
