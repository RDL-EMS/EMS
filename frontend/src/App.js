import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";

// ✅ Context Provider for Attendance
import { AttendanceProvider } from "./context/AttendanceContext";

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
import AttendancePage from "./pages/Attendance1";
import TimeBook from "./pages/TimeBook";
import Attendance from "./pages/Attendance";

// ✅ Layout Components
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
    <AttendanceProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        
        {/* ✅ Sidebar (Visible unless on Login/Home Page) */}
        {!hideLayout && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

        {/* ✅ Main Content Section */}
        <Box sx={{ flexGrow: 1, ml: hideLayout ? 0 : isSidebarOpen ? "250px" : "60px", transition: "margin 0.3s ease-in-out" }}>
          
          {/* ✅ Header (Visible unless on Login/Home Page) */}
          {!hideLayout && <Header />}
          
          {/* ✅ Toast Notifications */}
          <ToastContainer />

          {/* ✅ Routes */}
          <Box sx={{ p: 3 }}>
            <Routes>
              {/* ✅ Common Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cso" element={<CSOPanel />} />
              <Route path="/cso-dashboard" element={<CSODashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/attendance" element={<AttendancePage />} />
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
    </AttendanceProvider>
  );
};

export default App;
