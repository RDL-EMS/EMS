import express from "express";
import Leave from "../models/Leave.js"; // ✅ Importing updated model

const router = express.Router();

// ✅ Add a new leave type (POST)
router.post("/", async (req, res) => {
  try {
    const { leaveType, days, status } = req.body;

    if (!leaveType || !days) {
      return res.status(400).json({ error: "Leave Type and Days are required" });
    }

    const newLeave = new Leave({ leaveType, days, status: status || "Active" });
    await newLeave.save();

    res.status(201).json({ message: "Leave type added successfully", leave: newLeave });
  } catch (error) {
    console.error("🚨 Error adding leave type:", error);
    res.status(500).json({ error: "Failed to add leave type" });
  }
});

// ✅ Get all leave types (GET)
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    console.error("🚨 Error fetching leave types:", error);
    res.status(500).json({ error: "Failed to fetch leave types" });
  }
});

// ✅ Update leave status (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Status is required" });

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ error: "Leave type not found" });
    }

    res.json({ message: "Leave status updated successfully", leave: updatedLeave });
  } catch (error) {
    console.error("🚨 Error updating leave status:", error);
    res.status(500).json({ error: "Failed to update leave status" });
  }
});

// ✅ Delete a leave type (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedLeave = await Leave.findByIdAndDelete(req.params.id);

    if (!deletedLeave) {
      return res.status(404).json({ error: "Leave type not found" });
    }

    res.json({ message: "Leave type deleted successfully" });
  } catch (error) {
    console.error("🚨 Error deleting leave type:", error);
    res.status(500).json({ error: "Failed to delete leave type" });
  }
});

// ✅ Use ES6 export
export default router;
