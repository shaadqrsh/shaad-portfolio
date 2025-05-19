import { Certificates } from "@/lib/Certificates";
import { motion } from "motion/react";
import AboutCard from "../AboutCard";
import ExperienceCard from "../ExperienceCard";

const Certifications = () => {
  return (
    <AboutCard title="Certifications">
      <div className="gap-4 mt-4 lg:grid lg:grid-cols-2 flex flex-col">
        {Certificates.map((ex, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={idx}
          >
            <ExperienceCard
              title={ex.title}
              subTitle={ex.subtitle}
              ex={false}
            />
          </motion.div>
        ))}
      </div>
    </AboutCard>
  );
};

export default Certifications;
