import { profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, ogImageMetadata, homeCard } from "@/lib/ogCard";

const alt = `${profile.fullName} | ${profile.headline}`;
// Versioned URL, so cached link previews refresh when the card changes.
export const generateImageMetadata = () => ogImageMetadata(alt);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Site-wide default. Also serves as the fallback for any route that does not
// define its own opengraph-image. Same card as /home.
export default function Image() {
  return homeCard();
}
