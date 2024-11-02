import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import placeholderImage from '../../assets/PlaceholderImage.png'

const LeakagePage = () => {
  const [leakages, setLeakages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeakages = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/leakages");
        setLeakages(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch leakage records");
      } finally {
        setLoading(false);
      }
    };

    fetchLeakages();
  }, []);

  const handleConfirm = (leakageId) => {
    console.log("leakage ID:", leakageId);
    navigate(`/auditform?leakageId=${leakageId}`);
  };

  const handleAddLeakage = () => {
    navigate("/leakageform")
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full  mx-auto p-4">

      <div>
        <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-semibold mb-4">Leakage Records</h2>
        <button onClick={() => handleAddLeakage()} className="py-2 px-4 bg-gray-200 border border-gray-300 rounded">Add Leakage</button>

        </div>
        {leakages.map((leakage) => (
          <div key={leakage.leakageId} className="w-3/4 border border-gray-300 p-4 mb-4 rounded-lg shadow-md flex flex-row" >
            <div className="w-1/4 p-4 h-min">
            <img src={placeholderImage} alt=""/>
            <p></p>
            </div>

            <div className="w-3/4 py-4">
            <div>
                <h1 className="text-lg font-bold py-1">{leakage.leakageType} - {leakage.status === "pending" ? "Opened" : "Closed"}</h1>
                <p className="text-gray-600 py-2">{leakage.observations}</p>
                <p className=" font-medium py-1">Estimated Savings: <span className=" font-normal text-gray-500">{leakage.estimateSavings}$</span></p>
              </div>
              <div className="flex justify-between">
              
              <div className="flex items-center">
                {leakage.status === "pending" && (
                  <>
                    <button onClick={() => handleConfirm(leakage._id)} className="mr-2 py-1 px-2 bg-blue-500 text-white rounded">Confirm</button>
                    <button className="mr-2 py-1 px-2 bg-red-500 text-white rounded">Reject</button>
                    <button className="py-1 px-2 bg-gray-300 rounded">Notes</button>
                  </>
                )}
                {leakage.status === "confirm" && (
                  <>
                    <button className="mr-2 py-1 px-2 bg-green-500 text-white rounded">Confirmed</button>
                    <button className="py-1 px-2 bg-gray-300 rounded">Notes</button>
                  </>
                )}
                {leakage.status === "reject" && (
                  <>
                    <button className="mr-2 py-1 px-2 bg-red-700 text-white rounded">Rejected</button>
                    <button className="py-1 px-2 bg-gray-300 rounded">Notes</button>
                  </>
                )}
              </div>
              <div className="flex flex-row mt-2 ">
              <img src="https://easydrawingguides.com/wp-content/uploads/2022/01/how-to-draw-a-cartoon-woman-featured-image-1200-801x1024.png" alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              <div>
              <p className=" text-base">Thomas Nieto</p>
              <p className="text-gray-700 text-sm">Data Scientist</p>
              </div>
            </div>
            </div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeakagePage;
