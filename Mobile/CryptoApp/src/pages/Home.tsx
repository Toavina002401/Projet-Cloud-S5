import { Card } from "@/components/ui/card";
import { LineChart, ArrowUpRight, Wallet, User } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 pb-20 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">

        {/* Welcome Section */}
      <div className="text-left">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-crypto-primary">{user ? user.displayName || "John Doe" : "Guest"}</p>
      </div>

        {/* Portfolio Card */}
        <Card className="bg-crypto-card border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Portfolio Value</h2>
            <Wallet className="text-crypto-primary" />
          </div>
          <div className="text-3xl font-bold text-crypto-primary">$25,468.32</div>
          <p className="text-green-500 text-sm">+2.4% (24h)</p>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-crypto-card border-none p-4 hover:bg-crypto-primary/10 transition-colors cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <LineChart className="w-6 h-6 text-crypto-primary" />
              <span className="text-sm">Markets</span>
            </div>
          </Card>
          <Card className="bg-crypto-card border-none p-4 hover:bg-crypto-primary/10 transition-colors cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <ArrowUpRight className="w-6 h-6 text-crypto-primary" />
              <span className="text-sm">Trade</span>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-crypto-card border-none p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                type: "Buy",
                crypto: "BTC",
                amount: "+0.0234",
                value: "$1,234.56",
                time: "2h ago",
              },
              {
                type: "Sell",
                crypto: "ETH",
                amount: "-1.5",
                value: "$3,456.78",
                time: "5h ago",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-crypto-primary/10 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {activity.type} {activity.crypto}
                  </p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      activity.type === "Buy"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {activity.amount}
                  </p>
                  <p className="text-sm text-gray-400">{activity.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;