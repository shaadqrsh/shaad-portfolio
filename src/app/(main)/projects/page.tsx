"use client";
import Loader, { useSmartLoader } from "@/components/Loader";
import ProjectsCard from "@/components/ProjectsCard";
import projects from "@/lib/Projects";
import FadeInUp from "@/components/FadeInUp";
import { motion } from "motion/react";

import { useState, useEffect } from "react";

const Projects = () => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [cols, setCols] = useState(1);

  const isLoading = useSmartLoader({
    loadingDependencies: [loadedImages < projects.length],
  });

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const updateCols = () => {
      if (window.innerWidth >= 1024) {
        setCols(2);
      } else {
        setCols(1);
      }
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return (
    <>

      <Loader isLoading={isLoading} />
      <section className="min-3xl:container text-white h-full w-full flex flex-col justify-center p-6 max-md:pb-14">
        <motion.div className="grid grid-cols-2 justify-center items-center gap-6 max-lg:flex max-lg:flex-col">
          {projects.map((p, idx) => {
            const isLastOdd =
              projects.length % 2 !== 0 && idx === projects.length - 1;
            return (
              <FadeInUp
                delay={0.1 * (idx % cols)}
                key={idx}
                className={
                  isLastOdd
                    ? "col-span-2 justify-self-center w-full max-w-[calc(50%-0.75rem)] max-lg:max-w-full"
                    : ""
                }
                enableAnimation={!isLoading}
              >
                <ProjectsCard
                  title={p.title}
                  desc={p.desc}
                  url={p.url}
                  onLoad={handleImageLoad}
                />
              </FadeInUp>
            );
          })}
        </motion.div>
      </section>
    </>
  );
};

export default Projects;