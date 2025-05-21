"use client";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectsCardProps {
  title: string;
  desp: string;
  img: string;
}

const ProjectsCard = ({ desp, img, title }: ProjectsCardProps) => {
  const router = useRouter();

  function handleRoute() {
    router.push(`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`);
  }

  return (
    <motion.button
      onClick={handleRoute}
      className={cn(
        `relative flex justify-center items-start gap-4 border-2 p-4 rounded-4xl shadow-2xl transition min-h-60 max-md:flex-col max-md:items-start group hover:border-shaad-600 border-shaad-100 cursor-pointer`
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
            `absolute bottom-6 right-6 transition group-hover:text-shaad-600 text-shaad-100`
          )}
        >
          <ArrowRight size={30} />
        </Link>
      </div>
    </motion.button>
  );
};

export default ProjectsCard;
