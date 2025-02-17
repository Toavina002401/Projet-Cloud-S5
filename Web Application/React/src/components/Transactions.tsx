import { useState,useEffect } from "react";
import Card from "./common/Card";
import Button from "./common/Button";
import { histoTransaction,depot,retrait,getAlltransactionCryptoById,getPortefeuille } from "../services/CryptoService";

interface TransactionsProps {
  solde: number; 
  idUtilisateur: number;
  refreshTrigger?: number;
}

const Transactions: React.FC<TransactionsProps> = ({ solde,idUtilisateur,refreshTrigger }) => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [walletBalance, setWalletBalance] = useState<number>(solde); 
  const [transactionHistory, setTransactionHistory] = useState<
    { type: string; amount: number; date: string; crypto?: string ; aff?:string}[] 
  >([]);

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setWalletBalance(solde);
  }, [solde]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        setTransactionHistory([]); // Réinitialiser les transactions avant de commencer
        const history = await histoTransaction(idUtilisateur);
        const formattedHistory = history.data.map((transaction: any) => ({
          type: transaction.type === "DEPOT" ? "Dépôt" : "Retrait",
          amount: transaction.montant,
          date: new Date(transaction.dateTransaction).toLocaleString(),
        }));
  
        const cryptoHistoryResponse = await getAlltransactionCryptoById(idUtilisateur);
        let allTransactions = [...formattedHistory]; // Commencer avec l'historique classique
  
        if (cryptoHistoryResponse.status === "success") {
          const formattedCryptoHistory = cryptoHistoryResponse.data.map((transaction: any) => ({
            type: transaction.cryptomonnaies.nom + " ($" + transaction.prixCrypto + ") ",
            amount: transaction.prixCrypto * transaction.quantiteCrypto,
            date: new Date(transaction.dernierMaj).toLocaleString(),
            crypto: `${transaction.cryptomonnaies.symbole} (${transaction.quantiteCrypto})`,
            aff: transaction.type,
          }));
  
          // Fusionner les historiques classiques et cryptos
          allTransactions = [...allTransactions, ...formattedCryptoHistory];
        }
  
        // Trier toutes les transactions par date, du plus récent au plus ancien
        allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
        // Mettre à jour l'état avec les transactions triées
        setTransactionHistory(allTransactions);
  
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique des transactions:", error);
      }
    };
  
    fetchTransactionHistory();
  
    // Récupérer les informations du portefeuille
    getPortefeuille(idUtilisateur)
      .then((data) => {
        if (data && data.data) {
          setWalletBalance(data.data.soldeFonds);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du portefeuille", error);
      });
  }, [idUtilisateur, refreshTrigger]);
  

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
        { type: "Dépôt", amount: depositAmount, date: new Date().toLocaleString() },
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
        { type: "Retrait", amount: withdrawAmount, date: new Date().toLocaleString() },
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
                      transaction.type === "Dépôt" || transaction.aff === "VENDRE"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "Dépôt" || transaction.aff === "VENDRE"
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
