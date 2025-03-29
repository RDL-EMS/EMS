import express from "express";
import Leave from "../models/Leave.js"; // ✅ Ensure correct ES module import

const router = express.Router();

// ✅ Submit Leave Application (POST)
router.post("/", async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, description } = req.body;

    if (!leaveType || !fromDate || !toDate || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (new Date(toDate) < new Date(fromDate)) {
      return res.status(400).json({ error: "To Date should be after From Date" });
    }

    const newLeave = new Leave({ leaveType, fromDate, toDate, description });
    await newLeave.save();

    res.status(201).json({ message: "Leave application submitted successfully", leave: newLeave });
  } catch (error) {
    res.status(500).json({ error: "Error submitting leave application" });
  }
});

// ✅ Get All Leave Applications (GET)
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leave applications" });
  }
});

// ✅ Use ES6 export
export default router;
