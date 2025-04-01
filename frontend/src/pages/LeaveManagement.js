import React, { useState } from "react";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);

  // Function to format date as DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Converts to DD/MM/YYYY format
  };

  const handleApprove = (id) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "Approved" } : leave
      )
    );
  };

  const handleReject = (id) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "Rejected" } : leave
      )
    );
  };

  const handleAddLeave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLeave = {
      id: Date.now(),
      from: formData.get("from"),
      to: formData.get("to"),
      reason: formData.get("reason"),
      status: "Pending",
    };
    setLeaves([...leaves, newLeave]);
    e.target.reset();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Leave History</h2>

        {/* Leave Form */}
        <form onSubmit={handleAddLeave} className="mb-4 space-x-2">
          <input type="date" name="from" required className="border p-2 rounded" />
          <input type="date" name="to" required className="border p-2 rounded" />
          <input type="text" name="reason" placeholder="Reason" required className="border p-2 rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            ➕ Add Leave
          </button>
        </form>

        {/* Leave Table */}
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2">From Date</th>
              <th className="p-2">To Date</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr key={leave.id} className="border-t">
                  <td className="p-2 text-center">{formatDate(leave.from)}</td>
                  <td className="p-2 text-center">{formatDate(leave.to)}</td>
                  <td className="p-2 text-center">{leave.reason}</td>
                  <td className={`p-2 text-center ${leave.status === "Approved" ? "text-green-600" : "text-gray-600"}`}>
                    {leave.status}
                  </td>
                  <td className="p-2 text-center">
                    {leave.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(leave.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleReject(leave.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          ❌ Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-700">✔ Action Taken</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No leave records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;
