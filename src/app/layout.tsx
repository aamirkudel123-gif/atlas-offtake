import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SITE } from "@/lib/content";

import "./globals.css";

/* Editorial display face — used only for headings. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* Interface and body. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Data labels, indices and eyebrows. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — Strategic Procurement & Structured Offtake`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Atlas Offtake helps industrial buyers secure dependable access to critical materials through disciplined procurement, transparent partnerships and responsible global sourcing.",
  applicationName: SITE.name,
  keywords: [
    "offtake agreements",
    "strategic procurement",
    "commodity sourcing",
    "critical minerals",
    "battery materials",
    "base metals",
    "supply chain advisory",
    "responsible sourcing",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.domain,
    title: `${SITE.name} — Strategic Procurement & Structured Offtake`,
    description:
      "Disciplined procurement, structured offtake and responsible global sourcing of critical industrial commodities.",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Offtake — a commodity port terminal at blue hour.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Strategic Procurement & Structured Offtake`,
    description:
      "Disciplined procurement, structured offtake and responsible global sourcing of critical industrial commodities.",
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: [{ url: "/atlas-favicon.png", type: "image/png" }],
    apple: [{ url: "/atlas-favicon.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <head>
        {/*
          Scroll reveals start at opacity 0 and are switched on by an
          IntersectionObserver. Without JS that observer never runs, so the
          page would render blank. This restores everything for no-JS agents.
        */}
        <noscript>
          <style>{`.reveal,.rule-draw,.word-reveal>span>span{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="skip-link bg-copper px-5 py-3 type-eyebrow text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
