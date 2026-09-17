import { profile, stats } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, clampText, ogCard } from "@/lib/ogCard";

export const alt = `${profile.fullName} | ${profile.headline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// /home is the real landing page ("/" only redirects to it), so it needs its
// own card; the root opengraph-image does not cascade into this route group.
export default function Image() {
  return ogCard({
    title: profile.fullName,
    subtitle: clampText(profile.summary, 170),
    tags: [profile.location, ...stats.map((s) => `${s.value} ${s.label}`)],
  });
}
