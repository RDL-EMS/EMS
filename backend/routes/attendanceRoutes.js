const express = require("express");
const router = express.Router();
const {
  markAttendance,      
  getAllAttendance,    
  getEmployeeAttendance, 
  updateAttendance,    
  deleteAttendance     
} = require("../controllers/attendanceController");  // ✅ Ensure correct path

/** 
 * 📌 Attendance Routes (Base Path: /api/attendance)
 */

// 🔹 Route to mark attendance
router.post("/add", markAttendance);

// 🔹 Route to get all attendance records
router.get("/all", getAllAttendance);

// 🔹 Route to get attendance for a specific employee by ID
router.get("/:id", getEmployeeAttendance);

// 🔹 Route to update an attendance record
router.put("/:id", updateAttendance);

// 🔹 Route to delete an attendance record
router.delete("/:id", deleteAttendance);

module.exports = router;
