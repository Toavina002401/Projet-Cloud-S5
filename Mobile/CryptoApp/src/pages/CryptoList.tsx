import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

const CryptoList = () => {
  const cryptos = [
    { name: "Bitcoin", symbol: "BTC", price: 42000, change: 2.5 },
    { name: "Ethereum", symbol: "ETH", price: 2800, change: -1.2 },
    { name: "Binance Coin", symbol: "BNB", price: 320, change: 0.8 },
    { name: "Cardano", symbol: "ADA", price: 1.2, change: -0.5 },
    { name: "Solana", symbol: "SOL", price: 98, change: 5.2 },
  ];

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Search cryptocurrencies..."
            className="pl-10 bg-crypto-card border-none text-white placeholder:text-gray-400"
          />
        </div>

        {/* Crypto List */}
        <div className="space-y-4">
          {cryptos.map((crypto) => (
            <Card
              key={crypto.symbol}
              className="bg-crypto-card border-none p-4 hover:bg-crypto-primary/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{crypto.name}</h3>
                  <p className="text-sm text-gray-400">{crypto.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${crypto.price.toLocaleString()}</p>
                  <p
                    className={`text-sm flex items-center ${
                      crypto.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {crypto.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {crypto.change}%
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoList;