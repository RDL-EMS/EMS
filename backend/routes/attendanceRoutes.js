import express from "express";
import {
  markAttendance,
  getAllAttendance,
  getEmployeeAttendance,
  updateAttendance,
  deleteAttendance,
  attendanceSummary,
  getAttendanceHistory,  // ✅ Added missing route
  getAttendanceReport,   // ✅ Added missing route
} from "../controllers/attendanceController.js";

const router = express.Router();

/**
 * @route   POST /api/attendance/add
 * @desc    Mark Attendance
 * @access  Public
 */
router.post("/add", markAttendance);

/**
 * @route   GET /api/attendance/history
 * @desc    Get Past Attendance History
 * @access  Public
 */
router.get("/history", getAttendanceHistory); // ✅ Fix: Add this route

/**
 * @route   GET /api/attendance/report
 * @desc    Get Attendance Report
 * @access  Public
 */
router.get("/report", getAttendanceReport); // ✅ Fix: Add this route

/**
 * @route   GET /api/attendance/all
 * @desc    Get All Attendance Records
 * @access  Public
 */
router.get("/all", getAllAttendance);

/**
 * @route   GET /api/attendance/:year/employee/:id
 * @desc    Get Attendance for a Specific Employee in a Given Year
 * @access  Public
 */
router.get("/:year/employee/:id", getEmployeeAttendance);

/**
 * @route   PUT /api/attendance/update/:id
 * @desc    Update an Attendance Record
 * @access  Public
 */
router.put("/update/:id", updateAttendance);

/**
 * @route   DELETE /api/attendance/delete/:id
 * @desc    Delete an Attendance Record
 * @access  Public
 */
router.delete("/delete/:id", deleteAttendance);

/**
 * @route   GET /api/attendance-summary
 * @desc    Get Attendance Summary
 * @access  Public
 */
router.get("/attendance-summary", attendanceSummary);




/**
 * @route   GET /api/attendance/history
 * @desc    Get Past Attendance History
 * @access  Public
 */
router.get("/history", getAttendanceHistory);

router.get("/report", getAttendanceReport);
export default router;
