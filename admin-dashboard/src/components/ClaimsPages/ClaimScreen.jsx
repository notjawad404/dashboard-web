import { useState, useEffect } from "react";

import placeholderImg from '../../assets/Image.png'

const ClaimScreen = () => {
  // Initial data and state
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    claimAmount: [0, 50000],
    risk: "all",
    sortBy: "new",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const claimsPerPage = 12;
  const [sortDirection, setSortDirection] = useState({ sortBy: "new", active: false });

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5051/api/claims");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setClaims(data);  // Set the fetched data to the claims state
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };
    fetchData();
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = claims.filter(claim =>
      claim.claimNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filters.risk !== "all") result = result.filter(claim => claim.risk === filters.risk);
    if (filters.claimAmount) {
      result = result.filter(
        claim =>
          claim.claimAmount >= filters.claimAmount[0] &&
          claim.claimAmount <= filters.claimAmount[1]
      );
    }

    // Sort claims based on the selected filter
    if (sortDirection.active) {
      if (sortDirection.sortBy === "claimAmount-asc") {
        result.sort((a, b) => a.claimAmount - b.claimAmount);
      } else if (sortDirection.sortBy === "claimAmount-desc") {
        result.sort((a, b) => b.claimAmount - a.claimAmount);
      } else {
        result.sort((a, b) => new Date(b.claimDate) - new Date(a.claimDate));
      }
    }

    setFilteredClaims(result);
  }, [claims, searchQuery, filters, sortDirection]);

  // Handlers
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (newFilters) => setFilters(prev => ({ ...prev, ...newFilters }));
  
  const handleSortChange = (sortOption) => {
    setSortDirection(prev => {
      if (prev.sortBy === sortOption) {
        return { sortBy: sortOption, active: !prev.active };
      }
      return { sortBy: sortOption, active: true };
    });
  };

  // Pagination logic
  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = filteredClaims.slice(indexOfFirstClaim, indexOfLastClaim);
  const totalPages = Math.ceil(filteredClaims.length / claimsPerPage);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Updated today";
    if (diffInDays === 1) return "Updated yesterday";
    return `Updated ${diffInDays} days ago`;
  };

  // Button styles
  const buttonStyle = "border border-gray-300 rounded-xl";
  const activeButtonStyle = "bg-black text-white";

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    const minAmount = Math.min(value, filters.claimAmount[1]);
    const maxAmount = Math.max(value, filters.claimAmount[0]);

    handleFilterChange({ claimAmount: [minAmount, maxAmount] });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-40 p-4 border-r">
        <h2 className="text-lg font-bold mb-2">Filters</h2>
        <div className="py-2">
          <section className="flex flex-row py-1">
            <input type="checkbox" className="mr-2" />
            <section className="flex flex-col">
              <p>FNOL</p>
              <span className="text-xs text-gray-600">Claim Opened</span>
            </section>
          </section>
          <section className="flex flex-row py-1">
            <input type="checkbox" className="mr-2" />
            <section className="flex flex-col">
              <p>Appraisal</p>
              <span className="text-xs text-gray-600">Claim Evaluated</span>
            </section>
          </section>
          <section className="flex flex-row py-1">
            <input type="checkbox" className="mr-2" />
            <section className="flex flex-col">
              <p>Adjusted</p>
              <span className="text-xs text-gray-600">Claim Paid</span>
            </section>
          </section>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Claim Evaluation</label>
          {/* Single Range Slider for Min/Max */}
          <input
            type="range"
            min="0"
            max="50000"
            value={filters.claimAmount[0]}
            onChange={handleSliderChange}
            className="range"
          />
          <input
            type="range"
            min="0"
            max="50000"
            value={filters.claimAmount[1]}
            onChange={handleSliderChange}
            className="range mt-2"
          />
          <div className="text-sm text-gray-600">
            Range: ${filters.claimAmount[0]} - ${filters.claimAmount[1]}
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
              onClick={() => handleSortChange("claimAmount-asc")}
              className={`${buttonStyle} w-40 ${sortDirection.active && sortDirection.sortBy === "claimAmount-asc" ? activeButtonStyle : ""}`}
            >
              {sortDirection.active && sortDirection.sortBy === "claimAmount-asc" && <span className="ml-1">✓</span>}
              Amount Ascending
            </button>
            <button
              onClick={() => handleSortChange("claimAmount-desc")}
              className={`${buttonStyle} w-40 ${sortDirection.active && sortDirection.sortBy === "claimAmount-desc" ? activeButtonStyle : ""}`}
            >
              {sortDirection.active && sortDirection.sortBy === "claimAmount-desc" && <span className="ml-1">✓</span>}
              Amount Descending
            </button>
          </div>
        </div>

        {/* Claims Grid */}
        <div className="grid grid-cols-6 gap-4">
          {currentClaims.length > 0 ? (
            currentClaims.map((claim) => (
              <div key={claim._id} className="bg-gray-100 p-4 rounded shadow-md">
                <img src={placeholderImg} alt="" className="w-full h-20" />
                <h3 className=" text-sm font-bold">{claim.claimNo}</h3>
                <p className="text-xs text-gray-600">{formatDate(claim.claimDate)}</p>
              
                
              </div>
            ))
          ) : (
            <p>No claims found.</p>
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

export default ClaimScreen;
