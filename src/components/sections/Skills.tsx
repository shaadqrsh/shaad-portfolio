"use client";
import DynamicIcon from "@/components/DynamicIcon";
import { Appear, stagger } from "@/components/projects/Appear";
import { cardClass } from "@/components/ui/Card";
import { Label } from "@/components/ui/Meta";
import Section from "@/components/ui/Section";
import { nameless, skills, top3 } from "@/lib/Skills";
import { cn } from "@/lib/utils";

/** Main tools with a line each, then every other tool as a tile, then practices as chips. */
const Skills = () => (
  <Section title="Skills">
    <div className="mb-6 grid grid-cols-3 gap-4 max-[1150px]:grid-cols-1">
      {top3.map((t, i) => (
        <Appear key={t.title} delay={stagger(i)} className={cn(cardClass, "flex flex-col gap-2.5 p-5")}>
          <DynamicIcon name={t.icon} className="size-10 text-white" />
          <h3 className="font-display text-lg leading-snug font-bold">{t.title}</h3>
          <p className="text-[14.5px] leading-[1.6] text-shaad-ink-2">{t.subTitle}</p>
        </Appear>
      ))}
    </div>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(118px,1fr))] gap-3">
      {skills.map((s, i) => (
        <Appear
          key={s.name}
          delay={stagger(i % 8)}
          className={cn(cardClass, "flex flex-col items-center gap-2.5 px-2 py-4 text-center text-sm font-semibold")}
        >
          <DynamicIcon name={s.icon} className="size-10 text-white" />
          {s.name}
        </Appear>
      ))}
    </div>

    <Label className="mt-6 mb-3">Practices</Label>
    <div className="flex flex-wrap gap-2.5">
      {nameless.map((s, i) => (
        <Appear key={s.title} delay={stagger(i % 8)} className={cn(cardClass, "rounded-[10px] px-3.5 py-2 text-[15px] font-medium")}>
          {s.title}
        </Appear>
      ))}
    </div>
  </Section>
);

export default Skills;
