const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  leaveType: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Default status is "Pending"
}, { timestamps: true });

const Leave = mongoose.model("Leave", LeaveSchema);

module.exports = Leave;
