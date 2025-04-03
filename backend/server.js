import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB, PORT } from "./config/db.js"; // Ensure correct import

import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import Employee from "./models/Employee.js";  // ✅ Correct
import departmentRoutes from "./routes/departmentRoutes.js"; // ✅ Ensure this file exists

dotenv.config();

const app = express();


// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Logs incoming requests
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/departments", departmentRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/employee_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => {
    console.error("🚨 MongoDB Connection Error:", error);
    process.exit(1);
  });

// 📌 User Schema (Admin & CSO)
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // ✅ Fix added
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);



// 📌 Ensure Admin & CSO Users Exist
const ensureUsersExist = async () => {
  try {
    const existingAdmin = await UserModel.findOne({ username: "admin" });
    if (!existingAdmin) {
      await UserModel.create({ 
        username: "admin", 
        email: "admin@example.com", // ✅ Add a valid email
        password: "123456" 
      });
      console.log("✅ Admin user created (username: admin, password: 123456)");
    }
  } catch (error) {
    console.error("🚨 Error creating users:", error);
  }
};


// 📌 Login API (Admin & CSO)
app.post("/api/login", async (req, res) => {
  try {
      const { username, password } = req.body;

      // Check if the username and password match "cso" and "cso123"
      if (username === "cso" && password === "cso123") {
          return res.json({ message: "✅ Login successful" });
      } else {
          return res.status(401).json({ message: "❌ Invalid username or password" });
      }
  } catch (error) {
      console.error("🚨 Login Error:", error);
      res.status(500).json({ message: "Server Error", error });
  }
});





// 📌 Get All Leave Requests
app.get("/api/leaves", async (req, res) => {
  try {
    const leaves = await LeaveModel.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching leaves" });
  }
});

// 📌 Add New Leave Request
app.post("/api/leaves", async (req, res) => {
  try {
    console.log("📥 Incoming Leave Request:", req.body);
    const { employeeId, leaveType, startDate, endDate } = req.body;

    if (!employeeId || !leaveType || !startDate || !endDate) {
      return res.status(400).json({ error: "❌ All fields are required" });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ error: "❌ End date must be after start date." });
    }

    const newLeave = new LeaveModel({
      employeeId,
      leaveType,
      startDate,
      endDate,
      status: "Pending",
    });

    await newLeave.save();
    console.log("✅ Leave added:", newLeave);

    res.status(201).json(newLeave);
  } catch (error) {
    res.status(500).json({ error: "Server error while adding leave" });
  }
});

// 📌 Edit Leave Request
app.put("/api/leaves/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { leaveType, startDate, endDate, status } = req.body;

    const leave = await LeaveModel.findById(id);
    if (!leave) return res.status(404).json({ error: "❌ Leave request not found" });

    leave.leaveType = leaveType || leave.leaveType;
    leave.startDate = startDate || leave.startDate;
    leave.endDate = endDate || leave.endDate;
    leave.status = status || leave.status;

    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: "Server error while updating leave" });
  }
});

// 📌 Delete Leave Request
app.delete("/api/leaves/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveModel.findByIdAndDelete(id);
    if (!leave) return res.status(404).json({ error: "❌ Leave request not found" });

    res.json({ message: "✅ Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting leave" });
  }
});

// 📌 Toggle Leave Status (Active/Inactive)
app.patch("/api/leaves/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveModel.findById(id);
    if (!leave) return res.status(404).json({ error: "❌ Leave request not found" });

    leave.status = leave.status === "Approved" ? "Pending" : "Approved";
    await leave.save();
    res.json({ message: `✅ Leave status updated to ${leave.status}` });
  } catch (error) {
    res.status(500).json({ error: "Server error while updating leave status" });
  }
});

// ✅ Handle Port Already in Use
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`🚨 Port ${PORT} is already in use!`);
  } else {
    console.error("🚨 Server Error:", err);
  }
});
// Employee Registration Route
app.post("/api/employees/register", async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ success: false, message: "Employee already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee
    const newEmployee = new Employee({ employeeId, email, password: hashedPassword });
    await newEmployee.save();

    res.status(201).json({ success: true, message: "Employee registered successfully" });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
// Employee Login Route
app.post("/api/login", async (req, res) => {
  const { empid, email } = req.body;
  
  try {
    const employee = await Employee.findOne({
      EMPiD: empid.trim(),
      Email: { $regex: new RegExp("^" + email.trim() + "$", "i") }
    });

    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT token generation
    const token = jwt.sign(
      { empid: employee.EMPiD, email: employee.Email, role: employee.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.json({ token, employee });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
