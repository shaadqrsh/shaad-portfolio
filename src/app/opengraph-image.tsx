import { profile, stats } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, clampText, ogCard } from "@/lib/ogCard";

export const alt = `${profile.fullName} | ${profile.headline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Site-wide default. Also serves as the fallback for any route that does not
// define its own opengraph-image.
export default function Image() {
  return ogCard({
    title: profile.fullName,
    subtitle: clampText(profile.summary, 170),
    tags: [profile.location, ...stats.map((s) => `${s.value} ${s.label}`)],
  });
}
