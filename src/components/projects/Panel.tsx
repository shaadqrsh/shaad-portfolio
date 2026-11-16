"use client";
import Title from "@/components/Title";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { useAppear } from "./Appear";

interface PanelProps {
  title: string;
  /** Sits opposite the title, e.g. tabs or a count. */
  head?: ReactNode;
  children: ReactNode;
  className?: string;
  as?: "section" | "aside";
}

/** The rounded bg-shaad-200 panel every section of the project page sits in. Fades up into view. */
export const Panel = ({ title, head, children, className, as = "section" }: PanelProps) => {
  const Tag = as === "aside" ? motion.aside : motion.section;
  return (
    <Tag
      {...useAppear()}
      className={cn(
        "min-w-0 rounded-4xl bg-shaad-200 p-8 text-white shadow-2xl max-sm:rounded-3xl max-sm:p-5",
        className
      )}
    >
      <div className="mb-[18px] flex flex-wrap items-center justify-between gap-x-4 gap-y-3 max-sm:mb-3.5">
        <Title classN="pb-0 font-display text-[34px] md:text-[34px] lg:text-[34px] leading-tight tracking-[-0.01em] max-sm:text-[26px]">
          {title}
        </Title>
        {head}
      </div>
      {children}
    </Tag>
  );
};

/** Small uppercase label in Plex Mono, used above values and lists. */
export const Label = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h3
    className={cn(
      "font-label text-xs font-medium uppercase tracking-[0.06em] text-shaad-ink-3",
      className
    )}
  >
    {children}
  </h3>
);
