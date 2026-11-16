"use client";
import { Appear, stagger } from "@/components/projects/Appear";
import { cardClass } from "@/components/ui/Card";
import Logo from "@/components/ui/Logo";
import Meta from "@/components/ui/Meta";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { dateRange } from "@/lib/dates";
import { education } from "@/lib/Education";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

/** Each degree or school as a card with its dates and grade. */
const Education = () => (
  <Section title="Education" count={education.length}>
    <div className="grid grid-cols-4 gap-4 max-[1150px]:grid-cols-2 max-sm:grid-cols-1">
      {education.map((e, i) => (
        <Appear key={e.title} delay={stagger(i)} className={cn(cardClass, "flex flex-col gap-3 p-5")}>
          <div className="flex items-start justify-between gap-3">
            <Logo src={e.image} alt={e.subtitle[0]} fallback={<GraduationCap />} />
            {e.inProgress && <Tag>Current</Tag>}
          </div>
          <h3 className="leading-snug font-semibold">{e.title}</h3>
          <p className="text-[15px] text-shaad-ink-2">{e.subtitle[0]}</p>
          <Meta
            column
            items={[
              ["When", dateRange(e)],
              ["Grade", e.grade.replace(/^.*?:\s*/, "")],
            ]}
          />
        </Appear>
      ))}
    </div>
  </Section>
);

export default Education;
