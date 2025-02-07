import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "./ui/card";
import { X } from "lucide-react";

interface FloatingChartProps {
  isOpen: boolean;
  onClose: () => void;
  crypto: {
    name: string;
    symbol: string;
    data: Array<{ date: string; price: number }>;
  };
}

export const FloatingChart = ({ isOpen, onClose, crypto }: FloatingChartProps) => {
  const chartData = crypto.data || [
    { date: "2024-01", price: 42000 },
    { date: "2024-02", price: 45000 },
    { date: "2024-03", price: 43000 },
    { date: "2024-04", price: 47000 },
    { date: "2024-05", price: 46000 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-16 left-0 right-0 z-50"
        >
          <Card className="mx-4 p-4 bg-black/80 backdrop-blur-md border-none shadow-xl rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {crypto.name} ({crypto.symbol})
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#9b87f5"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#9b87f5"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
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
                    formatter={(value: number) => [`$${value}`, "Price"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#9b87f5"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
