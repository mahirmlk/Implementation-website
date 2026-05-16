import type { MDXComponents } from "mdx/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function getMDXComponents(): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="mt-16 mb-6 text-4xl font-light tracking-tight sm:text-5xl"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => {
      const id = slugify(String(children));
      return (
        <h2
          id={id}
          className="mt-14 mb-4 scroll-mt-24 text-2xl font-medium tracking-tight sm:text-3xl"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => (
      <h3
        className="mt-10 mb-3 text-xl font-medium tracking-tight"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-5 leading-relaxed text-zinc-400" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-6 list-disc space-y-2 pl-5 text-zinc-400" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mb-6 list-decimal space-y-2 pl-5 text-zinc-400"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-2 border-zinc-700 pl-6 italic text-zinc-500"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className="rounded-sm bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <pre className="mb-6 overflow-x-auto rounded-sm border border-zinc-800 bg-zinc-900 p-4 text-sm">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="mb-6 overflow-x-auto rounded-sm border border-zinc-800 bg-zinc-900 p-4 text-sm"
        {...props}
      >
        {children}
      </pre>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-zinc-300 underline underline-offset-4 transition-colors hover:text-zinc-100"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    hr: (props) => <hr className="my-12 border-zinc-800" {...props} />,
    table: ({ children, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-zinc-900/60" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="divide-y divide-zinc-800/60" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="transition-colors hover:bg-zinc-800/30" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left text-[11px] font-medium tracking-[0.12em] uppercase text-zinc-500 border-b border-zinc-800"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-zinc-400" {...props}>
        {children}
      </td>
    ),
    img: ({ src, alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        className="my-8 w-full rounded-sm"
        loading="lazy"
        {...props}
      />
    ),
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Badge,
  };
}
