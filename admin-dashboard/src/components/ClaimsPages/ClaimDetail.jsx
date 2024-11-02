import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClaimDetail(){
  const [claim, setClaim] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch claim data by ID
    const fetchClaim = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/claims/672677f827b0b72c6858e587`);
        console.log("Response data = "+response.data);
        setClaim(response.data);
      } catch (e) {
        console.error(e);
        setError('Claim not found');
      }
    };

    fetchClaim();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!claim) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Claim Details</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><strong>Claim No:</strong> {claim.claimNo}</div>
        <div><strong>Claim Amount:</strong> ${claim.claimAmount}</div>
        <div><strong>Claim Type:</strong> {claim.claimType}</div>
        <div><strong>Claim Handler:</strong> {claim.claimHandler}</div>
        <div><strong>Claim Date:</strong> {new Date(claim.claimDate).toLocaleDateString()}</div>
        <div><strong>Report Date:</strong> {new Date(claim.reportDate).toLocaleDateString()}</div>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">Description</h2>
        <p>{claim.description}</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">Notes</h2>
        <p>{claim.notes}</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">Resolution Timeline Estimate</h2>
        <p>{claim.resolutionTimelineEstimate}</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">Payments Made</h2>
        <p>{claim.paymentsMade}</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">Reports</h2>
        <ul className="list-none">
          <li>Police Report: {claim.reports.policeReport ? '✔️' : '❌'}</li>
          <li>Witness Report: {claim.reports.witnessReport ? '✔️' : '❌'}</li>
          <li>Medical Report: {claim.reports.medicalReport ? '✔️' : '❌'}</li>
          <li>Appraisal Report: {claim.reports.appraisalReport ? '✔️' : '❌'}</li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold">Claim Location</h2>
        <p>{claim.claimLocation}</p>
      </div>
    </div>
  );
};
