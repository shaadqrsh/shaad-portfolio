import Reveal from "@/components/Reveal";
import { motion } from "motion/react";

const Education = () => {
  return (
    <motion.div className="flex-1 border-shaad-100 border-2 p-8 rounded-4xl shadow-2xl">
      <Reveal
        x={-100}
        de={0.2}
      >
        <h2 className="text-xl mb-2 text-shaad-600">Education</h2>
      </Reveal>
    </motion.div>
  );
};

export default Education;
