import resumeData from "./resume_data.json";

// The stats on the home page, the About page, the OG cards, the agent profile
// and the GitHub profile README. Years, Projects and Jams are counted from the
// data so they never go stale. Anything else (like Clients) is typed into
// `testimonials` in resume_data.json and shown between Projects and Jams.

/**
 * A count as shown in a stat. Under 10 it stays exact ("7"); from 10 it's
 * rounded down to a multiple of 5 with a plus ("12" becomes "10+"), so it
 * never overstates. `partial` adds the plus below 10 too, for things like
 * years that are always partway through the next one ("6+").
 */
export const statCount = (n: number, partial = false) =>
  n >= 10 ? `${Math.floor(n / 5) * 5}+` : `${n}${partial ? "+" : ""}`;

/** Whole years since a dd/mm/yyyy date. An unknown month counts as January. */
const yearsSince = (date: string, now: Date) => {
  const [, m, y] = date.split("/").map(Number);
  const months = (now.getFullYear() - y) * 12 + now.getMonth() - ((m || 1) - 1);
  return Math.max(0, Math.floor(months / 12));
};

export const computeStats = (now = new Date()) => {
  const visible = resumeData.projects.filter((p) => !("hidden" in p && p.hidden));
  const oldest = visible.reduce((a, b) => (dateNum(b.date) < dateNum(a.date) ? b : a));
  return [
    { label: "Years", count: statCount(yearsSince(oldest.date, now), true) },
    { label: "Projects", count: statCount(visible.length) },
    ...resumeData.testimonials,
    { label: "Jams", count: statCount(resumeData.jams.length) },
  ];
};

const dateNum = (date: string) => {
  const [d, m, y] = date.split("/").map(Number);
  return y * 10000 + m * 100 + d;
};

export const stats = computeStats();
