import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Blue", value: 43.8 },
  { name: "Yellow", value: 31.3 },
  { name: "Teal", value: 18.8 },
  { name: "Red", value: 6.3 },
];

const COLORS = ["#4285F4", "#FBC02D", "#00ACC1", "#EF5350"];

const CustomPieChart = () => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">Current visits</h2>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
