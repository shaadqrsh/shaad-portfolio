import type { MetadataRoute } from "next";
import { profile } from "@/lib/agentProfile";

// /manifest.webmanifest: the name, colors and icons a phone uses when the site
// is added to the home screen. Next links it from every page's <head>.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.fullName} | Portfolio`,
    short_name: profile.name,
    description: profile.summary,
    start_url: "/home",
    display: "standalone",
    background_color: "#181429", // shaad-400, the page background
    theme_color: "#292342", // shaad-200, the navbar
    icons: [
      { src: "/icon.svg?v=4", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/icon-192.png?v=4", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: "/icon-512.png?v=4", type: "image/png", sizes: "512x512", purpose: "any" },
      // Full-bleed plate with the SQ inside the safe zone, for launchers that crop icons to a circle or squircle.
      { src: "/icon-maskable-512.png?v=4", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
