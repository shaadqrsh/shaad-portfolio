"use client";
import HomeBlob from "@/components/HomeBlob";
import Loader, { isImageCached, markImageCached, useSmartLoader } from "@/components/Loader";
import { TransitionLink } from "@/components/PageTransition";
import { Appear, AppearReady, stagger, useAppear } from "@/components/projects/Appear";
import ProjectsCard from "@/components/ProjectsCard";
import { buttonVariants } from "@/components/ui/button";
import { fullName, homePara, name, title } from "@/lib/Data";
import { img } from "@/lib/images";
import { featuredProjects } from "@/lib/Projects";
import { cn } from "@/lib/utils";
import { ArrowRight, FileUser, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const HOME_IMG = img("/img_home");

const Home = () => {
  const [imgLoaded, setImgLoaded] = useState(() => isImageCached(HOME_IMG));
  const isLoading = useSmartLoader({ loadingDependencies: [!imgLoaded] });

  // The photo draws inside an SVG, so preload it here to know when it's ready.
  useEffect(() => {
    if (imgLoaded) return;
    const pic = new window.Image();
    const done = () => {
      markImageCached(HOME_IMG);
      setImgLoaded(true);
    };
    pic.onload = done;
    pic.onerror = done;
    pic.src = HOME_IMG;
  }, [imgLoaded]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <AppearReady.Provider value={!isLoading}>
        <section className="flex w-full max-w-[1400px] flex-col gap-8 px-8 py-8 text-white max-sm:gap-6 max-sm:px-4 max-sm:pb-14">
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center gap-14 max-[1150px]:gap-9 max-[900px]:grid-cols-1">
            <motion.div
              {...useAppear()}
              className="flex flex-col gap-[18px] rounded-4xl bg-shaad-200 p-10 shadow-[0_0_30px_var(--color-shaad-550),0_25px_50px_-12px_#00000080] max-sm:rounded-3xl max-sm:p-6"
            >
              <p className="text-[19px] font-semibold text-shaad-500 max-sm:text-base">{title}</p>
              <h1 className="font-display text-[58px] leading-[1.02] font-bold tracking-[-0.01em] max-[1150px]:text-[46px] max-sm:text-[38px]">
                {name}
              </h1>
              <p className="max-w-[68ch] text-lg leading-[1.7] text-shaad-ink max-sm:text-base">{homePara}</p>
              <div className="mt-1.5 flex flex-wrap gap-3">
                <TransitionLink href="/about" className={buttonVariants()}>
                  <User className="size-[18px]" />
                  <span className="font-semibold">About me</span>
                </TransitionLink>
                <TransitionLink href="/resume" className={buttonVariants({ variant: "outline" })}>
                  <FileUser className="size-[18px]" />
                  <span className="font-semibold">Resume</span>
                </TransitionLink>
              </div>
            </motion.div>
            <HomeBlob src={HOME_IMG} alt={fullName} ready={!isLoading} />
          </div>

          <motion.section {...useAppear()} className="rounded-4xl bg-shaad-200 p-8 shadow-2xl max-sm:rounded-3xl max-sm:p-5">
            {/* Title and button stay on one line; the title shrinks on narrow phones to make room. */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-display text-[34px] leading-tight font-bold tracking-[-0.01em] whitespace-nowrap text-shaad-600 max-sm:text-[min(26px,6.2vw)]">
                Featured Projects
              </h2>
              <TransitionLink href="/projects" className={cn(buttonVariants({ variant: "outline" }), "shrink-0 px-4 py-2 text-sm")}>
                <span className="font-semibold">Projects</span>
                <ArrowRight className="size-4" />
              </TransitionLink>
            </div>
            {/* Three cards, so three columns until they would get too narrow, then one; never a lone card on its own row. */}
            <div className="grid grid-cols-3 gap-5 max-[760px]:grid-cols-1">
              {featuredProjects.slice(0, 3).map((p, i) => (
                <Appear key={p.url} delay={stagger(i)} className="h-full">
                  <ProjectsCard title={p.title} desc={p.desc} url={p.url} date={p.date} />
                </Appear>
              ))}
            </div>
          </motion.section>
        </section>
      </AppearReady.Provider>
    </>
  );
};

export default Home;
