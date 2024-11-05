// src/CustomerProfile.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerDetail = () => {
  const [customer, setCustomer] = useState(null);
  const customerId = '672a14cea30ab0b0eab29391';

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5051/api/customer/${customerId}`);
        setCustomer(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  if (!customer) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg my-10 shadow-lg">
    <div className='flex flex-row'>
        <section className='flex flex-col w-40'>
        <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>Name</span><br></br>{customer.name}</p>
        <p className='font-semibold text-black py-1'><span className='font-normal text-gray-500'>Address:</span><br></br> {customer.address}</p>
          <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>Phone:</span><br></br> {customer.phone}</p>
          <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>Occupation:</span><br></br> {customer.occupation}</p>        
          

          {/* Other Policies */}
      {customer.otherPolicies?.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold">Other Policies</h3>
          <div className="flex flex-col space-y-2">
            {customer.otherPolicies.map((policy, index) => (
              <div key={index} className="p-3 bg-white rounded shadow-md flex items-center justify-between">
                <p>{policy.policyId}</p>
                <button className="bg-gray-300 py-1 px-3 rounded">Check</button>
              </div>
            ))}
          </div>
        </div>
      )}
          </section>

        <section className='flex flex-col w-40'>
        <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>ID Card:</span><br></br> {customer.idCard}</p>
        <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>Email:</span><br></br> {customer.email}</p>
        <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>VAT:</span><br></br> {customer.vat}</p>
        </section>
        <section className='flex flex-col w-80'>
        <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>Loyalty Status:</span><br></br> {customer.loyaltyStatus}</p>
          <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>Risk Profile:</span><br></br> {customer.riskProfile}</p>
          <p className='font-semibold text-black py-2'><span className='font-normal text-gray-500'>Credit Score:</span><br></br> {customer.creditScore}</p>

          {/* Social Media */}
      <div className="mt-6">
      <h3 className="text-lg font-semibold">Social Media</h3>
      <p className=' font-normal text-gray-500'>LinkedIn: <a href={customer.socialMedia?.linkedin} target="_blank" rel="noopener noreferrer" >{customer.socialMedia?.linkedin}</a></p>
      <p className='font-normal text-gray-500'>Facebook: <a href={customer.socialMedia?.facebook} target="_blank" rel="noopener noreferrer" >{customer.socialMedia?.facebook}</a></p>
      <p className='font-normal text-gray-500'>Twitter: <a href={customer.socialMedia?.twitter} target="_blank" rel="noopener noreferrer" >{customer.socialMedia?.twitter}</a></p>
    </div>

    {/* Previous Interactions */}
    <div className="mt-6">
      <p className="text-gray-500"> Previous Interactions</p>
      <ul className="">
        {customer.previousInteractions?.map((interaction, index) => (
          <li key={index}>
            {new Date(interaction.date).toLocaleDateString()} - {interaction.description}
          </li>
        ))}
      </ul>
    </div>
        </section>

        <section className='flex flex-col pl-32'>
              <div className="col-span-1">
      <p className="font-semibold text-gray-500">Internal Tags</p>
      <span className="inline-block px-3 py-1 mt-2 text-orange-600 bg-orange-100 rounded">
        {customer.internalTags}
      </span>
    </div>
        </section>
    </div>

      

      
    </div>
  );
};

export default CustomerDetail;
