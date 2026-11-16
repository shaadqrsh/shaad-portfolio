"use client";
import DynamicIcon from "@/components/DynamicIcon";
import { TransitionLink } from "@/components/PageTransition";
import { cardClass, tintHoverClass, tintTitleClass } from "@/components/ui/Card";
import Meta from "@/components/ui/Meta";
import { formatDate } from "@/lib/dates";
import { projectImg } from "@/lib/images";
import { data } from "@/lib/projectId";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectsCardProps {
  title: string;
  desc: string;
  url: string;
  date: string;
  onLoad?: () => void;
  priority?: boolean;
}

const MAX_ICONS = 5;

/**
 * A project as a card: the whole cover in a 4:3 frame (a blurred copy fills
 * any gap, so square and wide covers are never cropped), a three-line summary,
 * the release date and its tech icons. The whole card opens the project.
 */
const ProjectsCard = ({ title, desc, url, date, onLoad, priority }: ProjectsCardProps) => {
  const cover = projectImg(url, "icon");
  const tech = data[url]?.technologies ?? [];
  const withIcons = tech.filter((t) => t.icon);
  const shown = withIcons.slice(0, MAX_ICONS);
  const rest = tech.length - shown.length;

  return (
    <TransitionLink
      href={`/projects/${url}`}
      className={cn(cardClass, tintHoverClass, "group flex h-full flex-col gap-3.5 p-3 text-white")}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-shaad-300">
        <Image src={cover} alt="" fill aria-hidden sizes="(max-width: 640px) 100vw, (max-width: 1150px) 50vw, 33vw" className="scale-125 object-cover blur-[22px] brightness-[0.55]" />
        <Image
          src={cover}
          alt={`${title} cover`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1150px) 50vw, 33vw"
          className="object-contain"
          onLoad={onLoad}
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1.5">
        <h3 className={cn(tintTitleClass, "font-display text-[21px] leading-tight font-bold")}>{title}</h3>
        <p className="line-clamp-3 text-[15px] leading-[1.6] text-shaad-ink-2">{desc}</p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/10 px-1.5 pt-2.5 pb-1">
        <Meta items={[["Released", formatDate(date)]]} />
        {tech.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {shown.map((t) => (
              <span key={t.name} title={t.name} className="grid size-[30px] place-items-center rounded-lg bg-shaad-200">
                <DynamicIcon name={t.icon} className="size-[18px] text-white" />
                <span className="sr-only">{t.name}</span>
              </span>
            ))}
            {rest > 0 && (
              <span
                title={tech.slice(MAX_ICONS).map((t) => t.name).join(", ")}
                className="grid h-[30px] place-items-center rounded-lg bg-shaad-200 px-2 text-xs font-semibold tabular-nums text-shaad-ink-2"
              >
                +{rest}
              </span>
            )}
          </div>
        )}
      </div>
    </TransitionLink>
  );
};

export default ProjectsCard;
