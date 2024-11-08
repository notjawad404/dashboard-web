import { useEffect, useState, useMemo } from 'react';

const MarketEvaluation = () => {
    const [cars, setCars] = useState([]);
    const [stats, setStats] = useState(null);
    const [report, setReport] = useState('');
    const [featuredCarImage, setFeaturedCarImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInitiated, setSearchInitiated] = useState(false);

    // Dropdown selections
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [fuel, setFuel] = useState('');

    // Default options
    const brands = ["Toyota", "Honda", "Ford", "Chevrolet"];
    const models = {
        Toyota: ["Corolla", "Camry", "RAV4"],
        Honda: ["Civic", "Accord", "CR-V"],
        Ford: ["F-150", "Mustang", "Explorer"],
        Chevrolet: ["Silverado", "Malibu", "Equinox"]
    };
    const fuelTypes = ["gasoline", "diesel", "electric", "hybrid"];
    const years = useMemo(() => Array.from({ length: 2024 - 1950 + 1 }, (_, i) => (1950 + i).toString()), []);

    // Fetch data when searchInitiated changes to true
    useEffect(() => {
        if (searchInitiated) {
            setLoading(true);
            setError(null);
            const url = `https://standvirtual-api.onrender.com/scrape-cars/?brand=${brand}&model=${model}&year=${year}&fuel=${fuel}&pages=1`;

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
                        setStats({
                            brand,
                            model,
                            year,
                            fuel,
                            ...data.stats
                        });
                    }
                    if (data.report) {
                        setReport(data.report);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch data. Please try again.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [searchInitiated, brand, model, year, fuel]);

    const handleSearch = () => {
        if (brand && model && year && fuel) {
            setSearchInitiated(true);
        }
    };

    return (
        <div className="p-8">
            {/* Dropdown menus for selections */}
            <div className="flex gap-4 mb-8">
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="p-2 border rounded">
                    <option value="">Select Brand</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>

                <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="p-2 border rounded"
                    disabled={!brand}
                >
                    <option value="">Select Model</option>
                    {brand && models[brand].map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded">
                    <option value="">Select Year</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="p-2 border rounded">
                    <option value="">Select Fuel</option>
                    {fuelTypes.map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>

                {/* Search button */}
                <button
                    onClick={handleSearch}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    disabled={!brand || !model || !year || !fuel}
                >
                    Search
                </button>
            </div>

            {/* Display loading, error or results */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && searchInitiated && (
                <div>
                    {/* Car Cards */}
                    <div className="flex flex-row">
                        {cars.length === 0 ? (
                            <p>No cars available for the selected options.</p>
                        ) : (
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
                        )}

                        {/* Stats and Featured Image */}
                        <div className='flex flex-col'>
                            <div className='w-1/4 flex flex-row'>
                                {stats && (
                                    <div className="p-6 mb-8 flex flex-col">
                                        <p className='font-semibold text-sm py-3'><span className='font-normal text-gray-500'>Brand</span><br/> {stats.brand}</p>
                                        <p className='font-semibold text-sm py-3'><span className='font-normal text-gray-500'>Model</span><br/> {stats.model}</p>
                                        <p className='font-semibold text-sm py-3'><span className='font-normal text-gray-500'>Year</span><br/> {stats.year}</p>
                                        <p className='font-semibold text-sm py-3'><span className='font-normal text-gray-500'>Fuel</span><br/> {stats.fuel}</p>
                                    </div>
                                )}
                                {featuredCarImage && (
                                    <div className="flex justify-center items-center px-4">
                                        <img
                                            src={featuredCarImage}
                                            alt="Featured Car"
                                            className="w-32 h-32 mx-auto rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Findings Section */}
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
                            <p>Recommended Market Price: For a well-maintained car with mid-range features and mileage under 60,000 km, $13,000 - $15,000.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketEvaluation;
