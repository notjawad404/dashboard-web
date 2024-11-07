import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const AuditForm = () => {
  const [auditorId, setAuditorId] = useState("");
  const [pendingSavings, setPendingSavings] = useState("");
  const [actualSavings, setActualSavings] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const LeakageId = searchParams.get('leakageId'); // Using this directly

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    const auditData = {
      leakageId: LeakageId,
      auditorId,
      pendingSavings: parseFloat(pendingSavings),
      actualSavings: parseFloat(actualSavings),
      note,
    };
  
    try {
      // Submit the audit data
      const response = await axios.post("https://dasbboard-backend.vercel.app/api/audit/audit", auditData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log(response.data);
  
      // Clear form fields after successful submission
      setAuditorId("");
      setPendingSavings("");
      setActualSavings("");
      setNote("");
  
      alert("Audit record added successfully!");
      // Redirect to the previous page
      window.history.back();
  
    } catch (error) {
      console.error("Error creating audit record:", error);
      alert("Failed to create audit record.");
    } finally {
      setLoading(false);
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
        disabled={loading}
        className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"} text-white py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AuditForm;
