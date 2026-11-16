import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/** Small uppercase label in Plex Mono, the same as the project page's labels. */
export const labelClass = "font-label text-xs font-medium uppercase tracking-[0.06em] text-shaad-ink-3";

export const Label = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn(labelClass, className)}>{children}</p>
);

type Item = [label: string, value: ReactNode];

/**
 * Facts as labelled pairs, each label above its value. The site never joins
 * facts with dots ("Game · Aug 2026"); this is what it uses instead. Items with
 * an empty value are skipped.
 */
const Meta = ({ items, column, className }: { items: (Item | false | null | undefined)[]; column?: boolean; className?: string }) => (
  <dl className={cn("flex flex-wrap gap-x-7 gap-y-2.5", column && "flex-col gap-y-3", className)}>
    {items
      .filter((i): i is Item => !!i && i[1] !== "" && i[1] != null)
      .map(([label, value]) => (
        <div key={label} className="flex min-w-0 flex-col gap-0.5">
          <dt className={labelClass}>{label}</dt>
          <dd className="font-medium tabular-nums text-white">{value}</dd>
        </div>
      ))}
  </dl>
);

export default Meta;
