"use client";
import Title from "@/components/Title";
import { data } from "@/lib/projectId";
import { projectData } from "@/types";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectIdPage = () => {
  const [project, setProject] = useState<projectData | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const url = Array.isArray(params.project)
    ? params.project[0]
    : params.project;

  useEffect(() => {
    setLoading(true);
    if (url && typeof url === "string" && url in data) {
      setProject(data[url]);
    } else {
      router.back();
    }
    setLoading(false);
  }, [url, router]);

  if (loading) {
    return <Loader2 className="animate-spin text-white" />;
  }

  return (
    <section className="text-white h-full w-full flex flex-col justify-center items-center max-md:pb-16">
      {/* <motion.img
        src={`/project_${url}/cover.jpg`}
        className="pb-4"
      /> */}

      <section className="text-white h-full w-full flex flex-col justify-center p-6 items-center">
        <motion.div className="grid grid-cols-2 justify-between items-start gap-4">
          <div className="p-4 border border-shaad-100 rounded-lg flex flex-col items-start">
            <Title classN="mb-0">Des</Title>
            <p className=" lg:text-base text-sm">{project?.desc}</p>

            <Title classN="mb-0 mt-4">Features</Title>
            {project?.features.map((f, idx) => (
              <div
                className="flex flex-col items-start"
                key={idx.toString()}
              >
                <h2 className="font-semibold mt-2">-{f.heading}</h2>
                <h3>{f.content}</h3>
              </div>
            ))}
          </div>

          <div className="p-4 border border-shaad-100 rounded-lg flex flex-col items-start">
            <Title classN="mb-0">Technology Used</Title>
            <div className="flex flex-wrap items-center gap-4">
              {project?.technologies.map((t, idx) => (
                <div
                  key={idx.toString()}
                  className="p-2 bg-shaad-600 mt-2 rounded-lg"
                >
                  <p>{t}</p>
                </div>
              ))}
            </div>

            <Title classN="mt-6 mb-2">Key Responsibilities</Title>
            {project?.responsibilities.map((r, idx) => (
              <div key={idx.toString()}>
                <p className="lg:text-base text-sm font-semibold">-{r} </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </section>
  );
};

export default ProjectIdPage;
