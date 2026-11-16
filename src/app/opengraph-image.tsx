import { profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, homeCard } from "@/lib/ogCard";

export const alt = `${profile.fullName} | ${profile.headline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Site-wide default. Also serves as the fallback for any route that does not
// define its own opengraph-image. Same card as /home.
export default function Image() {
  return homeCard();
}
