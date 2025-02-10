import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import { useState } from "react";

const DepositWithdraw = () => {
  const [currency, setCurrency] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [fonds , setFonds] = useState<number>(25.12);
  const [transactions, setTransactions] = useState<Array<any>>([
    {
      type: "dépôt",
      amount: "0.5 BTC",
      date: "2024-01-15",
      status: "terminé",
    },
    {
      type: "retrait",
      amount: "2.0 ETH",
      date: "2024-01-14",
      status: "en attente",
    },
  ]);

  const handleTransaction = (type: "dépôt" | "retrait") => {
    if (!currency || !amount || amount <= 0) {
      alert("Veuillez sélectionner une devise et entrer un montant valide.");
      return;
    }

    const newTransaction = {
      type,
      amount: `${amount} ${currency.toUpperCase()}`,
      date: new Date().toISOString().split("T")[0], // Date au format AAAA-MM-JJ
      status: "terminé",
    };

    setTransactions((prev) => [newTransaction, ...prev]); // Ajouter la transaction en haut de la liste
    setAmount(null);
    setCurrency(null);
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">
        {/* Carte Solde */}
        <Card className="bg-crypto-card border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Votre Solde</h2>
            <Wallet className="text-crypto-primary" />
          </div>
          <div className="text-3xl font-bold text-crypto-primary">${fonds}</div>
        </Card>

        {/* Boutons d'actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="bg-crypto-primary hover:bg-crypto-primary/90"
            size="lg"
            onClick={() => handleTransaction("dépôt")}
          >
            <ArrowDownLeft className="mr-2" />
            Dépôt
          </Button>
          <Button
            variant="outline"
            className="border-crypto-primary text-crypto-primary hover:bg-crypto-primary/10"
            size="lg"
            onClick={() => handleTransaction("retrait")}
          >
            <ArrowUpRight className="mr-2" />
            Retrait
          </Button>
        </div>

        {/* Formulaire de transaction */}
        <Card className="bg-crypto-card border-none p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Sélectionnez une devise
              </label>
              <Select
                onValueChange={(value) => setCurrency(value)}
                value={currency || ""}
              >
                <SelectTrigger className="bg-crypto-dark border-crypto-primary/30">
                  <SelectValue placeholder="Sélectionnez une devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Montant</label>
              <Input
                type="number"
                placeholder="0.00"
                className="bg-crypto-dark border-crypto-primary/30"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        {/* Transactions récentes */}
        <Card className="bg-crypto-card border-none p-6">
          <h3 className="text-lg font-semibold mb-4">Transactions récentes</h3>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-crypto-primary/10 last:border-0"
              >
                <div className="flex items-center">
                  {transaction.type === "dépôt" ? (
                    <ArrowDownLeft className="text-green-500 mr-2" />
                  ) : (
                    <ArrowUpRight className="text-red-500 mr-2" />
                  )}
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <p
                    className={`text-sm ${
                      transaction.status === "terminé"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DepositWithdraw;
