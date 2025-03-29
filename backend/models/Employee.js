import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  employeeId: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9_-]+$/ // ✅ Ensures only letters, numbers, underscores, and hyphens
  },
  name: { type: String, required: true },
  joinDate: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { 
    type: String, 
    required: true, 
    match: /^[0-9]+$/ // ✅ Ensures only digits for phone numbers
  },
  profile: { type: String, required: true },
  role: { type: String, required: true },
});

// ✅ Ensure unique Email index
EmployeeSchema.index({ email: 1 }, { unique: true });

// ✅ Use existing model if already compiled
const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;
