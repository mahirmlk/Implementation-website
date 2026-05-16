import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { ArrowUpRight, Calendar, GitBranch, Tag } from "lucide-react";
import Link from "next/link";
import { getAllPaperSlugs } from "@/lib/papers";
import { getMDXComponents } from "@/lib/mdx-components";
import Equation from "@/components/equation";
import CostChart from "@/components/cost-chart";
import RegressionChart from "@/components/regression-chart";
import GradientDescentChart from "@/components/gradient-descent-chart";
import PaperToc from "@/components/paper-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface PaperPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PaperPageProps) {
  const { slug } = await params;
  const papersDirectory = path.join(process.cwd(), "content", "papers");
  const fullPath = path.join(papersDirectory, `${slug}.mdx`);
  try {
    const content = fs.readFileSync(fullPath, "utf8");
    const match = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (match) {
      const titleMatch = match[1].match(/^title:\s*(.+)$/m);
      const descMatch = match[1].match(/^description:\s*(.+)$/m);
      const title = titleMatch?.[1]?.replace(/"/g, "") || slug;
      const description = descMatch?.[1]?.replace(/"/g, "") || "";
      return {
        title: `${title} | MAHIR MALIK`,
        description,
        openGraph: { title, description },
      };
    }
  } catch {
    // ignore
  }
  return { title: `Paper | MAHIR MALIK` };
}

export async function generateStaticParams() {
  return getAllPaperSlugs().map((slug) => ({ slug }));
}

export default async function PaperPage({ params }: PaperPageProps) {
  const { slug } = await params;
  const papersDirectory = path.join(process.cwd(), "content", "papers");
  const fullPath = path.join(papersDirectory, `${slug}.mdx`);

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch {
    notFound();
  }

  const mdxComponents = getMDXComponents();

  const { content, frontmatter } = await compileMDX<{
    title: string;
    subtitle: string;
    date: string;
    description: string;
    github: string;
    tags: string[];
  }>({
    source: fileContents,
    components: {
      ...mdxComponents,
      Equation,
      CostChart,
      RegressionChart,
      GradientDescentChart,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
  });

  const fm = frontmatter;
  if (!fm?.title) notFound();

  return (
    <div className="min-h-dvh bg-[#0a0a0a] text-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40 transition-colors hover:text-white/80 uppercase"
          >
            <span className="mr-1">←</span> Back
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.15em] text-white/25 uppercase">
              {fm.subtitle}
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-[10px] tracking-[0.15em] text-white/25 uppercase">
              {fm.date}
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {(fm.tags || []).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] tracking-[0.15em] text-white/35 uppercase"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {fm.title}
          </h1>

          {/* Divider */}
          <div className="mt-8 h-px w-12 bg-white/15" />

          {/* Description */}
          <p className="mt-8 max-w-2xl text-[14px] leading-[1.8] text-white/45">
            {fm.description}
          </p>

          {/* GitHub Link */}
          {fm.github && (
            <a
              href={fm.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-[11px] tracking-[0.15em] text-white/50 transition-all hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white/80 uppercase"
            >
              <GitBranch className="h-3.5 w-3.5" />
              View Repository
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </header>

      {/* Content Section */}
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
          {/* Sidebar — Table of Contents */}
          <aside className="hidden lg:block">
            <PaperToc />
          </aside>

          {/* Main Content */}
          <main className="py-12 lg:py-16 lg:pl-16">
            <article className="paper-content">{content}</article>

            {/* Footer */}
            <footer className="mt-24 border-t border-white/[0.06] pt-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-[13px] font-medium text-white/50">
                    {fm.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-white/25">
                    {fm.subtitle} · {fm.date}
                  </p>
                </div>
                {fm.github && (
                  <a
                    href={fm.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded border border-white/[0.08] px-4 py-2.5 text-[10px] tracking-[0.15em] text-white/30 transition-colors hover:border-white/[0.15] hover:text-white/60 uppercase"
                  >
                    <GitBranch className="h-3 w-3" />
                    Repository
                    <ArrowUpRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
