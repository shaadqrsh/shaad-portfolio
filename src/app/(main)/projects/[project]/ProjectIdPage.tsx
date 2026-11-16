"use client";
import Loader, { isImageCached, markImageCached, useSmartLoader } from "@/components/Loader";
import { AppearReady } from "@/components/projects/Appear";
import MediaPanel from "@/components/projects/MediaPanel";
import ProjectDetails from "@/components/projects/ProjectDetails";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectOverview from "@/components/projects/ProjectOverview";
import { projectImg } from "@/lib/images";
import { data } from "@/lib/projectId";
import resumeData from "@/lib/resume_data.json";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const ProjectIdPage = ({ url }: { url: string }) => {
  const coverSrc = projectImg(url, "cover");
  const project = url in data ? data[url] : null;
  // The same one-line summary the projects list and resume use.
  const summary = resumeData.projects.find((p) => p.url === url)?.desc;
  const [imageLoaded, setImageLoaded] = useState(() => isImageCached(coverSrc));
  const router = useRouter();

  useLayoutEffect(() => {
    const prev = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    if (!project) router.replace("/projects");
  }, [project, router]);

  const isLoading = useSmartLoader({
    loadingDependencies: [!project, !imageLoaded],
  });

  return (
    <section className="w-full min-w-0">
      <Loader isLoading={isLoading} />
      {project && (
        <>
          <ProjectHero
            project={project}
            url={url}
            summary={summary}
            enableAnimation={!isLoading}
            onCoverLoad={() => {
              markImageCached(coverSrc);
              setImageLoaded(true);
            }}
          />
          {/* Cards wait for the loader to lift, then fade up as they scroll into view. */}
          <AppearReady.Provider value={!isLoading}>
            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 pb-[72px] pt-2 sm:px-6 max-sm:gap-5 max-sm:pb-12">
              <ProjectOverview project={project} />
              <MediaPanel project={project} url={url} />
              <ProjectDetails project={project} />
            </div>
          </AppearReady.Provider>
        </>
      )}
    </section>
  );
};

export default ProjectIdPage;
