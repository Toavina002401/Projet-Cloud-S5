import { useEffect, useState } from "react";
import Card from "./common/Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// Importation des icônes Ionicons
import { IoStarOutline, IoStar } from "react-icons/io5"; // Icône étoile vide et pleine

// Initial data for 10 cryptocurrencies
const generateCryptoData = () => {
  const cryptos = [
    { name: "Bitcoin", symbol: "BTC", basePrice: 48000 },
    { name: "Ethereum", symbol: "ETH", basePrice: 2800 },
    { name: "Binance Coin", symbol: "BNB", basePrice: 320 },
    { name: "Cardano", symbol: "ADA", basePrice: 1.2 },
    { name: "Solana", symbol: "SOL", basePrice: 100 },
    { name: "Ripple", symbol: "XRP", basePrice: 0.5 },
    { name: "Polkadot", symbol: "DOT", basePrice: 18 },
    { name: "Dogecoin", symbol: "DOGE", basePrice: 0.08 },
    { name: "Avalanche", symbol: "AVAX", basePrice: 85 },
    { name: "Polygon", symbol: "MATIC", basePrice: 1.5 },
  ];

  return cryptos.map(crypto => ({
    ...crypto,
    currentPrice: crypto.basePrice * (1 + (Math.random() * 0.1 - 0.05)),
    priceChange: (Math.random() * 10 - 5).toFixed(2),
  }));
};

const CryptoFavorit = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [cryptoData, setCryptoData] = useState(generateCryptoData());
  const [chartData, setChartData] = useState<any[]>([]);
  const [favoriteCryptos, setFavoriteCryptos] = useState<string[]>([]); // Liste des favoris
  const [notification, setNotification] = useState<string>("");

  // Generate chart data for the selected cryptocurrency
  const generateChartData = () => {
    const timePoints = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
    return timePoints.map(time => ({
      time,
      value: Math.random() * 1000 + 4000, // Random value for demonstration
    }));
  };

  // Update data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(generateCryptoData());
      setChartData(generateChartData());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Initialize chart data
  useEffect(() => {
    setChartData(generateChartData());
  }, [selectedCrypto]);

  // Handle favorite change
  const handleFavoriteClick = (cryptoSymbol: string) => {
    if (favoriteCryptos.includes(cryptoSymbol)) {
      // Retirer des favoris
      setFavoriteCryptos(favoriteCryptos.filter(symbol => symbol !== cryptoSymbol));
      setNotification(`You have removed ${cryptoSymbol} from your favorites.`);
    } else {
      // Ajouter aux favoris
      setFavoriteCryptos([...favoriteCryptos, cryptoSymbol]);
      setNotification(`You have added ${cryptoSymbol} to your favorites.`);
    }
  };

  // Check if the selected crypto is in the favorites list
  const selectedCryptoData = cryptoData.find(c => c.symbol === selectedCrypto);

  // Check if the price change affects the favorite crypto
  useEffect(() => {
    if (favoriteCryptos.length > 0) {
      favoriteCryptos.forEach(symbol => {
        const favoriteCryptoData = cryptoData.find(c => c.symbol === symbol);
        if (favoriteCryptoData && favoriteCryptoData.priceChange !== "0") {
          setNotification(`${favoriteCryptoData.name} price changed!`);
        }
      });
    }
  }, [cryptoData, favoriteCryptos]);

  return (
    <Card variant="glass" className="w-full h-auto p-6 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cryptoData.map((crypto) => (
            <button
              key={crypto.symbol}
              onClick={() => setSelectedCrypto(crypto.symbol)}
              className={`p-4 rounded-lg transition-all duration-300 ${selectedCrypto === crypto.symbol ? "bg-primary/10 border border-primary" : "bg-card hover:bg-primary/5"}`}
            >
              <div className="text-sm font-medium">{crypto.name}</div>
              <div className="text-lg font-bold">${crypto.currentPrice.toFixed(2)}</div>
              <div className={`text-sm ${Number(crypto.priceChange) >= 0 ? "text-green-500" : "text-red-500"}`}>
                {Number(crypto.priceChange) >= 0 ? "+" : ""}{crypto.priceChange}%
              </div>

              {/* Star icon to mark favorite */}
              <div
                onClick={(e) => { e.stopPropagation(); handleFavoriteClick(crypto.symbol); }}
                className="mt-2 text-xl cursor-pointer"
              >
                {favoriteCryptos.includes(crypto.symbol) ? (
                  <IoStar className="text-yellow-500" />
                ) : (
                  <IoStarOutline className="text-gray-400" />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">{selectedCryptoData?.name} ({selectedCryptoData?.symbol})</h3>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">${selectedCryptoData?.currentPrice.toFixed(2)}</p>
            <p className={`text-sm ${Number(selectedCryptoData?.priceChange) >= 0 ? "text-green-500" : "text-red-500"}`}>
              {Number(selectedCryptoData?.priceChange) >= 0 ? "+" : ""}{selectedCryptoData?.priceChange}%
            </p>
          </div>
        </div>

        {/* Notification section */}
        {notification && (
          <div className="p-4 mt-4 bg-yellow-200 text-yellow-800 rounded-lg">
            {notification}
          </div>
        )}

        {/* Chart section wrapped in its own div */}
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-card rounded-lg shadow-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#888888", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#888888", fontSize: 12 }} domain={["auto", "auto"]} />
              <Tooltip contentStyle={{ background: "rgba(26, 31, 44, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="value" stroke="#9b87f5" fillOpacity={1} fill="url(#colorValue)" className="transition-all duration-300" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default CryptoFavorit;