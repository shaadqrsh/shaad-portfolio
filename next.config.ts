import type { NextConfig } from "next";
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
        // The resume generator's assets aren't served as site images.
        if (entry.name !== "resume_gen") walk(full);
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

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_IMAGES: JSON.stringify(readImages()),
  },
};

export default nextConfig;
