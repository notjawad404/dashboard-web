import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function LeakageForm() {
  const [formData, setFormData] = useState({
    leakageId: "",
    leakageType: "",
    modelScore: "",
    estimateSavings: "",
    observations: "",
    urgency: "low",
    status: "pending",
  });

  const navigate = useNavigate();

  // Set UUID for leakageId on component mount
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, leakageId: uuidv4() }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Fetch data from API
      await axios.post("http://localhost:5050/api/leakage", formData);
      alert("Leakage record added successfully!");
      // Navigate to the LeakagePage on successful form submission
      navigate("/LeakagePage");
    } catch (error) {
      console.error("Error adding leakage record", error);
      alert("Failed to add leakage record");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      
      <label className="block">
        <span className="text-gray-700">Leakage Type</span>
        <select 
          name="leakageType" 
          value={formData.leakageType} 
          onChange={handleChange} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="" disabled>Select Type</option>
          <option value="pipe">Pipe</option>
          <option value="valve">Valve</option>
          <option value="seal">Seal</option>
          <option value="joint">Joint</option>
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Model Score</span>
        <input 
          type="number" 
          name="modelScore" 
          value={formData.modelScore} 
          onChange={handleChange} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
          required 
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Estimated Savings</span>
        <input 
          type="number" 
          name="estimateSavings" 
          value={formData.estimateSavings} 
          onChange={handleChange} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
          required 
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Observations</span>
        <textarea 
          name="observations" 
          value={formData.observations} 
          onChange={handleChange} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
          rows="3"
        ></textarea>
      </label>

      <label className="block">
        <span className="text-gray-700">Urgency</span>
        <select 
          name="urgency" 
          value={formData.urgency} 
          onChange={handleChange} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <button 
        type="submit" 
        className="w-full bg-black text-white py-2 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};
