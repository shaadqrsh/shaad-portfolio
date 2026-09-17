import { keywords, profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, clampText, ogCard } from "@/lib/ogCard";

export const alt = `About ${profile.fullName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "About",
    title: profile.name,
    subtitle: clampText(profile.about, 175),
    tags: keywords.skills.slice(0, 5),
  });
}
