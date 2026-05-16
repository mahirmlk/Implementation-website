import fs from "fs";
import path from "path";

export interface PaperFrontmatter {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  github: string;
  tags: string[];
  thumbnail?: string;
}

export interface PaperMeta {
  slug: string;
  frontmatter: PaperFrontmatter;
}

const papersDirectory = path.join(process.cwd(), "content", "papers");

export function getAllPaperSlugs(): string[] {
  try {
    const files = fs.readdirSync(papersDirectory);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function getPaperBySlug(slug: string): PaperMeta | null {
  try {
    const fullPath = path.join(papersDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const frontmatter = parseFrontmatter(fileContents);
    if (!frontmatter) return null;
    return { slug, frontmatter: frontmatter as unknown as PaperFrontmatter };
  } catch {
    return null;
  }
}

export function getAllPapers(): PaperMeta[] {
  const slugs = getAllPaperSlugs();
  return slugs
    .map((slug) => getPaperBySlug(slug))
    .filter((p): p is PaperMeta => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

function parseFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const yamlBlock = match[1];
  const result: Record<string, unknown> = {};
  const lines = yamlBlock.split("\n");
  for (const line of lines) {
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      let value: string | string[] = kvMatch[2].trim();
      // Strip surrounding quotes from YAML strings
      value = value.replace(/^["']|["']$/g, "");
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/"/g, ""));
      }
      result[key] = value;
    }
  }
  return result;
}
