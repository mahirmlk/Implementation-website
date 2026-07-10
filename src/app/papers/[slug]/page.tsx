import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { ArrowUpRight, GitBranch } from "lucide-react";
import Link from "next/link";
import { getAllPaperSlugs } from "@/lib/papers";
import { getMDXComponents } from "@/lib/mdx-components";
import Equation from "@/components/equation";
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
    <div className="min-h-dvh bg-white text-black">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 text-[15px] text-black sm:px-10 lg:px-16">
        <Link href="/" className="transition-colors hover:text-black/55">
          Mahir Malik
        </Link>
        <div className="flex items-center gap-8 text-black/80">
          <Link
            href="/"
            className="transition-colors hover:text-black"
          >
            Home
          </Link>
          <Link
            href="/implementations"
            className="transition-colors hover:text-black"
          >
            Implementations
          </Link>
          {fm.github && (
            <a
              href={fm.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-black"
            >
              GitHub
            </a>
          )}
        </div>
      </nav>

      <header className="mx-auto max-w-5xl px-6 pt-14 pb-16 text-center sm:px-10 lg:pt-20 lg:pb-20">
        <h1 className="font-serif text-4xl font-normal tracking-normal text-black sm:text-5xl md:text-6xl">
          {fm.title}
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-[17px] leading-[1.7] text-black/75">
          {fm.description}
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 text-[16px] leading-none text-black/75">
          <span>Mahir Malik</span>
          <span>{fm.date}</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <article className="paper-content">{content}</article>

        <footer className="mx-auto mt-24 max-w-3xl border-t border-black/[0.1] pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[15px] text-black/70">{fm.title}</h3>
              <p className="mt-1 text-[14px] text-black/45">
                {fm.subtitle} - {fm.date}
              </p>
            </div>
            {fm.github && (
              <a
                href={fm.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-black/[0.1] px-4 py-2.5 text-[10px] tracking-[0.15em] text-black/45 transition-colors hover:border-black/30 hover:text-black uppercase"
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
  );
}
