"use client";
import Loader, { useSmartLoader } from "@/components/Loader";
import CoverImg from "@/components/projects/CoverImg";
import Screenshots from "@/components/projects/Screenshots";
import TechAndFeatures from "@/components/projects/TechAndFeatures";
import VidsNInfo from "@/components/projects/VidsNInfo";
import { data } from "@/lib/projectId";
import { projectData } from "@/types";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";

const ProjectIdPage = ({ url }: { url: string }) => {
  const [project, setProject] = useState<projectData | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (url && url in data) {
      setProject(data[url]);
    } else {
      router.replace("/projects");
    }
  }, [url, router]);
  const isLoading = useSmartLoader({
    loadingDependencies: [!project, !imageLoaded],
  });

  return (
    <section className="min-3xl:container">
      <Loader isLoading={isLoading} />
      <Parallax
        speed={-50}
        className={`h-[75vh] w-full mt-[-10vh]`}
      >
        {project && (
          <CoverImg
            project={project}
            url={url}
            onLoad={() => setImageLoaded(true)}
            enableAnimation={!isLoading}
          />
        )}
      </Parallax>

      <motion.section
        className={`text-white flex flex-col justify-center p-6 items-center rounded-t-2xl bg-shaad-400 relative z-10 mt-[5vh]`}
      >
        {project && <TechAndFeatures project={project} enableAnimation={!isLoading} />}

        {project && (
          <Screenshots
            project={project}
            url={url}
          />
        )}

        {project && <VidsNInfo project={project} enableAnimation={!isLoading} />}
      </motion.section>
    </section>
  );
};

export default ProjectIdPage;
