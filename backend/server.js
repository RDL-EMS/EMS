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

// Attendance Schema
const AttendanceSchema = new mongoose.Schema({
  employeeId: String,
  status: String,
  date: Date,
  month: String,
});

const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);

// API to fetch attendance summary
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

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
