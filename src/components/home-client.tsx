"use client";

import { motion } from "framer-motion";
import NeuralArtwork from "@/components/neural-artwork";
import MagneticButton from "@/components/magnetic-button";
import FeaturedItem from "@/components/featured-item";
import { Search } from "lucide-react";
import type { PaperMeta } from "@/lib/papers";

function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="flex items-center gap-2.5"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
        <path d="M11 1.5L19.5 6.5V15.5L11 20.5L2.5 15.5V6.5L11 1.5Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M11 5.5L15.5 8.5V13.5L11 16.5L6.5 13.5V8.5L11 5.5Z" stroke="currentColor" strokeWidth="0.9" fill="none" />
        <line x1="11" y1="1.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="0.9" />
        <line x1="19.5" y1="6.5" x2="15.5" y2="8.5" stroke="currentColor" strokeWidth="0.9" />
        <line x1="2.5" y1="6.5" x2="6.5" y2="8.5" stroke="currentColor" strokeWidth="0.9" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-semibold tracking-[0.22em]">MAHIR</span>
        <span className="text-[10px] font-semibold tracking-[0.22em]">MALIK</span>
      </div>
    </motion.div>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
      <line x1="3" y1="8" x2="19" y2="8" stroke="currentColor" strokeWidth="1.3" />
      <line x1="3" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 5l10 7 10-7" />
    </svg>
  );
}

function GridThumbnail() {
  return (
    <svg className="h-full w-full" viewBox="0 0 60 48" fill="none">
      <circle cx="20" cy="16" r="1" fill="white" opacity="0.45" />
      <circle cx="30" cy="16" r="1" fill="white" opacity="0.45" />
      <circle cx="40" cy="16" r="1" fill="white" opacity="0.45" />
      <circle cx="20" cy="24" r="1" fill="white" opacity="0.45" />
      <circle cx="30" cy="24" r="1" fill="white" opacity="0.45" />
      <circle cx="40" cy="24" r="1" fill="white" opacity="0.45" />
      <circle cx="20" cy="32" r="1" fill="white" opacity="0.45" />
      <circle cx="30" cy="32" r="1" fill="white" opacity="0.45" />
      <circle cx="40" cy="32" r="1" fill="white" opacity="0.45" />
    </svg>
  );
}

function BarsThumbnail() {
  return (
    <svg className="h-full w-full" viewBox="0 0 60 48" fill="none">
      <rect x="20" y="28" width="4" height="10" fill="white" opacity="0.35" />
      <rect x="28" y="20" width="4" height="18" fill="white" opacity="0.45" />
      <rect x="36" y="14" width="4" height="24" fill="white" opacity="0.55" />
    </svg>
  );
}

function RingsThumbnail() {
  return (
    <svg className="h-full w-full" viewBox="0 0 60 48" fill="none">
      <circle cx="30" cy="24" r="10" stroke="white" strokeWidth="0.5" opacity="0.25" />
      <circle cx="30" cy="24" r="6" stroke="white" strokeWidth="0.5" opacity="0.35" />
      <circle cx="30" cy="24" r="2" fill="white" opacity="0.45" />
    </svg>
  );
}

function AngleThumbnail() {
  return (
    <svg className="h-full w-full" viewBox="0 0 60 48" fill="none">
      <path d="M14 36 L30 14 L46 36" stroke="white" strokeWidth="0.7" opacity="0.25" />
      <circle cx="30" cy="14" r="1.5" fill="white" opacity="0.45" />
    </svg>
  );
}

const thumbnails = [GridThumbnail, BarsThumbnail, RingsThumbnail, AngleThumbnail];

function getThumbnail(index: number) {
  const Component = thumbnails[index % thumbnails.length];
  return <Component />;
}

interface HomeClientProps {
  papers: PaperMeta[];
}

export default function HomeClient({ papers }: HomeClientProps) {
  const featuredPapers = papers.slice(0, 4);

  return (
    <main className="relative w-full min-h-dvh lg:h-screen lg:overflow-hidden grid grid-cols-1 lg:grid-cols-[34%_33%_33%]">
      {/* LEFT WHITE PANEL */}
      <section className="relative z-30 flex flex-col justify-between bg-white text-black">
        <div className="relative z-10 px-6 pt-6 lg:px-8 lg:pt-8">
          <Logo />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-6 lg:px-8 lg:py-0">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="font-serif leading-[0.98] tracking-tight"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
          >
            <span className="font-light block">Turning Research</span>
            <span className="font-light block">into Reproducible</span>
            <span className="font-semibold block">Implementations.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 h-px w-10 origin-left bg-black/20"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-5 max-w-[280px] text-[12px] leading-[1.7] text-black/50"
          >
            A curated collection of machine learning paper implementations exploring optimization, architectures, and training mechanics through clean code, visual analysis, and practical experimentation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-6"
          >
            <MagneticButton href="/implementations">
              EXPLORE IMPLEMENTATIONS
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative z-10 h-6" />
      </section>

      {/* CENTER ARTWORK PANEL */}
      <section className="relative z-10 hidden overflow-hidden bg-[#0a0a0a] lg:block">
        <NeuralArtwork />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="absolute bottom-8 left-8 z-30"
        >
          <div className="mb-4 h-px w-8 bg-white/30" />
          <div className="flex flex-col gap-[5px]">
            {["RESEARCH", "IMPLEMENT", "UNDERSTAND", "REPEAT"].map((word) => (
              <span key={word} className="text-[10px] font-medium tracking-[0.25em] text-white/45">
                {word}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* RIGHT SIDEBAR */}
      <section className="relative z-20 flex flex-col bg-[#0a0a0a] px-6 pb-6 pt-6 lg:px-8 lg:pb-8 lg:pt-8">
        {/* Vertical fading divider */}
        <div
          className="absolute left-0 top-[10%] bottom-[10%] w-px hidden lg:block"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 flex items-center justify-end gap-6"
        >
          <button className="text-white/40 transition-colors hover:text-white/80" aria-label="Search">
            <Search className="h-[17px] w-[17px]" strokeWidth={1.4} />
          </button>
          <button className="text-white/40 transition-colors hover:text-white/80" aria-label="Menu">
            <MenuIcon className="h-[17px] w-[17px]" />
          </button>
        </motion.div>

        <div className="relative z-10 mt-8 flex flex-1 flex-col">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[10px] font-medium tracking-[0.25em] text-white/40"
          >
            FEATURED IMPLEMENTATIONS
          </motion.span>

          <div className="mt-5 flex flex-col">
            {featuredPapers.length > 0 ? (
              featuredPapers.map((paper, i) => (
                <FeaturedItem
                  key={paper.slug}
                  title={paper.frontmatter.title}
                  date={paper.frontmatter.date}
                  index={i}
                  href={`/papers/${paper.slug}`}
                  thumbnail={getThumbnail(i)}
                />
              ))
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[13px] text-white/30"
              >
                No implementations yet.
              </motion.span>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <span
            className="text-[9px] font-medium tracking-[0.3em] text-white/20"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            RESEARCH. IMPLEMENT. IMPACT.
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="relative z-10 mt-auto flex items-center justify-end gap-5"
        >
          <a href="https://www.mahirmalik.in/" target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors hover:text-white/80" aria-label="Website">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[17px] w-[17px]">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </a>
          <a href="https://github.com/mahirmlk" target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors hover:text-white/80" aria-label="GitHub">
            <GitHubIcon className="h-[17px] w-[17px]" />
          </a>
          <a href="https://www.linkedin.com/in/mahir-malik" target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors hover:text-white/80" aria-label="LinkedIn">
            <LinkedInIcon className="h-[17px] w-[17px]" />
          </a>
          <a href="https://x.com/mahirmllk" target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors hover:text-white/80" aria-label="X">
            <TwitterIcon className="h-[17px] w-[17px]" />
          </a>
          <a href="mailto:mahirmalikx@gmail.com" className="text-white/40 transition-colors hover:text-white/80" aria-label="Email">
            <MailIcon className="h-[17px] w-[17px]" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
