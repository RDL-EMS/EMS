import express from "express";
import { applyLeave, getAllLeaveRequests, deleteLeave } from "../controllers/leaveController.js";

const router = express.Router();

/**
 * @route   POST /api/leave/apply
 * @desc    Apply for Leave
 * @access  Public
 */
router.post("/apply", applyLeave);

/**
 * @route   GET /api/leave/all
 * @desc    Get All Leave Requests
 * @access  Public
 */
router.get("/all", getAllLeaveRequests);

/**
 * @route   DELETE /api/leave/delete/:id
 * @desc    Delete a Leave Request
 * @access  Public
 */
router.delete("/delete/:id", deleteLeave);

export default router;
