import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * A small status tag ("Current", "Game Jam"), styled like the tech chips:
 * a dark tile with a red dot.
 */
const Tag = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-shaad-200 px-2.5 py-1 text-[13px] font-medium leading-none text-white before:size-1.5 before:rounded-full before:bg-shaad-500 before:content-['']",
      className
    )}
  >
    {children}
  </span>
);

export default Tag;
