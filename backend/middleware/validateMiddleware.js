exports.validateAttendance = (req, res, next) => {
    const { employeeId, status } = req.body;
    if (!employeeId || !status) {
      return res.status(400).json({ message: 'Employee ID and status are required' });
    }
    const validStatuses = ['Present', 'Absent', 'Leave'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    next();
  };
  