import { idk, whoAmI } from "@/lib/Data";

import { motion } from "motion/react";
import AboutCard from "../AboutCard";
import Reveal from "../Reveal";

const Who = () => {
  return (
    <AboutCard title="Who Am I?">
      <Reveal
        x={-100}
        de={0.2}
      >
        <p className="font-light tracking-wide">{whoAmI}</p>
      </Reveal>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-around items-center flex-wrap mt-4 gap-4"
      >
        {idk.map((i, idx) => (
          <div
            key={idx}
            className="mt-4 p-4 rounded-xl bg-shaad-200 flex flex-col justify-around items-center min-w-[180px]"
          >
            <Reveal
              x={-100}
              de={0.2}
            >
              <h1 className="text-3xl text-shaad-600 font-bold">{i.count}</h1>
            </Reveal>
            <Reveal
              x={-100}
              de={0.2}
            >
            <p className="text-xl">{i.label}</p>
            </Reveal>
          </div>
        ))}
      </motion.div>
    </AboutCard>
  );
};

export default Who;
