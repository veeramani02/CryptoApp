
import { createContext, useContext, useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const CryptoContext = createContext(null);

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [page, setPage] = useState(1);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (coinId) => {
    setWatchlist((prev) =>
      prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId]
    );
  };

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&x_cg_demo_api_key=${API_KEY}`
      );
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency, page]);

  return (
    <CryptoContext.Provider
      value={{
        coins,
        loading,
        currency,
        setCurrency,
        page,
        setPage,
        watchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
