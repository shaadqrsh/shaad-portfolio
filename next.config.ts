import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Scans public/project_*/ at build time (and on dev server start) so screenshot
// counts never have to be hand-maintained. The result is inlined into the
// bundle as an env constant, which keeps it working on Vercel where the
// serverless runtime can't read public/ from disk.
const readImgCounts = () => {
  const publicDir = path.join(process.cwd(), "public");
  const counts: { [key: string]: number } = {};

  for (const entry of fs.readdirSync(publicDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith("project_")) continue;

    const url = entry.name.slice("project_".length);
    const images = fs
      .readdirSync(path.join(publicDir, entry.name))
      .filter((file) => /^img_\d+\.png$/.test(file));

    // Count only the unbroken img_1..img_N run so a gap never renders a 404.
    let count = 0;
    while (images.includes(`img_${count + 1}.png`)) count++;

    counts[url] = count;
  }

  return counts;
};

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_IMG_COUNTS: JSON.stringify(readImgCounts()),
  },
};

export default nextConfig;
