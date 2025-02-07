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
import { IoStarOutline, IoStar } from "react-icons/io5";


const getPrice10HeureAvant = (basePrice: number, currentTime: string) => {
  const result = [];
  let [hours, minutes] = currentTime.split(":").map(Number);

  let price = basePrice;
  for (let i = 0; i < 60; i++) {
    price *= 1 + (Math.random() * 0.1 - 0.05);
    const formattedHour = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    result.unshift({ heure: `${formattedHour}:${formattedMinutes}`, prix: price });
    minutes -= 10;
    if (minutes < 0) {
      minutes += 60;
      hours = (hours - 1 + 24) % 24;
    }
  }
  return result;
};

const formatTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const getCurrentTime = () => {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

const crypto = () => {
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
  return cryptos.map(crypto => {
    const now = formatTime(new Date());
    return {
      ...crypto,
      history: getPrice10HeureAvant(crypto.basePrice, now)
    };
  });
};

const generateCryptoData = (previousData = []) => {
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

  return cryptos.map(crypto => {
    // Trouver l'ancienne valeur du currentPrice si elle existe
    const previousCrypto = previousData.find(c => c.symbol === crypto.symbol);
    const previousPrice = previousCrypto ? previousCrypto.currentPrice : crypto.basePrice;

    // Calculer le nouveau prix en appliquant une variation aléatoire entre -5% et +5%
    const newPrice = previousPrice * (1 + (Math.random() * 0.1 - 0.05));

    // Calculer la variation en pourcentage
    const priceChange = ((newPrice - previousPrice) / previousPrice) * 100;

    return {
      ...crypto,
      currentPrice: newPrice,
      priceChange: priceChange.toFixed(2),
    };
  });
};


const CryptoFavorit = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [cryptoData, setCryptoData] = useState(generateCryptoData());
  const [cryptoHistory, setCryptoHistory] = useState<Record<string, { time: string, value: number }[]>>({});
  const [cryptoDataHisto, setCryptoDataHisto] = useState(crypto());
  const [chartDataHisto, setChartDataHisto] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [favoriteCryptos, setFavoriteCryptos] = useState<string[]>([]);
  const [notification, setNotification] = useState<string>("");

  // Mise à jour des données toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevCryptoData => {
        const newCryptoData = generateCryptoData(prevCryptoData);

        setCryptoHistory(prevHistory => {
          const updatedHistory = { ...prevHistory };
          newCryptoData.forEach(crypto => {
            const newEntry = { time: getCurrentTime(), value: crypto.currentPrice };
            if (!updatedHistory[crypto.symbol]) {
              updatedHistory[crypto.symbol] = [];
            }
            updatedHistory[crypto.symbol] = [...updatedHistory[crypto.symbol], newEntry].slice(-10);
          });

          return updatedHistory;
        });

        return newCryptoData;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const selectedCryptoDataHisto = cryptoDataHisto.find(c => c.symbol === selectedCrypto);
    if (selectedCryptoDataHisto) {
      setChartDataHisto(selectedCryptoDataHisto.history.map(({ heure, prix }) => ({ time: heure, value: prix.toFixed(2) })));
    }
    setChartData(cryptoHistory[selectedCrypto] || []);
  }, [selectedCrypto, cryptoHistory]);



  // Handle favorite change
  const handleFavoriteClick = (cryptoSymbol: string) => {
    if (favoriteCryptos.includes(cryptoSymbol)) {
      // Retirer des favoris
      setFavoriteCryptos(favoriteCryptos.filter(symbol => symbol !== cryptoSymbol));
      setNotification(`Vous avez supprimé ${cryptoSymbol} de vos favoris.`);
    } else {
      // Ajouter aux favoris
      setFavoriteCryptos([...favoriteCryptos, cryptoSymbol]);
      setNotification(`Vous avez ajouté ${cryptoSymbol} à vos favoris.`);
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
          setNotification(`${favoriteCryptoData.name} prix modifié !`);
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
            <p className="text-sm text-muted-foreground">Graphique représentant l'évolution des prix sur les 10 dernières heures</p>
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

        <div className="grid grid-cols-12 gap-4">
          {/* Premier graphique qui prend 7 colonnes */}
          <div className="col-span-12 md:col-span-7 h-[350px] md:h-[400px] lg:h-[450px] bg-card rounded-lg shadow-lg p-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartDataHisto} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="time" interval="preserveStartEnd" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }}/>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9b87f5"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Deuxième graphique qui prend 5 colonnes */}
          <div className="col-span-12 md:col-span-5 h-[350px] md:h-[400px] lg:h-[450px] bg-card rounded-lg shadow-lg p-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ left: -21 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="time" interval="preserveStartEnd" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 9 }}/>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9b87f5"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CryptoFavorit;
