import { data } from "@/lib/projectId";
import { name } from "@/lib/Data";
import { projectKeywords, projects } from "@/lib/agentProfile";
import { Metadata } from "next";
import ProjectIdPage from "./ProjectIdPage";

// Pre-renders every project page at build time so crawlers get real HTML
// instead of an on-demand render, and so each slug is in the static output.
export function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ project: string }> }): Promise<Metadata> {
  const { project } = await params;
  const slug = Array.isArray(project) ? project[0] : project;
  const projectData = data[slug];

  if (!projectData) {
    return { title: `Project Not Found | ${name}`, robots: { index: false, follow: true } };
  }

  const meta = projects.find((p) => p.slug === slug);
  const kind = projectData.game ? "game" : "project";
  const tech = meta?.technologies ?? [];

  // Lead the description with the project's own summary, then name the stack,
  // which is what most "<tech> game project" style searches match on.
  const description = tech.length
    ? `${projectData.desc.slice(0, 200)} Built with ${tech.join(", ")}.`
    : projectData.desc.slice(0, 260);

  return {
    title: `${projectData.title} | ${name}`,
    description,
    keywords: projectKeywords(slug),
    alternates: { canonical: `/projects/${slug}` },
    // No `images` here on purpose: opengraph-image.tsx in this folder generates
    // a per-project card, and an explicit images array would override it.
    openGraph: {
      type: "website",
      title: `${projectData.title} - a ${kind} by ${name}`,
      description,
      url: `/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectData.title} - a ${kind} by ${name}`,
      description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ project: string }> }) {
  const { project } = await params;
  const slug = Array.isArray(project) ? project[0] : project;
  return <ProjectIdPage url={slug} />;
}
