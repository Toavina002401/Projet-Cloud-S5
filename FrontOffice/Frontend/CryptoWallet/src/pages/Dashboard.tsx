import { useState } from "react";
import CryptoFavoris from "@/components/CryptoFavoris";
import Options from "@/components/Options";
import CryptoMultiLineChart from "@/components/CryptoMultiLineChart";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from "recharts";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
const handleLogout = () => {
  };

  const renderChartCard = (title, value, ChartComponent, data, color) => (
    <div className={`chart-card ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} p-6 rounded-xl shadow-lg text-center space-y-4`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <ResponsiveContainer width="100%" height={150}>
        {ChartComponent}
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-blue-900"} backdrop-blur-lg`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} navigate={navigate} />
      
      

      <div className="container mx-auto py-8 px-4 space-y-12">
        <Options/>
        <h1 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Liste des Cryptomonnaies Disponibles</h1>
        <CryptoFavoris />
        <h2 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>Cryptocurrency Evolution 12h</h2>
        <div className="flex justify-center">
          <CryptoMultiLineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
