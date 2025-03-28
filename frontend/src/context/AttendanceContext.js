import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/attendance");
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <AttendanceContext.Provider value={{ attendanceData, setAttendanceData }}>
      {children}
    </AttendanceContext.Provider>
  );
};
