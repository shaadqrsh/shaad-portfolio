"use client";
import { data } from "@/lib/projectId";
import { projectData } from "@/types";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectIdPage = () => {
  const [project, setProject] = useState<projectData | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = Array.isArray(params.project)
    ? params.project[0]
    : params.project;

  useEffect(() => {
    setLoading(true);
    if (title && typeof title === "string" && title in data) {
      setProject(data[title]);
    } else {
      router.back();
    }
    setLoading(false);
  }, [title, router]);

  if (loading) {
    return <Loader2 className="animate-spin text-white" />;
  }

  return (
    <section className="text-white h-full w-full flex flex-col justify-center items-center p-6 max-md:pb-16">
      <div className="grid grid-cols-2 justify-between items-center gap-4">
        <div className="p-2 border border-shaad-100 rounded-lg flex flex-col items-start">
          <h1 className="text-shaad-600">Description</h1>
          <p>{project?.desc}</p>
          <h1 className="text-shaad-600 mt-4">Features</h1>
          {project?.features.map((f, idx) => (
            <div
              className="flex flex-col items-start"
              key={idx.toString()}
            >
              <h2>-{f.heading}</h2>
              <h3>{f.content}</h3>
            </div>
          ))}
        </div>

        <div className="p-2 border border-shaad-100 rounded-lg flex flex-col items-start">
          <h1 className="text-shaad-600 font-bold">Technology Used</h1>
          <p>desp</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectIdPage;
