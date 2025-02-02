import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import CryptoFavoris from "@/components/CryptoFavoris";
import CryptoMultiLineChart from "@/components/CryptoMultiLineChart";
import Navbar from "@/components/Navbar"; 
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-blue-100 to-white text-blue-900'}`}>
      
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} navigate={navigate} />

      <div className="container mx-auto py-8 px-4 space-y-12">
        
        <h1 className="text-4xl font-bold text-center mb-12">Liste des Cryptomonnaies Disponibles</h1>

        {/* CryptoChart Section */}
        <div className="space-y-6">
          <CryptoFavoris />
        </div>

        {/* CryptoMultiLineChart Section */}
        <div className="container py-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Cryptocurrency Evolution 12h</h2>
          <div className="flex justify-center">
            <CryptoMultiLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;