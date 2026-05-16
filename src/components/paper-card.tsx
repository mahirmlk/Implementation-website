"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PaperFrontmatter } from "@/lib/papers";

interface PaperCardProps {
  paper: {
    slug: string;
    frontmatter: PaperFrontmatter;
  };
}

export default function PaperCard({ paper }: PaperCardProps) {
  const { slug, frontmatter } = paper;

  return (
    <Link href={`/papers/${slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative overflow-hidden rounded-sm border border-white/5 bg-white/[0.02] transition-colors duration-500 hover:bg-white/[0.05]"
      >
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 225" fill="none">
              <path
                d="M0 112.5 Q100 75 200 112.5 T400 112.5"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M0 140 Q100 100 200 140 T400 140"
                stroke="white"
                strokeWidth="0.3"
                fill="none"
                opacity="0.15"
              />
              <circle cx="120" cy="100" r="2" fill="white" opacity="0.4" />
              <circle cx="200" cy="120" r="1.5" fill="white" opacity="0.3" />
              <circle cx="280" cy="105" r="1.8" fill="white" opacity="0.35" />
              <circle cx="160" cy="80" r="1" fill="white" opacity="0.2" />
              <circle cx="240" cy="140" r="1.2" fill="white" opacity="0.25" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              {frontmatter.subtitle}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-[10px] tracking-[0.15em] text-zinc-600">
              {frontmatter.date}
            </span>
          </div>

          <h3 className="text-lg font-medium text-white mb-2 group-hover:text-zinc-300 transition-colors">
            {frontmatter.title}
          </h3>

          <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-3">
            {frontmatter.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
            <span className="tracking-wider uppercase">View Case Study</span>
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="h-3 w-3" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
