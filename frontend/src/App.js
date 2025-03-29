import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ CSO Components
import Home from "./pages/Home";
import CSOPanel from "./Auth/CSOPanel.js";
import CSODashboard from "./components/Dashboard/CSODashboard";
import Attendance from "./pages/Attendance";
import TimeBook from "./pages/TimeBook";

// ✅ Employee Components
import EmployeeLogin from "./components/Employee/EmployeeLogin";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard.js";
import EmployeeLeaveHistory from "./components/Employee/EmployeeLeaveHistory.js";
import EmployeeChangePassword from "./components/Employee/EmployeeChangePassword.js";
import EmployeeAttendanceHistory from "./components/Employee/EmployeeAttendanceHistory.js";

// ✅ HR Components
import HRDashboard from "./components/Dashboard/HRDashboard.js";
import AddEmployeeForm from "./components/HRPanel/AddEmployeeForm.js";

// ✅ Layouts
import CSOProtectedLayout from "./components/Layout/CSOProtectedLayout.js";
import EmployeeProtectedLayout from "./components/Layout/EmployeeProtectedLayout";

const isAuthenticated = () => !!localStorage.getItem("token");

const App = () => {
  const location = useLocation();
  const hideLayout = ["/cso", "/", "/employee-login"].includes(location.pathname);

  return (
    <div className="app-container">
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cso" element={<CSOPanel />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        {/* ✅ CSO/Admin Routes (Protected) */}
        <Route path="/cso-dashboard" element={<CSOProtectedLayout><CSODashboard /></CSOProtectedLayout>} />
        <Route path="/attendance" element={<CSOProtectedLayout><Attendance /></CSOProtectedLayout>} />
        <Route path="/time-book" element={<CSOProtectedLayout><TimeBook /></CSOProtectedLayout>} />

        {/* ✅ Employee Routes (Protected) */}
        <Route path="/dashboard" element={<EmployeeProtectedLayout><EmployeeDashboard /></EmployeeProtectedLayout>} />
        <Route path="/leave-history" element={<EmployeeProtectedLayout><EmployeeLeaveHistory /></EmployeeProtectedLayout>} />
        <Route path="/change-password" element={<EmployeeProtectedLayout><EmployeeChangePassword /></EmployeeProtectedLayout>} />
        <Route path="/attendance-history" element={<EmployeeProtectedLayout><EmployeeAttendanceHistory /></EmployeeProtectedLayout>} />

        {/* ✅ HR Routes */}
        <Route path="/HRDashboard" element={<HRDashboard />} />
        <Route path="/AddEmployeeForm" element={<AddEmployeeForm />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
