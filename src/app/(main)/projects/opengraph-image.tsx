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
    tags: projects.slice(0, 4).map((p) => p.title),
  });
}
