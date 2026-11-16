"use client";
import { Appear, stagger } from "@/components/projects/Appear";
import Meta from "@/components/ui/Meta";
import Section from "@/components/ui/Section";
import { formatDate } from "@/lib/dates";
import { Publications as publications } from "@/lib/Publications";
import { ArrowUpRight } from "lucide-react";

/** Papers as link cards, with where and when each was published. */
const Publications = () => {
  if (publications.length === 0) return null;
  return (
    <Section title="Publications" count={publications.length}>
      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        {publications.map((p, i) => (
          <Appear key={p.url} delay={stagger(i)} className="h-full">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col gap-3 rounded-xl bg-shaad-300 p-5 shadow-md transition-shadow duration-200 hover:shadow-[0_0_20px_var(--color-shaad-600)]"
            >
              <div className="flex justify-between gap-3">
                <h3 className="font-display text-lg leading-snug font-bold">{p.name}</h3>
                <ArrowUpRight className="size-5 shrink-0 text-shaad-500" aria-hidden />
              </div>
              <Meta
                items={[
                  ["Published in", p.publishing],
                  ["Date", formatDate(p.date)],
                ]}
              />
            </a>
          </Appear>
        ))}
      </div>
    </Section>
  );
};

export default Publications;
