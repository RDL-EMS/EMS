import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";

// ✅ Employee Components
import EmployeeLogin from "./components/Employee/EmployeeLogin";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import EmployeeLeaveHistory from "./components/Employee/EmployeeLeaveHistory";
import EmployeeChangePassword from "./components/Employee/EmployeeChangePassword";
import EmployeeAttendanceHistory from "./components/Employee/EmployeeAttendanceHistory";
import EmployeeSidebar from "./components/Employee/EmployeeSidebar";

// ✅ CSO/Admin Components
import Home from "./pages/Home";
import CSOPanel from "./Auth/CSOPanel";
import CSODashboard from "./components/Dashboard/CSODashboard";
import Attendance from "./pages/Attendance";
import TimeBook from "./pages/TimeBook";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";

// ✅ Employee Authentication Check
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// ✅ Protected Layout for Employees (With Sidebar)
const EmployeeProtectedLayout = ({ children }) => {
  return isAuthenticated() ? (
    <div style={{ display: "flex" }}>
      <EmployeeSidebar />
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

// ✅ Main App Component
const App = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ Hide Sidebar & Header on login and home page
  const hideLayout = location.pathname === "/cso" || location.pathname === "/";

  return (
    <Box sx={{ display: "flex" }}>
      {!hideLayout && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

      <Box sx={{ flexGrow: 1, ml: hideLayout ? 0 : isSidebarOpen ? "250px" : "60px", transition: "margin 0.3s ease-in-out" }}>
        {!hideLayout && <Header />}

        <ToastContainer />

        <Box sx={{ mt: hideLayout ? 0 : 8, p: 3 }}>
          <Routes>
            {/* ✅ Common Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cso" element={<CSOPanel />} />
            <Route path="/cso-dashboard" element={<CSODashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/time-book" element={<TimeBook />} />

            {/* ✅ Employee Routes (Protected) */}
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/dashboard" element={<EmployeeProtectedLayout><EmployeeDashboard /></EmployeeProtectedLayout>} />
            <Route path="/leave-history" element={<EmployeeProtectedLayout><EmployeeLeaveHistory /></EmployeeProtectedLayout>} />
            <Route path="/change-password" element={<EmployeeProtectedLayout><EmployeeChangePassword /></EmployeeProtectedLayout>} />
            <Route path="/attendance-history" element={<EmployeeProtectedLayout><EmployeeAttendanceHistory /></EmployeeProtectedLayout>} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
