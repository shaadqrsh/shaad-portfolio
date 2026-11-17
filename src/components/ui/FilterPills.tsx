"use client";
import { cn } from "@/lib/utils";
import { useSlidingPill } from "./useSlidingPill";

export interface PillOption<K extends string> {
  key: K;
  label: string;
  /** Shown faded after the label, e.g. how many items the filter keeps. */
  count?: number;
}

/**
 * A row of options with the navbar's sliding red pill behind the one picked.
 * Inactive options hover like navbar links: red tint, red text. `tabs` makes
 * it a tab list (role="tab", aria-selected) for switching views; otherwise
 * it's a group of toggle buttons for filtering.
 */
const FilterPills = <K extends string>({
  label,
  options,
  value,
  onChange,
  tabs,
}: {
  label: string;
  options: PillOption<K>[];
  value: K;
  onChange: (key: K) => void;
  tabs?: boolean;
}) => {
  const { listRef, pillRef } = useSlidingPill<HTMLDivElement>(value);
  return (
    <div ref={listRef} role={tabs ? "tablist" : "group"} aria-label={label} className="group relative flex gap-1 rounded-full bg-shaad-300 p-1">
      <span
        ref={pillRef}
        aria-hidden
        className="absolute top-1 bottom-1 left-0 rounded-full bg-shaad-600 opacity-0 shadow-md group-data-[ready]:opacity-100"
      />
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            data-pill-key={o.key}
            {...(tabs ? { role: "tab", "aria-selected": on } : { "aria-pressed": on })}
            onClick={() => onChange(o.key)}
            className={cn(
              "relative cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 max-sm:px-3 max-sm:text-[13px]",
              on ? "text-white" : "text-shaad-ink-2 hover:bg-shaad-tint hover:text-shaad-500"
            )}
          >
            {on && <span aria-hidden className="absolute inset-0 rounded-full bg-shaad-600 shadow-md group-data-[ready]:hidden" />}
            <span className="relative">
              {o.label}
              {o.count != null && <span className="ml-1.5 tabular-nums opacity-75">{o.count}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterPills;
