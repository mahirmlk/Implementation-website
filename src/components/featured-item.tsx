"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface FeaturedItemProps {
  title: string;
  date: string;
  href?: string;
}

export default function FeaturedItem({ title, date, href = "#" }: FeaturedItemProps) {
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        className="group grid grid-cols-[16px_1fr] gap-3 border-t border-white/[0.07] py-4 first:border-t-0 cursor-pointer transition-all duration-500 hover:translate-x-0.5"
      >
        <span
          aria-hidden="true"
          className="mt-2 h-px w-3 bg-white/25 transition-all duration-300 group-hover:w-4 group-hover:bg-white/60"
        />
        <div className="flex min-w-0 flex-col">
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
