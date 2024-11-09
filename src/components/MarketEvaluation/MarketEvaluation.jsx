import { useEffect, useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

const MarketEvaluation = () => {
    const [cars, setCars] = useState([]);
    const [stats, setStats] = useState(null);
    const [featuredCarImage, setFeaturedCarImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reportHtml, setReportHtml] = useState('');

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedFuel, setSelectedFuel] = useState('');

    const [searchBrand, setSearchBrand] = useState('');
    const [searchModel, setSearchModel] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchFuel, setSearchFuel] = useState('');

    const brands = ["Toyota", "Honda", "Ford", "Chevrolet"];
    const models = {
        Toyota: ["Corolla", "Camry", "RAV4"],
        Honda: ["Civic", "Accord", "CR-V"],
        Ford: ["F-150", "Mustang", "Explorer"],
        Chevrolet: ["Silverado", "Malibu", "Equinox"]
    };
    const fuelTypes = ["gasoline", "diesel", "electric", "hybrid"];
    const years = useMemo(() => Array.from({ length: 2024 - 1950 + 1 }, (_, i) => (1950 + i).toString()), []);

    // const navigate = useNavigate();

    useEffect(() => {
        if (searchBrand && searchModel && searchYear && searchFuel) {
            setCars([]);
            setStats(null);
            setFeaturedCarImage(null);
            setReportHtml('');
            setLoading(true);
            setError(null);
            
            const url = 'https://standvirtual-api.onrender.com/scrape-cars/';
            const requestData = {
                brand: searchBrand,
                model: searchModel,
                year: searchYear,
                fuel: searchFuel,
                pages: 1
            };
    
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.cars) {
                        setCars(data.cars.slice(0, 3));
                        setFeaturedCarImage(data.cars[1]?.Image);
                    }
                    if (data.stats) {
                        setStats({
                            brand: searchBrand,
                            model: searchModel,
                            year: searchYear,
                            fuel: searchFuel,
                            ...data.stats
                        });
                    }
                    if (data.report) {
                        const htmlContent = data.report.replace(/```html|```/g, '');
                        setReportHtml(htmlContent);
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
    }, [searchBrand, searchModel, searchYear, searchFuel]);
    

    const handleSearch = () => {
        setSearchBrand(selectedBrand);
        setSearchModel(selectedModel);
        setSearchYear(selectedYear);
        setSearchFuel(selectedFuel);
    };

    const handleCardClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="p-8">
            <div className="flex gap-4 mb-8">
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="p-2 border rounded">
                    <option value="">Select Brand</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>

                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="p-2 border rounded"
                    disabled={!selectedBrand}
                >
                    <option value="">Select Model</option>
                    {selectedBrand && models[selectedBrand].map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="p-2 border rounded">
                    <option value="">Select Year</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)} className="p-2 border rounded">
                    <option value="">Select Fuel</option>
                    {fuelTypes.map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>

                <button
                    onClick={handleSearch}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    disabled={!selectedBrand || !selectedModel || !selectedYear || !selectedFuel}
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div>
                    <div className="flex flex-row">
                        {cars.length === 0 ? (
                            <p>No cars available for the selected options.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-3/4">
                                {cars.map((car, index) => (
                                    <div
                                        key={index}
                                        className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
                                        onClick={() => handleCardClick(car.Source_Url)}
                                    >
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

                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Findings</h2>
                        <div
                            className="text-gray-800 mt-4"
                            dangerouslySetInnerHTML={{ __html: reportHtml }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketEvaluation;
