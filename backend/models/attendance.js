const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  empId: { type: String, required: true },
  date: { type: String, required: true },
  punchIn: { type: String, required: true },
  punchOut: { type: String, default: "" },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
