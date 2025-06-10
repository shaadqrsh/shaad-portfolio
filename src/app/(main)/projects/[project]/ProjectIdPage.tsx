"use client";
import CoverImg from "@/components/projects/CoverImg";
import Screenshots from "@/components/projects/Screenshots";
import TechAndFeatures from "@/components/projects/TechAndFeatures";
import VidsNInfo from "@/components/projects/VidsNInfo";
import { data } from "@/lib/projectId";
import { projectData } from "@/types";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";

const ProjectIdPage = ({ url }: { url: string }) => {
  const [project, setProject] = useState<projectData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (url && url in data) {
      setProject(data[url]);
    } else {
      router.replace("/projects");
    }
    setLoading(false);
  }, [url, router]);

  if (loading || !project) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-white w-12 h-12" />
      </div>
    );
  }

  return (
    <section className="min-3xl:container">
      <Parallax
        speed={-50}
        className={`h-[75vh] w-full mt-[-10vh]`}
      >
        <CoverImg
          project={project}
          url={url}
        />
      </Parallax>

      <motion.section
        className={`text-white flex flex-col justify-center p-6 items-center rounded-t-2xl bg-shaad-400 relative z-10 mt-[5vh]`}
      >
        <TechAndFeatures project={project} />

        <Screenshots
          project={project}
          url={url}
        />

        <VidsNInfo project={project} />
      </motion.section>
    </section>
  );
};

export default ProjectIdPage;
