import { profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, aboutCard } from "@/lib/ogCard";

export const alt = `About ${profile.fullName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return aboutCard();
}
