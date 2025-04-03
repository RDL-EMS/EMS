import express from "express";
import Department from "../models/Department.js";

const router = express.Router();

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new department
router.post("/", async (req, res) => {
  try {
    const { departmentName, status } = req.body;
    const newDepartment = new Department({ departmentName, status });
    await newDepartment.save();
    res.status(201).json({ message: "Department added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add department" });
  }
});


router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { departmentName, status } = req.body;
  
      const updatedDepartment = await Department.findByIdAndUpdate(
        id,
        { departmentName, status },
        { new: true }
      );
  
      if (!updatedDepartment) {
        return res.status(404).json({ message: "Department not found" });
      }
  
      res.status(200).json(updatedDepartment);
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("🗑️ Backend received DELETE request for ID:", id);
  
      const deletedDepartment = await Department.findByIdAndDelete(id);
  
      if (!deletedDepartment) {
        return res.status(404).json({ message: "Department not found" });
      }
  
      res.status(200).json({ message: "✅ Department deleted successfully!" });
    } catch (error) {
      console.error("❌ Error deleting department:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
export default router;
