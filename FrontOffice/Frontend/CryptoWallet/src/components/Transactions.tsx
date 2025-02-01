import { useState } from "react";
import Card from "./common/Card";
import Button from "./common/Button";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [walletBalance, setWalletBalance] = useState(10000); // Exemple de solde du portefeuille
  const [transactionHistory, setTransactionHistory] = useState<
    { type: string; amount: number; date: string; crypto?: string }[] 
  >([]);

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const cryptos = [
    { name: "Bitcoin", symbol: "BTC", price: 48000 },
    { name: "Ethereum", symbol: "ETH", price: 2800 },
    { name: "Binance Coin", symbol: "BNB", price: 320 },
    { name: "Cardano", symbol: "ADA", price: 1.2 },
    { name: "Solana", symbol: "SOL", price: 100 },
  ];

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // La notification disparaît après 3 secondes
  };

  const handleDeposit = () => {
    if (!amount || isNaN(Number(amount))) {
      showNotification("Please enter a valid amount.", "error");
      return;
    }
    const depositAmount = parseFloat(amount);
    setWalletBalance(walletBalance + depositAmount);
    setTransactionHistory((prevHistory) => [
      { type: "Deposit", amount: depositAmount, date: new Date().toLocaleString() },
      ...prevHistory, // Ajout de la nouvelle transaction en haut de l'historique
    ]);
    setAmount("");
    showNotification("Deposit successful!", "success");
  };

  const handleWithdraw = () => {
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) > walletBalance) {
      showNotification("Invalid withdraw amount or insufficient balance.", "error");
      return;
    }
    const withdrawAmount = parseFloat(amount);
    setWalletBalance(walletBalance - withdrawAmount);
    setTransactionHistory((prevHistory) => [
      { type: "Withdrawal", amount: withdrawAmount, date: new Date().toLocaleString() },
      ...prevHistory, // Ajout de la nouvelle transaction en haut de l'historique
    ]);
    setAmount("");
    showNotification("Withdrawal successful!", "success");
  };

  const handleSellCrypto = () => {
    if (!cryptoAmount || isNaN(Number(cryptoAmount))) {
      showNotification("Please enter a valid crypto amount.", "error");
      return;
    }
    const selectedCryptoData = cryptos.find((c) => c.symbol === selectedCrypto);
    if (!selectedCryptoData) return;
    const sellAmount = parseFloat(cryptoAmount) * selectedCryptoData.price;
    setWalletBalance(walletBalance + sellAmount);
    setTransactionHistory((prevHistory) => [
      {
        type: "Crypto Sale",
        amount: sellAmount,
        date: new Date().toLocaleString(),
        crypto: selectedCrypto,
      },
      ...prevHistory, // Ajout de la nouvelle transaction en haut de l'historique
    ]);
    setCryptoAmount("");
    showNotification("Crypto sale successful!", "success");
  };

  const handleBuyCrypto = () => {
    if (!cryptoAmount || isNaN(Number(cryptoAmount))) {
      showNotification("Please enter a valid crypto amount.", "error");
      return;
    }
    const selectedCryptoData = cryptos.find((c) => c.symbol === selectedCrypto);
    if (!selectedCryptoData) return;
    const buyAmount = parseFloat(cryptoAmount) * selectedCryptoData.price;
    if (buyAmount > walletBalance) {
      showNotification("Insufficient balance to buy crypto.", "error");
      return;
    }
    setWalletBalance(walletBalance - buyAmount);
    setTransactionHistory((prevHistory) => [
      {
        type: "Crypto Purchase",
        amount: buyAmount,
        date: new Date().toLocaleString(),
        crypto: selectedCrypto,
      },
      ...prevHistory, // Ajout de la nouvelle transaction en haut de l'historique
    ]);
    setCryptoAmount("");
    showNotification("Crypto purchase successful!", "success");
  };

return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card variant="glass" className="w-full max-w-4xl mx-4">
        <div className="flex flex-col gap-6 p-4">
          {/* Wallet Balance Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Wallet Balance</h2>
            <p className="text-4xl font-bold mt-2 md:text-5xl">${walletBalance.toFixed(2)}</p>
          </div>

          {/* Tabs for Deposit, Withdraw, Buy Crypto, Sell Crypto */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button variant={activeTab === "deposit" ? "primary" : "outline"} onClick={() => setActiveTab("deposit")} className="w-full md:w-auto">
              Deposit
            </Button>
            <Button variant={activeTab === "withdraw" ? "primary" : "outline"} onClick={() => setActiveTab("withdraw")} className="w-full md:w-auto">
              Withdraw
            </Button>
            <Button variant={activeTab === "buy" ? "primary" : "outline"} onClick={() => setActiveTab("buy")} className="w-full md:w-auto">
              Buy Crypto
            </Button>
            <Button variant={activeTab === "sell" ? "primary" : "outline"} onClick={() => setActiveTab("sell")} className="w-full md:w-auto">
              Sell Crypto
            </Button>
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            {activeTab === "deposit" && (
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">Deposit Amount ($)</label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                  placeholder="Enter amount"
                />
                <Button className="w-full" onClick={handleDeposit}>Deposit</Button>
              </div>
            )}

            {activeTab === "withdraw" && (
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">Withdraw Amount ($)</label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                  placeholder="Enter amount"
                />
                <Button className="w-full" onClick={handleWithdraw}>Withdraw</Button>
              </div>
            )}

            {activeTab === "buy" && (
              <div className="space-y-2">
                <label htmlFor="crypto" className="text-sm font-medium">Select Crypto</label>
                <select
                  id="crypto"
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                >
                  {cryptos.map((crypto) => (
                    <option key={crypto.symbol} value={crypto.symbol}>
                      {crypto.name} ({crypto.symbol})
                    </option>
                  ))}
                </select>
                <label htmlFor="cryptoAmount" className="text-sm font-medium">Amount to Buy</label>
                <input
                  id="cryptoAmount"
                  type="number"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                  placeholder="Enter amount"
                />
                <Button className="w-full" onClick={handleBuyCrypto}>Buy Crypto</Button>
              </div>
            )}

            {activeTab === "sell" && (
              <div className="space-y-2">
                <label htmlFor="crypto" className="text-sm font-medium">Select Crypto</label>
                <select
                  id="crypto"
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                >
                  {cryptos.map((crypto) => (
                    <option key={crypto.symbol} value={crypto.symbol}>
                      {crypto.name} ({crypto.symbol})
                    </option>
                  ))}
                </select>
                <label htmlFor="cryptoAmount" className="text-sm font-medium">Amount to Sell</label>
                <input
                  id="cryptoAmount"
                  type="number"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                  placeholder="Enter amount"
                />
                <Button className="w-full" onClick={handleSellCrypto}>Sell Crypto</Button>
              </div>
            )}
          </div>

          {/* Transaction History Section */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Transaction History</h3>
            <div className="space-y-2">
              {transactionHistory.map((transaction, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-crypto-card border border-white/10 flex flex-col md:flex-row justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date}
                    </p>
                    {transaction.crypto && (
                      <p className="text-sm text-muted-foreground">
                        Crypto: {transaction.crypto}
                      </p>
                    )}
                  </div>
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === "Deposit" || transaction.type === "Crypto Sale"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "Deposit" || transaction.type === "Crypto Sale"
                      ? "+"
                      : "-"}
                    ${transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Section */}
          {notification && (
            <div
              className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {notification.message}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Transactions;
