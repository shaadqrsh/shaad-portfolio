import Reveal from "@/components/Reveal";
import Title from "@/components/Title";
import { ProjectIdPageProps } from "@/types";
import { motion } from "motion/react";

const TechAndFeatures = ({ project }: ProjectIdPageProps) => {
  return (
    <motion.div className="mt-2 grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-8 w-full">
      <div className="p-8 border-2 border-shaad-100 rounded-lg flex flex-col items-start h-full">
        <Title classN="mb-0">Description</Title>
        <Reveal x={-100} de={0.2}>
          <p className="lg:text-base text-sm mt-2">{project?.desc}</p>
        </Reveal>

        <Title classN="mt-8 mb-2">Key Responsibilities</Title>
        {project?.responsibilities.map((r, idx) => (
          <Reveal
            key={idx.toString()}
            x={-100}
            de={0.2}
            cn="pl-1"
          >
            <ul key={idx.toString()}>
              <li className="lg:text-base text-sm list-disc ml-3 mt-1">
                {r}
              </li>
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="p-8 border-2 border-shaad-100 rounded-lg flex flex-col items-start h-full">
        <Title classN="mb-2">Technology Used</Title>
        <div className="flex flex-wrap items-center gap-4">
          {project?.technologies.map((t, idx) => (
            <Reveal
              key={idx.toString()}
              x={-50}
              de={0.2}
            >
            <div className="p-2 bg-shaad-600 mt-2 rounded-lg min-w-[80px] flex items-center justify-center">
              <Reveal y={100} de={0.45}>
                <p>{t}</p>
              </Reveal>
            </div>
            </Reveal>
          ))}
        </div>

        <Title classN="mb-0 mt-8">Features</Title>
        {project?.features.map((f, idx) => (
          <div
            className="flex flex-col items-start"
            key={idx.toString()}
          >
            <Reveal x={-100}>
              <h2 className="font-semibold mt-2 text-shaad-500">
                • {f.heading}
              </h2>
            </Reveal>
            <Reveal x={-100}>
              <h3 className="ml-3">{f.content}</h3>
            </Reveal>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechAndFeatures;
