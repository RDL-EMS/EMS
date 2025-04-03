import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
});

const Leave = mongoose.models.Leave || mongoose.model("Leave", LeaveSchema);

export default Leave;
