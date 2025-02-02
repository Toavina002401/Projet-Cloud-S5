import { useEffect, useState } from "react";
import { create } from 'zustand'; // Zustand store
import Card from "./common/Card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Zustand Store for managing cryptocurrency prices
interface CryptoState {
  prices: { symbol: string; price: number; change24h: number }[];
  loading: boolean;
  updatePrices: () => void;
}

const mockPrices = [
  { symbol: 'BTC', price: 1000, change24h: 2.5 },
  { symbol: 'ETH', price: 650, change24h: -1.2 },
  { symbol: 'BNB', price: 350, change24h: 1.8 },
  { symbol: 'XRP', price: 275, change24h: 1.5 }
];

const useCryptoStore = create<CryptoState>((set) => ({
  prices: mockPrices,
  loading: false,
  updatePrices: () => {
    // Simulate price updates with random changes
    set(state => ({
      prices: state.prices.map(price => ({
        ...price,
        price: price.price * (1 + (Math.random() * 0.1 - 0.05)),
        change24h: Math.random() * 10 - 5
      }))
    }));
  }
}));

// Define cryptos with initial values
const cryptos = [
  { name: "Bitcoin", symbol: "BTC", basePrice: 4800, color: "#ff7300" },
  { name: "Ethereum", symbol: "ETH", basePrice: 2800, color: "#1f77b4" },
  { name: "Binance Coin", symbol: "BNB", basePrice: 3200, color: "#2ca02c" },
  { name: "Cardano", symbol: "ADA", basePrice: 1200, color: "#d62728" },
  { name: "Solana", symbol: "SOL", basePrice: 30, color: "#9467bd" },
];

// Function to generate data points
const generatePoint = (basePrice: number, time: number) => ({
  time,
  value: basePrice * (1 + (Math.random() * 0.1 - 0.05)), // slight variation in price
});

// Initialize the data with times and base prices for each cryptocurrency
const initializeData = (prices: any) => {
  const times = Array.from({ length: 30 }, (_, i) => i); // Create times from 0 to 29 minutes
  return cryptos.map((crypto) => {
    const price = prices.find((p: any) => p.symbol === crypto.symbol)?.price || crypto.basePrice;
    return {
      name: crypto.name,
      symbol: crypto.symbol,
      color: crypto.color,
      data: times.map((time) => generatePoint(price, time)),
    };
  });
};

const CryptoDynamicChart = () => {
  const { prices, updatePrices } = useCryptoStore(); // Access Zustand store directly
  const [cryptoData, setCryptoData] = useState<any[]>(initializeData(prices));

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices(); // Update prices every second
      setCryptoData(initializeData(prices)); // Reinitialize the data with new prices
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [prices, updatePrices]);

  return (
    <Card
      variant="glass"
      className="w-full max-w-5xl mx-auto p-6 space-y-6 animate-fade-in"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">Évolution Dynamique des Cryptos</h2>
        <p className="text-sm text-muted-foreground">
          Données en temps réel sur les 30 dernières minutes
        </p>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 12 }}
              type="number"
              domain={[0, 30]} // Time range from 0 to 30 minutes
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 12 }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(26, 31, 44, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`,
                name,
              ]}
            />

            {cryptoData.map((crypto) => (
              <Line
                key={crypto.symbol}
                dataKey="value"
                data={crypto.data}
                name={crypto.name}
                stroke={crypto.color}
                strokeWidth={2}
                dot={false}
                animationDuration={500} // Smooth animation for updates
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {cryptoData.map((crypto) => (
          <div key={crypto.symbol} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: crypto.color }}
            ></span>
            <span className="text-sm font-medium">{crypto.name}</span>
          </div>
        ))}
      </div>
    </Card> 
  );
};

export default CryptoDynamicChart;
