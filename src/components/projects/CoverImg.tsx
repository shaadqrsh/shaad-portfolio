import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectIdPageProps } from "@/types";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import Reveal from "../Reveal";

const CoverImg = ({ project, url }: ProjectIdPageProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.img
        src={`/project_${url}/cover.jpg`}
        alt={`${project?.title || url} cover`}
        className="absolute inset-0 w-full h-full object-cover object-center blur-xs"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 p-8 border-[3px] border-shaad-600 rounded-xl bg-black/60 flex flex-col justify-center items-center">
        <Reveal x={-150}>
          <h2 className="text-4xl text-white font-bold text-center">
            {project.title}
          </h2>
        </Reveal>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-x-2 justify-center items-center p-2 rounded-lg bg-shaad-600 text-white mt-8">
            Download
            <ChevronDown size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-shaad-600 border-shaad-500 text-white">
            {project.urls.map((u, idx) => (
              <a
                key={idx}
                href={u.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DropdownMenuItem className="bg-shaad-600 cursor-pointer hover:bg-shaad-500 transition">
                  {u.label}
                </DropdownMenuItem>
              </a>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Reveal x={-150}>
          <h2 className="text-xl mt-6 text-white font-bold text-center">
            Released: {project.year}
          </h2>
        </Reveal>
      </div>
    </div>
  );
};

export default CoverImg;
