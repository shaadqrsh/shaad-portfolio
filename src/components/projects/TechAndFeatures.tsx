
import DynamicIcon from "@/components/DynamicIcon";
import FadeInUp from "@/components/FadeInUp";
import Title from "@/components/Title";
import useManualCols from "@/hooks/useManualCols";
import { ProjectIdPageProps } from "@/types";
import { motion } from "motion/react";
import { useRef } from "react";
import Card from "@/components/ui/Card";

interface TechAndFeaturesProps extends ProjectIdPageProps {
  enableAnimation?: boolean;
}

const TechAndFeatures = ({ project, enableAnimation = true }: TechAndFeaturesProps) => {
  const techRef = useRef<HTMLDivElement>(null);
  const techCols = useManualCols(5, 2);

  return (
    <motion.div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <div className="contents md:flex md:flex-col md:gap-8">
        <div className="bg-shaad-200 p-8 shadow-2xl flex flex-col items-start h-full order-1 rounded-4xl mb-8 md:mb-0">
          <Title classN="mb-0">Description</Title>
          <FadeInUp delay={0.2} className="w-full" enableAnimation={enableAnimation}>
            <Card className="mt-2">
              <p className="lg:text-base">{project?.desc}</p>
            </Card>
          </FadeInUp>
        </div>

        <div className="bg-shaad-200 p-8 shadow-2xl flex flex-col items-start h-full order-4 rounded-4xl mb-8 md:mb-0">
          <Title classN="mb-2">Key Responsibilities</Title>
          <FadeInUp delay={0.2} className="w-full" enableAnimation={enableAnimation}>
            <Card className="mt-2 w-full">
              {project?.responsibilities.map((r, idx) => (
                <div key={idx}>
                  {idx === 0 && <div className="h-2" />}
                  <p className="lg:text-base">{r}</p>
                  {idx !== project.responsibilities.length - 1 ? (
                    <hr className="border-shaad-200 border-2 my-4" />
                  ) : (
                    <div className="h-2" />
                  )}
                </div>
              ))}
            </Card>
          </FadeInUp>
        </div>
      </div>

      <div className="contents md:flex md:flex-col md:gap-8">
        <div className="bg-shaad-200 p-8 shadow-2xl flex flex-col items-start h-full order-3 md:order-none rounded-4xl mb-8 md:mb-0">
          <Title classN="mb-2">Technology Used</Title>
          <div ref={techRef} className="flex flex-wrap items-center gap-4">
            {project?.technologies.map((t, idx) => (
              <FadeInUp
                key={idx.toString()}
                delay={0.1 * (idx % techCols)}
                enableAnimation={enableAnimation}
              >
                <Card className="px-6 py-3 mt-2 rounded-xl min-w-[100px] flex items-center justify-center gap-3">
                  <DynamicIcon name={t.icon} className="w-6 h-6 text-white" />
                  <p className="text-white font-semibold text-lg">{t.name}</p>
                </Card>
              </FadeInUp>
            ))}
          </div>
        </div>

        <div className="bg-shaad-200 p-8 shadow-2xl flex flex-col items-start h-full order-2 md:order-none rounded-4xl mb-8 md:mb-0 gap-4">
          <Title classN="mb-0">Features</Title>
          {project?.features.map((f, idx) => (
            <div
              className="flex flex-col items-start w-full"
              key={idx.toString()}
            >
              <FadeInUp delay={0.1} className="w-full" enableAnimation={enableAnimation}>
                <Card className="w-full">
                  <h2 className="font-semibold text-shaad-500 text-xl">
                    {f.heading}
                  </h2>
                  <h3 className="mt-1">{f.content}</h3>
                </Card>
              </FadeInUp>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TechAndFeatures;
