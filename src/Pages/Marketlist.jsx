// import React, { useState, useEffect } from "react";
// import { Search as SearchIcon, Filter } from "lucide-react";
// import { useCrypto } from "../Context/CryptoContext";
// import { useNavigate } from "react-router-dom";

// const MarketList = () => {
//   const { coins, page, setPage } = useCrypto();

//   const [search, setSearch] = useState("");
//   const [filteredCoins, setFilteredCoins] = useState(coins);
//   const [showFilters, setShowFilters] = useState(false);
//   const [rankFilter, setRankFilter] = useState("");
//   const [volumeFilter, setVolumeFilter] = useState("");
//   const [changeFilter, setChangeFilter] = useState("");
//   const navigate = useNavigate();


//   const applyFiltersAndSearch = (searchTerm, currentRank, currentVolume, currentChange) => {
//     let result = coins;

//     if (searchTerm.trim() !== "") {
//       result = result.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
  
//     if (currentRank) {
//       result = result.filter((coin) => coin.market_cap_rank <= parseInt(currentRank));
//     }
    
//     if (currentVolume) {
//       result = result.filter((coin) => coin.total_volume >= parseInt(currentVolume));
//     }
   
//     if (currentChange) {
//       result = result.filter((coin) => coin.price_change_percentage_24h >= parseFloat(currentChange));
//     }

//     setFilteredCoins(result);
//   };

//   useEffect(() => {
//     applyFiltersAndSearch(search, rankFilter, volumeFilter, changeFilter);
//   }, [coins]);
  
//   const handleSearch = () => {
//     applyFiltersAndSearch(search, rankFilter, volumeFilter, changeFilter);
//   };
  
//   const handleInputChange = (e) => {
//     const newSearchTerm = e.target.value;
//     setSearch(newSearchTerm);
  
//     applyFiltersAndSearch(newSearchTerm, rankFilter, volumeFilter, changeFilter);
//   };
  
//   const handleFilterChange = (setter, value) => {
//     setter(value);
   
//     applyFiltersAndSearch(search, 
//       setter === setRankFilter ? value : rankFilter,
//       setter === setVolumeFilter ? value : volumeFilter,
//       setter === setChangeFilter ? value : changeFilter
//     );
//   };

//   const handlePrev = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   const handleNext = () => {
//     if (page < 5) setPage(page + 1);
//   };

//   const toggleFilters = () => setShowFilters(!showFilters);

//   const clearFilters = () => {
//     setRankFilter("");
//     setVolumeFilter("");
//     setChangeFilter("");
   
//     setSearch("");
//     setFilteredCoins(coins);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen px-4 pt-10 pb-4 bg-white">
//       <h1 className="text-2xl font-bold font-sans text-center mb-2">
//         Welcome to Crypto App
//       </h1>
//       <p className="text-center mb-4 text-sm">
//         Explore the largest crypto market
//       </p>

      
//       <div className="flex flex-wrap items-center justify-center gap-2 mb-4 w-full max-w-md">
//         <input
//           value={search}
//           onChange={handleInputChange}
//           type="text"
//           className="flex-1 border border-gray-300 px-4 py-2 rounded-md w-full sm:w-auto"
//           placeholder="Enter coin name"
//         />
//         <button onClick={handleSearch} className="p-2">
//           <SearchIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
//         </button>
//         <button className="p-2" onClick={toggleFilters}>
//           <Filter className={`w-5 h-5 ${showFilters ? "text-blue-500" : "text-gray-500"}`} />
//         </button>
//       </div>

//       {showFilters && (
//         <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-3xl">
         
//           <select
//             value={rankFilter}
//             onChange={(e) => handleFilterChange(setRankFilter, e.target.value)}
//             className="border px-3 py-2 rounded-md"
//           >
//             <option value="">Market Cap Rank</option>
//             <option value="10">Top 10</option>
//             <option value="50">Top 50</option>
//             <option value="100">Top 100</option>
//           </select>

         
//           <select
//             value={volumeFilter}
//             onChange={(e) => handleFilterChange(setVolumeFilter, e.target.value)}
//             className="border px-3 py-2 rounded-md"
//           >
//             <option value="">Volume (24h)</option>
//             <option value="1000000">Above 1M</option>
//             <option value="100000000">Above 100M</option>
//             <option value="1000000000">Above 1B</option>
//           </select>

          
//           <select
//             value={changeFilter}
//             onChange={(e) => handleFilterChange(setChangeFilter, e.target.value)}
//             className="border px-3 py-2 rounded-md"
//           >
//             <option value="">24h Change %</option>
//             <option value="5">Above 5%</option>
//             <option value="10">Above 10%</option>
//             <option value="20">Above 20%</option>
//           </select>

//           <button
//             onClick={clearFilters}
//             className="px-4 py-2 bg-red-100 text-red-600 rounded-md"
//           >
//             Clear Filters
//           </button>
//         </div>
//       )}

    
//       <div className="overflow-x-auto w-full">
//         <table className="min-w-[700px] table-auto border border-gray-400 w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-400 px-4 py-2">Rank</th>
//               <th className="border border-gray-400 px-4 py-2">Coin</th>
//               <th className="border border-gray-400 px-4 py-2">Icon</th>
//               <th className="border border-gray-400 px-4 py-2">Symbol</th>
//               <th className="border border-gray-400 px-4 py-2">Price</th>
//               <th className="border border-gray-400 px-4 py-2">Market Cap</th>
//               <th className="border border-gray-400 px-4 py-2">Volume 24h</th>
//               <th className="border border-gray-400 px-4 py-2">24h Change</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCoins.map((coin) => (
//               <tr
//                 key={coin.id}
//                 onClick={() => navigate(`/coin/${coin.id}`)}
//                 className="cursor-pointer hover:bg-gray-100 transition"
//               >
//                 <td className="border border-gray-400 px-4 py-2">{coin.market_cap_rank}</td>
//                 <td className="border border-gray-400 px-4 py-2">{coin.name}</td>
//                 <td className="border border-gray-400 px-4 py-2">
//                   <img src={coin.image} alt={coin.name} className="h-6 w-6 mx-auto" />
//                 </td>
//                 <td className="border border-gray-400 px-4 py-2">{coin.symbol.toUpperCase()}</td>
//                 <td className="border border-gray-400 px-4 py-2">${coin.current_price.toLocaleString()}</td>
//                 <td className="border border-gray-400 px-4 py-2">${coin.market_cap.toLocaleString()}</td>
//                 <td className="border border-gray-400 px-4 py-2">${coin.total_volume.toLocaleString()}</td>
//                 <td className="border border-gray-400 px-4 py-2 text-center font-semibold">
//                   <span className={coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
//                     {coin.price_change_percentage_24h?.toFixed(2)}%
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

      
//       <div className="flex justify-between items-center mt-6 w-full max-w-md">
//         <button
//           onClick={handlePrev}
//           disabled={page === 1}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-gray-700 font-semibold">Page {page} of 5</span>
//         <button
//           onClick={handleNext}
//           disabled={page === 5}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MarketList;

import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Filter } from "lucide-react";
import { useCrypto } from "../Context/CryptoContext";
import { useNavigate } from "react-router-dom";

const MarketList = () => {
  const { coins, page, setPage } = useCrypto();

  // Initialize with an empty array to prevent errors on first render
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [rankFilter, setRankFilter] = useState("");
  const [volumeFilter, setVolumeFilter] = useState("");
  const [changeFilter, setChangeFilter] = useState("");
  const navigate = useNavigate();

  // This function is now safe to call even if 'coins' is not an array
  const applyFiltersAndSearch = (searchTerm, currentRank, currentVolume, currentChange) => {
    // Add this check to prevent the TypeError
    if (!Array.isArray(coins)) {
      return; 
    }
    
    let result = coins;

    if (searchTerm.trim() !== "") {
      result = result.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
 
    if (currentRank) {
      result = result.filter((coin) => coin.market_cap_rank <= parseInt(currentRank));
    }
    
    if (currentVolume) {
      result = result.filter((coin) => coin.total_volume >= parseInt(currentVolume));
    }
   
    if (currentChange) {
      result = result.filter((coin) => coin.price_change_percentage_24h >= parseFloat(currentChange));
    }

    setFilteredCoins(result);
  };

  // The useEffect now only runs when the 'coins' data is updated.
  // It ensures the filteredCoins state is populated correctly on initial load.
  useEffect(() => {
    applyFiltersAndSearch(search, rankFilter, volumeFilter, changeFilter);
  }, [coins]);
  
  const handleSearch = () => {
    applyFiltersAndSearch(search, rankFilter, volumeFilter, changeFilter);
  };
  
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
  };
  
  const handleFilterChange = (setter, value) => {
    setter(value);
    // Apply filters based on the current state after a filter dropdown is changed.
    applyFiltersAndSearch(search, 
      setter === setRankFilter ? value : rankFilter,
      setter === setVolumeFilter ? value : volumeFilter,
      setter === setChangeFilter ? value : changeFilter
    );
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < 5) setPage(page + 1);
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearFilters = () => {
    setRankFilter("");
    setVolumeFilter("");
    setChangeFilter("");
    setSearch("");
    setFilteredCoins(coins);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-10 pb-4 bg-white">
      <h1 className="text-2xl font-bold font-sans text-center mb-2">
        Welcome to Crypto App
      </h1>
      <p className="text-center mb-4 text-sm">
        Explore the largest crypto market
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 w-full max-w-md">
        <input
          value={search}
          onChange={handleInputChange}
          type="text"
          className="flex-1 border border-gray-300 px-4 py-2 rounded-md w-full sm:w-auto"
          placeholder="Enter coin name"
        />
        <button onClick={handleSearch} className="p-2">
          <SearchIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        </button>
        <button className="p-2" onClick={toggleFilters}>
          <Filter className={`w-5 h-5 ${showFilters ? "text-blue-500" : "text-gray-500"}`} />
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-3xl">
          <select
            value={rankFilter}
            onChange={(e) => handleFilterChange(setRankFilter, e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Market Cap Rank</option>
            <option value="10">Top 10</option>
            <option value="50">Top 50</option>
            <option value="100">Top 100</option>
          </select>

          <select
            value={volumeFilter}
            onChange={(e) => handleFilterChange(setVolumeFilter, e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Volume (24h)</option>
            <option value="1000000">Above 1M</option>
            <option value="100000000">Above 100M</option>
            <option value="1000000000">Above 1B</option>
          </select>

          <select
            value={changeFilter}
            onChange={(e) => handleFilterChange(setChangeFilter, e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">24h Change %</option>
            <option value="5">Above 5%</option>
            <option value="10">Above 10%</option>
            <option value="20">Above 20%</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-md"
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="min-w-[700px] table-auto border border-gray-400 w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-4 py-2">Rank</th>
              <th className="border border-gray-400 px-4 py-2">Coin</th>
              <th className="border border-gray-400 px-4 py-2">Icon</th>
              <th className="border border-gray-400 px-4 py-2">Symbol</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Market Cap</th>
              <th className="border border-gray-400 px-4 py-2">Volume 24h</th>
              <th className="border border-gray-400 px-4 py-2">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="cursor-pointer hover:bg-gray-100 transition"
              >
                <td className="border border-gray-400 px-4 py-2">{coin.market_cap_rank}</td>
                <td className="border border-gray-400 px-4 py-2">{coin.name}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <img src={coin.image} alt={coin.name} className="h-6 w-6 mx-auto" />
                </td>
                <td className="border border-gray-400 px-4 py-2">{coin.symbol.toUpperCase()}</td>
                <td className="border border-gray-400 px-4 py-2">${coin.current_price.toLocaleString()}</td>
                <td className="border border-gray-400 px-4 py-2">${coin.market_cap.toLocaleString()}</td>
                <td className="border border-gray-400 px-4 py-2">${coin.total_volume.toLocaleString()}</td>
                <td className="border border-gray-400 px-4 py-2 text-center font-semibold">
                  <span className={coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 w-full max-w-md">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-semibold">Page {page} of 5</span>
        <button
          onClick={handleNext}
          disabled={page === 5}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MarketList;