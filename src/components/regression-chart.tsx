"use client";

import {
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";

const data = Array.from({ length: 30 }, () => {
  const x = 1 + Math.random() * 9;
  const y = 2 + x * 1.5 + (Math.random() - 0.5) * 3;
  return { x, y };
}).sort((a, b) => a.x - b.x);

const lineData = [
  { x: 0, y: 2 },
  { x: 10, y: 17 },
];

export default function RegressionChart() {
  return (
    <div className="my-8 rounded-sm border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
      <h4 className="mb-4 text-sm font-medium text-zinc-400">
        Linear Regression Fit
      </h4>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="x"
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              label={{
                value: "Feature (x)",
                position: "bottom",
                style: { fill: "rgba(255,255,255,0.3)", fontSize: 11 },
              }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              label={{
                value: "Target (y)",
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
            />
            <Scatter
              data={data}
              fill="rgba(255,255,255,0.6)"
              stroke="none"
              shape={(props: { cx?: number; cy?: number }) => {
                const { cx, cy } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="rgba(255,255,255,0.5)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={0.5}
                  />
                );
              }}
            />
            <Line
              data={lineData}
              dataKey="y"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
