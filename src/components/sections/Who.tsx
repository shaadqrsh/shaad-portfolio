"use client";
import { Appear, stagger, useAppear } from "@/components/projects/Appear";
import { cardClass } from "@/components/ui/Card";
import Meta from "@/components/ui/Meta";
import Section from "@/components/ui/Section";
import { fullName, testimonials, whoAmI } from "@/lib/Data";
import { education } from "@/lib/Education";
import { experience } from "@/lib/Experience";
import { img } from "@/lib/images";
import resumeData from "@/lib/resume_data.json";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

const DEGREE_SHORT: Record<string, string> = { "Masters of Science": "MS", "Bachelor of Science": "BS" };

/** "MS Computer Science, Northeastern University" from the current degree. */
const studying = () => {
  const current = education.find((e) => e.inProgress);
  if (!current) return null;
  const [degree, field] = current.title.split(" - ");
  const school = current.subtitle[0].split(",").pop()?.trim();
  return `${DEGREE_SHORT[degree] ?? degree} ${field ?? ""}`.trim() + (school ? `, ${school}` : "");
};

/** "Media Services Technician, Northeastern University" from the current role. */
const working = () => {
  const job = experience.find((e) => e.inProgress);
  return job ? `${job.title}, ${job.location.split(",")[0]}` : null;
};

/** Who Am I: a tall photo tile beside the bio, stats and a few facts. */
const Who = ({ onPhotoLoad }: { onPhotoLoad?: () => void }) => (
  <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-4 max-[900px]:grid-cols-1">
    <motion.div
      {...useAppear()}
      className="relative min-h-80 overflow-hidden rounded-4xl shadow-2xl max-[900px]:aspect-[4/3] max-[900px]:min-h-0 max-sm:rounded-3xl"
    >
      <Image
        src={img("/about/img_about")}
        alt={fullName}
        fill
        priority
        sizes="(max-width: 900px) 100vw, 33vw"
        className="object-cover"
        onLoad={onPhotoLoad}
      />
    </motion.div>

    <Section title="Who Am I?">
      <p className="max-w-[68ch] text-[17px] leading-[1.7] text-shaad-ink max-sm:text-base">{whoAmI}</p>
      <div className="mt-[22px] grid grid-cols-4 gap-3 max-sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <Appear key={t.label} delay={stagger(i)} className={cn(cardClass, "px-4 py-3.5")}>
            <b className="block font-display text-[30px] leading-[1.1] font-bold tabular-nums text-shaad-500">{t.count}</b>
            <span className="text-sm text-shaad-ink-2">{t.label}</span>
          </Appear>
        ))}
      </div>
      <div className="mt-[22px] border-t border-white/10 pt-5">
        <Meta
          items={[
            ["Based in", resumeData.location],
            ["Studying", studying()],
            ["Working as", working()],
          ]}
        />
      </div>
    </Section>
  </div>
);

export default Who;
