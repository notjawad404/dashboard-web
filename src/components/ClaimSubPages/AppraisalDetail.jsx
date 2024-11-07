import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const AppraisalDetails = () => {
  const { id } = useParams();
  const [appraisal, setAppraisal] = useState(null);

  useEffect(() => {
    const fetchAppraisal = async () => {
      try {
        const response = await axios.get(`https://dasbboard-backend.vercel.app/api/appraisal/appraisal/${id}`);
        setAppraisal(response.data);
      } catch (error) {
        console.error("Error fetching appraisal:", error);
      }
    };

    fetchAppraisal();
  }, [id]);

  if (!appraisal) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex flex-row">
        <section className='flex flex-col w-40'>

          <div className="mt-4">
            <p className="text-gray-500">Appraisal Date</p>
            <p className="font-semibold">{new Date(appraisal.appraisalDate).toLocaleDateString()}</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-500">Address</p>
            <p className="font-semibold">{appraisal.address}</p>
          </div>


          <div className="mt-4">
            <p className="text-gray-500">Phone</p>
            <p className="font-semibold">{appraisal.phone}</p>
          </div>

          <div className="mt-4">
          <p className="text-gray-500">Estimated Repair</p>
          <p className="font-semibold">${appraisal.estimatedRepair}</p>
        </div>

        </section>
        
        <section className='flex flex-col w-60'>
        <div className="mt-4">
        <p className="text-gray-500">Appraiser Name</p>
        <p className="font-semibold">{appraisal.appraiserName}</p>
      </div>
      <div className="mt-4">
      <p className="text-gray-500">Email</p>
      <p className="font-semibold">{appraisal.email}</p>
    </div>
          

    <div className="mt-4">
    <p className="text-gray-500">VAT</p>
    <p className="font-semibold">{appraisal.vat}</p>
  </div>
          
        </section>

        <section className='flex flex-col w-80'>
          
        <div className="mt-4">
        <p className="text-gray-500">Damage Details</p>
        <p className="font-semibold">{appraisal.damageDetails}</p>
      </div>

      <div className="mt-4">
      <p className="text-gray-500">Appraisal Notes</p>
      <p className="font-semibold">{appraisal.notes}</p>
    </div>

    <p className=" text-gray-500">Internal Tags</p>
            <div className="flex flex-wrap flex-col mt-2">
              {appraisal.internalTags.map((tag, index) => (
                <span key={index} className="inline-block w-32 px-3 py-1 mr-2 mb-2 text-orange-600 bg-orange-100 rounded">
                  {tag}
                </span>
              ))}
            </div>

        </section>

       
      </div>

    </div>
  );
};

export default AppraisalDetails;
