import { profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, ogImageMetadata, homeCard } from "@/lib/ogCard";

const alt = `${profile.fullName} | ${profile.headline}`;
// Versioned URL, so cached link previews refresh when the card changes.
export const generateImageMetadata = () => ogImageMetadata(alt);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// /home is the real landing page ("/" only redirects to it), so it needs its
// own card; the root opengraph-image does not cascade into this route group.
export default function Image() {
  return homeCard();
}
