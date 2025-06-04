import { data } from "@/lib/projectId";
import { Metadata } from "next";
import ProjectIdPage from "./ProjectIdPage";

export async function generateMetadata({
  params,
}: {
  params: { project: string | string[] };
}): Promise<Metadata> {
  const slug = Array.isArray(params.project)
    ? params.project[0]
    : params.project;
  const project = data[slug];

  if (!project) {
    return { title: "Project Not Found | Shaad Qureshi" };
  }

  return {
    title: `${project.title} | Shaad Qureshi`,
    description: project.desc,
  };
}

export default function Page({
  params,
}: {
  params: { project: string | string[] };
}) {
  const slug = Array.isArray(params.project)
    ? params.project[0]
    : params.project;
  return <ProjectIdPage url={slug} />;
}
