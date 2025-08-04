import { useCrypto } from "../Context/CryptoContext";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const { coins, watchlist, toggleWatchlist } = useCrypto();
  const navigate = useNavigate();

  const filtered = coins.filter((coin) => watchlist.includes(coin.id));

  if (filtered.length === 0) return <p className="text-center mt-10">No coins in watchlist</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filtered.map((coin) => (
        <div
          key={coin.id}
          className="p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer relative"
          onClick={() => navigate(`/coin/${coin.id}`)}
        >
          <img src={coin.image} alt={coin.name} className="w-10 h-10 mb-2" />
          <h3 className="text-lg font-semibold">{coin.name}</h3>
          <p>Price: ${coin.current_price}</p>
          <button
            className="absolute top-2 right-2 text-red-500"
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering navigate
              toggleWatchlist(coin.id);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;