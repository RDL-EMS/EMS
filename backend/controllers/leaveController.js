import Leave from "../models/leaveModel.js";  // Ensure the correct path

// @desc    Apply for leave
// @route   POST /api/leave/apply
// @access  Public
export const applyLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate } = req.body;

    if (!employeeId || !leaveType || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = new Leave({
      employeeId,
      leaveType,
      startDate,
      endDate,
    });

    await leave.save();
    res.status(201).json({ success: true, message: "Leave applied successfully", leave });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get all leave requests
// @route   GET /api/leave/all
// @access  Public
export const getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId", "name email"); // Fetch with employee details
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Delete a leave request
// @route   DELETE /api/leave/delete/:id
// @access  Public
export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndDelete(id);

    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave request not found" });
    }

    res.status(200).json({ success: true, message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
