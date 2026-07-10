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
        className="mt-14 mb-5 font-serif text-3xl font-normal tracking-normal sm:text-4xl"
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
          className="mt-14 mb-4 scroll-mt-24 font-serif text-2xl font-normal tracking-normal sm:text-3xl"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => (
      <h3
        className="mt-9 mb-3 text-lg font-normal tracking-normal"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-5 text-[17px] leading-[1.78] text-black/80" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-6 list-disc space-y-2 pl-5 text-[16px] leading-[1.75] text-black/75" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mb-6 list-decimal space-y-2 pl-5 text-[16px] leading-[1.75] text-black/75"
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
        className="my-7 border-l border-black/20 pl-5 text-[16px] leading-[1.75] text-black/65"
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
            className="rounded-sm bg-black/[0.05] px-1.5 py-0.5 text-sm text-black/70"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <pre className="mb-6 overflow-x-auto rounded-sm border border-black/[0.1] bg-black/[0.025] p-4 text-sm text-black/75">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="mb-6 overflow-x-auto rounded-sm border border-black/[0.1] bg-black/[0.025] p-4 text-sm text-black/75"
        {...props}
      >
        {children}
      </pre>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-black/75 underline underline-offset-4 transition-colors hover:text-black"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    hr: (props) => <hr className="my-12 border-black/10" {...props} />,
    table: ({ children, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-black/10">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-black/[0.03]" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="divide-y divide-black/[0.08]" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="transition-colors hover:bg-black/[0.02]" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border-b border-black/10 px-4 py-3 text-left text-[11px] font-medium tracking-[0.12em] text-black/45 uppercase"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-black/60" {...props}>
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
