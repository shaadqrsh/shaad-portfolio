"use client";
import Loader, { useSmartLoader } from "@/components/Loader";

import FadeInUp from "@/components/FadeInUp";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import Who from "@/components/sections/Who";
import Image from "next/image";
import { useState } from "react";

const UI = [Who, Skills, Experience, Education, Publications, Certifications];

const About = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isLoading = useSmartLoader({
    loadingDependencies: [!imageLoaded],
  });

  return (
    <>
      <Loader isLoading={isLoading} />
      <section className="3xl:container text-white h-full w-full max-sm:flex max-sm:flex-col grid grid-cols-[40%_60%] justify-center gap-x-8 p-8 max-md:px-6 max-md:pb-14">
        <div
          className="sticky min-sm:top-30 h-[calc(100vh-14rem)] self-start mx-auto max-sm:block max-sm:mb-8 w-full"
        >
          <FadeInUp
            enableAnimation={!isLoading}
            duration={0.5}
            className="h-full w-full"
          >
            <div className="relative h-full w-full rounded-4xl overflow-hidden">
              <Image
                src="/about/img_about.png"
                alt="Shaad Qureshi"
                fill
                className="object-cover"
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </FadeInUp>
        </div>

        <div className="flex flex-col mx-auto gap-y-8">
          {UI.map((UI, idx) => (
            <div key={idx}>
              <UI enableAnimation={!isLoading} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
