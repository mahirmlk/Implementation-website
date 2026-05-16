import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="text-8xl font-light tracking-tight text-foreground/10">
          404
        </h1>
        <h2 className="mt-4 text-xl font-medium tracking-tight text-foreground/60">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-xs tracking-widest text-foreground/40 transition-colors hover:text-foreground/80 uppercase"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
