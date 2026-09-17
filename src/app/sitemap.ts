import type { MetadataRoute } from "next";
import { routes } from "@/lib/agentProfile";
import { abs } from "@/lib/siteUrl";

// Routes come from agentProfile, which derives project pages from
// resume_data.json — a new project entry shows up here with no edit.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
