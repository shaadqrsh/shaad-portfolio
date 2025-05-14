import { motion } from "motion/react";

import { whoAmI } from "@/lib/Data";

import Reveal from "../Reveal";
import Title from "../Title";

const Who = () => {
  return (
    <motion.div className="flex-1 border-shaad-100 border-2 p-8 rounded-4xl shadow-2xl max-sm:mt-8">
      <Title>Who Am I?</Title>
      <Reveal
        x={-100}
        de={0.2}
      >
        <p className="font-light tracking-wide">{whoAmI}</p>
      </Reveal>
    </motion.div>
  );
};

export default Who;
