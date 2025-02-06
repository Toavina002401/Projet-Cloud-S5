
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock } from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast({
        title: "Connexion réussie!",
        description: "Bienvenue dans l'application",
      });
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#111827] p-4">
      <Card className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-tr from-[#0EA5E9] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-4xl text-white font-bold">₿</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Login into
          </h1>
          <p className="text-gray-400 text-lg">Your Wallet</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-white/5 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-[#0EA5E9] transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300 text-sm">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-white/5 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-[#0EA5E9] transition-all duration-300"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] hover:from-[#0EA5E9] hover:to-[#2563EB] text-white rounded-xl py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Login
          </Button>
        </form>

        <div className="text-center">
          <a href="#" className="text-[#0EA5E9] hover:text-[#3B82F6] text-sm transition-colors duration-300">
            Forgot Password?
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Index;
