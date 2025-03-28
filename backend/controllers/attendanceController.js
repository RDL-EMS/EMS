const Attendance = require('../models/attendanceModel');
const Employee = require('../models/Employee');

// ✅ Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, status, date, timeIn, timeOut } = req.body;

    // ✅ Check for missing fields
    if (!employeeId || !status || !date || !timeIn) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    // ✅ Validate Employee Existence
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // ✅ Convert date to start and end of the day (fixes duplicate check)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // ✅ Check if attendance already exists for this date
    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    if (existingAttendance) {
      return res.status(400).json({ success: false, message: 'Attendance already marked for this date' });
    }

    // ✅ Save Attendance Record
    const attendance = new Attendance({
      employee: employeeId,
      status,
      date: startOfDay,
      timeIn,
      timeOut: timeOut || null // ✅ Allows timeOut to be optional
    });

    await attendance.save();

    console.log('✅ Attendance Marked Successfully:', attendance);
    res.status(201).json({ success: true, message: 'Attendance marked successfully', attendance });
  } catch (error) {
    console.error('❌ Error marking attendance:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// ✅ Get All Attendance Records
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate('employee', 'firstName lastName email') // ✅ Ensure correct Employee fields
      .lean();

    console.log('✅ Retrieved Attendance Records:', attendance.length);
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error('❌ Error fetching attendance:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// ✅ Get Attendance for a Specific Employee
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate Employee ID
    const attendance = await Attendance.find({ employee: id })
      .populate('employee', 'firstName lastName email')
      .lean();

    if (!attendance.length) {
      return res.status(404).json({ success: false, message: 'No attendance records found' });
    }

    console.log(`✅ Attendance retrieved for Employee ID: ${id}`);
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error('❌ Error fetching employee attendance:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// ✅ Update Attendance Record
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Ensure timeOut > timeIn when updating
    if (req.body.timeIn && req.body.timeOut && req.body.timeOut <= req.body.timeIn) {
      return res.status(400).json({ success: false, message: 'Time-out must be after Time-in' });
    }

    // ✅ Update Attendance with Validation
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedAttendance) {
      return res.status(404).json({ success: false, message: 'Attendance not found' });
    }

    console.log(`✅ Attendance Updated Successfully: ${id}`);
    res.status(200).json({ success: true, message: 'Attendance updated successfully', updatedAttendance });
  } catch (error) {
    console.error('❌ Error updating attendance:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// ✅ Delete Attendance Record
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Delete Attendance Entry
    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance) {
      return res.status(404).json({ success: false, message: 'Attendance not found' });
    }

    console.log(`✅ Attendance Deleted Successfully: ${id}`);
    res.status(200).json({ success: true, message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting attendance:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
