import { experience } from "@/lib/Experience";
import { motion } from "motion/react";
import AboutCard from "../AboutCard";
import ExperienceCard from "../ExperienceCard";

const Experience = () => {
  return (
    <AboutCard title="Experience">
      <div className="flex flex-col gap-4 mt-4 border-l-2 border-shaad-600">
        {experience.map((ex, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={idx}
          >
            <ExperienceCard
              date={ex.year}
              subTitle={ex.subtitle}
              title={ex.title}
              img={ex.image}
            />
          </motion.div>
        ))}
      </div>
    </AboutCard>
  );
};

export default Experience;
