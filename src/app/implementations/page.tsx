import { getAllPapers, type PaperMeta } from "@/lib/papers";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

function PaperRow({ paper }: { paper: PaperMeta }) {
  return (
    <Link
      href={`/papers/${paper.slug}`}
      className="group flex items-start justify-between gap-6 py-6 border-b border-black/8 transition-colors hover:bg-black/[0.015]"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-medium tracking-tight text-black/90 group-hover:text-black transition-colors">
          {paper.frontmatter.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-black/40 max-w-xl">
          {paper.frontmatter.description}
        </p>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-[12px] text-black/30 tabular-nums">
          {paper.frontmatter.date}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-black/20 group-hover:text-black/60 transition-colors"
          strokeWidth={1.5}
        />
      </div>
    </Link>
  );
}

export default function ImplementationsPage() {
  const papers = getAllPapers();

  return (
    <div className="min-h-dvh bg-white text-black">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-6 lg:px-10 h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 22 22"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M11 1.5L19.5 6.5V15.5L11 20.5L2.5 15.5V6.5L11 1.5Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
              />
              <path
                d="M11 5.5L15.5 8.5V13.5L11 16.5L6.5 13.5V8.5L11 5.5Z"
                stroke="currentColor"
                strokeWidth="0.9"
                fill="none"
              />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-semibold tracking-[0.22em]">
                MAHIR
              </span>
              <span className="text-[9px] font-semibold tracking-[0.22em]">
                MALIK
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[11px] tracking-wide text-black/40 hover:text-black transition-colors"
            >
              Home
            </Link>
            <span className="text-[11px] tracking-wide text-black/90">
              Implementations
            </span>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] max-w-[1400px] mx-auto">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block px-10 pt-12 pb-10">
          <div className="sticky top-24">
            <span className="text-[10px] font-medium tracking-[0.2em] text-black/30 uppercase">
              Table of Contents
            </span>
            <nav className="mt-6 flex flex-col gap-1">
              <a
                href="#algorithms-paradigms"
                className="group flex items-center gap-3 py-2 text-[13px] text-black/50 hover:text-black transition-colors"
              >
                <span className="leading-snug">Algorithms Paradigms</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="px-6 lg:px-12 pt-10 lg:pt-16 pb-24">
          {/* Hero Header */}
          <header className="mb-16">
            <h1 className="text-[28px] lg:text-[32px] font-serif font-light tracking-tight text-black">
              Implementations
            </h1>
            <div className="mt-6 h-px w-10 bg-black/15" />
            <p className="mt-6 text-[14px] leading-relaxed text-black/45 max-w-lg">
              A compact collection of fundamental learning systems, rebuilt from
              first principles. Each case study follows the mechanism, the
              implementation decisions, and the evidence used to verify it.
            </p>
          </header>

          {/* Algorithms Paradigms */}
          <section id="algorithms-paradigms">
            <h2 className="text-[15px] font-medium tracking-tight text-black/75 mb-8">
              Algorithms Paradigms
            </h2>

            <div className="flex flex-col">
              {papers.map((paper) => (
                <PaperRow key={paper.slug} paper={paper} />
              ))}
            </div>
          </section>

          {/* Back to home */}
          <div className="mt-24 pt-8 border-t border-black/8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[12px] tracking-wide text-black/40 hover:text-black transition-colors"
            >
              <ArrowRight
                className="h-3.5 w-3.5 rotate-180"
                strokeWidth={1.5}
              />
              Back to home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
