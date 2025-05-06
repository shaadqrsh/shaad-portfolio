"use client";
import Reveal from "@/components/Reveal";
import { homePara } from "@/lib/Data";
import { links } from "@/lib/header";
import { motion } from "motion/react";

const Home = () => {
  return (
    <section className="bg-shaad-400 text-white h-full flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 border-shaad-100 border-2 p-8 rounded-4xl shadow-2xl"
        >
          <Reveal
            x={-100}
            de={0.2}
          >
            <h2 className="text-xl mb-2 text-shaad-600">
              Professional ChutPaglu
            </h2>
          </Reveal>
          <Reveal
            x={-100}
            de={0.2}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Shaad Qureshi
            </h1>
          </Reveal>
          <Reveal
            x={-100}
            de={0.2}
          >
            <p className="text-gray-400 my-5 max-w-md">{homePara}</p>
          </Reveal>
          <Reveal
            y={100}
            de={0.2}
          >
            <div className="flex gap-5">
              {links.map((l, idx) => {
                return (
                  <a
                    href={l.href}
                    key={idx}
                  >
                    <l.label
                      className="text-white min-lg:text-sm text-xs hover:text-shaad-100 transition"
                      size={25}
                    />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </motion.div>

        <div className="relative flex-1 ml-4 max-sm:mx-auto">
          <motion.img
            src="/shaad1.png"
            alt="Shaad Qureshi"
            className="relative z-10 w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
