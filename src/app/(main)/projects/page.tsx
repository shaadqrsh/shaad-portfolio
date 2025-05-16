"use client";
import ProjectsCard from "@/components/ProjectsCard";
import projects from "@/lib/Projects";
import { motion } from "motion/react";

const Projects = () => {
  return (
    <section className="text-white h-full w-full flex flex-col justify-center p-6 max-md:pb-16">
      <motion.div className="grid grid-cols-2 justify-center items-center gap-6">
        {projects.map((p, idx) => (
          <ProjectsCard
            title={p.title}
            desp={p.desp}
            img={p.img}
            key={idx}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
