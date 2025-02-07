import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, Wallet, Bell } from "lucide-react";

const UserInfo = () => {
  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-crypto-card border-none p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <User className="h-12 w-12" />
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-crypto-primary">Premium Member</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="bg-crypto-card border-none hover:bg-crypto-primary/20"
          >
            <Settings className="mr-2" />
            Settings
          </Button>
          <Button
            variant="outline"
            className="bg-crypto-card border-none hover:bg-crypto-primary/20"
          >
            <Bell className="mr-2" />
            Notifications
          </Button>
        </div>

        {/* Account Details */}
        <Card className="bg-crypto-card border-none p-6 space-y-4">
          <h3 className="text-lg font-semibold">Account Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span>john.doe@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Member Since</span>
              <span>Jan 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-crypto-primary">Active</span>
            </div>
          </div>
        </Card>

        {/* Portfolio Summary */}
        <Card className="bg-crypto-card border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Portfolio Value</h3>
            <Wallet className="text-crypto-primary" />
          </div>
          <div className="text-2xl font-bold text-crypto-primary">$25,468.32</div>
          <p className="text-green-500 text-sm">+2.4% (24h)</p>
        </Card>
      </div>
    </div>
  );
};

export default UserInfo;