import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", TeamA: 45, TeamB: 55 },
  { name: "Feb", TeamA: 30, TeamB: 70 },
  { name: "Mar", TeamA: 20, TeamB: 45 },
  { name: "Apr", TeamA: 35, TeamB: 65 },
  { name: "May", TeamA: 67, TeamB: 40 },
  { name: "Jun", TeamA: 68, TeamB: 38 },
  { name: "Jul", TeamA: 38, TeamB: 22 },
  { name: "Aug", TeamA: 22, TeamB: 70 },
  { name: "Sep", TeamA: 55, TeamB: 22 },
];

const CustomBarChart = () => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">Website visits (+43%) than last year</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TeamA" fill="#3366FF" />
          <Bar dataKey="TeamB" fill="#FFCC00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
