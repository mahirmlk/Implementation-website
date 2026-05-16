"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = Array.from({ length: 200 }, (_, i) => ({
  iteration: i + 1,
  cost: Math.exp(-i / 40) * 10 + Math.random() * 0.1 + 0.5,
})).map((d, i, arr) => ({
  ...d,
  cost: i === 0 ? 12 : Math.min(arr[i - 1].cost, d.cost),
}));

export default function CostChart() {
  return (
    <div className="my-8 rounded-sm border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
      <h4 className="mb-4 text-sm font-medium text-zinc-400">
        Cost Function Convergence
      </h4>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="iteration"
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              label={{
                value: "Iteration",
                position: "bottom",
                style: { fill: "rgba(255,255,255,0.3)", fontSize: 11 },
              }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              label={{
                value: "Cost J(w,b)",
                angle: -90,
                position: "left",
                style: { fill: "rgba(255,255,255,0.3)", fontSize: 11 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "2px",
                fontSize: "12px",
                color: "#fff",
              }}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, fill: "white" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
