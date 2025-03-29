import express from "express";
import nodemailer from "nodemailer";
import Employee from "../models/EmployeeModel.js"; 

const router = express.Router();

// 📌 Nodemailer Setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "sdswathi790@gmail.com",
    pass: "tdngpmhracbixlme",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 📌 Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Add an Employee (Instant Response & Background Email)
router.post("/", async (req, res) => {
  const { EMPiD, Name, Joindate, Address, Email, Contact, Profile, Role } = req.body;

  // ✅ Validate required fields
  if (!EMPiD || !Name || !Joindate || !Address || !Email || !Contact || !Profile || !Role) {
    return res.status(400).json({ message: "❌ All fields are required." });
  }

  try {
    // ✅ Check for duplicate email
    const existingEmployee = await Employee.findOne({ Email });
    if (existingEmployee) {
      return res.status(400).json({ message: "❌ Email already exists. Use a different email." });
    }

    // ✅ Save employee to database
    const newEmployee = await Employee.create(req.body);

    // ✅ Immediately Send Response (Without Waiting for Email)
    res.status(201).json({ message: "✅ Employee added successfully!", newEmployee });

    // 📧 Prepare Email Options (Send Email in Background)
    const mailOptions = {
      from: "sdswathi790@gmail.com",
      to: newEmployee.Email,
      subject: "🎉 Welcome to Our Company - Your Employee ID is Created",
      html: `
        <p>Dear <strong>${newEmployee.Name}</strong>,</p>
        <p>Your Employee ID has been successfully created.</p>
        <p><strong>Employee ID:</strong> ${newEmployee.EMPiD}</p>
        <p>Welcome to the team! We look forward to working with you.</p>
        <br/>
        <p>Best Regards,<br/>HR Team</p>
      `,
    };

    // ✅ Send Email Asynchronously
    transporter.sendMail(mailOptions).catch(() => {});

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Update employee by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Delete employee by ID
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
