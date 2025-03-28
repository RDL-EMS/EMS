const express = require('express');
const router = express.Router();
const {
  markAttendance,      // ✅ Function to mark attendance
  getAllAttendance,    // ✅ Fetch all attendance records
  getEmployeeAttendance, // ✅ Fetch attendance of a specific employee
  updateAttendance,    // ✅ Update attendance record
  deleteAttendance     // ✅ Delete attendance record
} = require('../controllers/attendanceController');  // ✅ Ensure correct path

/** 
 * 📌 Attendance Routes 
 * Base Path: /api/attendance
 */

// 🔹 Route to mark attendance
router.post('/add', markAttendance);

// 🔹 Route to get all attendance records
router.get('/all', getAllAttendance);

// 🔹 Route to get attendance for a specific employee by ID
router.get('/:id', getEmployeeAttendance);

// 🔹 Route to update an attendance record
router.put('/:id', updateAttendance);

// 🔹 Route to delete an attendance record
router.delete('/:id', deleteAttendance);

module.exports = router;
