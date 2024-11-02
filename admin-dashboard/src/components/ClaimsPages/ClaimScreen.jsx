import { useState, useEffect } from "react";

const ClaimScreen = () => {
  // Initial data and state
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    price: [0, 50000],
    risk: "all",
    sortBy: "new",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const claimsPerPage = 12; // 12 claims per page
  const [showRiskDropdown, setShowRiskDropdown] = useState(false); // State for dropdown visibility

  // State to manage sort direction
  const [sortDirection, setSortDirection] = useState({ sortBy: "new", active: false });

  // Mock data generation
  useEffect(() => {
    const mockData = [...Array(1000)].map((_, idx) => ({
      id: idx + 1,
      title: `Claim ${idx + 1}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(), // Random date within the last 10 days
      price: Math.floor(Math.random() * 50000),
      risk: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
    }));
    setClaims(mockData);
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = claims.filter(claim =>
      claim.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filters.risk !== "all") result = result.filter(claim => claim.risk === filters.risk);
    if (filters.price) result = result.filter(claim => claim.price >= filters.price[0] && claim.price <= filters.price[1]);

    // Sort claims based on the selected filter
    if (sortDirection.active) {
      if (sortDirection.sortBy === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortDirection.sortBy === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      } else {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    } else {
      // Reset sorting to the original order if not active
      result = [...claims];
    }

    setFilteredClaims(result);
  }, [claims, searchQuery, filters, sortDirection]);

  // Handlers
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (newFilters) => setFilters(prev => ({ ...prev, ...newFilters }));
  
  // Updated handler for sorting changes
  const handleSortChange = (sortOption) => {
    setSortDirection(prev => {
      // Check if the same sort option is clicked again
      if (prev.sortBy === sortOption) {
        return { sortBy: sortOption, active: !prev.active }; // Toggle active state
      }
      return { sortBy: sortOption, active: true }; // Activate new sort option
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

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-40 p-4 border-r">
        <h2 className="text-lg font-bold mb-2">Filters</h2>
        <div className="py-2">
        <section className="flex flex-row py-1">
        <input type="checkbox" className="mr-2" /> <section className="flex flex-col"> <p>FNOL</p> <span className="text-xs text-gray-600">Claim Opened</span></section>        
        </section>

        <section className="flex flex-row py-1">
        <input type="checkbox" className="mr-2" /> <section className="flex flex-col"> <p>Appraisal</p> <span className="text-xs text-gray-600">Claim Evalated</span></section>        
        </section>        
        
        <section className="flex flex-row py-1">
        <input type="checkbox" className="mr-2" /> <section className="flex flex-col"> <p>Adjusted</p> <span className="text-xs text-gray-600">Claim Paid</span></section>        
        </section>
      </div>
        <div>
          <label className="block mb-2 font-semibold">Claim Evaluation</label>
          <input
            type="range"
            min="0"
            max="50000"
            className="range"
            value={filters.price[1]}
            onChange={(e) => handleFilterChange({ price: [0, e.target.value] })}
          />
          <div className="text-sm text-gray-600">Up to ${filters.price[1]}</div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Branch</label>
          <div>
            <input type="checkbox" className="mr-2" /> Auto <br />
            <input type="checkbox" className="mr-2" /> Home <br />
            <input type="checkbox" className="mr-2" /> Health <br />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Flags</label>
          <div>
            <input type="checkbox" className="mr-2" /> Fraud <br />
            <input type="checkbox" className="mr-2" /> Leakage <br />
            <input type="checkbox" className="mr-2" /> Litigation <br />
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
              onClick={() => handleSortChange("price-asc")}
              className={`${buttonStyle} w-40 ${sortDirection.active && sortDirection.sortBy === "price-asc" ? activeButtonStyle : ""}`}
            >
              {sortDirection.active && sortDirection.sortBy === "price-asc" && <span className="ml-1">✓</span>}
              Price Ascending
            </button>
            <button
              onClick={() => handleSortChange("price-desc")}
              className={`${buttonStyle} w-40 ${sortDirection.active && sortDirection.sortBy === "price-desc" ? activeButtonStyle : ""}`}
            >
              {sortDirection.active && sortDirection.sortBy === "price-desc" && <span className="ml-1">✓</span>}
              Price Descending
            </button>
            <div className="relative">
              <button
                className={`${buttonStyle} px-2 py-3`}
                onClick={() => setShowRiskDropdown(prev => !prev)}
              >
                Risk
              </button>
              {showRiskDropdown && (
                <div className="absolute mt-2 bg-white border rounded shadow-lg z-10">
                  <div onClick={() => handleFilterChange({ risk: "all" })} className="p-2 hover:bg-gray-100 cursor-pointer">All</div>
                  <div onClick={() => handleFilterChange({ risk: "low" })} className="p-2 hover:bg-gray-100 cursor-pointer">Low</div>
                  <div onClick={() => handleFilterChange({ risk: "medium" })} className="p-2 hover:bg-gray-100 cursor-pointer">Medium</div>
                  <div onClick={() => handleFilterChange({ risk: "high" })} className="p-2 hover:bg-gray-100 cursor-pointer">High</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Claims Grid */}
        <div className="grid grid-cols-6 gap-4">
          {currentClaims.length > 0 ? (
            currentClaims.map((claim) => (
              <div key={claim.id} className="bg-gray-100 p-4 rounded shadow-md">
                <h3 className="text-lg font-bold">{claim.title}</h3>
                <p className="text-gray-600">{formatDate(claim.date)}</p>
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
