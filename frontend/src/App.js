import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import CSOPanel from "./Auth/CSOPanel";
import CSODashboard from "./components/Dashboard/CSODashboard";
import Attendance from "./pages/Attendance";
import TimeBook from "./pages/TimeBook";
import EmployeeLogin from "./components/Employee/EmployeeLogin";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import EmployeeSidebar from "./components/Employee/EmployeeSidebar";


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
  );
};

export default App;
