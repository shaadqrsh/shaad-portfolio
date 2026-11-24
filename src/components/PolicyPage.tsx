import Meta from "@/components/ui/Meta";
import { cn } from "@/lib/utils";
import { POLICY_DATE, formatPolicyDate } from "@/lib/site";
import { ReactNode } from "react";

/**
 * The shell for the privacy, cookie and credits pages: one bg-shaad-200 panel
 * of plain text. These are server components with no fade-ins, so they are
 * static HTML that reads the same with JavaScript off.
 */
const PolicyPage = ({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) => (
  <article className="w-full max-w-[860px] px-8 py-8 text-white max-sm:px-4 max-sm:pb-14">
    <div className="flex flex-col gap-8 rounded-4xl bg-shaad-200 p-8 shadow-2xl max-sm:rounded-3xl max-sm:p-5">
      <header className="flex flex-col gap-4">
        <h1 className="font-display text-[34px] leading-tight font-bold tracking-[-0.01em] text-shaad-600 max-sm:text-[26px]">
          {title}
        </h1>
        <p className="text-[17px] leading-[1.7] text-shaad-ink max-sm:text-base">{intro}</p>
        <Meta items={[["Last updated", formatPolicyDate(POLICY_DATE)]]} />
      </header>
      {children}
    </div>
  </article>
);

/** One titled part of a policy, separated from the next by a thin line. */
export const Part = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="flex flex-col gap-3 border-t border-white/10 pt-6">
    <h2 className="font-display text-[22px] leading-snug font-bold">{title}</h2>
    <div className="flex flex-col gap-3 leading-[1.7] text-shaad-ink-2 max-sm:text-[15.5px]">{children}</div>
  </section>
);

/** A bulleted list in the site's red-dot style. */
export const Bullets = ({ items }: { items: ReactNode[] }) => (
  <ul className="flex flex-col gap-2">
    {items.map((item, i) => (
      <li
        key={i}
        className="relative pl-[22px] before:absolute before:top-[0.62em] before:left-0.5 before:size-2 before:rounded-full before:bg-shaad-500 before:content-['']"
      >
        {item}
      </li>
    ))}
  </ul>
);

/** An inline link. External links open in a new tab. */
export const A = ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={cn("font-semibold text-shaad-rose underline decoration-shaad-rose/40 underline-offset-4 transition-colors hover:text-shaad-rose-2 hover:decoration-current", className)}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
};

/**
 * A table that scrolls sideways on its own on narrow screens, never the page.
 * The wrapper can take keyboard focus so the hidden columns can be scrolled to.
 */
export const Table = ({ label, head, rows }: { label: string; head: string[]; rows: ReactNode[][] }) => (
  <div role="region" aria-label={label} tabIndex={0} className="overflow-x-auto rounded-xl bg-shaad-300 shadow-md">
    <table className="w-full min-w-[560px] border-collapse text-left text-[15px] leading-[1.6]">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} scope="col" className="border-b border-white/10 px-4 py-3 font-label text-xs font-medium uppercase tracking-[0.06em] text-shaad-ink-3">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-white/10 last:border-0">
            {row.map((cell, j) => (
              <td key={j} className={cn("px-4 py-3 align-top text-shaad-ink-2", j === 0 && "font-semibold text-white")}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PolicyPage;
