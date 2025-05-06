"use client";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Who from "@/components/sections/Who";
import { motion } from "motion/react";

const About = () => {
  return (
    <section className="text-white h-full w-full max-sm:flex max-sm:flex-col grid grid-cols-2 items-center justify-center p-6 max-md:pb-16">
      <div className="flex mx-auto sticky left-0 top-0">
        <motion.img
          src="/shaad3.png"
          alt="Shaad Qureshi"
          className="w-full h-52"
        />
      </div>
      <div className="flex flex-col mx-auto gap-y-6">
        <Who />
        <Skills />
        <Experience />
        <Certifications />
        <Education />
      </div>
    </section>
  );
};

export default About;
