
import { useState } from "react";
import { LineChart, TrendingUp, TrendingDown } from "lucide-react";


interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

const Search = () => {
  const [cryptos] = useState<Crypto[]>([
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      price: 43521.23,
      change24h: 2.45,
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      price: 2284.12,
      change24h: -1.23,
    },
    {
      id: "3",
      name: "Binance Coin",
      symbol: "BNB",
      price: 312.45,
      change24h: 0.89,
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1A1F2C] to-[#111827]">
      <main className="flex-1 p-6 pb-24">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
          Crypto Market
        </h1>

        <div className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden">
          <div className="grid gap-4 p-4">
            {cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] flex items-center justify-center">
                  <LineChart className="w-5 h-5 text-white" />
                </div>
                  <div>
                    <h3 className="font-semibold text-white">{crypto.name}</h3>
                    <p className="text-sm text-gray-400">{crypto.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    ${crypto.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm flex items-center gap-1 ${
                      crypto.change24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {crypto.change24h >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(crypto.change24h)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
