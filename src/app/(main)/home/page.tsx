"use client";
import ImageWithAbstractShape from "@/components/ImageWithAbstractShape";
import Reveal from "@/components/Reveal";
import { homePara } from "@/lib/Data";
import { links } from "@/lib/header";
import { motion } from "motion/react";

const Home = () => {
  return (
    <section className="text-white h-full flex items-center justify-center px-6 max-md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[75rem] mx-auto flex flex-col-reverse md:flex-row items-center justify-between mt-8 xl:gap-40"
      >
        <motion.div
          className="flex-1 border-shaad-600 border-2 p-8 rounded-4xl shadow-2xl"
          style={{
            boxShadow: "0 0 25px rgba(252, 195, 90, 0.4)",
            transition: "box-shadow 0.3s ease-in-out",
          }}
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
                      className="text-white min-lg:text-sm text-xs hover:text-shaad-600 transition"
                      size={25}
                    />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </motion.div>

        <div className="flex-1 ml-4 max-sm:mx-auto">
          <ImageWithAbstractShape
            src="/shaad2.png"
            alt="Shaad Qureshi"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
