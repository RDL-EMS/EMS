import EmployeeLogin from "./components/Employee/EmployeeLogin";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import EmployeeLeaveHistory from "./components/Employee/EmployeeLeaveHistory";
import EmployeeChangePassword from "./components/Employee/EmployeeChangePassword";
import EmployeeAttendanceHistory from "./components/Employee/EmployeeAttendanceHistory";
import Sidebar from "./components/Employee/EmployeeSidebar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedLayout = ({ children }) => {
  return isAuthenticated() ? (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/dashboard" element={<ProtectedLayout><EmployeeDashboard /></ProtectedLayout>} />
        <Route path="/leave-history" element={<ProtectedLayout><EmployeeLeaveHistory /></ProtectedLayout>} />
        <Route path="/change-password" element={<ProtectedLayout><EmployeeChangePassword /></ProtectedLayout>} />
        <Route path="/attendance-history" element={<ProtectedLayout><EmployeeAttendanceHistory /></ProtectedLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
