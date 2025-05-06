"use client";
import { links } from "@/lib/header";
import { Copyright } from "lucide-react";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="p-4 bg-shaad-200 grid grid-cols-3 justify-evenly items-center max-sm:flex max-sm:flex-col max-sm:gap-y-4">
      <Reveal
        du={0.5}
        y={-20}
        cn="mx-auto"
      >
        <div className="flex max-md:flex-col justify-center items-center gap-x-4">
          <motion.p className="text-white font-bold min-lg:text-sm text-xs">
            Get in Touch:
          </motion.p>
          <div className="flex gap-x-4 max-md:mt-2">
            {links.map((l, idx) => {
              return (
                <a
                  href={l.href}
                  key={idx}
                >
                  <l.label
                    className="text-white min-lg:text-sm text-xs hover:text-shaad-600 transition"
                    size={18}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal
        du={0.5}
        y={-20}
        cn="mx-auto"
      >
        <p className="text-white min-lg:text-sm text-xs mx-auto flex text-center items-center">
          Copyright
          <Copyright
            className="mx-1"
            size={16}
          />
          {currentYear - 1} - {currentYear} | All rights reserved
        </p>
      </Reveal>

      <Reveal
        du={0.5}
        y={-20}
        cn="mx-auto"
      >
        <p className="text-white min-lg:text-sm text-xs mx-auto flex">
          Designed By{" "}
          <a
            href="https://hardikportfolio-hardik-malhotra.vercel.app"
            target="_blank"
            className="underline hover:text-blue-400 ml-1"
          >
            Hardik Malhotra
          </a>
        </p>
      </Reveal>
    </section>
  );
};

export default Footer;
