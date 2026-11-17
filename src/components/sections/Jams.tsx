"use client";
import { TransitionLink } from "@/components/PageTransition";
import { buttonVariants } from "@/components/ui/button";
import { cardArrowClass } from "@/components/ui/Card";
import FilterPills from "@/components/ui/FilterPills";
import Logo from "@/components/ui/Logo";
import Meta from "@/components/ui/Meta";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { dateKey, formatDate } from "@/lib/dates";
import { Jam, Jams as jamsData } from "@/lib/Jams";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Trophy } from "lucide-react";
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

/** All / Game Jams / Hackathons, with the navbar's sliding pill. */
const Switcher = ({ value, onChange }: { value: FilterKey; onChange: (k: FilterKey) => void }) => (
  <FilterPills
    label="Filter events"
    options={FILTERS.map((f) => ({ key: f.key, label: f.label, count: all.filter(f.test).length }))}
    value={value}
    onChange={onChange}
  />
);

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
