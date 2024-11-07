import { useEffect, useState } from 'react';
// import { BiCar } from 'react-icons/bi';

const MarketEvaluation = () => {
    const [cars, setCars] = useState([]);
    const [stats, setStats] = useState(null);
    const [featuredCarImage, setFeaturedCarImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const brands = ["Toyota", "Honda", "Ford", "Chevrolet"];
    const models = {
        Toyota: ["Corolla", "Camry", "RAV4"],
        Honda: ["Civic", "Accord", "CR-V"],
        Ford: ["F-150", "Mustang", "Explorer"],
        Chevrolet: ["Silverado", "Malibu", "Equinox"]
    };
    const fuelTypes = ["gasoline", "diesel", "electric", "hybrid"];
    const years = Array.from({ length: 2024 - 1950 + 1 }, (_, i) => (1950 + i).toString());

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedFuelType, setSelectedFuelType] = useState('');

    useEffect(() => {
        if (!selectedBrand || !selectedModel || !selectedYear || !selectedFuelType) return;

        const url = `https://standvirtual-api.onrender.com/scrape-cars/?brand=${selectedBrand}&model=${selectedModel}&year=${selectedYear}&fuel=${selectedFuelType}&pages=1`;

        setLoading(true);
        fetch(url, { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.cars) {
                    setCars(data.cars.slice(0, 3));
                    setFeaturedCarImage(data.cars[0]?.Image);
                }
                if (data.stats) {
                    setStats(data.stats);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedBrand, selectedModel, selectedYear, selectedFuelType]);

    useEffect(() => {
        setSelectedModel('');
    }, [selectedBrand]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-8">
            <div className="flex space-x-10 mb-8">
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="border rounded p-2 px-10 "
                >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="border rounded p-2 px-10 "
                    disabled={!selectedBrand}
                >
                    <option value="">Select Model</option>
                    {selectedBrand && models[selectedBrand].map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border rounded p-2 px-10 "
                >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedFuelType}
                    onChange={(e) => setSelectedFuelType(e.target.value)}
                    className="border rounded p-2 px-10 "
                >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map((fuelType) => (
                        <option key={fuelType} value={fuelType}>
                            {fuelType}
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex flex-row'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-3/4">
                    {cars.map((car, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={car.Image}
                                alt={car.Brand}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{car.Brand}</h3>
                                <p> ${car.Price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='w-1/4 flex flex-col'>
                    {stats && (
                        <div className=" p-6 mb-8 flex flex-col">
                            <p className='font-semibold text-sm py-3'><span className='font-normal text-gray-500'>Brand</span><br/> Audi</p>
                            <p className='font-semibold text-sm py-3'><span className='font-normal text-gray-500'>Model</span><br/> TDI 3.0</p>
                            <p className='font-semibold text-sm py-3'><span className='font-normal text-gray-500'>Year</span><br/> 2017</p>
                            <p className='font-semibold text-sm py-3'><span className='font-normal text-gray-500'>Condition</span><br/> Used</p>
                        </div>
                    )}
                    {featuredCarImage && (
                        <div className="flex justify-center items-center">
                            <img
                                src={featuredCarImage}
                                alt="Featured Car"
                                className="w-40 h-40 mx-auto rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Findings section */}
            <div className="p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold ">Findings:</h2>
                <div className="text-gray-800">
                    <div>
                        <h3>Price Range: $10,000 - $18,000</h3>
                        <ul className="list-disc ml-6">
                            <li>Older Models (2016-2018): $10,000 - $12,000</li>
                            <li>Mid-Range Models (2019-2021): $13,000 - $15,000</li>
                            <li>Newer Models (2022-2023): $16,000 - $18,000, with higher trims and low mileage</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Key Factors Affecting Price:</h3>
                        <ul className="list-disc ml-6">
                            <li>Mileage: Over 100,000 km reduces value by ~20-30%</li>
                            <li>Trim Level: Higher trims add 10-15% over base models</li>
                        </ul>
                    </div>
                    <p>Recommended Market Price: For a well-maintained Clio with mid-range features and mileage under 60,000 km, $13,000 - $15,000.</p>
                </div>
            </div>
        </div>
    );
};

export default MarketEvaluation;
