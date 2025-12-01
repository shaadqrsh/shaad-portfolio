import { education } from "@/lib/Education";
import FadeInUp from "@/components/FadeInUp";
import AboutCard from "../AboutCard";
import ExperienceCard from "../ExperienceCard";
interface EducationProps {
  enableAnimation?: boolean;
}

const Education = ({ enableAnimation = true }: EducationProps) => {
  return (
    <AboutCard title="Education">
      <div className="gap-4 mt-4 flex flex-col border-l-2 border-shaad-600">
        {education.map((ex, idx) => (
          <FadeInUp delay={0.1} key={idx} enableAnimation={enableAnimation}>
            <ExperienceCard
              date={ex.year}
              title={ex.title}
              subTitle={ex.subtitle}
              img={ex.image}
              inProgress={ex.inProgress}
            />
          </FadeInUp>
        ))}
      </div>
    </AboutCard>
  );
};

export default Education;
