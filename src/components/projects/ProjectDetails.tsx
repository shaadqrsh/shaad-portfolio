"use client";
import Card from "@/components/ui/Card";
import { projectData } from "@/types";
import { motion } from "motion/react";
import { Appear, stagger, useAppear } from "./Appear";
import { Panel } from "./Panel";

/** Features as heading and text rows; responsibilities and notes as the same two-column list. */
const ProjectDetails = ({ project }: { project: projectData }) => (
  <>
    {project.features.length > 0 && (
      <Panel title="Features">
        <Card className="px-5 py-1 max-sm:px-4">
          <div className="divide-y divide-white/10">
            {project.features.map((f, i) => (
              <Appear
                key={f.heading}
                delay={stagger(i)}
                className="grid gap-x-9 gap-y-2 px-1.5 py-5 md:grid-cols-[minmax(0,270px)_minmax(0,1fr)] max-md:px-0.5 max-md:py-[18px]"
              >
                <h3 className="font-display text-[21px] font-bold leading-tight text-shaad-500 max-md:text-[19px]">
                  {f.heading}
                </h3>
                <p className="max-w-[70ch] leading-[1.65] text-shaad-ink-2 max-sm:text-[15.5px] max-sm:leading-[1.7]">
                  {f.content}
                </p>
              </Appear>
            ))}
          </div>
        </Card>
      </Panel>
    )}

    <BulletPanel title="Key Responsibilities" items={project.responsibilities} />
    <BulletPanel title="Additional Information" items={project.additional} />
  </>
);

/** A titled card holding a two-column bullet list. Renders nothing when empty. */
const BulletPanel = ({ title, items }: { title: string; items: string[] }) =>
  items.length > 0 && (
    <Panel title={title}>
      <Card className="p-5 max-sm:p-4">
        <ul className="gap-11 md:columns-2">
          {items.map((t, i) => (
            <Bullet key={t} delay={stagger(i)}>
              {t}
            </Bullet>
          ))}
        </ul>
      </Card>
    </Panel>
  );

const Bullet = ({ children, delay }: { children: string; delay: number }) => (
  <motion.li
    {...useAppear(delay)}
    className="relative mb-4 break-inside-avoid pl-[22px] leading-[1.6] text-shaad-ink-2 before:absolute before:left-0.5 before:top-[0.62em] before:size-2 before:rounded-full before:bg-shaad-500 before:content-[''] last:mb-0 max-sm:mb-3.5 max-sm:text-[15.5px] max-sm:leading-[1.7]"
  >
    {children}
  </motion.li>
);

export default ProjectDetails;
