import { useEffect, useState } from "react";
import Card from "./common/Card";
import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar } from "recharts";

const Options = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const pieData = [
    { name: "Bitcoin", value: 40 },
    { name: "Ethereum", value: 30 },
    { name: "Ripple", value: 15 },
    { name: "Litecoin", value: 15 },
  ];

  const COLORS = ["#ff7300", "#0088FE", "#00C49F", "#FFBB28"];

  const chartData = {
    bar: [
      { name: "Bitcoin", value: 40 },
      { name: "Ethereum", value: 30 },
      { name: "Ripple", value: 15 },
      { name: "Litecoin", value: 15 },
    ],
    line: [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 600 },
      { name: "Mar", value: 800 },
      { name: "Apr", value: 700 },
    ],
    area: [
      { name: "Day 1", value: 300 },
      { name: "Day 2", value: 500 },
      { name: "Day 3", value: 700 },
      { name: "Day 4", value: 600 },
    ],
  };

  const renderChartCard = (title, value, ChartComponent, data, color, height = 150) => (
    <div
      className={`chart-card ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} 
        p-6 rounded-xl shadow-lg text-center space-y-4
        transition-transform transform hover:scale-105 hover:shadow-2xl`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <ResponsiveContainer width="100%" height={height}>
        {ChartComponent}
      </ResponsiveContainer>
    </div>
  );

  return(
    <div className="container mx-auto py-8 px-4 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {renderChartCard("Total Cryptos", "1,500+", 
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>, pieData, "blue")}

        {/* Top Gagnant (Graphique à barres empilées sans grille et axes) */}
        {renderChartCard("Top Gagnant", "Bitcoin", 
          <BarChart data={chartData.bar} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Tooltip />
            <Bar dataKey="value" stackId="a" fill="#82ca9d" />
          </BarChart>, chartData.bar, "green", 200)}

        {/* Top Perdant (graphique à secteurs avec un style amélioré pour une bonne visibilité) */}
        {renderChartCard("Top Perdant", "Ripple", 
          <RadialBarChart innerRadius="10%" outerRadius="90%" data={chartData.bar} startAngle={180} endAngle={0} >
            <RadialBar minAngle={15} label={{ fill: "#fff", position: "insideStart" }} background dataKey="value" fill="#FFBB28" />
            <Tooltip />
          </RadialBarChart>, chartData.bar, "red", 250)}

        {/* Marché Actif (Graphique en lignes sans grille et axes) */}
        {renderChartCard("Marché Actif", "$2 Trillion", 
          <LineChart data={chartData.line} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
            <Tooltip />
          </LineChart>, chartData.line, "yellow", 250)}
      </div>
    </div>
  );
};

export default Options;
