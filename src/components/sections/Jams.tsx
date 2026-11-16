"use client";
import { TransitionLink } from "@/components/PageTransition";
import { buttonVariants } from "@/components/ui/button";
import { cardArrowClass } from "@/components/ui/Card";
import Logo from "@/components/ui/Logo";
import Meta from "@/components/ui/Meta";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { dateKey, formatDate } from "@/lib/dates";
import { Jam, Jams as jamsData } from "@/lib/Jams";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Trophy } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import MasterDetail, { PointList } from "./MasterDetail";

const all = [...jamsData].sort((a, b) => dateKey(b.date) - dateKey(a.date));

// Short labels so the switcher fits on one line on phones.
const FILTERS = [
  { key: "all", label: "All", test: () => true },
  { key: "jam", label: "Game Jams", test: (j: Jam) => j.kind === "Game Jam" },
  { key: "hack", label: "Hackathons", test: (j: Jam) => j.kind !== "Game Jam" },
] as const;
type FilterKey = (typeof FILTERS)[number]["key"];

/** All / Game Jams / Hackathons, with a red pill that slides to the one you pick. */
const Switcher = ({ value, onChange }: { value: FilterKey; onChange: (k: FilterKey) => void }) => {
  const reduce = useReducedMotion();
  return (
    <div role="group" aria-label="Filter events" className="flex gap-1 rounded-full bg-shaad-300 p-1">
      {FILTERS.map((f) => {
        const on = f.key === value;
        return (
          <button
            key={f.key}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(f.key)}
            className={cn(
              "relative cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 max-sm:px-3 max-sm:text-[13px]",
              on ? "text-white" : "text-shaad-ink-2 hover:text-white"
            )}
          >
            {on && (
              <motion.span
                layoutId="jam-filter-pill"
                className="absolute inset-0 rounded-full bg-shaad-600 shadow-md"
                transition={reduce ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
            <span className="relative">
              {f.label}
              <span className="ml-1.5 tabular-nums opacity-75">{all.filter(f.test).length}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

const JamLink = ({ jam }: { jam: Jam }) => {
  // The site's secondary button, small, with the publications arrow.
  const cls = cn(buttonVariants({ variant: "tinted", size: "sm" }), "group self-start font-semibold");
  const arrow = <ArrowUpRight className={cn(cardArrowClass, "size-4 text-current")} aria-hidden />;
  if (jam.project)
    return (
      <TransitionLink href={`/projects/${jam.project}`} className={cls}>
        View project {arrow}
      </TransitionLink>
    );
  if (jam.url)
    return (
      <a href={jam.url} target="_blank" rel="noopener noreferrer" className={cls}>
        Visit {arrow}
      </a>
    );
  return null;
};

/** Jams and hackathons, newest first, filterable by type. */
const Jams = () => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState(0);
  const list = all.filter(FILTERS.find((f) => f.key === filter)!.test);
  const jam = list[Math.min(selected, list.length - 1)];

  if (all.length === 0) return null;

  return (
    <Section
      title="Game Jams & Hackathons"
      count={all.length}
      head={
        <Switcher
          value={filter}
          onChange={(k) => {
            setFilter(k);
            setSelected(0);
          }}
        />
      }
    >
      <MasterDetail
        label="Events"
        selected={Math.min(selected, list.length - 1)}
        onSelect={setSelected}
        items={list.map((j) => ({
          key: `${j.title}-${j.date}`,
          logo: <Logo src={j.icon} alt={j.title} size="sm" fallback={<Trophy />} />,
          title: j.title,
          sub: j.result ? <span className="result font-semibold text-shaad-500">{j.result}</span> : j.kind,
          side: formatDate(j.date),
        }))}
        detail={
          <>
            <div className="flex items-center gap-4">
              <Logo src={jam.icon} alt={jam.title} size="lg" fallback={<Trophy />} />
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="font-display text-xl leading-tight font-bold">{jam.title}</h3>
                <Tag>{jam.kind}</Tag>
              </div>
            </div>
            <Meta
              items={[
                ["Date", formatDate(jam.date)],
                ["Result", jam.result && <span className="text-shaad-500">{jam.result}</span>],
              ]}
            />
            <PointList points={jam.bullets} />
            <JamLink jam={jam} />
          </>
        }
      />
    </Section>
  );
};

export default Jams;
