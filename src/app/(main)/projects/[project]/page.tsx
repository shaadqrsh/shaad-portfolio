import { data } from "@/lib/projectId";
import { name } from "@/lib/Data";
import { Metadata } from "next";
import ProjectIdPage from "./ProjectIdPage";

export async function generateMetadata({ params }: { params: Promise<{ project: string }> }): Promise<Metadata> {
  const { project } = await params;
  const slug = Array.isArray(project) ? project[0] : project;
  const projectData = data[slug];

  if (!projectData) {
    return { title: `Project Not Found | ${name}` };
  }

  return {
    title: `${projectData.title} | ${name}`,
    description: projectData.desc,
  };
}

export default async function Page({ params }: { params: Promise<{ project: string }> }) {
  const { project } = await params;
  const slug = Array.isArray(project) ? project[0] : project;
  return <ProjectIdPage url={slug} />;
}
