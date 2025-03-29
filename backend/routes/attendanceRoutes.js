import express from "express";
import { 
  markAttendance,      
  getAllAttendance,    
  getEmployeeAttendance, 
  updateAttendance,    
  deleteAttendance    
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/add", markAttendance);
router.get("/all", getAllAttendance);
router.get("/:id", getEmployeeAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
