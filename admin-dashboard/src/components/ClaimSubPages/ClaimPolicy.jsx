import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClaimPolicy = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/policy/${id}`);
        setPolicy(response.data);
      } catch (error) {
        console.error("Error fetching policy:", error);
      }
    };

    fetchPolicy();
  }, [id]);

  if (!policy) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className=" p-6 bg-white shadow-md rounded-md">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div>
            <h2 className="text-lg font-bold">Policy number</h2>
            <p className="text-gray-700">{policy.policyNumber}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold">Policy Holder</h2>
            <p className="text-gray-700">{policy.policyHolder}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold">Policy Type</h2>
            <p className="text-gray-700">{policy.policyType}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold">Premium</h2>
            <p className="text-gray-700">${policy.premium}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold">Effective Date</h2>
            <p className="text-gray-700">{new Date(policy.effectiveDate).toLocaleDateString()}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold">Expiration Date</h2>
            <p className="text-gray-700">{new Date(policy.expirationDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="col-span-1">
          <h2 className="text-lg font-bold text-gray-500">Internal Tags</h2>
          <span className="inline-block px-3 py-1 mt-2 text-orange-600 bg-orange-100 rounded">
            {policy.internalTags}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold">Coverage Details</h2>
        <p className="text-gray-700">{policy.coverageDetails}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Insured Items</h2>
        <p className="text-gray-700">{policy.insuredItems}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Upgrades</h2>
        <p className="text-gray-700">{policy.upgrades}</p>
      </div>
    </div>
  );
};

export default ClaimPolicy;
