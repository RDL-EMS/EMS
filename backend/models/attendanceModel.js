import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true, // ✅ Optimizes queries based on employee ID
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      index: true, // ✅ Improves performance for date-based queries
    },
    timeIn: {
      type: Date,
      required: true,
    },
    timeOut: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true; // ✅ Allow null timeOut
          return value > this.timeIn; // ✅ Ensure timeOut is after timeIn
        },
        message: "Time-out must be after Time-in",
      },
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "On Leave"],
      required: true,
    },
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt fields automatically
);

// ✅ Indexing for faster queries
AttendanceSchema.index({ employee: 1, date: -1 });

// ✅ Create the Attendance model
const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
