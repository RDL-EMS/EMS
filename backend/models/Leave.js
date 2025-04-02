import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
  {
    leaveType: { type: String, required: true },
    days: { type: Number, required: true }, // ✅ Changed from 'fromDate' and 'toDate' to 'days'
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }, // ✅ Status handling
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", LeaveSchema);

export default Leave; // ✅ Use ES6 export
