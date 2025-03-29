import express from "express";
import {
  markAttendance,
  getAllAttendance,
  getEmployeeAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

/**
 * @route   POST /api/attendance/add
 * @desc    Mark Attendance
 * @access  Public (Modify as per authentication requirements)
 */
router.post("/add", markAttendance);

/**
 * @route   GET /api/attendance/all
 * @desc    Get All Attendance Records
 * @access  Public (Modify as per authentication requirements)
 */
router.get("/all", getAllAttendance);

/**
 * @route   GET /api/attendance/:year/employee/:id
 * @desc    Get Attendance for a Specific Employee in a Given Year
 * @access  Public (Modify as per authentication requirements)
 */
router.get("/:year/employee/:id", getEmployeeAttendance);

/**
 * @route   PUT /api/attendance/update/:id
 * @desc    Update an Attendance Record
 * @access  Public (Modify as per authentication requirements)
 */
router.put("/update/:id", updateAttendance);

/**
 * @route   DELETE /api/attendance/delete/:id
 * @desc    Delete an Attendance Record
 * @access  Public (Modify as per authentication requirements)
 */
router.delete("/delete/:id", deleteAttendance);

export default router;
