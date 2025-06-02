"use client";
import { motion } from "motion/react";

import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Who from "@/components/sections/Who";

const UI = [Who, Skills, Experience, Education, Certifications];

const About = () => {
  return (
    <section className="text-white h-full w-full mx-4 max-sm:flex max-sm:flex-col grid grid-cols-[40%_60%] justify-center gap-x-8 p-8 max-md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="sticky top-30 h-[calc(100vh-14rem)] self-start mx-auto max-sm:hidden"
      >
        <motion.img
          src="about/img_about.jpg"
          className="object-cover h-full w-[500px] xl:w-screen rounded-4xl"
        />
      </motion.div>

      <div className="flex flex-col mx-auto gap-y-8">
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
