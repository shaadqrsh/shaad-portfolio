"use client";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

interface ProjectsCardProps {
  title: string;
  desp: string;
  img: string;
}

const ProjectsCard = ({ desp, img, title }: ProjectsCardProps) => {
  const [hoveringArrow, setHoveringArrow] = useState(false);

  return (
    <motion.div
      className={cn(
        `relative flex justify-center items-start gap-4 border-2 p-4 rounded-4xl shadow-2xl transition min-h-60 max-md:flex-col max-md:items-start`,
        hoveringArrow ? "border-shaad-600" : "border-shaad-100"
      )}
    >
      <motion.img
        src={img}
        className="w-[300px] h-[250px] rounded-xl"
      />

      <div className="flex flex-col justify-start items-start gap-3">
        <h1 className="text-shaad-600 text-2xl font-semibold tracking-wide">
          {title}
        </h1>

        <p className="line-clamp-6 max-lg:line-clamp-4 max-sm:line-clamp-2 text-left mb-12">
          {desp}
        </p>

        <Link
          href={`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            `absolute bottom-6 right-6 transition`,
            hoveringArrow ? "text-shaad-600" : "text-shaad-100"
          )}
          onMouseEnter={() => setHoveringArrow(true)}
          onMouseLeave={() => setHoveringArrow(false)}
        >
          <ArrowRight size={30} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectsCard;
