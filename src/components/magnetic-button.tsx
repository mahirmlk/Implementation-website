"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
}

export default function MagneticButton({
  children,
  href = "/implementations",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        className="inline-flex items-center gap-4 bg-black px-8 py-[16px] text-[11px] font-medium tracking-[0.18em] text-white transition-all duration-500 hover:bg-[#1a1a1a] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
      </motion.div>
    </Link>
  );
}
