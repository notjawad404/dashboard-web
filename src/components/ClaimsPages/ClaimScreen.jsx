import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from '../../assets/Image.png';
import DoubleRangeSlider from "./DoubleRangeSlider";

const ClaimScreen = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dasbboard-backend.vercel.app/api/claim/claims");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setClaims(data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };
    fetchData();
  }, []);

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

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  // const handleFilterChange = (newFilters) => setFilters(prev => ({ ...prev, ...newFilters }));

  const handleSortChange = (sortOption) => {
    setSortDirection(prev => {
      if (prev.sortBy === sortOption) {
        return { sortBy: sortOption, active: !prev.active };
      }
      return { sortBy: sortOption, active: true };
    });
  };

  const handleSliderChange = (min, max) => {
    setFilters((prev) => ({ ...prev, claimAmount: [min, max] }));
  };

  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = filteredClaims.slice(indexOfFirstClaim, indexOfLastClaim);
  const totalPages = Math.ceil(filteredClaims.length / claimsPerPage);

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

  const navigateToClaimDashboard = (claimId) => {
    navigate(`/claimdashboard/${claimId}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-40 p-4 border-r">
        <h2 className="text-lg font-bold mb-2">Filters</h2>
        <div className="py-2">
          {/* Risk Filters */}
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

        {/* Double Range Slider */}
        <div>
          <label className="block mb-2 font-semibold">Claim Evaluation</label>
          <DoubleRangeSlider
          initialMinValue={filters.claimAmount[0]}
          initialMaxValue={filters.claimAmount[1]}
          onMinChange={(min) => handleSliderChange(min, filters.claimAmount[1])}
          onMaxChange={(max) => handleSliderChange(filters.claimAmount[0], max)}
        />
        <div className="text-sm text-gray-600 mt-5">
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
              <div 
                key={claim._id} 
                className="my-1 cursor-pointer" 
                onClick={() => navigateToClaimDashboard(claim._id)}
              >
                <img src={placeholderImg} alt="" className="w-full h-32 object-cover" />
                <h3 className="text-sm font-bold">{claim.claimNo}</h3>
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
