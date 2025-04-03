import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
