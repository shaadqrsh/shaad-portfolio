"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

interface ProjectsCardProps {
  title: string;
  desp: string;
  img: string;
}

const ProjectsCard = ({ desp, img, title }: ProjectsCardProps) => {
  return (
    <motion.div className="relative flex justify-center items-start gap-4 border-shaad-100 border-2 p-4 rounded-4xl shadow-2xl">
      <motion.img
        src={img}
        className="w-[300px] h-[200px] rounded-xl"
      />

      <div className="flex flex-col justify-start items-start gap-3">
        <h1 className="text-shaad-600 text-2xl font-semibold tracking-wide">
          {title}
        </h1>
        <p className="text-lg">{desp}</p>
        <Link
          href={`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="absolute bottom-6 right-6 text-shaad-100 transition"
        >
          <ArrowRight size={30} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectsCard;
