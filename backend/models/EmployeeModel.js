import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  EMPiD: { type: String, required: true },
  Name: { type: String, required: true },
  Joindate: { type: String, required: true },
  Address: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Contact: { type: String, required: true },
  Profile: { type: String, required: true },
  Role: { type: String, required: true },
});

// Ensure unique Email index
EmployeeSchema.index({ Email: 1 }, { unique: true });

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;  // ✅ Ensure this line is present

