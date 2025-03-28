import axios from 'axios';

const API_URL = 'http://localhost:5000/api/attendance'; // Change port if needed

export const addAttendance = async (attendanceData) => {
  return await axios.post(API_URL, attendanceData);
};
