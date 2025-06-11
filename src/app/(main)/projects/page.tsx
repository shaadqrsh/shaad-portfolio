"use client";
import ProjectsCard from "@/components/ProjectsCard";
import projects from "@/lib/Projects";
import { motion } from "motion/react";

const Projects = () => {
  return (
    <>
      <head>
        <title>Projects | Shaad Qureshi</title>
      </head>
      <section className="min-3xl:container text-white h-full w-full flex flex-col justify-center p-6 max-md:pb-14">
        <motion.div className="grid grid-cols-2 justify-center items-center gap-6 max-lg:flex max-lg:flex-col">
          {projects.map((p, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 * idx }}
              key={idx}
            >
              <ProjectsCard
                title={p.title}
                desc={p.desc}
                url={p.url}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default Projects;