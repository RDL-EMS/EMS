import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ CSO Components
import Home from "./pages/Home";
import CSOPanel from "./Auth/CSOPanel";
import CSODashboard from "./components/Dashboard/CSODashboard";
import CSOAttendance from "./pages/Attendance"; // ✅ CSO Attendance
import TimeBook from "./pages/TimeBook";

// ✅ Employee Components
import EmployeeLogin from "./components/Employee/EmployeeLogin";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import EmployeeLeaveHistory from "./components/Employee/EmployeeLeaveHistory";
import EmployeeChangePassword from "./components/Employee/EmployeeChangePassword";
import EmployeeAttendanceHistory from "./components/Employee/EmployeeAttendanceHistory";

// ✅ HR Components
import HRDashboard from "./components/Dashboard/HRDashboard";
import AddEmployeeForm from "./components/HRPanel/AddEmployeeForm";

// ✅ Attendance Management Components for HR
import AddAttendanceForm from "./components/Attendance/AddAttendanceForm";
import AttendanceHistory from "./components/Attendance/AttendanceHistory";
import AttendanceList from "./components/Attendance/AttendanceList";
import AttendanceReport from "./components/Attendance/AttendanceReport";

// ✅ Layouts (Protected Routes)
import CSOProtectedLayout from "./components/Layout/CSOProtectedLayout";
import EmployeeProtectedLayout from "./components/Layout/EmployeeProtectedLayout";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cso" element={<CSOPanel />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        {/* ✅ CSO/Admin Routes (Protected) */}
        <Route
          path="/cso-dashboard"
          element={
            <CSOProtectedLayout>
              <CSODashboard />
            </CSOProtectedLayout>
          }
        />
        <Route
          path="/cso/attendance"
          element={
            <CSOProtectedLayout>
              <CSOAttendance />
            </CSOProtectedLayout>
          }
        />
        <Route
          path="/time-book"
          element={
            <CSOProtectedLayout>
              <TimeBook />
            </CSOProtectedLayout>
          }
        />

        {/* ✅ Employee Routes (Protected) */}
        <Route
          path="/dashboard"
          element={
            <EmployeeProtectedLayout>
              <EmployeeDashboard />
            </EmployeeProtectedLayout>
          }
        />
        <Route
          path="/leave-history"
          element={
            <EmployeeProtectedLayout>
              <EmployeeLeaveHistory />
            </EmployeeProtectedLayout>
          }
        />
        <Route
          path="/change-password"
          element={
            <EmployeeProtectedLayout>
              <EmployeeChangePassword />
            </EmployeeProtectedLayout>
          }
        />
        <Route
          path="/attendance-history"
          element={
            <EmployeeProtectedLayout>
              <EmployeeAttendanceHistory />
            </EmployeeProtectedLayout>
          }
        />

        {/* ✅ HR Routes */}
        <Route path="/HRDashboard" element={<HRDashboard />} />
        <Route path="/AddEmployeeForm" element={<AddEmployeeForm />} />

        {/* ✅ HR Attendance Management Routes */}
        <Route path="/hr/attendance-list" element={<AttendanceList />} />
        <Route path="/hr/attendance-history" element={<AttendanceHistory />} />
        <Route path="/hr/attendance-report" element={<AttendanceReport />} />
        <Route path="/attendance/add" element={<AddAttendanceForm />} />
      </Routes>

      {/* ✅ Toast Notification Component */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
