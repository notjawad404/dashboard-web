import { useState } from 'react';

const Slider = () => {
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(80);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="range"
        min="0"
        max="100"
        value={minValue}
        onChange={handleMinChange}
        className="absolute w-full h-2 bg-gray-300 rounded-lg cursor-pointer appearance-none"
      />
      <input
        type="range"
        min="0"
        max="100"
        value={maxValue}
        onChange={handleMaxChange}
        className="absolute w-full h-2 bg-transparent cursor-pointer appearance-none"
      />

      <div
        className="absolute top-0 h-2 bg-blue-500 rounded-lg"
        style={{
          left: `${minValue}%`,
          width: `${maxValue - minValue}%`,
        }}
      />
    </div>
  );
};

export default Slider;
