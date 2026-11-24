import type { NextConfig } from "next";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const IMAGE_EXT = /\.(png|jpe?g)$/i;

// Scans public/ at build time (and on dev server start) for every .png, .jpg
// and .jpeg, keyed by its lowercased path without the extension. src/lib/images.ts
// uses this to find whichever format is on disk, and to count screenshots
// without anyone hand-maintaining a number. The result is inlined into the
// bundle as an env constant, which keeps it working on Vercel where the
// serverless runtime can't read public/ from disk.
const readImages = () => {
  const publicDir = path.join(process.cwd(), "public");
  const images: { [key: string]: string } = {};

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!IMAGE_EXT.test(entry.name)) continue;

      const src = "/" + path.relative(publicDir, full).split(path.sep).join("/");
      const key = src.replace(IMAGE_EXT, "").toLowerCase();

      // Two formats of the same image: keep the .png so the pick doesn't
      // depend on directory order, and say so.
      if (images[key]) {
        const keep = /\.png$/i.test(images[key]) ? images[key] : src;
        const drop = keep === src ? images[key] : src;
        console.warn(`public${keep} and public${drop} both exist; using ${keep}.`);
        images[key] = keep;
        continue;
      }
      images[key] = src;
    }
  };

  walk(publicDir);
  return images;
};

// A short hash of everything the link preview cards are drawn from: the card
// code, fonts and data in src/lib, and the images in public/. It goes into each
// preview image's URL (see OG_ID in src/lib/ogCard.tsx). Next's own suffix on
// those URLs only hashes the opengraph-image route file, so redesigning the
// card or editing a project left the URL unchanged, and LinkedIn and others
// kept showing their cached copy. Now any change gives every card a new URL.
const ogVersion = () => {
  const hash = crypto.createHash("sha1");
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      hash.update(path.relative(process.cwd(), full).split(path.sep).join("/"));
      hash.update(fs.readFileSync(full));
    }
  };
  walk(path.join(process.cwd(), "src/lib"));
  walk(path.join(process.cwd(), "public"));
  return hash.digest("hex").slice(0, 10);
};

// Content Security Policy. Everything the site loads is its own, apart from
// the YouTube player. Scripts keep 'unsafe-inline' because Next writes each
// page's data into inline <script> tags, and the nonce alternative would turn
// every pre-rendered page into a per-request render. The site takes no visitor
// input, so there's nothing to inject. Dev mode needs eval for React's
// debugging tools, and Vercel preview builds load the feedback toolbar.
const isDev = process.env.NODE_ENV !== "production";
const isPreview = process.env.VERCEL_ENV === "preview";
const vercelLive = isPreview ? " https://vercel.live" : "";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${vercelLive}`,
  "style-src 'self' 'unsafe-inline'",
  // i.ytimg.com: once a video plays, the player sets its thumbnail as the
  // artwork for the system media controls, which loads under this page's policy.
  `img-src 'self' data: blob: https://i.ytimg.com${vercelLive}`,
  "font-src 'self'",
  `connect-src 'self'${vercelLive}${isPreview ? " wss://ws-us3.pusher.com" : ""}`,
  `frame-src https://www.youtube-nocookie.com${vercelLive}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turns off features the site never uses. The YouTube player's own
  // permissions (autoplay, fullscreen and so on) are left alone.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  env: {
    NEXT_PUBLIC_IMAGES: JSON.stringify(readImages()),
    OG_VERSION: ogVersion(),
  },
  // YouTube thumbnails go through the image optimizer, so the server fetches
  // them from Google and visitors' browsers never contact i.ytimg.com.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  // The site starts at /home. A server redirect sends crawlers and link
  // previews there straight away, without loading a blank page and JavaScript
  // first. Temporary, so browsers don't cache it if "/" ever gets a page.
  async redirects() {
    return [{ source: "/", destination: "/home", permanent: false }];
  },
};

export default nextConfig;
