import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { name } from "@/lib/Data";
import { allKeywords, profile } from "@/lib/agentProfile";
import { jsonLdHtml, personJsonLd } from "@/lib/jsonLd";
import { SITE_URL, abs } from "@/lib/siteUrl";
import type { Metadata, Viewport } from "next";

// Site fonts. next/font sets the --ff-* variables; globals.css maps them to
// Tailwind's font-display, font-sans and font-label utilities. The names differ
// on purpose so a theme variable never points at itself.
//
// subsets only says what to preload. Accented letters (latin-ext) still load
// on demand when a page uses them, so they are left out to save two unused
// preloads, which the browser warns about on pages without them.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ff-display",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-body",
});
const label = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--ff-label",
});

// Colors the phone's browser bar to match the navbar.
export const viewport: Viewport = { themeColor: "#292342" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${name}`,
    default: `${name} | ${profile.headline}`,
  },
  description: profile.summary,
  keywords: allKeywords,
  authors: [{ name: profile.fullName, url: SITE_URL }],
  creator: profile.fullName,
  // No canonical here: each page sets its own in src/lib/pageMeta.ts. A
  // site-wide "/" would make any page that forgot one point at the home redirect.
  alternates: {
    // Advertises the machine-readable mirror of this site so agents that check
    // <link rel="alternate"> find it without guessing at /llms.txt.
    types: {
      "text/plain": abs("/llms.txt"),
      "application/json": abs("/api/profile.json"),
    },
  },
  openGraph: {
    type: "profile",
    siteName: `${profile.fullName} | Portfolio`,
    title: `${profile.fullName} | ${profile.headline}`,
    description: profile.summary,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} | ${profile.headline}`,
    description: profile.summary,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Favicon strategy. The previous setup could not work for two reasons:
  // src/app/favicon.ico (a renamed copy of the white PNG) took precedence over
  // this block entirely, and Chrome ignores `media` on icon links regardless.
  //
  // So the icons are a purple (shaad-100) plate with the SQ knocked out in
  // white. Contrast is self-contained rather than borrowed from the tab strip,
  // which is the only approach that survives a light Chrome theme on a
  // dark-mode OS. shaad-100 is the one palette purple bright enough to clear
  // 3:1 against both white and dark tab strips.
  icons: {
    icon: [
      { url: "/icon.svg?v=4", type: "image/svg+xml" },
      { url: "/favicon.ico?v=4", sizes: "any" },
      { url: "/icon-32.png?v=4", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png?v=4", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png?v=4", sizes: "180x180" }],
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
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${label.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // Server-rendered so crawlers that do not execute JS still read it.
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(personJsonLd()) }}
        />
        {/* Without JavaScript nothing runs the fade-ins or lifts the page
            loader, so show everything as it would look once they finish. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}[data-page-loader]{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">{children}</body>
      {/* The analytics script is served by Vercel itself, so anywhere else it would 404 in the console. */}
      {process.env.VERCEL && <Analytics />}
    </html>
  );
}
