
// D:\EMS\frontend\src\services\attendanceService.js
const API_URL = 'http://localhost:5000/api/attendance';

export const fetchAttendance = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addAttendance = async (attendance) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attendance),
  });
  return response.json();
};