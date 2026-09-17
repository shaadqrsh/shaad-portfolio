import { education, experience, profile } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/ogCard";

export const alt = `Resume | ${profile.fullName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const current = education[0];

  return ogCard({
    eyebrow: "Resume",
    title: profile.name,
    subtitle:
      `${profile.headline} in ${profile.location}. ` +
      `${experience.length} roles` +
      (current?.institution ? ` · ${current.institution.split(",").pop()?.trim()}` : ""),
    tags: ["Download PDF"],
  });
}
