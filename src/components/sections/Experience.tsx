import { experience } from "@/lib/Experience";
import FadeInUp from "@/components/FadeInUp";
import AboutCard from "../AboutCard";
import ExperienceCard from "../ExperienceCard";
interface ExperienceProps {
  enableAnimation?: boolean;
}

const Experience = ({ enableAnimation = true }: ExperienceProps) => {
  return (
    <AboutCard title="Experience">
      <div className="flex flex-col gap-4 mt-4 border-l-2 border-shaad-600">
        {experience.map((ex, idx) => (
          <FadeInUp delay={0.1} key={idx} enableAnimation={enableAnimation}>
            <ExperienceCard
              date={ex.startDate}
              endDate={ex.endDate}
              subTitle={ex.subtitle}
              title={ex.title}
              img={ex.image}
              inProgress={ex.inProgress}
              location={ex.location}
            />
          </FadeInUp>
        ))}
      </div>
    </AboutCard>
  );
};

export default Experience;
