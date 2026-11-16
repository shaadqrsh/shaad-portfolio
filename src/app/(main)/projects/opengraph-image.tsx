import { profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, projectsCard } from "@/lib/ogCard";

export const alt = `Projects by ${profile.fullName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return projectsCard();
}
