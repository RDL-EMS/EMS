const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee"); // Import the Employee model

// ✅ Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

// ✅ Get Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee" });
  }
});

// ✅ Export the router (MUST BE HERE)
module.exports = router;
