import { motion } from "motion/react";

import { top3 } from "@/lib/Skills";

import Title from "../Title";

const Skills = () => {
  return (
    <motion.div className="flex-1 border-shaad-100 border-2 p-8 rounded-4xl shadow-2xl max-sm:mt-8">
      <Title>Skills</Title>

      <div className="grid grid-cols-3 gap-x-4">
        {top3.map((t, idx) => (
          <div
            className="flex flex-col justify-center items-center gap-y-4 mt-2 border-2 border-shaad-200 p-4 rounded-4xl"
            key={idx}
          >
            <motion.img
              src={t.icon}
              className="w-auto h-[50px] text-white"
              color="#fff"
            />
            <h3 className="text-xl font-bold">{t.title}</h3>
            <p className="text-center text-sm">{t.subTitle}</p>
          </div>
        ))}
      </div>

      <div></div>
    </motion.div>
  );
};

export default Skills;
