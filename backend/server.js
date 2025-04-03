import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data

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
  email: { type: String, required: true, unique: true },
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
        email: "admin@example.com",
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

// 📌 Leave Schema
const LeaveSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
});
const LeaveModel = mongoose.model("Leave", LeaveSchema);

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

// 📌 Attendance Schema
const AttendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  date: { type: String, required: true },
  signInTime: { type: String, required: true },
  signOutTime: { type: String },
});

const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);

// 📌 Sign-In API
app.post("/api/attendance/signin", async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId.trim()) {
      return res.status(400).json({ error: "❌ Employee ID is required" });
    }

    const newAttendance = new AttendanceModel({
      employeeId,
      date: new Date().toLocaleDateString(),
      signInTime: new Date().toLocaleTimeString(),
      signOutTime: "",
    });

    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ error: "Server error while signing in" });
  }
});

// 📌 Sign-Out API
app.post("/api/attendance/signout", async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId.trim()) {
      return res.status(400).json({ error: "❌ Employee ID is required" });
    }

    const attendance = await AttendanceModel.findOne({
      employeeId,
      date: new Date().toLocaleDateString(),
      signOutTime: "",
    });

    if (!attendance) {
      return res.status(404).json({ error: "❌ No active sign-in found for this Employee ID" });
    }

    attendance.signOutTime = new Date().toLocaleTimeString();
    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Server error while signing out" });
  }
});

// 📌 Get Today's Attendance Records
app.get("/api/attendance/today", async (req, res) => {
  try {
    const todayDate = new Date().toLocaleDateString();
    const records = await AttendanceModel.find({ date: todayDate });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching attendance" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`🚨 Port ${PORT} is already in use!`);
  } else {
    console.error("🚨 Server Error:", err);
  }
});