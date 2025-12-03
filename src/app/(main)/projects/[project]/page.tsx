import { data } from "@/lib/projectId";
import { name } from "@/lib/Data";
import { Metadata } from "next";
import ProjectIdPage from "./ProjectIdPage";

// @ts-expect-error type any
export async function generateMetadata({ params }): Promise<Metadata> {
  const slug = Array.isArray(params.project)
    ? params.project[0]
    : params.project;
  const project = data[slug];

  if (!project) {
    return { title: `Project Not Found | ${name}` };
  }

  return {
    title: `${project.title} | ${name}`,
    description: project.desc,
  };
}

// @ts-expect-error type any
export default function Page({ params }) {
  const slug = Array.isArray(params.project)
    ? params.project[0]
    : params.project;
  return <ProjectIdPage url={slug} />;
}
