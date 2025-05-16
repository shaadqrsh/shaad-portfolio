import { motion } from "motion/react";

import { top3 } from "@/lib/Skills";

import AboutCard from "../AboutCard";
import Reveal from "../Reveal";

const Skills = () => {
  return (
    <AboutCard title="Skills">
      <div className="grid grid-cols-3 gap-x-4 max-lg:flex flex-col">
        {top3.map((t, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 * idx }}
            viewport={{ once: true }}
            key={idx}
            className="flex flex-col justify-center items-center gap-y-4 mt-2 border-2 border-shaad-200 p-4 rounded-4xl"
          >
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 * idx }}
              viewport={{ once: true }}
              src={t.icon}
              className="w-auto h-[50px] text-white"
              color="#fff"
            />
            <Reveal
              x={-100}
              de={0.3 * idx}
            >
              <motion.h3 className="text-xl font-bold text-center">
                {t.title}
              </motion.h3>
            </Reveal>
            <Reveal
              x={-100}
              de={0.3 * idx}
            >
              <p className="text-center text-xs xl:text-sm">{t.subTitle}</p>
            </Reveal>
          </motion.div>
        ))}
      </div>

      <div></div>
    </AboutCard>
  );
};

export default Skills;
