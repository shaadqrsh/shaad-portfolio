import { profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, ogImageMetadata, homeCard } from "@/lib/ogCard";

// Policy pages share the site-wide card. A page's own openGraph metadata
// replaces the root's, so without this file they would have no image.
export const generateImageMetadata = () => ogImageMetadata(`${profile.fullName} | ${profile.headline}`);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return homeCard();
}
