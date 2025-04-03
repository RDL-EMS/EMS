import express from "express";
import {
  markAttendance,
  getAllAttendance,
  getEmployeeAttendance,
  updateAttendance,
  deleteAttendance,
  attendanceSummary,
  getAttendanceHistory,
  getAttendanceReport,
} from "../controllers/attendanceController.js";

const router = express.Router();

// 📌 Mark Attendance
router.post("/add", markAttendance);

// 📌 Get All Attendance Records
router.get("/all", getAllAttendance);

// 📌 Get Attendance History
router.get("/history", getAttendanceHistory);

// 📌 Get Attendance Report
router.get("/report", getAttendanceReport);

// 📌 Get Employee Attendance for a Specific Year
router.get("/:year/employee/:id", getEmployeeAttendance);

// 📌 Update Attendance Record
router.put("/update/:id", updateAttendance);

// 📌 Delete Attendance Record
router.delete("/delete/:id", deleteAttendance);

// 📌 Get Attendance Summary
router.get("/summary", attendanceSummary);




/**
 * @route   GET /api/attendance/history
 * @desc    Get Past Attendance History
 * @access  Public
 */
router.get("/history", getAttendanceHistory);

router.get("/report", getAttendanceReport);
export default router;
