import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from './Slider';

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
      <div className="flex flex-row">
      <section className='flex flex-col w-40'>
      <div className='mt-4'>
            <p className="font-semibold">Policy number</p>
            <p className="text-gray-700">{policy.policyNumber}</p>
          </div>
        
          <div className="mt-4">
          <p className="font-semibold">Policy Type</p>
          <p className="text-gray-700">{policy.policyType}</p>
        </div>

        <div className="mt-4">
            <p className="font-semibold">Effective Date</p>
            <p className="text-gray-700">{new Date(policy.effectiveDate).toLocaleDateString()}</p>
          </div>
      </section>

      <section className='flex flex-col w-40'>
      <div className="mt-4">
            <p className="font-semibold">Policy Holder</p>
            <p className="text-gray-700">{policy.policyHolder}</p>
          </div>
      
          <div className="mt-4">
          <p className="font-semibold">Premium</p>
          <p className="text-gray-700">${policy.premium}</p>
        </div>

        <div className="mt-4">
            <p className="font-semibold">Expiration Date</p>
            <p className="text-gray-700">{new Date(policy.expirationDate).toLocaleDateString()}</p>
          </div>
      </section>

      <section className='flex flex-col w-60'>
      <div className="mt-4">
        <p className="font-semibold">Coverage Details</p>
        <p className="text-gray-700">{policy.coverageDetails}</p>
      </div>

      <div className="mt-4">
        <p className="font-semibold">Insured Items</p>
        <p className="text-gray-700">{policy.insuredItems}</p>
      </div>

      <div className="mt-4">
        <p className="font-semibold">Upgrades</p>
        <p className="text-gray-700">{policy.upgrades}</p>
      </div>
      </section>

      <section className='flex flex-col mx-10'>
      <div className="col-span-1">
      <p className="font-semibold text-gray-500">Internal Tags</p>
      <span className="inline-block px-3 py-1 mt-2 text-orange-600 bg-orange-100 rounded">
        {policy.internalTags}
      </span>
    </div>
      </section>
        
        
      </div>
      <section>
      <p className='text-gray-400 py-3'>Previous Claims</p>
      <div className='bg-white shadow-2xl border border-white w-40 p-4 mb-1'>
      <p className='pb-4 font-semibold text-lg'>232423525</p>
      <button className='p-1 border border-black rounded-lg bg-gray-300'>Claim</button>
      </div>
      <div className='bg-white shadow-2xl border border-white w-40 p-4'>
      <p className='pb-4 font-semibold text-lg'>34263525</p>
      <button className='p-1 border border-black rounded-lg bg-gray-300'>Claim</button>
      </div>
      </section>

      <Slider/>
    </div>
  );
};

export default ClaimPolicy;
