"use client";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProjectsCardProps {
  title: string;
  desc: string;
  url: string;
  onLoad?: () => void;
}

const ProjectsCard = ({ desc, url, title, onLoad }: ProjectsCardProps) => {
  const router = useRouter();

  function handleRoute() {
    router.push(`/projects/${url}`);
  }

  return (
    <motion.button
      onClick={handleRoute}
      className={cn(
        `relative flex justify-center items-start gap-4 p-4 rounded-4xl transition min-h-60 max-md:flex-col group hover:shadow-[0_0_20px_var(--color-shaad-600)] cursor-pointer max-md:items-center max-md:justify-center bg-shaad-300 shadow-2xl w-full`
      )}
    >
      <div className="w-[300px] max-md:w-full flex-shrink-0 relative aspect-[6/5]">
        <Image
          src={`/project_${url}/icon.png`}
          alt={title}
          fill
          className="object-cover rounded-xl"
          onLoad={onLoad}
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>

      <div className="flex flex-col justify-start items-start gap-3">
        <h1 className="text-shaad-600 text-2xl text-left font-semibold tracking-wide">
          {title}
        </h1>

        <p className="line-clamp-6 max-lg:line-clamp-4 max-sm:line-clamp-3 text-left mb-12">
          {desc}
        </p>

        <Link
          href={`/projects/${url}`}
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
