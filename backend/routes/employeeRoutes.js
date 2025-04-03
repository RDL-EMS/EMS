import express from "express";
import multer from "multer";
import Employee from "../models/EmployeeModel.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import nodemailer from "nodemailer";
import authenticate from "../middleware/authMiddleware.js";  // ✅ Correct path for backend
// ✅ Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store in memory (use disk storage if needed)
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sdswathi790@gmail.com", // Replace with your email
    pass: "sboj kyvg dqpx hvkj", // Use App Password for Gmail
  },
});

router.post("/", upload.single("Profile"), async (req, res) => {
  console.log("🔍 Request Body:", req.body);
  console.log("🔍 Uploaded File:", req.file);

  const { EMPiD, Name, Joindate, Address, Email, Contact, Role } = req.body;
  const Profile = req.file ? req.file.buffer.toString("base64") : null; // Convert file to Base64

  // ✅ Check for missing fields
  if (!EMPiD || !Name || !Joindate || !Address || !Email || !Contact || !Profile || !Role) {
    return res.status(400).json({ message: "❌ All fields are required." });
  }

  try {
    // ✅ Ensure Email is not empty before saving
    if (!Email.trim()) {
      return res.status(400).json({ message: "❌ Email cannot be empty or null." });
    }

    // ✅ Check if an employee with this email already exists
    const existingEmployee = await Employee.findOne({ Email });
    if (existingEmployee) {
      return res.status(400).json({ message: "❌ Email already exists. Use a different email." });
    }

    // ✅ Save the new employee
    const newEmployee = await Employee.create({
      EMPiD,
      Name,
      Joindate,
      Address,
      Email,
      Contact,
      Profile,
      Role,
    });
    const mailOptions = {
      from: "your-email@gmail.com",
      to: Email,
      subject: "Welcome to Our Company!",
      text: `Hello ${Name},\n\nYour Employee ID (${EMPiD}) has been created.\nYou can log in using your Employee ID and Email.\n\nBest Regards,\nHR Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: "✅ Employee added successfully!", newEmployee });

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "❌ Server error: " + error.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { employeeID, email } = req.body;

  try {
      const employee = await Employee.findOne({ EMPiD: employeeID, Email: email });

      if (!employee) {
          return res.status(400).json({ message: "❌ Invalid Employee ID or Email" });
      }

      // ✅ Generate JWT Token
      const token = jwt.sign(
          { id: employee._id, EMPiD: employee.EMPiD, email: employee.Email, role: employee.Role },
          "your-secret-key",  // 🔹 Replace this with a secure key (store in .env)
          { expiresIn: "1h" } // Token expires in 1 hour
      );

      console.log("Generated Token:", token);  // ✅ Debugging Step

      res.json({ message: "✅ Login Successful", token });
  } catch (error) {
      console.error("❌ Error in Login Route:", error);
      res.status(500).json({ message: "❌ Server Error" });
  }
});




export default router;
