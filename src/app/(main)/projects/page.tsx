"use client";
import Loader, { isImageCached, markImageCached, useSmartLoader } from "@/components/Loader";
import { Appear, AppearReady, stagger } from "@/components/projects/Appear";
import ProjectsCard from "@/components/ProjectsCard";
import FilterPills from "@/components/ui/FilterPills";
import Section from "@/components/ui/Section";
import { dateKey } from "@/lib/dates";
import { projectImg } from "@/lib/images";
import { data } from "@/lib/projectId";
import projects from "@/lib/Projects";
import { useState } from "react";

/** Every project, newest first. Same-month projects keep their resume_data.json order. */
const newest = [...projects].sort((a, b) => dateKey(b.date) - dateKey(a.date));

// Games and everything else, told apart by each project's `game` flag in projectId.ts.
const isGame = (url: string) => Boolean(data[url]?.game);
const FILTERS = [
  { key: "all", label: "All", test: () => true },
  { key: "games", label: "Games", test: (url: string) => isGame(url) },
  { key: "other", label: "Other", test: (url: string) => !isGame(url) },
] as const;
type FilterKey = (typeof FILTERS)[number]["key"];
const OPTIONS = FILTERS.map((f) => ({ key: f.key, label: f.label, count: newest.filter((p) => f.test(p.url)).length }));

const Projects = () => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const shown = newest.filter((p) => FILTERS.find((f) => f.key === filter)!.test(p.url));
  const [loaded, setLoaded] = useState(() => new Set(projects.filter((p) => isImageCached(projectImg(p.url, "icon"))).map((p) => p.url)));

  // Wait for the first row of covers before lifting the first-visit loader.
  // Covers further down load lazily as you scroll.
  const waiting = newest.slice(0, 3).some((p) => !loaded.has(p.url));
  const isLoading = useSmartLoader({ loadingDependencies: [waiting] });

  const onImageLoad = (url: string) => {
    markImageCached(projectImg(url, "icon"));
    setLoaded((s) => new Set(s).add(url));
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <AppearReady.Provider value={!isLoading}>
        <section className="flex w-full max-w-[1400px] flex-col gap-8 px-8 py-8 max-sm:gap-6 max-sm:px-4 max-sm:pb-14">
          <Section
            title="Projects"
            count={newest.length}
            head={<FilterPills label="Filter projects" options={OPTIONS} value={filter} onChange={setFilter} />}
          >
            <div className="grid grid-cols-3 gap-5 max-[1150px]:grid-cols-2 max-sm:grid-cols-1">
              {shown.map((p, i) => (
                <Appear key={p.url} delay={stagger(i % 3)} className="h-full">
                  <ProjectsCard
                    title={p.title}
                    desc={p.desc}
                    url={p.url}
                    date={p.date}
                    onLoad={() => onImageLoad(p.url)}
                    priority={i < 3}
                  />
                </Appear>
              ))}
            </div>
          </Section>
        </section>
      </AppearReady.Provider>
    </>
  );
};

export default Projects;
