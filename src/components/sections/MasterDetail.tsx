"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";
import { cardClass } from "../ui/Card";
import { labelClass } from "../ui/Meta";

export interface MasterItem {
  key: string;
  logo: ReactNode;
  title: string;
  /** Left of the second line: a company, or a jam's result. */
  sub: ReactNode;
  /** Right of the second line, in the small uppercase label style: years or a date. */
  side: string;
}

interface MasterDetailProps {
  label: string;
  items: MasterItem[];
  selected: number;
  onSelect: (i: number) => void;
  detail: ReactNode;
}

/**
 * A list on the left and the selected item on the right, so the section stays
 * the same height however many items there are. On phones the list becomes a
 * row that scrolls sideways above the detail. The selected item is solid red,
 * like the navbar pill.
 */
const MasterDetail = ({ label, items, selected, onSelect, detail }: MasterDetailProps) => {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-[340px_minmax(0,1fr)] items-start gap-5 max-[1150px]:grid-cols-[280px_minmax(0,1fr)] max-[900px]:grid-cols-1">
      {/* The padding gives the hover shadow room inside the scroll area. */}
      <div
        role="tablist"
        aria-label={label}
        className="-m-3 flex max-h-[540px] flex-col gap-2 overflow-y-auto p-3 max-[900px]:max-h-none max-[900px]:flex-row max-[900px]:overflow-x-auto max-[900px]:overflow-y-hidden max-[900px]:pb-4"
      >
        {items.map((item, i) => {
          const on = i === selected;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onSelect(i)}
              className={cn(
                "group grid shrink-0 cursor-pointer grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl px-3 py-2.5 text-left shadow-md max-[900px]:w-[270px]",
                // The background and every text color inside change together, on one
                // curve that starts moving at once. Text used to switch instantly while
                // the background faded, so the old item showed red text on red for a few frames.
                "transition-[background-color,box-shadow] duration-200 ease-out [&_*]:transition-colors [&_*]:duration-200 [&_*]:ease-out",
                on ? "bg-shaad-fill" : "bg-shaad-300 hover:bg-shaad-tint hover:shadow-xl"
              )}
            >
              {item.logo}
              <span className="flex min-w-0 flex-col gap-1">
                <strong className={cn("leading-tight font-semibold text-white", !on && "group-hover:text-shaad-500")}>{item.title}</strong>
                <span className="flex items-baseline justify-between gap-3">
                  <span className={cn("min-w-0 truncate text-sm", on ? "text-white [&_.result]:text-white" : "text-shaad-ink-2")}>{item.sub}</span>
                  <span className={cn(labelClass, "shrink-0 text-[11.5px] whitespace-nowrap", on && "text-white")}>{item.side}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className={cn(cardClass, "min-h-full p-6 max-sm:p-5")}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={items[selected]?.key}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {detail}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/** Bullet points with thin lines between them, as on the project page. */
export const PointList = ({ points }: { points: string[] }) => (
  <ul className="max-w-[75ch] divide-y divide-white/10">
    {points.map((p) => (
      <li
        key={p}
        className="relative py-3 pl-[22px] leading-[1.6] text-shaad-ink-2 before:absolute before:top-[calc(0.75rem+0.62em)] before:left-0.5 before:size-2 before:rounded-full before:bg-shaad-500 before:content-[''] first:pt-0.5 first:before:top-[calc(0.125rem+0.62em)] last:pb-0 max-sm:text-[15.5px] max-sm:leading-[1.7]"
      >
        {p}
      </li>
    ))}
  </ul>
);

export default MasterDetail;
