import Employee from "../models/Employee.js";
import Attendance from "../models/attendanceModel.js";

/**
 * @route   POST /api/attendance/add
 * @desc    Mark Attendance
 * @access  Public (Modify as per authentication requirements)
 */
export const markAttendance = async (req, res) => {
  try {
    const { employeeId, status, date, timeIn, timeOut } = req.body;

    // ✅ Validate required fields
    if (!employeeId || !status || !date || !timeIn) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    // ✅ Validate Employee Existence
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    // ✅ Convert date to start and end of the day
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
      return res.status(400).json({ success: false, message: "Attendance already marked for this date" });
    }

    // ✅ Validate timeOut (must be after timeIn if provided)
    if (timeOut && timeOut <= timeIn) {
      return res.status(400).json({ success: false, message: "Time-out must be after time-in" });
    }

    // ✅ Save Attendance Record
    const attendance = new Attendance({
      employee: employeeId,
      status,
      date: startOfDay,
      timeIn,
      timeOut: timeOut || null
    });

    await attendance.save();

    console.log("✅ Attendance Marked Successfully:", attendance);
    res.status(201).json({ success: true, message: "Attendance marked successfully", attendance });
  } catch (error) {
    console.error("❌ Error marking attendance:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/attendance/all
 * @desc    Get All Attendance Records
 * @access  Public (Modify as per authentication requirements)
 */
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employee", "firstName lastName email")
      .lean();

    console.log("✅ Retrieved Attendance Records:", attendance.length);
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("❌ Error fetching attendance:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/attendance/:year/employee/:id
 * @desc    Get Attendance for a Specific Employee in a Given Year
 * @access  Public (Modify as per authentication requirements)
 */
export const getEmployeeAttendance = async (req, res) => {
  try {
    const { year, id } = req.params;

    if (!year || !id) {
      return res.status(400).json({ success: false, message: "Year and Employee ID are required" });
    }

    // ✅ Convert year to date range (Jan 1 - Dec 31)
    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

    // ✅ Fetch attendance within the specified year
    const attendance = await Attendance.find({
      employee: id,
      date: { $gte: startOfYear, $lte: endOfYear }
    })
      .populate("employee", "firstName lastName email")
      .lean();

    if (!attendance.length) {
      return res.status(404).json({ success: false, message: "No attendance records found for this year" });
    }

    console.log(`✅ Attendance retrieved for Employee ID: ${id} in Year: ${year}`);
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("❌ Error fetching employee attendance:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   PUT /api/attendance/update/:id
 * @desc    Update an Attendance Record
 * @access  Public (Modify as per authentication requirements)
 */
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { timeIn, timeOut } = req.body;

    // ✅ Validate timeOut (must be after timeIn if provided)
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

    console.log(`✅ Attendance Updated Successfully: ${id}`);
    res.status(200).json({ success: true, message: "Attendance updated successfully", updatedAttendance });
  } catch (error) {
    console.error("❌ Error updating attendance:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @route   DELETE /api/attendance/delete/:id
 * @desc    Delete an Attendance Record
 * @access  Public (Modify as per authentication requirements)
 */
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }

    console.log(`✅ Attendance Deleted Successfully: ${id}`);
    res.status(200).json({ success: true, message: "Attendance deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting attendance:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
