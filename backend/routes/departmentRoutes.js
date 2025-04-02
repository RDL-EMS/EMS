const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// Get all departments
router.get("/departments", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching departments", error });
  }
});

module.exports = router;
