"use client";
import { motion } from "motion/react";

import ImageWithAbstractShape from "@/components/ImageWithAbstractShape";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Who from "@/components/sections/Who";

const UI = [Who, Skills, Experience, Certifications, Education];

const About = () => {
  return (
    <section className="text-white h-full w-full max-sm:flex max-sm:flex-col grid grid-cols-2 justify-center p-6 max-md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex mx-auto sticky"
      >
        <ImageWithAbstractShape
          src="/shaad1.png"
          alt="Shaad Qureshi"
        />
      </motion.div>

      <div className="flex flex-col mx-auto gap-y-6">
        {UI.map((UI, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={idx}
          >
            <UI />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
