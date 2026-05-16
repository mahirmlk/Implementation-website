"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "project-architecture", label: "Architecture" },
  { id: "mathematical-foundation", label: "Mathematics" },
  { id: "modular-training-pipeline", label: "Pipeline" },
  { id: "model-implementations", label: "Models" },
  { id: "evaluation-metrics", label: "Metrics" },
  { id: "experiments", label: "Experiments" },
  { id: "interactive-visualization", label: "Visualization" },
  { id: "five-regression-assumptions", label: "Assumptions" },
  { id: "key-learnings", label: "Learnings" },
];

export default function PaperToc() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-20 py-12">
      <span className="text-[9px] tracking-[0.25em] text-white/20 uppercase">
        Contents
      </span>
      <nav className="mt-6 flex flex-col gap-0.5">
        {sections.map((section, i) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(section.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`group flex items-center gap-3 py-2 text-[11px] transition-all duration-300 ${
                isActive
                  ? "text-white/80"
                  : "text-white/25 hover:text-white/50"
              }`}
            >
              <span
                className={`font-mono text-[9px] tabular-nums w-5 transition-colors duration-300 ${
                  isActive ? "text-white/40" : "text-white/15"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`leading-snug transition-colors duration-300 ${
                  isActive ? "font-medium" : ""
                }`}
              >
                {section.label}
              </span>
              {isActive && (
                <span className="ml-auto h-1 w-1 rounded-full bg-white/40" />
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
