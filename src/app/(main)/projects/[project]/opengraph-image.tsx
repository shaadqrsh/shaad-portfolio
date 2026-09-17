import { profile, projects } from "@/lib/agentProfile";
import { OG_CONTENT_TYPE, OG_SIZE, clampText, ogCard } from "@/lib/ogCard";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Pre-render one card per project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: { project: string };
}) {
  const proj = projects.find((p) => p.slug === params.project);
  return [
    {
      id: "card",
      alt: proj ? `${proj.title} - a project by ${profile.fullName}` : profile.fullName,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ project: string }> | { project: string };
}) {
  const { project } = await params;
  const proj = projects.find((p) => p.slug === project);

  if (!proj) {
    return ogCard({
      title: profile.fullName,
      subtitle: clampText(profile.summary, 170),
    });
  }

  return ogCard({
    eyebrow: proj.type === "game" ? "Game Project" : proj.category,
    title: proj.title,
    subtitle: clampText(proj.summary, 165),
    tags: proj.technologies.slice(0, 5),
  });
}
