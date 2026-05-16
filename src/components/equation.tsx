"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

interface EquationProps {
  tex: string;
  display?: boolean;
}

export default function Equation({ tex, display = true }: EquationProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, {
        displayMode: display,
        throwOnError: false,
        output: "html",
      });
    }
  }, [tex, display]);

  return (
    <span
      ref={ref}
      className={`my-6 block ${display ? "text-center" : "inline"}`}
    />
  );
}
