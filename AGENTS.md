# AI Agent Instructions

## Project Goal

Build a premium AI/ML research implementation showcase platform focused on reproducible paper implementations and elegant technical storytelling.

The website must feel like a modern editorial research experience rather than a generic portfolio template.

---

# Core Rules

## 1. Preserve Visual Identity

Always maintain:

* monochrome palette
* editorial minimalism
* cinematic spacing
* premium typography
* clean geometric layouts

Do not introduce:

* colorful UI
* generic startup sections
* flashy gradients
* template-like cards
* cluttered interfaces

---

# 2. Tech Stack Requirements

Mandatory stack:

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* Framer Motion
* MDX
* Shadcn/ui

Preferred libraries:

* Lucide React
* Recharts
* KaTeX/MathJax

---

# 3. Animation Rules

Animations must be:

* subtle
* smooth
* premium
* purposeful

Preferred animations:

* fade reveal
* opacity transitions
* soft transforms
* hover elevation
* text reveal
* scroll-based motion

Avoid:

* bouncing animations
* aggressive scaling
* flashy transitions
* distracting motion

---

# 4. Content Architecture

Paper implementations are MDX-driven.

Structure:
content/papers/*.mdx

Every paper must support:

* metadata
* thumbnail
* tags
* slug
* description
* publication date
* GitHub link

Dynamic pages should auto-generate from MDX files.

---

# 5. Paper Page Requirements

Each implementation page should include:

* Hero section
* Overview
* Mathematical intuition
* Equations
* Visualizations
* Implementation details
* Results
* Learnings
* GitHub repository
* References

Support:

* syntax highlighted code blocks
* equations
* interactive charts
* expandable sections

---

# 6. Design Language

The UI should resemble:

* modern editorial websites
* research publications
* premium portfolio experiences
* luxury minimal interfaces

Maintain:

* large typography
* whitespace
* asymmetrical layouts
* visual hierarchy

---

# 7. Performance Standards

Prioritize:

* fast loading
* static generation
* optimized assets
* responsive layouts
* accessibility
* SEO optimization

---

# 8. Component Standards

Components must be:

* reusable
* modular
* scalable
* typed properly

Avoid:

* duplicated layouts
* monolithic files
* hardcoded data
* unnecessary dependencies

---

# 9. Abstract Visual Direction

Instead of photos, use:

* neural-inspired graphics
* flowing data structures
* particle systems
* abstract mathematical visuals
* generative monochrome art

The visuals should feel:

* intelligent
* technical
* elegant
* futuristic
* minimal

---

# 10. Future Scalability

The architecture must support:

* multiple paper implementations
* tags/categories
* search functionality
* featured implementations
* implementation collections
* interactive demos
* future blogs/research notes

---

# 11. Interaction Philosophy

The website should feel:

* immersive
* smooth
* intentional
* refined
* high-end

Every interaction should improve the reading experience.

---

# 12. Avoid Generic AI Design

Do NOT generate:

* glowing neon AI visuals
* generic chatbot aesthetics
* overused gradients
* startup-style hero sections
* dashboard-heavy interfaces

The project is:

* editorial
* research-oriented
* implementation-focused
* design-conscious

---

# 13. Mobile Responsiveness

Ensure:

* responsive typography
* adaptive spacing
* touch-friendly interactions
* mobile-first layouts
* optimized navigation

The mobile experience must remain premium and uncluttered.

---

# 14. Implementation Focus

Current featured implementation:

* Linear Regression From Scratch

Repository:
https://github.com/mahirmlk/linear-regression.git

Future implementations should integrate seamlessly into the platform without architectural changes.

---

# 15. Overall Objective

The final platform should feel like:

* an elite AI engineering showcase
* a research implementation lab
* a premium technical publication
* a modern engineering case-study platform

The result must look custom-built, sophisticated, and highly intentional.

---

# Developer Commands

```sh
npm run dev        # Start dev server
npm run build      # Production build (static export)
npm run start      # Start production server
npm run lint       # ESLint
```

# Architecture

## Key Directories

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages |
| `src/components/` | Reusable UI components |
| `src/lib/` | Utilities, paper parser, MDX component map |
| `content/papers/` | MDX paper files (source of truth for content) |
| `src/components/ui/` | Shadcn/ui primitives |

## How to Add a New Paper

1. Create `content/papers/<slug>.mdx` with frontmatter (title, subtitle, date, description, github, tags)
2. Use `$$...$$` for display math and `$...$` for inline math (processed by remark-math + rehype-katex)
3. Import and use available chart components: `<CostChart />`, `<RegressionChart />`, `<GradientDescentChart />`
4. Use `<Equation tex="..." />` for custom KaTeX rendering
5. Dynamic route at `src/app/papers/[slug]/page.tsx` auto-discovers new slugs at build time
6. Home page at `src/app/page.tsx` lists papers from `getAllPapers()` automatically

## Key Conventions

- All pages are statically generated (`output: "export"` in next.config.ts)
- Dark theme default via `next-themes`
- Default exports for icons (lucide-react may not have `Github`; use `GitBranch` instead)
- Math in MDX requires remark-math + rehype-katex plugins (configured in paper page)
- Colors are monochrome via Tailwind v4 oklch variables in `globals.css`
- Neural network visualization uses Canvas 2D API (client component)
- Charts use Recharts (server-safe via dynamic imports would be needed for runtime)

## Component Patterns

- All interactive components use `"use client"` directive (Framer Motion, Recharts, canvas)
- Layout uses CSS Grid for 3-column hero, stacks on mobile
- Paper detail pages use `compileMDX` from `next-mdx-remote/rsc` with custom component map
- Animations are in Framer Motion (page transitions, hover effects, magnetic buttons)
