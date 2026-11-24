import { projects } from "@/lib/agentProfile";
import { jsonLdHtml, projectBreadcrumbJsonLd } from "@/lib/jsonLd";
import { projectMeta } from "@/lib/pageMeta";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectIdPage from "./ProjectIdPage";

// Pre-renders every project page at build time so crawlers get real HTML
// instead of an on-demand render, and so each slug is in the static output.
export function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}

// No `dynamicParams = false`: with it, Next sends the root 404's HTML but the
// browser renders (main)/not-found.tsx inside the layout, and hydration fails.
// Unknown slugs go through notFound() in the page instead.


export async function generateMetadata({ params }: { params: Promise<{ project: string }> }): Promise<Metadata> {
  const { project } = await params;
  return projectMeta(Array.isArray(project) ? project[0] : project);
}

export default async function Page({ params }: { params: Promise<{ project: string }> }) {
  const { project } = await params;
  const slug = Array.isArray(project) ? project[0] : project;
  const meta = projects.find((p) => p.slug === slug);
  // Any other slug is a real 404, shown inside the site layout by
  // (main)/not-found.tsx, rather than an empty page that redirects.
  if (!meta) notFound();
  const title = meta.title;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(projectBreadcrumbJsonLd(slug, title)) }}
      />
      <ProjectIdPage url={slug} />
    </>
  );
}
