"use client";
import Loader, { isImageCached, markImageCached, useSmartLoader } from "@/components/Loader";
import ProjectsCard from "@/components/ProjectsCard";
import projects, { categoryOrder } from "@/lib/Projects";
import FadeInUp from "@/components/FadeInUp";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

import { useState, useEffect, useMemo } from "react";

const Projects = () => {
  const [loadedImages, setLoadedImages] = useState(() =>
    projects.filter((p) => isImageCached(`/project_${p.url}/icon.png`)).length
  );
  const [cols, setCols] = useState(1);

  const categoryRank = useMemo(() => {
    const ranks: Record<string, number> = {};
    categoryOrder.forEach((c, i) => {
      ranks[c.name] = i;
    });
    return ranks;
  }, []);

  const { categorizedProjects, sortedCategories } = useMemo(() => {
    const categorized = projects.reduce((acc, project) => {
      const cat = project.category || "Miscellaneous";
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(project);
      return acc;
    }, {} as Record<string, typeof projects>);

    const sorted = Object.keys(categorized).sort((a, b) => {
      const rankA = categoryRank[a] ?? Infinity;
      const rankB = categoryRank[b] ?? Infinity;

      if (rankA !== rankB) return rankA - rankB;
      return a.localeCompare(b);
    });

    return { categorizedProjects: categorized, sortedCategories: sorted };
  }, [categoryRank]);

  const [minimizedCategories, setMinimizedCategories] = useState<Record<string, boolean>>(() => {
    const initialMinimized: Record<string, boolean> = {};
    sortedCategories.forEach(cat => {
      const config = categoryOrder.find(c => c.name === cat);
      initialMinimized[cat] = config ? config.minimizedByDefault : false;
    });
    return initialMinimized;
  });

  const visibleProjectsCount = useMemo(() => {
    return sortedCategories.reduce((acc, category) => {
      if (!minimizedCategories[category]) {
        return acc + categorizedProjects[category].length;
      }
      return acc;
    }, 0);
  }, [minimizedCategories, categorizedProjects, sortedCategories]);

  const isLoading = useSmartLoader({
    loadingDependencies: [loadedImages < visibleProjectsCount],
  });

  const toggleCategory = (category: string) => {
    setMinimizedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleImageLoad = (url: string) => {
    markImageCached(`/project_${url}/icon.png`);
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1024) {
        setCols(2);
      } else {
        setCols(1);
      }
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <section className="min-3xl:container text-white h-full w-full flex flex-col justify-center p-6 max-md:pb-14">
        <div className="flex flex-col gap-6 w-full">
          {sortedCategories.map((category) => {
            const isMinimized = minimizedCategories[category];
            const categoryProjects = categorizedProjects[category];

            return (
              <Card
                key={category}
                className={cn(
                  "w-full flex-col relative transition-shadow duration-300 !bg-shaad-200 rounded-4xl p-6",
                  isMinimized ? "cursor-pointer hover:shadow-[0_0_20px_var(--color-shaad-600)]" : ""
                )}
                onClick={() => {
                  if (isMinimized) toggleCategory(category);
                }}
              >
                <div
                  className={cn(
                    "w-full relative px-2 py-2 flex justify-between items-center transition-colors",
                    !isMinimized ? "cursor-pointer hover:text-white/80" : ""
                  )}
                  onClick={(e) => {
                    if (!isMinimized) {
                      e.stopPropagation();
                      toggleCategory(category);
                    }
                  }}
                >
                  <h2 className="text-3xl font-bold text-white pr-8">{category}</h2>
                  <ChevronDown
                    className={cn(
                      "text-shaad-600 transition-transform duration-500 linear flex-shrink-0",
                      !isMinimized ? "rotate-180" : "rotate-0"
                    )}
                    size={24}
                  />
                </div>
                <AnimatePresence initial={false}>
                  {!isMinimized && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden w-full"
                    >
                      <div
                        className="grid grid-cols-2 justify-center items-center gap-8 max-lg:flex max-lg:flex-col pt-8 pb-4 px-4 w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {categoryProjects.map((p, idx) => {
                          const isLastOdd = categoryProjects.length % 2 !== 0 && idx === categoryProjects.length - 1;
                          return (
                            <FadeInUp
                              delay={0.1 * (idx % cols)}
                              key={`${category}-${idx}`}
                              className={
                                isLastOdd
                                  ? "col-span-2 justify-self-center w-full max-w-[calc(50%-0.75rem)] max-lg:max-w-full"
                                  : "w-full"
                              }
                              enableAnimation={!isLoading}
                            >
                              <ProjectsCard
                                title={p.title}
                                desc={p.desc}
                                url={p.url}
                                onLoad={() => handleImageLoad(p.url)}
                                priority={idx < 2}
                              />
                            </FadeInUp>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Projects;