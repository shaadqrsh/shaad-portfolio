import { profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, homeCard } from "@/lib/ogCard";

export const alt = `${profile.fullName} | ${profile.headline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// /home is the real landing page ("/" only redirects to it), so it needs its
// own card; the root opengraph-image does not cascade into this route group.
export default function Image() {
  return homeCard();
}
