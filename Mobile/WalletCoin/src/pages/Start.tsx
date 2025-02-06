
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#111827] p-4 space-y-8">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-tr from-[#0EA5E9] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-500/20 animate-pulse">
          <span className="text-5xl text-white font-bold">₿</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          CRYPTO CURRENCY
        </h1>
        <p className="text-gray-400 text-lg tracking-wider">INVESTING</p>
      </div>
      
      <Button 
        onClick={() => navigate("/login")}
        className="w-full max-w-xs bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] hover:from-[#0EA5E9] hover:to-[#2563EB] text-white rounded-2xl py-7 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
      >
        Get Started
        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </Button>
    </div>
  );
};

export default Start;
