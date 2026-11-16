"use client";
import { useAppear } from "@/components/projects/Appear";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  /** Shown in a small pill beside the title, e.g. how many roles there are. */
  count?: number;
  /** Sits at the far end of the heading row, e.g. filters or a link. */
  head?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Count pill shown beside section titles. */
export const countClass =
  "rounded-full bg-shaad-300 px-2.5 py-0.5 font-label text-[13px] font-medium tabular-nums text-shaad-ink-3";

/**
 * The rounded bg-shaad-200 panel each section sits in, with the same title
 * style as the project page's panels. Fades up when it scrolls into view.
 */
const Section = ({ title, count, head, children, className }: SectionProps) => (
  <motion.section
    {...useAppear()}
    className={cn("min-w-0 rounded-4xl bg-shaad-200 p-8 text-white shadow-2xl max-sm:rounded-3xl max-sm:p-5", className)}
  >
    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-3 max-sm:mb-4">
      <h2 className="font-display text-[34px] leading-tight font-bold tracking-[-0.01em] text-shaad-600 max-sm:text-[26px]">
        {title}
      </h2>
      {count != null && <span className={countClass}>{count}</span>}
      {head && <div className="ml-auto max-sm:ml-0">{head}</div>}
    </div>
    {children}
  </motion.section>
);

export default Section;
