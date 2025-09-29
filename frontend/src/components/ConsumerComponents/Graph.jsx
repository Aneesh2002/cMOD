// ElectricityUsageGraph.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "May", usage: 1200 },
  { month: "Jun", usage: 1600 },
  { month: "Jul", usage: 1400 },
  { month: "Aug", usage: 1700 },
  { month: "Sep", usage: 2100 },
  { month: "Oct", usage: 1800 },
];

export default function Graph() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-4">Electricity Usage</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="usage"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
