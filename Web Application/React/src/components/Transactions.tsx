import { useState,useEffect } from "react";
import Card from "./common/Card";
import Button from "./common/Button";
import { histoTransaction,depot,retrait } from "../services/CryptoService";

interface TransactionsProps {
  solde: number; 
  idUtilisateur: number;
}

const Transactions: React.FC<TransactionsProps> = ({ solde,idUtilisateur }) => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [walletBalance, setWalletBalance] = useState<number>(solde); 
  const [transactionHistory, setTransactionHistory] = useState<
    { type: string; amount: number; date: string; crypto?: string }[] 
  >([]);

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setWalletBalance(solde);
  }, [solde]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const history = await histoTransaction(idUtilisateur);
        const formattedHistory = history.data.map((transaction: any) => ({
          type: transaction.type === "DEPOT" ? "Deposit" : "Withdrawal",
          amount: transaction.montant,
          date: new Date(transaction.dateTransaction).toLocaleString(),
        }));
  
        // Inverse l'ordre des transactions avant de les ajouter
        setTransactionHistory((prevHistory) => [
          ...formattedHistory.reverse(), // Inverser l'ordre
          ...prevHistory,
        ]);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique des transactions:", error);
      }
    };
  
    fetchTransactionHistory();
  }, [idUtilisateur]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // La notification disparaît après 3 secondes
  };

  const handleDeposit = async () => {
    if (!amount || isNaN(Number(amount))) {
      showNotification("Veuillez saisir un montant valide.", "error");
      return;
    }


    const depositAmount = parseFloat(amount);
    try {
      // Appel de la fonction de dépôt
      await depot(idUtilisateur, depositAmount);
      setWalletBalance(walletBalance + depositAmount);
      setTransactionHistory((prevHistory) => [
        { type: "Deposit", amount: depositAmount, date: new Date().toLocaleString() },
        ...prevHistory, // Ajout de la nouvelle transaction en haut de l'historique
      ]);
      setAmount("");
      showNotification("Dépôt réussi !", "success");
    } catch (error) {
      showNotification("Erreur lors du dépôt.", "error");
    }
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) > walletBalance) {
      showNotification("Montant de retrait invalide ou solde insuffisant.", "error");
      return;
    }
    const withdrawAmount = parseFloat(amount);
    try {
      // Appel de la fonction de retrait
      await retrait(idUtilisateur, withdrawAmount);
      setWalletBalance(walletBalance - withdrawAmount);
      setTransactionHistory((prevHistory) => [
        { type: "Withdrawal", amount: withdrawAmount, date: new Date().toLocaleString() },
        ...prevHistory, 
      ]);
      setAmount("");
      showNotification("Retrait réussi !", "success");
    } catch (error) {
      showNotification("Erreur lors du retrait.", "error");
    }
  };

return (
    <div className="flex items-center justify-center p-4">
      <Card variant="glass" className="w-full max-w-4xl mx-4">
        <div className="flex flex-col gap-6 p-4">
          {/* Wallet Balance Section */}
          <div className="text-center">
            <h2 className="text-1xl font-bold md:text-2xl">Solde du portefeuille</h2>
            <p className="text-2xl font-bold mt-2 md:text-3xl">${walletBalance.toFixed(2)}</p>
          </div>

          {/* Tabs for Deposit, Withdraw, Buy Crypto, Sell Crypto */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button variant={activeTab === "deposit" ? "primary" : "outline"} onClick={() => setActiveTab("deposit")} className="w-full md:w-auto">
              Dépôt
            </Button>
            <Button variant={activeTab === "withdraw" ? "primary" : "outline"} onClick={() => setActiveTab("withdraw")} className="w-full md:w-auto">
              Retirer
            </Button>
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            {activeTab === "deposit" && (
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">Montant du dépôt ($)</label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                  placeholder="Enter amount"
                />
                <Button className="w-full" onClick={handleDeposit}>Dépôt</Button>
              </div>
            )}

            {activeTab === "withdraw" && (
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">Montant du retrait ($)</label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                  placeholder="Enter amount"
                />
                <Button className="w-full" onClick={handleWithdraw}>Retirer</Button>
              </div>
            )}
          </div>

{/* Transaction History Section */}
<div className="mt-6">
  <h3 className="text-xl font-bold mb-4">Historique des transactions</h3>
  <div className="space-y-2 max-h-96 overflow-y-auto">
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
              className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 mt-10 py-2 rounded-lg text-white ${
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
