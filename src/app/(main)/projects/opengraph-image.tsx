import { profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, ogImageMetadata, projectsCard } from "@/lib/ogCard";

const alt = `Projects by ${profile.fullName}`;
// Versioned URL, so cached link previews refresh when the card changes.
export const generateImageMetadata = () => ogImageMetadata(alt);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return projectsCard();
}
