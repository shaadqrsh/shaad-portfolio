import { ProjectIdPageProps } from "@/types";
import { motion } from "motion/react";
import Title from "../Title";

const TechAndFeatures = ({ project }: ProjectIdPageProps) => {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-4 w-full">
      <div className="p-4 border-2 border-shaad-100 rounded-lg flex flex-col items-start h-full">
        <Title classN="mb-0">Description</Title>
        <p className="lg:text-base text-sm mt-2">{project?.desc}</p>

        <Title classN="mt-6 mb-2">Key Responsibilities</Title>
        {project?.responsibilities.map((r, idx) => (
          <ul key={idx.toString()}>
            <li className="lg:text-base text-sm font-semibold list-disc ml-3">
              {r}
            </li>
          </ul>
        ))}
      </div>

      <div className="p-4 border-2 border-shaad-100 rounded-lg flex flex-col items-start h-full">
        <Title classN="mb-0">Technology Used</Title>
        <div className="flex flex-wrap items-center gap-4">
          {project?.technologies.map((t, idx) => (
            <div
              key={idx.toString()}
              className="p-2 bg-shaad-600 mt-2 rounded-lg"
            >
              <p>{t}</p>
            </div>
          ))}
        </div>

        <Title classN="mb-0 mt-8">Features</Title>
        {project?.features.map((f, idx) => (
          <div
            className="flex flex-col items-start"
            key={idx.toString()}
          >
            <h2 className="font-semibold mt-2 text-shaad-500">• {f.heading}</h2>
            <h3 className="ml-3">{f.content}</h3>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechAndFeatures;
