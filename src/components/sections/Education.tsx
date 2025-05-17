import { education } from "@/lib/Education";
import { motion } from "motion/react";
import AboutCard from "../AboutCard";
import ExperienceCard from "../ExperienceCard";

const Education = () => {
  return (
    <AboutCard title="Education">
      <div className="gap-4 mt-4 flex flex-col border-l-2 border-shaad-600">
        {education.map((ex, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={idx}
          >
            <ExperienceCard
              date={ex.year}
              title={ex.title}
              subTitle={ex.subtitle}
            />
          </motion.div>
        ))}
      </div>
    </AboutCard>
  );
};

export default Education;
