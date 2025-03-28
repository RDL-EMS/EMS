<
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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

import EmployeeLogin from "./components/Employee/EmployeeLogin";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import EmployeeSidebar from "./components/Employee/EmployeeSidebar";

import Sidebar from "./components/Layout/Sidebar";
import Navbar from "./components/Layout/Navbar";
import Header from "./components/Layout/Header";



// ✅ Authentication Check
const isAuthenticated = () => !!localStorage.getItem("token");

// ✅ Layout for Employee (Separate Sidebar)
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

const App = () => {
  const location = useLocation();

  return (

    <>
      <ToastContainer />
      
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cso" element={<CSOPanel />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        {/* ✅ CSO/Admin Routes (Sidebar in CSODashboard) */}
        <Route path="/cso-dashboard" element={<CSODashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/time-book" element={<TimeBook />} />

        {/* ✅ Employee Routes */}
        <Route path="/dashboard" element={<EmployeeProtectedLayout><EmployeeDashboard /></EmployeeProtectedLayout>} />
      </Routes>
      
    </>
=======
    <AttendanceProvider>
      <Box sx={{ display: "flex", backgroundColor: "#0b1f3a", minHeight: "100vh" }}>
        {!hideLayout && <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

        <Box sx={{ flexGrow: 1, ml: hideLayout ? 0 : isSidebarOpen ? "250px" : "60px", transition: "margin 0.3s ease-in-out" }}>
          {!hideLayout && <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
          {!hideLayout && <Header />}

          <ToastContainer />

          <Box sx={{ mt: hideLayout ? 0 : 8, p: 3 }}>
            <Routes>
              {/* ✅ Common Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cso" element={<CSOPanel />} />
              <Route path="/cso-dashboard" element={<CSODashboard />} />
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
