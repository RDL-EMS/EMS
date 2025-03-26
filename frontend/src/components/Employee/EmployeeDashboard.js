import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiBookOpen, FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi";
import "./EmployeeDashboard.css"; 

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (!employeeId) {
      navigate("/");
    }
  }, [navigate, employeeId]);

  return (
    <div className="dashboard-content">
      <h2 className="dashboard-title">Employee Dashboard</h2> {/* Title for clarity */}
      
      <div className="cards-grid">
        <div className="card-box leave-type">
          Leave Type <FiBookOpen size={30} />
        </div>
        <div className="card-box my-request">
          My Leave Request <FiUser size={30} />
        </div>
        <div className="card-box approved">
          Approved Request <FiCheckCircle size={30} />
        </div>
        <div className="card-box rejected">
          Rejected Request <FiXCircle size={30} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
