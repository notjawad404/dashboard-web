import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const ClaimDetail = () => {
  const { id } = useParams();
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

  const formattedDescription = claimData?.description
    ? claimData.description.split(' ').map((word, index) => (
        <span key={index}>
          {word}{' '}
          {(index + 1) % 4 === 0 ? <br /> : ''}
        </span>
      ))
    : 'No description available';

  // Set default coordinates to New York City if claim location is invalid
  const defaultCoordinates = [40.7128, -74.0060];
  const claimLocation = claimData?.claimLocation || '';
  const [latitude, longitude] = claimLocation.split(',').map(Number);
  
  const isValidCoordinates = !isNaN(latitude) && !isNaN(longitude);
  const mapCoordinates = isValidCoordinates ? [latitude, longitude] : defaultCoordinates;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Claim Details</h1>
      <div className="flex flex-row">
        
        {/* Main Information Section */}
        <section className="w-3/4 mx-5">
          <section className="flex justify-between py-2">
            <p className="font-semibold px-3">
              <span className="font-normal text-gray-500">Claim No:</span><br />
              {claimData?.claimNo || 'N/A'}
            </p>
            <p className="font-semibold px-3">
              <span className="font-normal text-gray-500">Claim Amount:</span><br />
              ${claimData?.claimAmount?.toFixed(2) || '0.00'}
            </p>
          </section>
          <section className="flex justify-between py-2">
            <p className="font-semibold px-3">
              <span className="font-normal text-gray-500">Claim Type:</span><br />
              {claimData?.claimType || 'N/A'}
            </p>
            <p className="font-semibold px-3">
              <span className="font-normal text-gray-500">Claim Handler:</span><br />
              {claimData?.claimHandler || 'N/A'}
            </p>
          </section>
          <section className="flex justify-between py-2">
            <p className="font-semibold px-3">
              <span className="font-normal text-gray-500">Claim Date:</span><br />
              {claimData?.claimDate ? new Date(claimData.claimDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="font-semibold px-3">
              <span className="font-normal text-gray-500">Report Date:</span><br />
              {claimData?.reportDate ? new Date(claimData.reportDate).toLocaleDateString() : 'N/A'}
            </p>
          </section>
          <p className="font-semibold px-3 pb-4">
            <span className="font-normal text-gray-500">Description:</span><br />
            {formattedDescription}
          </p>
          <p className="font-semibold px-3 py-2">
            <span className="font-normal text-gray-500">Notes:</span><br />
            {claimData?.notes || 'No notes available'}
          </p>
          <p className="font-semibold px-3">
            <span className="font-normal text-gray-500">Resolution Timeline Estimate:</span><br />
            {claimData?.resolutionTimelineEstimate || 'N/A'}
          </p>
          <p className="font-semibold px-3">
            <span className="font-normal text-gray-500">Payments Made:</span><br />
            {claimData?.paymentsMade || 'N/A'}
          </p>
          
          <section className="flex mt-6">
            <MapContainer
              center={mapCoordinates}
              zoom={13}
              style={{ width: '300px', height: '300px' }}
              className="w-52 h-52"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={mapCoordinates}>
                <Popup>Claim Location</Popup>
              </Marker>
            </MapContainer>
            <div className="ml-6">
              <h3 className="text-gray-500">Reports:</h3>
              <ul>
                <li>{claimData?.reports?.policeReport ? '✔' : '✘'} Police Report</li>
                <li>{claimData?.reports?.witnessReport ? '✔' : '✘'} Witness Report</li>
                <li>{claimData?.reports?.medicalReport ? '✔' : '✘'} Medical Report</li>
                <li>{claimData?.reports?.appraisalReport ? '✔' : '✘'} Appraisal Report</li>
              </ul>
              <p className="font-semibold px-3 mt-10">
                <span className="font-normal text-gray-500">Claim Location:</span><br />
                {claimData?.claimLocation || 'Default location (New York City)'}
              </p>
            </div>
          </section>
        </section>
        
        {/* Internal Tags Section */}
        <section className="w-1/4 pl-20">
          <h3 className="font-semibold mt-4">Internal Tags:</h3>
          {claimData?.internalTags ? (
            <ul>
              {claimData.internalTags.split(',').map((tag, index) => (
                <li key={index} className="list-disc ml-5">{tag.trim()}</li>
              ))}
            </ul>
          ) : (
            <p>No internal tags available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ClaimDetail;
