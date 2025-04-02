import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/employee_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("🚨 MongoDB Connection Error:", error));

// 📌 Attendance Schema
const AttendanceSchema = new mongoose.Schema({
  employeeId: String,
  status: String,
  date: Date,
  month: String,
});
const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);

// 📌 User Schema (For Authentication)
const UserSchema = new mongoose.Schema({
  username: String,
  password: String, // Store hashed passwords in a real application
});
const UserModel = mongoose.model("User", UserSchema);

// 📌 Department Schema
const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});
const DepartmentModel = mongoose.model("Department", DepartmentSchema);

// 📌 Ensure Admin User Exists
const ensureAdminUser = async () => {
  const existingAdmin = await UserModel.findOne({ username: "admin" });
  if (!existingAdmin) {
    await UserModel.create({ username: "admin", password: "123456" });
    console.log("✅ Admin user created (username: admin, password: 123456)");
  }
};
ensureAdminUser();

// 📌 Login API
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password." });
    }

    // Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("🚨 Login Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

// 📌 Attendance Summary API
app.get("/api/attendance-summary", async (req, res) => {
  try {
    const totalEmployees = await AttendanceModel.distinct("employeeId").count();
    const monthlyData = await AttendanceModel.aggregate([
      {
        $group: {
          _id: "$month",
          present: { $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const todayDate = new Date().toISOString().split("T")[0];
    const todayData = await AttendanceModel.aggregate([
      { $match: { date: { $gte: new Date(todayDate) } } },
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 },
        },
      },
    ]);

    const formattedTodayData = todayData.map((item) => ({
      name: item._id,
      value: item.value,
      color: item._id === "Present" ? "#1976D2" : "#D32F2F",
    }));

    res.json({ totalEmployees, monthly: monthlyData, today: formattedTodayData });
  } catch (error) {
    console.error("🚨 Error fetching attendance summary:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

// 📌 Department Management APIs

// ✅ Get All Departments
app.get("/api/departments", async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a New Department
app.post("/api/departments", async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name) return res.status(400).json({ error: "Department name is required" });

    const newDepartment = new DepartmentModel({ name, status });
    await newDepartment.save();

    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: "Error adding department" });
  }
});

// ✅ Update Department
app.put("/api/departments/:id", async (req, res) => {
  try {
    const { name, status } = req.body;
    const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
      req.params.id,
      { name, status },
      { new: true }
    );

    if (!updatedDepartment) return res.status(404).json({ error: "Department not found" });

    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: "Error updating department" });
  }
});

// ✅ Delete a Department
app.delete("/api/departments/:id", async (req, res) => {
  try {
    await DepartmentModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting department" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
