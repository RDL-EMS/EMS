import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Import Pages
import Home from "./pages/Home";
import CSOPanel from "./Auth/CSOPanel";
import CSODashboard from "./components/Dashboard/CSODashboard";
import CSOAttendance from "./pages/Attendance"; 
import TimeBook from "./pages/TimeBook";

import EmployeeLogin from "./components/Employee/EmployeeLogin";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import EmployeeLeaveHistory from "./components/Employee/EmployeeLeaveHistory";
import EmployeeChangePassword from "./components/Employee/EmployeeChangePassword";
import EmployeeAttendanceHistory from "./components/Employee/EmployeeAttendanceHistory";

// ✅ HR Components
import HRDashboard from "./components/Dashboard/HRDashboard";
import AddEmployeeForm from "./components/HRPanel/AddEmployeeForm";
import DepartmentPage from "./components/HRPanel/Department"; // ✅ Added Department Page

// ✅ Attendance Management (HR)
import AddAttendanceForm from "./components/Attendance/AddAttendanceForm";
import AttendanceHistory from "./components/Attendance/AttendanceHistory";
import AttendanceList from "./components/Attendance/AttendanceList";
import AttendanceReport from "./components/Attendance/AttendanceReport";

// ✅ Layouts
import CSOProtectedLayout from "./components/Layout/CSOProtectedLayout";
import HRProtectedLayout from "./components/Layout/HRProtectedLayout";  
import EmployeeProtectedLayout from "./components/Layout/EmployeeProtectedLayout";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cso" element={<CSOPanel />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        {/* ✅ CSO Routes (Protected) */}
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

        {/* ✅ HR Routes (Protected) */}
        <Route
          path="/hr-dashboard"
          element={
            <HRProtectedLayout>  
              <HRDashboard />
            </HRProtectedLayout>
          }
        />
        <Route
          path="/hr/add-employee"
          element={
            <HRProtectedLayout>
              <AddEmployeeForm />
            </HRProtectedLayout>
          }
        />
        <Route
          path="/hr/department"
          element={
            <HRProtectedLayout>
              <DepartmentPage />
            </HRProtectedLayout>
          }
        />

        {/* ✅ HR Attendance Management */}
        <Route
          path="/hr/attendance-list"
          element={
            <HRProtectedLayout>
              <AttendanceList />
            </HRProtectedLayout>
          }
        />
        <Route
          path="/hr/attendance-history"
          element={
            <HRProtectedLayout>
              <AttendanceHistory />
            </HRProtectedLayout>
          }
        />
        <Route
          path="/hr/attendance-report"
          element={
            <HRProtectedLayout>
              <AttendanceReport />
            </HRProtectedLayout>
          }
        />
        <Route
          path="/attendance/add"
          element={
            <HRProtectedLayout>
              <AddAttendanceForm />
            </HRProtectedLayout>
          }
        />

        {/* ✅ Employee Routes */}
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
      </Routes>

      {/* ✅ Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
