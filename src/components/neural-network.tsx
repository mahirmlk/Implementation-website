"use client";

import { useEffect, useRef } from "react";

interface Strand {
  sx: number;
  sy: number;
  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
  ex: number;
  ey: number;
  opacity: number;
  width: number;
  speed: number;
  phase: number;
  highlight: boolean;
}

interface Node {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface VLine {
  x: number;
  y1: number;
  y2: number;
  alpha: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let strands: Strand[] = [];
    let nodes: Node[] = [];
    let vlines: VLine[] = [];
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = rect.width;
      h = rect.height;
    }

    function init() {
      strands = [];
      nodes = [];
      vlines = [];

      const focalX = w * 0.52;
      const focalY = h * 0.38;

      // Create flowing strands that sweep through a focal region
      const strandCount = 160;
      for (let i = 0; i < strandCount; i++) {
        const t = i / strandCount;
        const fromLeft = Math.random() > 0.15;

        let sx: number, sy: number, ex: number, ey: number;

        if (fromLeft) {
          sx = -10;
          sy = h * 0.05 + t * h * 0.9 + (Math.random() - 0.5) * h * 0.2;
          ex = w + 10;
          ey = h * 0.02 + Math.random() * h * 0.95;
        } else {
          sx = w * 0.05 + Math.random() * w * 0.4;
          sy = h + 10;
          ex = w * 0.4 + Math.random() * w * 0.55;
          ey = -10;
        }

        // Pull control points toward focal area for that neural "convergence" look
        const pullStrength1 = 0.3 + Math.random() * 0.4;
        const pullStrength2 = 0.3 + Math.random() * 0.4;

        const cp1x = sx + (focalX - sx) * pullStrength1 + (Math.random() - 0.5) * w * 0.18;
        const cp1y = sy + (focalY - sy) * pullStrength1 + (Math.random() - 0.5) * h * 0.22;
        const cp2x = focalX + (ex - focalX) * (1 - pullStrength2) + (Math.random() - 0.5) * w * 0.15;
        const cp2y = focalY + (ey - focalY) * (1 - pullStrength2) + (Math.random() - 0.5) * h * 0.18;

        const highlight = Math.random() > 0.92;

        strands.push({
          sx,
          sy,
          cp1x,
          cp1y,
          cp2x,
          cp2y,
          ex,
          ey,
          opacity: highlight ? 0.12 + Math.random() * 0.1 : 0.025 + Math.random() * 0.07,
          width: highlight ? 0.5 + Math.random() * 0.3 : 0.2 + Math.random() * 0.35,
          speed: 0.0002 + Math.random() * 0.0004,
          phase: Math.random() * Math.PI * 2,
          highlight,
        });
      }

      // Create nodes denser near focal region, sparser elsewhere
      const nodeCount = 110;
      for (let i = 0; i < nodeCount; i++) {
        const nearFocal = Math.random() > 0.35;
        let x: number, y: number;

        if (nearFocal) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * w * 0.28;
          x = focalX + Math.cos(angle) * radius;
          y = focalY + Math.sin(angle) * radius * (h / w);
        } else {
          x = Math.random() * w;
          y = Math.random() * h;
        }

        nodes.push({
          x,
          y,
          r: 0.4 + Math.random() * 1.1,
          baseAlpha: 0.15 + Math.random() * 0.45,
          pulseSpeed: 0.0008 + Math.random() * 0.002,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Vertical data-stream lines
      const vlineCount = 45;
      for (let i = 0; i < vlineCount; i++) {
        const x = w * 0.15 + Math.random() * w * 0.75;
        const y = h * 0.25 + Math.random() * h * 0.55;
        const height = 25 + Math.random() * 90;

        vlines.push({
          x,
          y1: y - height,
          y2: y,
          alpha: 0.03 + Math.random() * 0.1,
        });
      }
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Draw strands with subtle organic sway
      for (const s of strands) {
        const sway = Math.sin(time * s.speed + s.phase) * 1.5;
        const sway2 = Math.cos(time * s.speed * 0.7 + s.phase) * 1;

        ctx.beginPath();
        ctx.moveTo(s.sx, s.sy);
        ctx.bezierCurveTo(
          s.cp1x + sway,
          s.cp1y + sway2,
          s.cp2x + sway2 * 0.5,
          s.cp2y + sway * 0.5,
          s.ex,
          s.ey
        );
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }

      // Draw vertical data lines
      for (const v of vlines) {
        ctx.beginPath();
        ctx.moveTo(v.x, v.y1);
        ctx.lineTo(v.x, v.y2);
        ctx.strokeStyle = `rgba(255,255,255,${v.alpha})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // Draw faint connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75) {
            const opacity = (1 - dist / 75) * 0.045;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = 0.25;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with gentle pulse
      for (const n of nodes) {
        const pulse = 0.78 + 0.22 * Math.sin(time * n.pulseSpeed + n.pulsePhase);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${n.baseAlpha * pulse})`;
        ctx.fill();
      }

      // Subtle glow at focal point
      const focalGrad = ctx.createRadialGradient(
        w * 0.52, h * 0.38, 0,
        w * 0.52, h * 0.38, w * 0.35
      );
      focalGrad.addColorStop(0, "rgba(255,255,255,0.015)");
      focalGrad.addColorStop(0.5, "rgba(255,255,255,0.005)");
      focalGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = focalGrad;
      ctx.fillRect(0, 0, w, h);

      // Edge vignette for depth
      const vigGrad = ctx.createRadialGradient(
        w * 0.5, h * 0.4, w * 0.2,
        w * 0.5, h * 0.4, w * 0.7
      );
      vigGrad.addColorStop(0, "rgba(10,10,10,0)");
      vigGrad.addColorStop(1, "rgba(5,5,5,0.55)");
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);
    }

    function animate(time: number) {
      draw(time);
      animationId = requestAnimationFrame(animate);
    }

    function onResize() {
      resize();
      init();
    }

    resize();
    init();
    animationId = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
