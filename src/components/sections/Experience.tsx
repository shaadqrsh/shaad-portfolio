import { experience } from "@/lib/Experience";
import { motion } from "motion/react";
import AboutCard from "../AboutCard";
import ExperienceCard from "../ExperienceCard";

const Experience = () => {
  return (
    <AboutCard title="Experience">
      <div className="grid grid-cols-2 gap-4 mt-4">
        {experience.map((ex, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 * idx }}
            viewport={{ once: true }}
            key={idx}
          >
            <ExperienceCard
              date={ex.year}
              subTitle={ex.subtitle}
              title={ex.title}
            />
          </motion.div>
        ))}
      </div>
    </AboutCard>
  );
};

export default Experience;
