// import React, { useState, useMemo } from "react";
// import { Search as SearchIcon, Filter } from "lucide-react";
// import { useCrypto } from "../Context/CryptoContext";
// import { useNavigate } from "react-router-dom";
// const MarketList = () => {
//   const { coins, page, setPage } = useCrypto();

//   const [search, setSearch] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [rankFilter, setRankFilter] = useState('');
//   const [volumeFilter, setVolumeFilter] = useState('');
//   const [changeFilter, setChangeFilter] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     const result = coins.filter((coin) =>
//       coin.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredCoins(result);
//   };
//   const handlePrev = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   const handleNext = () => {
//     if (page < 5) setPage(page + 1);
//   };

//   const toggleFilters = () => setShowFilters(!showFilters);

//   const clearFilters = () => {
//     setRankFilter('');
//     setVolumeFilter('');
//     setChangeFilter('');
//   };

//   const filteredCoins = useMemo(() => {
//     let result = coins;

//     if (search.trim() !== "") {
//       result = result.filter((coin) =>
//         coin.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (rankFilter) {
//       result = result.filter((coin) => coin.market_cap_rank <= parseInt(rankFilter));
//     }
//     if (volumeFilter) {
//       result = result.filter((coin) => coin.total_volume >= parseInt(volumeFilter));
//     }
//     if (changeFilter) {
//       result = result.filter((coin) => coin.price_change_percentage_24h >= parseFloat(changeFilter));
//     }

//     return result;
//   }, [coins, search, rankFilter, volumeFilter, changeFilter]);

//   return (
//     <div className="flex flex-col items-center min-h-screen px-4 pt-10 pb-4 bg-white">
//       <h1 className="text-2xl font-bold font-sans text-center mb-2">
//         Welcome to Crypto App
//       </h1>
//       <p className="text-center mb-4 text-sm">
//          Explore the largest crypto market
//       </p>

//       {/* Search and Filter */}
//       <div className="flex flex-wrap items-center justify-center gap-2 mb-4 w-full max-w-md">
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           type="text"
//           className="flex-1 border border-gray-300 px-4 py-2 rounded-md w-full sm:w-auto"
//           placeholder="Enter coin name"
//         />
//          <button onClick={handleSearch} className="p-2">
//           <SearchIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
//          </button>
//         <button className="p-2" onClick={toggleFilters}>
//           <Filter className={`w-5 h-5 ${showFilters ? "text-blue-500" : "text-gray-500"}`} />
//         </button>
//       </div>

//       {/* Filter Dropdowns */}
//       {showFilters && (
//         <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-3xl">
//           {/* Market Cap Rank */}
//           <select
//             value={rankFilter}
//             onChange={(e) => setRankFilter(e.target.value)}
//             className="border px-3 py-2 rounded-md"
//           >
//             <option value="">Market Cap Rank</option>
//             <option value="10">Top 10</option>
//             <option value="50">Top 50</option>
//             <option value="100">Top 100</option>
//           </select>

//           {/* Volume */}
//           <select
//             value={volumeFilter}
//             onChange={(e) => setVolumeFilter(e.target.value)}
//             className="border px-3 py-2 rounded-md"
//           >
//             <option value="">Volume (24h)</option>
//             <option value="1000000">Above 1M</option>
//             <option value="100000000">Above 100M</option>
//             <option value="1000000000">Above 1B</option>
//           </select>

//           {/* 24h Change */}
//           <select
//             value={changeFilter}
//             onChange={(e) => setChangeFilter(e.target.value)}
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

//       {/* Table */}
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
//               <tr key={coin.id}
//                   onClick={() => navigate(`/coin/${coin.id}`)}
//       className="cursor-pointer hover:bg-gray-100 transition">
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
//                   <span className={coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
//                     {coin.price_change_percentage_24h?.toFixed(2)}%
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
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



import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CryptoContext from "../context/CryptoContext";

const MarketList = () => {
  const { currency, symbol, coins, loading } = useContext(CryptoContext);
  const navigate = useNavigate();

  const filteredCoins = Array.isArray(coins)
    ? coins.filter((coin) => coin.name && coin.name.toLowerCase().includes(currency.toLowerCase()))
    : [];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Rank</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Logo</th>
            <th className="border px-4 py-2">Symbol</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Market Cap</th>
            <th className="border px-4 py-2">Volume</th>
            <th className="border px-4 py-2">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-blue-500">
                Loading...
              </td>
            </tr>
          ) : filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="cursor-pointer hover:bg-gray-100 transition"
              >
                <td className="border px-4 py-2">{coin.market_cap_rank}</td>
                <td className="border px-4 py-2">{coin.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="h-6 w-6 mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">
                  {coin.symbol.toUpperCase()}
                </td>
                <td className="border px-4 py-2">
                  {symbol}
                  {coin.current_price?.toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {symbol}
                  {coin.market_cap?.toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {symbol}
                  {coin.total_volume?.toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center font-semibold">
                  <span
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                No coins found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarketList;
