import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FloatingChart } from "@/components/FloatingChart";
import MultiCryptoChart from "@/components/MultiCryptoChart";
import { useState } from "react";

const CryptoList = () => {
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);

  const cryptos = [
    { 
      name: "Bitcoin", 
      symbol: "BTC", 
      price: 42000, 
      change: 2.5,
      volume: "24,5 Mds",
      marketCap: "876,5 Mds",
      imageUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
    },
    { 
      name: "Ethereum", 
      symbol: "ETH", 
      price: 2800, 
      change: -1.2,
      volume: "12,3 Mds",
      marketCap: "345,2 Mds",
      imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
    },
    { 
      name: "Binance Coin", 
      symbol: "BNB", 
      price: 320, 
      change: 0.8,
      volume: "2,1 Mds",
      marketCap: "54,3 Mds",
      imageUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.png"
    },
    { 
      name: "Cardano", 
      symbol: "ADA", 
      price: 1.2, 
      change: -0.5,
      volume: "1,5 Mds",
      marketCap: "32,1 Mds",
      imageUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png"
    },
    { 
      name: "Solana", 
      symbol: "SOL", 
      price: 98, 
      change: 5.2,
      volume: "3,2 Mds",
      marketCap: "42,8 Mds",
      imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.png"
    },
  ];

  const handleCryptoClick = (crypto: any) => {
    setSelectedCrypto(crypto);
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 pb-20 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold mb-2">Marchés</h1>
          <p className="text-gray-400">Suivez les cours en temps réel</p>
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            placeholder="Rechercher une crypto..."
            className="pl-10 bg-crypto-card border-none text-white placeholder:text-gray-400 h-12 rounded-xl"
          />
        </div>

        {/* Graphique Multi-Crypto */}
        <MultiCryptoChart />

        {/* Statistiques du marché */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-crypto-card border-none p-4">
            <p className="text-gray-400 text-sm">Volume 24h</p>
            <p className="text-xl font-bold">86,2 Mds €</p>
          </Card>
          <Card className="bg-crypto-card border-none p-4">
            <p className="text-gray-400 text-sm">Capitalisation</p>
            <p className="text-xl font-bold">1,8 T €</p>
          </Card>
        </div>

        {/* Liste des cryptos */}
        <div className="space-y-4">
          {cryptos.map((crypto) => (
            <motion.div
              key={crypto.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCryptoClick(crypto)}
            >
              <Card className="bg-crypto-card border-none p-4 hover:bg-crypto-primary/10 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={crypto.imageUrl} 
                      alt={crypto.name}
                      className="w-10 h-10 rounded-full bg-white p-1"
                    />
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {crypto.name}
                        <span className="text-sm text-gray-400">{crypto.symbol}</span>
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>Vol : {crypto.volume}</span>
                        <span>•</span>
                        <span>Cap : {crypto.marketCap}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="font-semibold">{crypto.price.toLocaleString()} €</p>
                      <p
                        className={`text-sm flex items-center justify-end ${
                          crypto.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {crypto.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(crypto.change)}%
                      </p>
                    </div>
                    <ChevronRight className="text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Graphique flottant */}
      <FloatingChart
        isOpen={selectedCrypto !== null}
        onClose={() => setSelectedCrypto(null)}
        crypto={{
          name: selectedCrypto?.name || "",
          symbol: selectedCrypto?.symbol || "",
          data: [
            { date: "2024-01", price: selectedCrypto?.price || 0 },
            { date: "2024-02", price: (selectedCrypto?.price || 0) * 1.1 },
            { date: "2024-03", price: (selectedCrypto?.price || 0) * 0.95 },
            { date: "2024-04", price: (selectedCrypto?.price || 0) * 1.15 },
            { date: "2024-05", price: (selectedCrypto?.price || 0) * 1.08 },
          ],
        }}
      />
    </div>
  );
};

export default CryptoList;
