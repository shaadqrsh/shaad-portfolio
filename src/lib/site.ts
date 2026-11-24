import { EMAIL } from "./Email";
import resumeData from "./resume_data.json";

/**
 * Who runs this site and how to reach them. The privacy, cookie and credits
 * pages and the footer all read from here, so a change is made in one place.
 * Name, region and email come from resume_data.json. Kept free of
 * agentProfile so the footer can import it without pulling in project data.
 */
export const operator = {
  /** The site is run by one person, not a company. */
  kind: "person" as const,
  name: resumeData.fullName,
  region: resumeData.location,
  email: EMAIL,
};

/**
 * The year the site first went up, from the repo's first commit (2 May 2025).
 * The footer's copyright runs from here to the current year.
 */
export const SITE_START_YEAR = 2025;

/** "2025 to 2027", or just "2025" in the first year. */
export const copyrightYears = (now = new Date().getFullYear()) =>
  now > SITE_START_YEAR ? `${SITE_START_YEAR} to ${now}` : `${SITE_START_YEAR}`;

/** The date the current policy text took effect, as YYYY-MM-DD. Change it whenever the policies change. */
export const POLICY_DATE = "2026-11-24";

/** Every outside service that can see a visitor's data, as named in the privacy policy. */
export const services = {
  hosting: {
    name: "Vercel",
    policy: "https://vercel.com/legal/privacy-policy",
  },
  analytics: {
    name: "Vercel Web Analytics",
    docs: "https://vercel.com/docs/analytics/privacy-policy",
  },
  video: {
    name: "YouTube (Google)",
    policy: "https://policies.google.com/privacy",
    cookies: "https://policies.google.com/technologies/cookies",
  },
};

/** The policy pages, linked from the footer. */
export const policyPages = [
  { label: "Privacy", link: "/privacy" },
  { label: "Cookies", link: "/cookies" },
  { label: "Credits", link: "/credits" },
];

/** "2026-11-24" -> "24 November 2026", matching the site's day-first dates. */
export const formatPolicyDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
