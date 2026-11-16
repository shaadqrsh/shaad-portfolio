"use client";
import Loader, { isImageCached, markImageCached, useSmartLoader } from "@/components/Loader";
import { AppearReady } from "@/components/projects/Appear";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Jams from "@/components/sections/Jams";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import Who from "@/components/sections/Who";
import { img } from "@/lib/images";
import { useState } from "react";

const PHOTO = img("/about/img_about");

const About = () => {
  const [photoLoaded, setPhotoLoaded] = useState(() => isImageCached(PHOTO));
  const isLoading = useSmartLoader({ loadingDependencies: [!photoLoaded] });

  return (
    <>
      <Loader isLoading={isLoading} />
      <AppearReady.Provider value={!isLoading}>
        <section className="flex w-full max-w-[1400px] flex-col gap-8 px-8 py-8 text-white max-sm:gap-6 max-sm:px-4 max-sm:pb-14">
          <Who
            onPhotoLoad={() => {
              markImageCached(PHOTO);
              setPhotoLoaded(true);
            }}
          />
          <Skills />
          <Experience />
          <Jams />
          <Education />
          <Publications />
          <Certifications />
        </section>
      </AppearReady.Provider>
    </>
  );
};

export default About;
