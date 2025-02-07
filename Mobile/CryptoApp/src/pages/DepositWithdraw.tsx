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

const DepositWithdraw = () => {
  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">
        {/* Balance Card */}
        <Card className="bg-crypto-card border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Balance</h2>
            <Wallet className="text-crypto-primary" />
          </div>
          <div className="text-3xl font-bold text-crypto-primary">$25,468.32</div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="bg-crypto-primary hover:bg-crypto-primary/90"
            size="lg"
          >
            <ArrowDownLeft className="mr-2" />
            Deposit
          </Button>
          <Button
            variant="outline"
            className="border-crypto-primary text-crypto-primary hover:bg-crypto-primary/10"
            size="lg"
          >
            <ArrowUpRight className="mr-2" />
            Withdraw
          </Button>
        </div>

        {/* Transaction Form */}
        <Card className="bg-crypto-card border-none p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Currency
              </label>
              <Select>
                <SelectTrigger className="bg-crypto-dark border-crypto-primary/30">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                className="bg-crypto-dark border-crypto-primary/30"
              />
            </div>

            <Button className="w-full bg-crypto-primary hover:bg-crypto-primary/90">
              Continue
            </Button>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-crypto-card border-none p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[
              {
                type: "deposit",
                amount: "0.5 BTC",
                date: "2024-01-15",
                status: "completed",
              },
              {
                type: "withdraw",
                amount: "2.0 ETH",
                date: "2024-01-14",
                status: "pending",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-crypto-primary/10 last:border-0"
              >
                <div className="flex items-center">
                  {transaction.type === "deposit" ? (
                    <ArrowDownLeft className="text-green-500 mr-2" />
                  ) : (
                    <ArrowUpRight className="text-red-500 mr-2" />
                  )}
                  <div>
                    <p className="font-medium">
                      {transaction.type === "deposit" ? "Deposit" : "Withdrawal"}
                    </p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <p
                    className={`text-sm ${
                      transaction.status === "completed"
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