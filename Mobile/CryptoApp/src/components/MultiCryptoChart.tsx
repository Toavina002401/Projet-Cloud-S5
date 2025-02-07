import React from "react";
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
  // Sample data - in a real app, this would come from an API
  const data = [
    {
      date: "2024-01",
      ETH: 500,
      BNB: 320,
      SOL: 25,
      ADA: 0.35,
      XRP: 0.50,
    },
    {
      date: "2024-02",
      ETH: 550,
      BNB: 350,
      SOL: 27,
      ADA: 0.38,
      XRP: 0.55,
    },
    {
      date: "2024-03",
      ETH: 520,
      BNB: 330,
      SOL: 26,
      ADA: 0.36,
      XRP: 0.52,
    },
    {
      date: "2024-04",
      ETH: 305,
      BNB: 360,
      SOL: 29,
      ADA: 0.40,
      XRP: 0.60,
    },
    {
      date: "2024-05",
      ETH: 506,
      BNB: 355,
      SOL: 28,
      ADA: 0.39,
      XRP: 0.58,
    },
  ];

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
              dataKey="ETH"
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
