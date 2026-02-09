"use client";
import FadeInUp from "@/components/FadeInUp";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectIdPageProps } from "@/types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";
import DateDisplay from "../DateDisplay";

interface CoverImgProps extends ProjectIdPageProps {
  onLoad?: () => void;
  enableAnimation?: boolean;
}

const CoverImg = ({ project, url, onLoad, enableAnimation = true }: CoverImgProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <Image
        src={`/project_${url}/cover.png`}
        alt={`${project?.title || url} cover`}
        fill
        className="object-cover object-center blur-xs"
        onLoad={onLoad}
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/40" />

      <FadeInUp
        enableAnimation={enableAnimation}
        duration={0.5}
        className="relative z-10 p-14 mx-6 rounded-xl bg-shaad-350 flex flex-col justify-center items-center shadow-2xl hover:shadow-[0_0_40px_var(--color-shaad-600)] transition-shadow duration-300"
      >
        <FadeInUp>
          <h2 className="text-4xl text-white font-bold text-center">
            {project.title}
          </h2>
        </FadeInUp>

        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="px-6 py-3 mt-8 font-semibold">
              <ChevronDown
                size={20}
                className={cn("transition-transform duration-300", isOpen && "rotate-180")}
              />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-shaad-600 border-shaad-600 text-white">
            {project.urls.map((u, idx) => (
              <a
                key={idx}
                href={u.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DropdownMenuItem className="cursor-pointer">
                  {u.label}
                </DropdownMenuItem>
              </a>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>


        <FadeInUp delay={0.2}>
          <h2 className="text-xl mt-6 text-white font-bold text-center">
            Released: <DateDisplay date={project.date} />
          </h2>
        </FadeInUp>
      </FadeInUp>
    </div>
  );
};

export default CoverImg;
