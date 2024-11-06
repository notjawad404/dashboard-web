import PropTypes from 'prop-types';

const ClaimProgress = () => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-lg space-x-4">
      {/* Customer Info */}
      <div className="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/50"
          alt="Customer"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-gray-900 font-semibold">Jane Doe</p>
          <p className="text-gray-500 text-sm">225776588</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-grow flex items-center space-x-2 px-40">
      <section className="flex flex-col items-center">
        <Step label="" completed />
        <label className="">FNOL</label>
      </section>
      <HorizontalLine />
      <section className="flex flex-col items-center">
        <Step label="" completed />
        <label>Appraisal</label>
      </section>
      <HorizontalLine />
      <section className="flex flex-col items-center">
        <Step label="" current />
        <label className="">Repair</label>
      </section>
      <HorizontalLine />
      <section className="flex flex-col items-center">
        <Step label="" />
        <label className="">Settlement</label>
      </section>
    </div>

      {/* Status and Note */}
      <div className="space-y-2 text-right">
        <div className="bg-purple-200 text-purple-600 px-3 py-1 rounded-full inline-block">
          Processing
        </div>
        <div>
          <p className="text-gray-600">Add note</p>
          <textarea
            className="w-full border rounded-md p-2 mt-1 text-sm resize-none"
            placeholder="Waiting for approval..."
            rows="2"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

// Step Component for individual step
const Step = ({ label, completed, current }) => (
  <div className="flex items-center space-x-2">
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-full ${
        completed ? 'bg-green-500' : current ? 'bg-red-500' : 'bg-gray-300'
      }`}
    >
      {completed ? (
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      ) : current ? (
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01"
          ></path>
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m4 4h.01M8 8h.01"
          ></path>
        </svg>
      )}
    </div>
    <p className="text-gray-600">{label}</p>
  </div>
);

// Horizontal line component
const HorizontalLine = () => (
  <div className="w-12 h-0.5 bg-gray-300"></div>
);

// PropTypes validation
Step.propTypes = {
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  current: PropTypes.bool,
};

// Default props for optional values
Step.defaultProps = {
  completed: false,
  current: false,
};

export default ClaimProgress;
