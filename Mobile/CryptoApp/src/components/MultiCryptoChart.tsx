import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "./ui/card";

const MultiCryptoChart = () => {
  const generateRandomData = () => {
    
    const hours = ["00:00", "01:00", "02:00", "03:00", "04:00"];
    
    return hours.map((hour) => ({
      time: hour,
      AVAX: Math.floor(Math.random() * 50) + 10, 
      BNB: Math.floor(Math.random() * 100) + 200,
      SOL: Math.floor(Math.random() * 50) + 20,
      ADA: Math.floor(Math.random() * 75) + 40,
      XRP: Math.floor(Math.random() * 40) + 30, 
      
    }));
  };
  

  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 bg-crypto-card border-none">
      <h3 className="text-lg font-semibold text-white mb-4">
        Comparaison des cours
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#9b87f5"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#9b87f5"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1F2C",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="AVAX"
              stroke="#FF0000" // Rouge
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="BNB"
              stroke="#FFFFFF" // Blanc
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="SOL"
              stroke="#FFFF00" // Jaune
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="ADA"
              stroke="#32CD32" // Vert
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="XRP"
              stroke="#9b87f5" // Violet
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MultiCryptoChart;
