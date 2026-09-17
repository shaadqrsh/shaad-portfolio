import { profile, projects } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/ogCard";

export const alt = `Projects by ${profile.fullName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const games = projects.filter((p) => p.type === "game").length;

  return ogCard({
    eyebrow: "Portfolio",
    title: "Projects",
    subtitle:
      `${projects.length} shipped projects: ${games} games and ` +
      `${projects.length - games} software builds.`,
    // Project titles are long, so 3 chips is the most that fits
    // without running into the domain on the right.
    tags: projects.slice(0, 3).map((p) => p.title),
  });
}
