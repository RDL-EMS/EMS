const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Present' }
});
module.exports = mongoose.model('Attendance', attendanceSchema);
