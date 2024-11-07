import { useState } from 'react';
import PropTypes from 'prop-types';

const DoubleRangeSlider = ({ initialMinValue = 0, initialMaxValue = 50000, onMinChange, onMaxChange }) => {
  const [minValue, setMinValue] = useState(initialMinValue);
  const [maxValue, setMaxValue] = useState(initialMaxValue);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    onMinChange(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    onMaxChange(value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Minimum Range Input */}
      <input
        type="range"
        min="0"
        max="50000"
        value={minValue}
        onChange={handleMinChange}
        className="absolute w-full h-2 bg-transparent cursor-pointer appearance-none z-20"
        style={{ pointerEvents: 'auto' }}
      />
      {/* Maximum Range Input */}
      <input
        type="range"
        min="0"
        max="50000"
        value={maxValue}
        onChange={handleMaxChange}
        className="absolute w-full h-2 bg-transparent cursor-pointer appearance-none z-20"
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Highlighted Range */}
      <div
        className="absolute top-0 h-2 bg-blue-500 rounded-lg z-10"
        style={{
          left: `${(minValue / 50000) * 100}%`,
          width: `${((maxValue - minValue) / 50000) * 100}%`,
        }}
      />

    </div>
  );
};

// PropTypes validation
DoubleRangeSlider.propTypes = {
  initialMinValue: PropTypes.number,
  initialMaxValue: PropTypes.number,
  onMinChange: PropTypes.func.isRequired,
  onMaxChange: PropTypes.func.isRequired,
};

export default DoubleRangeSlider;
