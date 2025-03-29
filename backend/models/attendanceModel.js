import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  employee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee',
    required: true 
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  timeIn: { 
    type: Date, 
    required: true 
  },
  timeOut: { 
    type: Date,
    default: null,
    validate: {
      validator: function(value) {
        if (!value) return true;
        return value > this.timeIn;
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

// ✅ Use ES Module export
const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance;
