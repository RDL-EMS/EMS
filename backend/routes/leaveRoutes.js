const express = require("express");
const Leave = require("../models/Leave"); // Import Leave Model
const router = express.Router();

// ✅ Submit Leave Application (POST)
router.post("/", async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, description } = req.body;

    // Validate fields
    if (!leaveType || !fromDate || !toDate || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure toDate is after fromDate
    if (new Date(toDate) < new Date(fromDate)) {
      return res.status(400).json({ error: "To Date should be after From Date" });
    }

    // Create a new leave application
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

// ✅ Export the router
module.exports = router;
