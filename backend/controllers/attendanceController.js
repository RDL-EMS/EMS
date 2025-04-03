import Employee from "../models/EmployeeModel.js";
import Attendance from "../models/attendanceModel.js";

/**
 * @route   POST /api/attendance/add
 * @desc    Mark Attendance
 * @access  Public (Modify as per authentication requirements)
 */
export const markAttendance = async (req, res) => {
  try {
    const { employeeId, status, date, timeIn, timeOut } = req.body;

    if (!employeeId || !status || !date || !timeIn) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    if (existingAttendance) {
      return res.status(400).json({ success: false, message: "Attendance already marked for this date" });
    }

    if (timeOut && timeOut <= timeIn) {
      return res.status(400).json({ success: false, message: "Time-out must be after time-in" });
    }

    const attendance = new Attendance({
      employee: employeeId,
      status,
      date: startOfDay,
      timeIn,
      timeOut: timeOut || null
    });

    await attendance.save();
    res.status(201).json({ success: true, message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/attendance/all
 * @desc    Get All Attendance Records
 * @access  Public
 */
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("employee", "firstName lastName email").lean();
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/attendance/:year/employee/:id
 * @desc    Get Attendance for a Specific Employee in a Given Year
 * @access  Public
 */
export const getEmployeeAttendance = async (req, res) => {
  try {
    const { year, id } = req.params;

    if (!year || !id) {
      return res.status(400).json({ success: false, message: "Year and Employee ID are required" });
    }

    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

    const attendance = await Attendance.find({
      employee: id,
      date: { $gte: startOfYear, $lte: endOfYear }
    })
      .populate("employee", "firstName lastName email")
      .lean();

    if (!attendance.length) {
      return res.status(404).json({ success: false, message: "No attendance records found for this year" });
    }

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   PUT /api/attendance/update/:id
 * @desc    Update an Attendance Record
 * @access  Public
 */
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { timeIn, timeOut } = req.body;

    if (timeIn && timeOut && timeOut <= timeIn) {
      return res.status(400).json({ success: false, message: "Time-out must be after time-in" });
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedAttendance) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }

    res.status(200).json({ success: true, message: "Attendance updated successfully", updatedAttendance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   DELETE /api/attendance/delete/:id
 * @desc    Delete an Attendance Record
 * @access  Public
 */
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }

    res.status(200).json({ success: true, message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/attendance-summary
 * @desc    Get attendance summary (count of Present, Absent, etc.)
 * @access  Public
 */
export const attendanceSummary = async (req, res) => {
  try {
    const summary = await Attendance.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const totalRecords = summary.reduce((acc, record) => acc + record.count, 0);

    res.status(200).json({ 
      success: true, 
      totalRecords, 
      summary 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const history = await Attendance.find().sort({ date: -1 }); // Fetch attendance records sorted by date
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getAttendanceHistory = async (req, res) => {
  try {
    const history = await Attendance.find().sort({ date: -1 }); // Fetch attendance records sorted by date
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};