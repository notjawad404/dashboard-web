import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams  } from "react-router-dom";

const AuditForm = () => {
  const [leakageId, setLeakageId] = useState("");
  const [auditorId, setAuditorId] = useState("");
  const [pendingSavings, setPendingSavings] = useState("");
  const [actualSavings, setActualSavings] = useState("");
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const LeakageId = searchParams.get('leakageId');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auditData = {
      leakageId: LeakageId,
      auditorId,
      pendingSavings: parseFloat(pendingSavings),
      actualSavings: parseFloat(actualSavings),
      note,
    };


    try {
      const response = await axios.post("http://localhost:5050/api/audit", auditData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      // After the audit data is successfully submitted, update the leakage status
    const leakageUpdateResponse = await axios.put(`http://localhost:5050/api/leakages/${LeakageId}`, {
      status: "confirmed"
    });

    console.log(leakageUpdateResponse.data);

      // Clear form fields after successful submission
      setLeakageId("");
      setAuditorId("");
      setPendingSavings("");
      setActualSavings("");
      setNote("");

      alert("Leakage record added successfully!");
      // Navigate to the LeakagePage on successful form submission
      navigate("/leakagepage");
    } catch (error) {
      alert("Failed to create audit record");
      console.error("Error creating audit record:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 mx-auto mt-4 p-4 bg-white shadow-md rounded-lg space-y-4">

      <div className="space-y-1">
        <label className="block text-gray-700">Auditor ID:</label>
        <input
          type="text"
          value={auditorId}
          onChange={(e) => setAuditorId(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-gray-700">Actual Savings:</label>
        <input
          type="number"
          value={actualSavings}
          onChange={(e) => setActualSavings(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-gray-700">Pending Savings:</label>
        <input
          type="number"
          value={pendingSavings}
          onChange={(e) => setPendingSavings(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-gray-700">Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows="3"
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="w-full bg-black text-white py-2 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>

    </form>
  );
};

export default AuditForm;
