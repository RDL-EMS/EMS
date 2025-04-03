import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  EMPiD: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Joindate: { type: Date, required: true },
  Address: { type: String, required: true },
  Email: { type: String, required: true, unique: true }, // Ensure email is required and unique
  Contact: { type: String, required: true },
  Profile: { type: String }, // Profile can be optional
  Role: { type: String, required: true }
});

const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee; 
