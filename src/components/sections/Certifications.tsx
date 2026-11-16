"use client";
import { Appear, stagger } from "@/components/projects/Appear";
import Section, { countClass } from "@/components/ui/Section";
import { Certificates } from "@/lib/Certificates";
import { yearOf } from "@/lib/dates";

type Cert = (typeof Certificates)[number] & { url?: string };

/** Certificates grouped by issuer, biggest group first. */
const groups = (() => {
  const byIssuer = new Map<string, Cert[]>();
  for (const c of Certificates as Cert[]) byIssuer.set(c.subtitle, [...(byIssuer.get(c.subtitle) ?? []), c]);
  return [...byIssuer.entries()].sort((a, b) => b[1].length - a[1].length);
})();

const IssuerCard = ({ issuer, certs, delay }: { issuer: string; certs: Cert[]; delay: number }) => (
  <Appear delay={delay} className="flex flex-col gap-3 rounded-xl bg-shaad-300 p-5 shadow-md">
    <div className="flex items-start justify-between gap-3">
      <h3 className="leading-snug font-semibold">{issuer}</h3>
      <span className={countClass}>{certs.length}</span>
    </div>
    <ul className="divide-y divide-white/10">
      {certs.map((c) => (
        <li key={c.title} className="flex justify-between gap-4 py-2.5 text-[15px] first:pt-0 last:pb-0">
          {c.url ? (
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-shaad-500">
              {c.title}
            </a>
          ) : (
            <span>{c.title}</span>
          )}
          <span className="shrink-0 tabular-nums text-shaad-ink-3">{yearOf(c.date)}</span>
        </li>
      ))}
    </ul>
  </Appear>
);

/** The largest issuer on the left; the rest stacked on the right. */
const Certifications = () => {
  const [first, ...rest] = groups;
  if (!first) return null;
  return (
    <Section title="Certifications" count={Certificates.length}>
      <div className="grid grid-cols-2 items-start gap-4 max-[900px]:grid-cols-1">
        <IssuerCard issuer={first[0]} certs={first[1]} delay={0} />
        <div className="flex flex-col gap-4">
          {rest.map(([issuer, certs], i) => (
            <IssuerCard key={issuer} issuer={issuer} certs={certs} delay={stagger(i + 1)} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Certifications;
