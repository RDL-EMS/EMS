import express from "express";
import Employee from "../models/Employee.js"; 

const router = express.Router();

router.post("/employee/login", async (req, res) => {
    const { employeeId, email } = req.body;

    try {
        if (!employeeId || !email) {
            return res.status(400).json({ message: "Employee ID and Email are required" });
        }

        const employee = await Employee.findOne({ employeeId, email });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({
            message: "Employee Login successful",
            employeeId: employee.employeeId,
            email: employee.email,
            token: "your-auth-token", // Replace with actual JWT token generation
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;
