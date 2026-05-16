"use client";

import { motion } from "framer-motion";

function Strand({
  d,
  delay = 0,
  opacity = 0.35,
  strokeWidth = 0.7,
}: {
  d: string;
  delay?: number;
  opacity?: number;
  strokeWidth?: number;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="white"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity }}
      transition={{
        pathLength: { duration: 2, delay, ease: "easeInOut" },
        opacity: { duration: 0.8, delay: delay + 0.2 },
      }}
    />
  );
}

function Dot({ cx, cy, delay = 0, r = 1 }: { cx: number; cy: number; delay?: number; r?: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0.15, 0.3] }}
      transition={{
        delay: delay + 0.8,
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
}

export default function NeuralArtwork() {
  const upperStrands: { d: string; delay: number; opacity: number; sw: number }[] = [];
  const lowerStrands: { d: string; delay: number; opacity: number; sw: number }[] = [];

  // Upper fan — fewer, more spaced curves
  for (let i = 0; i < 14; i++) {
    const t = i / 13;
    const startY = 390 - t * 140;
    const cp1y = startY - 80 - t * 120;
    const endY = 20 + t * 200;
    const endX = 580 + t * 60;
    upperStrands.push({
      d: `M 60 ${startY} Q 160 ${cp1y} 300 ${startY - 100 - t * 80} T ${endX} ${endY}`,
      delay: 0.08 * i,
      opacity: 0.32 - t * 0.25,
      sw: 0.9 - t * 0.6,
    });
  }

  // Lower fan — fewer, more spaced curves
  for (let i = 0; i < 14; i++) {
    const t = i / 13;
    const startY = 410 + t * 140;
    const cp1y = startY + 80 + t * 120;
    const endY = 780 - t * 200;
    const endX = 580 + t * 60;
    lowerStrands.push({
      d: `M 60 ${startY} Q 160 ${cp1y} 300 ${startY + 100 + t * 80} T ${endX} ${endY}`,
      delay: 0.08 * i,
      opacity: 0.32 - t * 0.25,
      sw: 0.9 - t * 0.6,
    });
  }

  // Secondary fine strands — minimal
  const fineUpper: { d: string; delay: number; opacity: number }[] = [];
  const fineLower: { d: string; delay: number; opacity: number }[] = [];

  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const startY = 380 - t * 160;
    fineUpper.push({
      d: `M 40 ${startY} Q 130 ${startY - 100 - t * 100} 260 ${startY - 140 - t * 80} T 560 ${10 + t * 220}`,
      delay: 0.5 + 0.06 * i,
      opacity: 0.12 - t * 0.08,
    });
  }

  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const startY = 420 + t * 160;
    fineLower.push({
      d: `M 40 ${startY} Q 130 ${startY + 100 + t * 100} 260 ${startY + 140 + t * 80} T 560 ${790 - t * 220}`,
      delay: 0.5 + 0.06 * i,
      opacity: 0.12 - t * 0.08,
    });
  }

  // Vertical data lines — minimal
  const vlines: { x: number; y1: number; y2: number; delay: number }[] = [];
  for (let i = 0; i < 10; i++) {
    const x = 140 + i * 36;
    const yBase = 400 + (Math.random() - 0.5) * 40;
    vlines.push({
      x,
      y1: yBase - 30 - Math.random() * 60,
      y2: yBase + 15 + Math.random() * 20,
      delay: 1.2 + i * 0.08,
    });
  }

  // Scattered particles — very minimal
  const particles: { cx: number; cy: number; r: number; delay: number }[] = [];
  const particlePositions = [
    [180, 280], [260, 200], [340, 150], [420, 135], [500, 128],
    [200, 300], [280, 230], [360, 195], [440, 178], [520, 168],
    [220, 310], [300, 255], [380, 228], [460, 214],
    [200, 500], [280, 580], [360, 660], [440, 730],
    [220, 520], [300, 600], [380, 680], [460, 750],
    [320, 400], [400, 440],
    [340, 420], [420, 460],
  ];

  particlePositions.forEach(([cx, cy], i) => {
    particles.push({ cx, cy, r: 0.5 + Math.random() * 0.4, delay: 0.8 + i * 0.04 });
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, transparent 20%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <radialGradient id="convergenceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Upper fan */}
        <g>
          {upperStrands.map((s, i) => (
            <Strand key={`u-${i}`} d={s.d} delay={s.delay} opacity={s.opacity} strokeWidth={s.sw} />
          ))}
        </g>

        {/* Lower fan */}
        <g>
          {lowerStrands.map((s, i) => (
            <Strand key={`l-${i}`} d={s.d} delay={s.delay} opacity={s.opacity} strokeWidth={s.sw} />
          ))}
        </g>

        {/* Fine upper */}
        <g>
          {fineUpper.map((s, i) => (
            <Strand key={`fu-${i}`} d={s.d} delay={s.delay} opacity={s.opacity} strokeWidth={0.3} />
          ))}
        </g>

        {/* Fine lower */}
        <g>
          {fineLower.map((s, i) => (
            <Strand key={`fl-${i}`} d={s.d} delay={s.delay} opacity={s.opacity} strokeWidth={0.3} />
          ))}
        </g>

        {/* Vertical data streams */}
        <g>
          {vlines.map((v, i) => (
            <motion.line
              key={`v-${i}`}
              x1={v.x}
              y1={v.y1}
              x2={v.x}
              y2={v.y2}
              stroke="white"
              strokeWidth={0.25}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.12, 0.06, 0.12] }}
              transition={{
                delay: v.delay,
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Scattered particles */}
        <g>
          {particles.map((p, i) => (
            <Dot key={`p-${i}`} cx={p.cx} cy={p.cy} r={p.r} delay={p.delay} />
          ))}
        </g>

        {/* Convergence glow — restrained */}
        <motion.circle
          cx={60}
          cy={400}
          r={24}
          fill="url(#convergenceGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0.08, 0.15] }}
          transition={{ delay: 0.5, duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    </div>
  );
}
