import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCrypto } from "../Context/CryptoContext";
import { Star, StarOff } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const CoinDetails = () => {
  const { id } = useParams();
  const { coins, watchlist, toggleWatchlist } = useCrypto();
  const coin = coins.find((c) => c.id === id);

  const [chartData, setChartData] = useState(null);

  const isFavorited = watchlist.includes(id);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
        );
        const data = await res.json();

        const labels = data.prices.map((entry) =>
          new Date(entry[0]).toLocaleDateString("en-US", { weekday: "short" })
        );
        const prices = data.prices.map((entry) => entry[1]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              fill: true,
              borderColor: "#10b981",
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Chart data fetch error:", error);
      }
    };

    if (id) fetchChartData();
  }, [id]);

  if (!coin) {
    return <div className="text-center mt-10">Loading or Coin Not Found...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl text-center">
        {/* Coin Image */}
        <img
          src={coin.image}
          alt={coin.name}
          className="w-20 h-20 mx-auto mb-4"
        />

        {/* Name + Star */}
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-2xl font-bold">{coin.name}</h2>
          <button onClick={() => toggleWatchlist(coin.id)}>
            {isFavorited ? (
              <Star className="text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Symbol */}
        <p className="text-gray-500 mb-4 uppercase">({coin.symbol})</p>

        {/* Price Info */}
        <p className="text-lg font-semibold">
          Price: <span className="text-green-600">${coin.current_price}</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Market Cap Rank: #{coin.market_cap_rank}
        </p>
        <p className="text-sm text-gray-600">
          24h Change:{" "}
          <span
            className={
              coin.price_change_percentage_24h >= 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </p>

        {/* Chart Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Last 7 Days</h3>
          {chartData ? (
            <Line data={chartData} />
          ) : (
            <p className="text-sm text-gray-400">Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
