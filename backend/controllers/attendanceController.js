const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Mark Attendance
exports.markAttendance = async (req, res) => {
  const { employeeId, status, date } = req.body;
  const employee = await Employee.findById(employeeId);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });

  const attendance = new Attendance({ employee: employeeId, status, date });
  await attendance.save();
  res.status(201).json({ success: true, message: 'Attendance marked', attendance });
};

// Get All Attendance Records
exports.getAllAttendance = async (req, res) => {
  const attendance = await Attendance.find().populate('employee', 'name email');
  res.status(200).json({ success: true, attendance });
};

// Get Attendance by Employee
exports.getEmployeeAttendance = async (req, res) => {
  const { id } = req.params;
  const attendance = await Attendance.find({ employee: id }).populate('employee', 'name email');
  res.status(200).json({ success: true, attendance });
};

// Update Attendance
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const updated = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Attendance not found' });
  res.status(200).json({ success: true, updated });
};

// Delete Attendance
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;
  const deleted = await Attendance.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Attendance not found' });
  res.status(200).json({ success: true, message: 'Attendance deleted' });
};
