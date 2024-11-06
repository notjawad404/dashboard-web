import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from '../../assets/Image.png';
import DoubleRangeSlider from "./DoubleRangeSlider";

const LeakageDashboard = () => {
  const [leakages, setLeakages] = useState([]);
  const [filteredLeakages, setFilteredLeakages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    estimateSavings: [0, 50000],
    urgency: "all",
    sortBy: "new",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const leakagesPerPage = 12;
  const [sortDirection, setSortDirection] = useState({ sortBy: "new", active: false });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5051/api/leakages");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setLeakages(data);
      } catch (error) {
        console.error("Error fetching leakages:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = leakages.filter(leakage =>
      leakage.leakageId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filters.urgency !== "all") result = result.filter(leakage => leakage.urgency === filters.urgency);
    if (filters.estimateSavings) {
      result = result.filter(
        leakage =>
          leakage.estimateSavings >= filters.estimateSavings[0] &&
          leakage.estimateSavings <= filters.estimateSavings[1]
      );
    }

    if (sortDirection.active) {
      if (sortDirection.sortBy === "estimateSavings-asc") {
        result.sort((a, b) => a.estimateSavings - b.estimateSavings);
      } else if (sortDirection.sortBy === "estimateSavings-desc") {
        result.sort((a, b) => b.estimateSavings - a.estimateSavings);
      } else {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    }

    setFilteredLeakages(result);
  }, [leakages, searchQuery, filters, sortDirection]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSortChange = (sortOption) => {
    setSortDirection(prev => {
      if (prev.sortBy === sortOption) {
        return { sortBy: sortOption, active: !prev.active };
      }
      return { sortBy: sortOption, active: true };
    });
  };

  const handleSliderChange = (min, max) => {
    setFilters((prev) => ({ ...prev, estimateSavings: [min, max] }));
  };

  const indexOfLastLeakage = currentPage * leakagesPerPage;
  const indexOfFirstLeakage = indexOfLastLeakage - leakagesPerPage;
  const currentLeakages = filteredLeakages.slice(indexOfFirstLeakage, indexOfLastLeakage);
  const totalPages = Math.ceil(filteredLeakages.length / leakagesPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Updated today";
    if (diffInDays === 1) return "Updated yesterday";
    return `Updated ${diffInDays} days ago`;
  };

  const buttonStyle = "border border-gray-300 rounded-xl";
  const activeButtonStyle = "bg-black text-white";

  const navigateToLeakageDashboard = () => {
    navigate(`/leakagebrowse`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-40 p-4 border-r">
        <h2 className="text-lg font-bold mb-2">Filters</h2>
        <div className="py-2">
          {/* Urgency Filters */}
          <section className="flex flex-row py-1">
            <input type="checkbox" className="mr-2" />
            <section className="flex flex-col">
              <p>High Urgency</p>
              <span className="text-xs text-gray-600">Immediate Attention</span>
            </section>
          </section>
          <section className="flex flex-row py-1">
            <input type="checkbox" className="mr-2" />
            <section className="flex flex-col">
              <p>Medium Urgency</p>
              <span className="text-xs text-gray-600">Requires Attention Soon</span>
            </section>
          </section>
          <section className="flex flex-row py-1">
            <input type="checkbox" className="mr-2" />
            <section className="flex flex-col">
              <p>Low Urgency</p>
              <span className="text-xs text-gray-600">Can Wait</span>
            </section>
          </section>
        </div>

        {/* Double Range Slider */}
        <div>
          <label className="block mb-2 font-semibold">Estimate Savings</label>
          <DoubleRangeSlider
            initialMinValue={filters.estimateSavings[0]}
            initialMaxValue={filters.estimateSavings[1]}
            onMinChange={(min) => handleSliderChange(min, filters.estimateSavings[1])}
            onMaxChange={(max) => handleSliderChange(filters.estimateSavings[0], max)}
          />
          <div className="text-sm text-gray-600 mt-5">
            Range: ${filters.estimateSavings[0]} - ${filters.estimateSavings[1]}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search and Sorting Buttons */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs"
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <div className="ml-2 flex space-x-2">
            <button
              onClick={() => handleSortChange("new")}
              className={`${buttonStyle} px-2 ${sortDirection.active && sortDirection.sortBy === "new" ? activeButtonStyle : ""}`}
            >
              {sortDirection.active && sortDirection.sortBy === "new" && <span className="ml-1">✓</span>}
              New
            </button>
            <button
              onClick={() => handleSortChange("estimateSavings-asc")}
              className={`${buttonStyle} w-40 ${sortDirection.active && sortDirection.sortBy === "estimateSavings-asc" ? activeButtonStyle : ""}`}
            >
              {sortDirection.active && sortDirection.sortBy === "estimateSavings-asc" && <span className="ml-1">✓</span>}
              Savings Ascending
            </button>
            <button
              onClick={() => handleSortChange("estimateSavings-desc")}
              className={`${buttonStyle} w-40 ${sortDirection.active && sortDirection.sortBy === "estimateSavings-desc" ? activeButtonStyle : ""}`}
            >
              {sortDirection.active && sortDirection.sortBy === "estimateSavings-desc" && <span className="ml-1">✓</span>}
              Savings Descending
            </button>
          </div>
        </div>

        {/* Leakages Grid */}
        <div className="grid grid-cols-6 gap-4">
          {currentLeakages.length > 0 ? (
            currentLeakages.map((leakage) => (
              <div 
                key={leakage._id} 
                className="my-1 cursor-pointer" 
                onClick={() => navigateToLeakageDashboard(leakage._id)}
              >
                <img src={placeholderImg} alt="" className="w-full h-20 object-cover" />
                <h3 className="text-sm font-bold">{leakage.leakageId}</h3>
                <p className="text-xs text-gray-600">{formatDate(leakage.date)}</p>
              </div>
            ))
          ) : (
            <p>No leakages found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-40">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-1">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeakageDashboard;
