const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true, // ✅ Ensure date is always required
    default: Date.now 
  },
  timeIn: { 
    type: Date, 
    required: true 
  },
  timeOut: { 
    type: Date,
    default: null, // ✅ Allows timeOut to be optional
    validate: {
      validator: function(value) {
        if (!value) return true; // ✅ Allows timeOut to be null
        return value > this.timeIn; // ✅ Ensures timeOut > timeIn
      },
      message: 'Time-out must be after Time-in'
    }
  },
  status: { 
    type: String, 
    enum: ['Present', 'Absent', 'On Leave'], 
    required: true 
  }
});

// ✅ Create & Export Attendance Model
const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
