import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { name } from "@/lib/Data";
import { allKeywords, profile } from "@/lib/agentProfile";
import { personJsonLd } from "@/lib/jsonLd";
import { SITE_URL, abs } from "@/lib/siteUrl";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${name}`,
    default: name,
  },
  description: profile.summary,
  keywords: allKeywords,
  authors: [{ name: profile.fullName, url: SITE_URL }],
  creator: profile.fullName,
  alternates: {
    canonical: "/",
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
    >
      <head>
        <script
          type="application/ld+json"
          // Server-rendered so crawlers that do not execute JS still read it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
