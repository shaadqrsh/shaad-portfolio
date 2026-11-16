"use client";
import Loader, { isImageCached, markImageCached, useSmartLoader } from "@/components/Loader";
import { Appear, AppearReady, stagger, useAppear } from "@/components/projects/Appear";
import ProjectsCard from "@/components/ProjectsCard";
import { countClass } from "@/components/ui/Section";
import { projectImg } from "@/lib/images";
import projects, { categoryOrder } from "@/lib/Projects";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

type Project = (typeof projects)[number];

const COLLAPSE = { duration: 0.2, ease: "easeInOut" } as const;

/** The furthest the page can scroll right now, measured from the footer. */
const maxScroll = () => {
  const footer = document.querySelector("footer");
  return footer ? footer.getBoundingClientRect().bottom + window.scrollY - window.innerHeight : Infinity;
};

/**
 * Chrome keeps the scroll position while content shrinks and only corrects
 * it once the shrinking element is removed, so closing a category near the
 * bottom of the page showed empty space under the footer and then snapped.
 * Before a category closes, this works out where the page will be able to
 * scroll to afterwards and scrolls there with the same timing as the close,
 * so the footer stays on the bottom edge the whole way.
 */
const scrollWithCollapse = (region: HTMLElement | null) => {
  if (!region) return;
  // The page loses the region's full height.
  const lost = region.offsetHeight;
  const target = Math.max(0, maxScroll() - lost);
  if (window.scrollY <= target) return;
  animate(window.scrollY, target, { ...COLLAPSE, onUpdate: (y) => window.scrollTo({ top: y, behavior: "instant" }) });
};

/** Clears any rounding left over once the close finishes. */
const settleScroll = () => {
  const max = maxScroll();
  if (window.scrollY > max) window.scrollTo({ top: Math.max(0, max), behavior: "instant" });
};

/** Projects grouped by category, in categoryOrder, with unlisted categories last. */
const useCategories = () =>
  useMemo(() => {
    const rank = new Map(categoryOrder.map((c, i) => [c.name, i]));
    const groups = new Map<string, Project[]>();
    for (const p of projects) {
      const cat = p.category || "Miscellaneous";
      groups.set(cat, [...(groups.get(cat) ?? []), p]);
    }
    return [...groups.entries()].sort(
      ([a], [b]) => (rank.get(a) ?? Infinity) - (rank.get(b) ?? Infinity) || a.localeCompare(b)
    );
  }, []);

const Category = ({
  name,
  items,
  open,
  onToggle,
  onImageLoad,
}: {
  name: string;
  items: Project[];
  open: boolean;
  onToggle: () => void;
  onImageLoad: (url: string) => void;
}) => {
  const reduce = useReducedMotion();
  const id = `cat-${name.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <motion.section {...useAppear()} className="min-w-0 rounded-4xl bg-shaad-200 p-8 text-white shadow-2xl max-sm:rounded-3xl max-sm:p-5">
      <button
        type="button"
        onClick={() => {
          if (open && !reduce) scrollWithCollapse(document.getElementById(id));
          onToggle();
        }}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full cursor-pointer items-center gap-3 text-left"
      >
        <h2 className="font-display text-[34px] leading-tight font-bold tracking-[-0.01em] text-shaad-600 max-sm:text-[26px]">{name}</h2>
        <span className={countClass}>{items.length}</span>
        <ChevronDown
          aria-hidden
          className={cn("ml-auto size-6 shrink-0 text-shaad-600 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : COLLAPSE}
            onAnimationComplete={settleScroll}
            // The box clips while it opens and closes. It reaches 24px past the
            // cards on every side (20px on phones, the panel's own padding) so
            // their hover glow fits inside instead of being cut off.
            className="-mx-6 -mb-6 overflow-hidden max-sm:-mx-5 max-sm:-mb-5"
          >
            <div className="grid grid-cols-3 gap-5 px-6 pt-6 pb-6 max-[1150px]:grid-cols-2 max-sm:grid-cols-1 max-sm:px-5 max-sm:pb-5">
              {items.map((p, i) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const Projects = () => {
  const categories = useCategories();
  const [closed, setClosed] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categoryOrder.map((c) => [c.name, c.minimizedByDefault]))
  );
  const [loaded, setLoaded] = useState(() => new Set(projects.filter((p) => isImageCached(projectImg(p.url, "icon"))).map((p) => p.url)));

  // Wait for the first row of covers in each open category before lifting the
  // first-visit loader. Covers further down load lazily as you scroll.
  const waiting = categories.some(([name, items]) => !closed[name] && items.slice(0, 3).some((p) => !loaded.has(p.url)));
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
          {categories.map(([name, items]) => (
            <Category
              key={name}
              name={name}
              items={items}
              open={!closed[name]}
              onToggle={() => setClosed((c) => ({ ...c, [name]: !c[name] }))}
              onImageLoad={onImageLoad}
            />
          ))}
        </section>
      </AppearReady.Provider>
    </>
  );
};

export default Projects;
