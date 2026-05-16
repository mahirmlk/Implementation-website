import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://papers.mahirmalik.in"),
  title: "AI/ML Implementations • Research Reproductions",
  description:
    "Research paper implementations, architecture designs, optimization experiments, and scalable AI systems built with clean engineering and reproducible workflows.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://papers.mahirmalik.in",
    siteName: "Implementations",
    title: "AI/ML Implementations • Research Reproductions",
    description:
      "Research paper implementations, architecture designs, optimization experiments, and scalable AI systems built with clean engineering and reproducible workflows.",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "AI/ML Implementations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI/ML Implementations • Research Reproductions",
    description:
      "Research paper implementations, architecture designs, optimization experiments, and scalable AI systems built with clean engineering and reproducible workflows.",
    images: ["/og-banner.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
