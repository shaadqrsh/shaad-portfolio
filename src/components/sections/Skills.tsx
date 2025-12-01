import DynamicIcon from "@/components/DynamicIcon";
import FadeInUp from "@/components/FadeInUp";

import useManualCols from "@/hooks/useManualCols";
import { nameless, skills, top3 } from "@/lib/Skills";
import { useRef } from "react";

import AboutCard from "../AboutCard";
import Card from "@/components/ui/Card";

interface SkillsProps {
  enableAnimation?: boolean;
}

const Skills = ({ enableAnimation = true }: SkillsProps) => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const namelessRef = useRef<HTMLDivElement>(null);

  const skillsCols = useManualCols(6, 2);
  const namelessCols = useManualCols(4, 1);

  return (
    <AboutCard title="Skills">

      <div className="grid grid-cols-3 gap-6 max-lg:flex flex-col">
        {top3.map((t, idx) => (
          <FadeInUp
            delay={0.1 * (idx % 3)}
            key={idx}
            enableAnimation={enableAnimation}
          >
            <Card className="flex flex-col justify-start items-center gap-y-4 mt-2 p-4 rounded-4xl">
              <DynamicIcon name={t.icon} className="w-[50px] h-[50px] text-white" />
              <h3 className="text-xl font-bold text-center">
                {t.title}
              </h3>
              <p className="text-center text-xs xl:text-sm">{t.subTitle}</p>
            </Card>
          </FadeInUp>
        ))}
      </div>

      <div ref={skillsRef} className="flex flex-wrap justify-center items-center gap-6 mt-6">
        {skills.map((s, idx) => (
          <FadeInUp
            delay={0.1 * (idx % skillsCols)}
            key={idx}
            enableAnimation={enableAnimation}
          >
            <Card className="flex flex-col items-center gap-4 p-4 rounded-2xl w-[115px] max-sm:w-[100px] h-[125px] max-sm:h-[120px] justify-center">
              <DynamicIcon name={s.icon} className="w-[50px] h-[50px] text-white" />

              <h3
                className={`${s.name.length > 10 ? "text-xs" : "text-lg"
                  } max-sm:text-sm tracking-wider font-bold text-center`}
              >
                {s.name}
              </h3>
            </Card>
          </FadeInUp>
        ))}
      </div>

      <div ref={namelessRef} className="flex flex-wrap justify-center items-center gap-6 mt-6">
        {nameless.map((s, idx) => (
          <FadeInUp
            delay={0.1 * (idx % namelessCols)}
            key={idx}
            enableAnimation={enableAnimation}
          >
            <Card className="flex flex-col items-center gap-4 p-4 rounded-2xl">
              <h2 className="text-lg tracking-wider font-bold text-center">
                {s.title}
              </h2>
            </Card>
          </FadeInUp>
        ))}
      </div>
    </AboutCard>
  );
};

export default Skills;
