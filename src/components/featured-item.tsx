"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface FeaturedItemProps {
  title: string;
  date: string;
  index: number;
  href?: string;
  thumbnail: React.ReactNode;
}

export default function FeaturedItem({ title, date, index, href = "#", thumbnail }: FeaturedItemProps) {
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.6 + index * 0.14, ease: "easeOut" }}
        className="group flex items-center gap-4 py-3 cursor-pointer transition-all duration-500 hover:-translate-y-[2px]"
      >
        <div className="relative h-10 w-12 shrink-0 overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all duration-500 group-hover:border-white/[0.12] group-hover:bg-white/[0.04] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.04)]">
          {thumbnail}
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] font-medium leading-snug text-white/85 transition-colors duration-300 group-hover:text-white">
            {title}
          </span>
          <span className="mt-0.5 text-[11px] tracking-wide text-white/35 transition-colors duration-300 group-hover:text-white/50">
            {date}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
