"use client";
import DateDisplay from "@/components/DateDisplay";
import DynamicIcon from "@/components/DynamicIcon";
import Card from "@/components/ui/Card";
import { projectData } from "@/types";
import { Appear, stagger } from "./Appear";
import { Label, Panel } from "./Panel";

/** Description beside the At a Glance sidebar (release date and tech stack). */
const ProjectOverview = ({ project }: { project: projectData }) => (
  <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] max-sm:gap-5">
    <Panel title="Description">
      <Card className="p-5 max-sm:p-4">
        <p className="max-w-[70ch] text-[19px] leading-[1.7] text-shaad-ink max-sm:text-[17px] max-sm:leading-[1.75]">
          {project.desc}
        </p>
      </Card>
    </Panel>

    <Panel title="At a Glance" as="aside">
      <div className="flex flex-col gap-[22px] max-sm:gap-[18px]">
        <div>
          <Label className="mb-2.5">Released</Label>
          <p className="font-display text-2xl font-bold max-sm:text-[21px]">
            <DateDisplay date={project.date} />
          </p>
        </div>
        {project.technologies.length > 0 && (
          <div>
            <Label className="mb-2.5">Technology Used</Label>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, i) => (
                <Appear key={t.name} delay={stagger(i)}>
                  <Card className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold">
                    <DynamicIcon name={t.icon} className="size-[18px] text-white" />
                    {t.name}
                  </Card>
                </Appear>
              ))}
            </div>
          </div>
        )}
      </div>
    </Panel>
  </div>
);

export default ProjectOverview;
