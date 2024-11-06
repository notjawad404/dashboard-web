import { useEffect, useState } from 'react';

const MarketEvaluation = () => {
    const [cars, setCars] = useState([]);
    const [stats, setStats] = useState(null);
    const [report, setReport] = useState('');
    const [featuredCarImage, setFeaturedCarImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/marketEvaluation.json')
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
                if (data.report) {
                    setReport(data.report);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-8">
            {featuredCarImage && (
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Featured Car Image</h2>
                    <img
                        src={featuredCarImage}
                        alt="Featured Car"
                        className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
                    />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {cars.map((car, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={car.Image}
                            alt={car.Brand}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{car.Brand}</h3>
                            <p><strong>Year:</strong> {car.Year}</p>
                            <p><strong>Location:</strong> {car.Location}</p>
                            <p><strong>Price:</strong> €{car.Price.toLocaleString()}</p>
                            <p><strong>Mileage:</strong> {car.Milage_Value} {car.Milage_Unit}</p>
                            <a
                                href={car.Source_Url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 text-blue-500 hover:underline"
                            >
                                View More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {stats && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-bold mb-4">Market Stats</h2>
                    <p><strong>Number of Cars:</strong> {stats.nr_of_cars}</p>
                    <p><strong>Minimum Price:</strong> €{stats.min_price.toLocaleString()}</p>
                    <p><strong>Maximum Price:</strong> €{stats.max_price.toLocaleString()}</p>
                    <p><strong>Median Price:</strong> €{stats.median_price.toLocaleString()}</p>
                    <p><strong>Mean Price:</strong> €{stats.mean_price.toLocaleString()}</p>
                </div>
            )}
            {report && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Market Report</h2>
                    <div dangerouslySetInnerHTML={{ __html: report }} />
                </div>
            )}
        </div>
    );
};

export default MarketEvaluation;
