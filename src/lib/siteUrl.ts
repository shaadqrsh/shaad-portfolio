import resumeData from "./resume_data.json";

// Canonical origin for anything that has to emit absolute URLs (sitemap,
// robots, JSON-LD, the agent endpoints). Vercel preview/branch deploys get
// their own hostname, so prefer that when it exists and fall back to the
// value tracked in resume_data.json for local dev and production.
const fromVercel = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : undefined;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  fromVercel ||
  resumeData.websiteUrl
).replace(/\/$/, "");

export const abs = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * resume_data.json stores dates as DD/MM/YYYY where a 0 day or 0 month means
 * "unknown precision" (e.g. 00/05/2028 is May 2028, 00/00/2025 is just 2025).
 * Machine consumers want ISO 8601, so collapse to the precision we actually
 * have rather than inventing a day that was never recorded.
 */
export const toISODate = (date?: string): string | undefined => {
  if (!date) return undefined;
  if (date.toLowerCase() === "present") return undefined;

  const parts = date.split("/");
  if (parts.length !== 3) return undefined;

  const [day, month, year] = parts.map((p) => parseInt(p, 10));
  if (!year || Number.isNaN(year)) return undefined;

  if (!month) return `${year}`;
  const mm = String(month).padStart(2, "0");
  if (!day) return `${year}-${mm}`;

  return `${year}-${mm}-${String(day).padStart(2, "0")}`;
};

/** Human-readable range, mirroring what DateDisplay renders in the UI. */
export const toDateRange = (
  startDate?: string,
  endDate?: string,
  inProgress?: boolean
) => {
  const start = toISODate(startDate);
  const end = toISODate(endDate);

  return {
    start,
    end: inProgress && !end ? undefined : end,
    current: Boolean(inProgress),
  };
};
