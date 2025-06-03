// "use client";
// import { useEffect, useState } from "react";

// import { ChevronDown, Loader2 } from "lucide-react";
// import { motion } from "motion/react";
// import { useParams, useRouter } from "next/navigation";

// import { Parallax } from "react-scroll-parallax";

// import Title from "@/components/Title";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { data } from "@/lib/projectId";
// import { cn } from "@/lib/utils";
// import { projectData } from "@/types";
// import { Metadata } from "next";

// const ProjectIdPage = () => {
//   const [project, setProject] = useState<projectData | null>(null);
//   const [loading, setLoading] = useState(false);

//   const params = useParams();
//   const router = useRouter();

//   const url = Array.isArray(params.project)
//     ? params.project[0]
//     : params.project;

//   useEffect(() => {
//     setLoading(true);
//     if (url && typeof url === "string" && url in data) {
//       setProject(data[url]);
//     } else {
//       router.replace("/projects");
//     }
//     setLoading(false);
//   }, [url, router]);

//   if (loading || !project) {
//     return (
//       <div className="flex flex-1 justify-center items-center h-full">
//         <Loader2 className="animate-spin text-white w-12 h-12" />
//       </div>
//     );
//   }

//   export async function generateMetadata({ params }): Promise<Metadata> {
//     const projectSlug = Array.isArray(params.project)
//       ? params.project[0]
//       : params.project;

//     const project = data[projectSlug];

//     if (!project) {
//       return {
//         title: "Project Not Found | Shaad Qureshi",
//       };
//     }

//     return {
//       title: `${project.title} | Shaad Qureshi`,
//     };
//   }

//   return (
//     <>

//     </>
//   );
// };

// export default ProjectIdPage;

import { data } from "@/lib/projectId";
import { Metadata } from "next";
import ProjectIdPage from "./ProjectIdPage";

export async function generateMetadata({
  params,
}: {
  params: { project: string };
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

export default function Page({ params }: { params: { project: string } }) {
  const slug = Array.isArray(params.project)
    ? params.project[0]
    : params.project;
  return <ProjectIdPage url={slug} />;
}
