"use client";
import Button from "@/components/ui/button";
import { linkIcon } from "@/components/projects/LinkIcon";
import { projectImg } from "@/lib/images";
import { projectData } from "@/types";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

interface ProjectHeroProps {
  project: projectData;
  url: string;
  /** The project's one-line summary from resume_data.json. */
  summary?: string;
  onCoverLoad?: () => void;
  enableAnimation?: boolean;
}

/** Cover image with a centered title card; the project icon sits over the card's top edge. */
const ProjectHero = ({ project, url, summary, onCoverLoad, enableAnimation = true }: ProjectHeroProps) => {
  const reduce = useReducedMotion();
  return (
  <header className="relative flex min-h-[clamp(380px,58vh,600px)] w-full items-center justify-center overflow-hidden max-sm:min-h-[300px]">
    <Image
      src={projectImg(url, "cover")}
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover"
      onLoad={onCoverLoad}
    />
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_30%,rgb(24_20_41/0.8)_72%,var(--color-shaad-400))]"
    />

    <div className="relative flex w-full justify-center px-4 pb-10 pt-[84px] max-sm:pb-5 max-sm:pt-[72px]">
      {/* The card is the animated element itself. Fading a wrapper around it
          would stop its backdrop blur until the fade ended, so the card would
          look see-through and then suddenly frosted. */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce || enableAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex w-full max-w-[720px] flex-col items-center gap-3.5 rounded-3xl bg-shaad-350 px-8 pb-7 pt-[60px] text-center shadow-2xl backdrop-blur-md max-sm:gap-2.5 max-sm:rounded-[20px] max-sm:px-5 max-sm:pb-5 max-sm:pt-12"
      >
          <Image
            src={projectImg(url, "icon")}
            alt=""
            width={176}
            height={176}
            className="absolute -top-11 left-1/2 size-[88px] -translate-x-1/2 rounded-3xl bg-shaad-300 object-cover shadow-md max-sm:-top-9 max-sm:size-[72px] max-sm:rounded-[20px]"
          />
          <h1 className="text-balance font-display text-[46px] font-bold leading-[1.06] tracking-[-0.02em] text-white max-sm:text-[28px]">
            {project.title}
          </h1>
          {summary && (
            <p className="max-w-[62ch] text-[17px] leading-[1.6] text-shaad-ink max-sm:text-[15.5px] max-sm:leading-[1.65]">
              {summary}
            </p>
          )}
          {project.urls.length > 0 && (
            <div className="mt-1 flex w-full flex-wrap justify-center gap-2.5">
              {project.urls.map((u, idx) => {
                const { before, after } = linkIcon(u);
                return (
                  <Button
                    key={u.url}
                    href={u.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={idx === 0 ? "default" : "tinted"}
                    className="group font-semibold max-sm:flex-auto max-sm:px-4 max-sm:py-2.5"
                  >
                    {before}
                    {u.label}
                    {after}
                  </Button>
                );
              })}
            </div>
          )}
      </motion.div>
    </div>
  </header>
  );
};

export default ProjectHero;
