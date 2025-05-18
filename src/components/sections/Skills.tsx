import { motion } from "motion/react";

import { nameless, skills, top3 } from "@/lib/Skills";

import AboutCard from "../AboutCard";
import Reveal from "../Reveal";

const Skills = () => {
  return (
    <AboutCard title="Skills">
      <div className="grid grid-cols-3 gap-x-6 max-lg:flex flex-col">
        {top3.map((t, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 * idx }}
            viewport={{ once: true }}
            key={idx}
            className="flex flex-col justify-center items-center gap-y-4 mt-2 bg-shaad-300 p-4 rounded-4xl"
          >
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 * idx }}
              viewport={{ once: true }}
              src={t.icon}
              className="w-auto h-[50px] text-white"
              color="#ffffff"
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

      <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
        {skills.map((s, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={idx}
            className="flex flex-col items-center gap-4 bg-shaad-300 p-4 rounded-2xl w-[115px] h-[130px] justify-center"
          >
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              src={s.icon}
              className="w-full h-[50px] text-white"
              color="#ffffff"
            />

            <Reveal x={-100}>
              <motion.h3 className="text-lg tracking-wider font-bold text-center">
                {s.name}
              </motion.h3>
            </Reveal>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
        {nameless.map((s, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={idx}
            className="flex flex-col items-center gap-4 bg-shaad-300 p-4 rounded-2xl"
          >
            <Reveal x={-100}>
              <motion.h2 className="text-lg tracking-wider font-bold text-center">
                {s.title}
              </motion.h2>
            </Reveal>
          </motion.div>
        ))}
      </div>
    </AboutCard>
  );
};

export default Skills;
