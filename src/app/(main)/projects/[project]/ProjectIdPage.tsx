"use client";
import Loader, { isImageCached, markImageCached, useSmartLoader } from "@/components/Loader";
import CoverImg from "@/components/projects/CoverImg";
import Screenshots from "@/components/projects/Screenshots";
import TechAndFeatures from "@/components/projects/TechAndFeatures";
import VidsNInfo from "@/components/projects/VidsNInfo";
import { data } from "@/lib/projectId";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";

const ProjectIdPage = ({ url }: { url: string }) => {
  const coverSrc = `/project_${url}/cover.png`;
  const project = url in data ? data[url] : null;
  const [imageLoaded, setImageLoaded] = useState(() => isImageCached(coverSrc));
  const router = useRouter();

  useLayoutEffect(() => {
    const prev = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => { history.scrollRestoration = prev; };
  }, []);

  useEffect(() => {
    if (!project) router.replace("/projects");
  }, [project, router]);

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
            onLoad={() => { markImageCached(coverSrc); setImageLoaded(true); }}
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
