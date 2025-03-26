const express = require('express');
const { markAttendance, getAllAttendance, getEmployeeAttendance, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { validateAttendance } = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/mark', protect, validateAttendance, markAttendance);
router.get('/', protect, getAllAttendance);
router.get('/:id', protect, getEmployeeAttendance);
router.put('/:id', protect, updateAttendance);
router.delete('/:id', protect, deleteAttendance);

module.exports = router;
