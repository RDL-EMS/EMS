import mongoose from "mongoose";

// Check if the model already exists to prevent OverwriteModelError
const Employee = mongoose.models.Employee || mongoose.model("Employee", new mongoose.Schema({
  EMPiD: { type: String, required: true },
  Name: { type: String, required: true },
  Joindate: { type: String, required: true },
  Address: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Contact: { type: String, required: true },
  Profile: { type: String, required: true },
  Role: { type: String, required: true },
}, { timestamps: true }));

export default Employee;
