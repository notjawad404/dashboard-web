import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ClaimDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [claimData, setClaimData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaimData = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/claims/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch claim data');
        }
        const data = await response.json();
        setClaimData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClaimData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formattedDescription = claimData.description
  .split(' ')
  .reduce((acc, word, index) => {
    // Add a line break after every 5 words
    return acc + word + ((index + 1) % 4 === 0 ? '<br>' : ' ');
  }, '');
  return (
    <div className=" p-4">
      <h1 className="text-2xl font-bold mb-4">Claim Details</h1>
      <div className="flex flex-row">
        <section className="w-3/4 mx-5">


          <section className='flex justify-between'>
            <section className='flex flex-col'>
            <section className='flex justify-between py-2'>
            <p className="font-semibold px-3"><span className='font-normal text-gray-500'>Claim Amount:</span><br></br> {claimData.claimNo}</p>
            <p className='font-semibold px-3'><span className='font-normal text-gray-500'>Claim Amount:</span><br></br> ${claimData.claimAmount.toFixed(2)}</p>
            
            </section>

            <section className='flex justify-between py-2'>
            <p className='font-semibold px-3'><span className='font-normal text-gray-500'>Claim Type:</span><br></br> {claimData.claimType}</p>
        <p className='font-semibold px-3'><span className='font-normal text-gray-500'>Claim Handler:</span><br></br> {claimData.claimHandler}</p>
        
            </section>

            <section className='flex justify-between py-2'>
            <p className='font-semibold px-3'><span className='font-normal text-gray-500'>Claim Date:</span><br></br> {new Date(claimData.claimDate).toLocaleDateString()}</p>
        <p className='font-semibold px-3'><span className='font-normal text-gray-500'>Report Date:</span><br></br> {new Date(claimData.reportDate).toLocaleDateString()}</p>
        
            </section>

            </section>

            <section className='flex flex-col'>
            <p className='font-semibold px-3 pb-4'>
          <span className='font-normal text-gray-500'>Description:</span>
          <br />
          <span dangerouslySetInnerHTML={{ __html: formattedDescription }} />
        </p>
        <p className='font-semibold px-3 py-2'><span className='font-normal text-gray-500'>Notes:</span><br></br> {claimData.notes}</p>
        <p className='font-semibold px-3'><span className='font-normal text-gray-500'>Resolution Timeline Estimate:</span><br></br> {claimData.resolutionTimelineEstimate}</p>
        <p className='font-semibold px-3'><span className='font-normal text-gray-500'>Payments Made:</span><br></br> {claimData.paymentsMade}</p>
            
            </section>
          </section>

          <section className='flex justify-row'>
        <img src='https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2016/04/google-map.png' alt='' className='w-52 h-52' />
        <section>
        <div className="mt-4 pl-40">
          <h3 className="text-gray-500">Reports:</h3>
          <ul>
            <li>{claimData.reports.policeReport ? '✔' : '✘'}<span>Police Report</span> </li>
            <li>{claimData.reports.witnessReport ? '✔' : '✘'}<span>Witness Report</span> </li>
            <li>{claimData.reports.medicalReport ? '✔' : '✘'}<span>Medical Report</span> </li>
            <li>{claimData.reports.appraisalReport ? '✔' : '✘'}<span>Appraisal Report</span> </li>
          </ul>
        </div>
        <p className='font-semibold px-3 mt-10'><span className='font-normal text-gray-500'>Claim Location:</span><br></br> {claimData.claimLocation}</p>

        </section>
        </section>





        
        


      
        </section>

        <section className="w-1/4 pl-20">
                {/* Handle internal tags */}
                <div className="mt-4">
                <h3 className="font-semibold">Internal Tags:</h3>
                {claimData.internalTags ? (
                  <ul>
                    {claimData.internalTags.split(',').map((tag, index) => (
                      <li key={index} className="bg-yellow-200 text-orange-600 px-3 py-1 my-2">{tag.trim()}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No internal tags available.</p>
                )}
              </div>
        </section>
        </div>
    </div>
  );
};

export default ClaimDetail;
