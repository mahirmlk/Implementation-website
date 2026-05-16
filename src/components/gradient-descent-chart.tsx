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

const data = Array.from({ length: 50 }, (_, i) => {
  const step = i + 1;
  const w = step === 1 ? 10 : Math.max(0, 2 + 8 * Math.exp(-step / 15) * Math.cos(step / 8));
  return { step, w };
});

const gradData = Array.from({ length: 50 }, (_, i) => ({
  step: i + 1,
  gradient: 10 * Math.exp(-(i + 1) / 12) + Math.random() * 0.2,
}));

export default function GradientDescentChart() {
  return (
    <div className="my-8 grid gap-6 sm:grid-cols-2">
      <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
        <h4 className="mb-4 text-sm font-medium text-zinc-400">
          Weight (w) Update Path
        </h4>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="step"
                stroke="rgba(255,255,255,0.2)"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.2)"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                domain={[0, 12]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "11px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="w"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
        <h4 className="mb-4 text-sm font-medium text-zinc-400">
          Gradient Magnitude
        </h4>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={gradData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="step"
                stroke="rgba(255,255,255,0.2)"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.2)"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "11px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="gradient"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
