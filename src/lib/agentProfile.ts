import resumeData from "./resume_data.json";
import { data as projectDetail } from "./projectId";
import { getImgCount } from "./imgCounts";
import { SITE_URL, abs, toDateRange, toISODate } from "./siteUrl";

/**
 * Single flattening of resume_data.json + projectId.ts into one machine-readable
 * profile. Every agent-facing surface (llms.txt, /api/profile.json, JSON-LD,
 * sitemap) reads from here, so adding a project or a job to the JSON database
 * propagates everywhere without touching those files.
 */

const EMAIL = resumeData.links.find((l) => l.text === "Email")?.href;
const socialLinks = resumeData.links.filter((l) => l.text !== "Email");

export const profile = {
  name: resumeData.name,
  fullName: resumeData.fullName,
  headline: resumeData.title,
  location: resumeData.location,
  summary: resumeData.summary,
  about: resumeData.about,
  url: SITE_URL,
  contact: {
    email: EMAIL,
    academicEmail: resumeData.eduEmail,
  },
  profiles: socialLinks.map((l) => ({
    network: l.text,
    url: l.href,
  })),
  resume: {
    pdf: abs("/resume.pdf"),
    page: abs("/resume"),
  },
};

export const experience = resumeData.experience.map((job) => ({
  role: job.title,
  organization: job.location,
  ...toDateRange(job.startDate, job.endDate, job.inProgress),
  highlights: job.subtitle,
}));

export const education = resumeData.education.map((edu) => ({
  credential: edu.title,
  institution: edu.subtitle?.[0],
  location: edu.subtitle?.slice(1).join(", ") || undefined,
  grade: edu.grade,
  ...toDateRange(edu.startDate, edu.endDate, edu.inProgress),
}));

export const publications = resumeData.publications.map((pub) => ({
  title: pub.name,
  venue: pub.publishing,
  date: toISODate(pub.date),
  url: pub.url,
}));

export const certifications = resumeData.certificates.map((cert) => ({
  title: cert.title,
  issuer: cert.subtitle,
  date: toISODate(cert.date),
  url: "url" in cert ? cert.url : undefined,
}));

export const skills = {
  primary: resumeData.skills.top3.map((s) => ({
    name: s.title,
    detail: s.subTitle,
  })),
  technical: resumeData.skills.main.map((s) => s.name),
  professional: resumeData.skills.other.map((s) => s.title),
};

/** Index entries joined with their deep detail from projectId.ts. */
export const projects = resumeData.projects.map((proj) => {
  const detail = projectDetail[proj.url];

  return {
    title: proj.title,
    slug: proj.url,
    category: proj.category,
    date: toISODate(proj.date),
    type: detail?.game ? "game" : "software",
    summary: proj.desc,
    description: detail?.desc,
    url: abs(`/projects/${proj.url}`),
    links: detail?.urls?.map((u) => ({ label: u.label, url: u.url })) ?? [],
    technologies: detail?.technologies?.map((t) => t.name) ?? [],
    features:
      detail?.features?.map((f) => ({
        heading: f.heading,
        content: f.content,
      })) ?? [],
    contributions: detail?.responsibilities ?? [],
    notes: detail?.additional ?? [],
    videos: detail?.videos ?? [],
    screenshotCount: getImgCount(proj.url),
  };
});

export const stats = resumeData.testimonials.map((t) => ({
  label: t.label,
  value: t.count,
}));

/** Routes worth crawling, derived so new projects appear automatically. */
export const routes = [
  { path: "/home", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/resume", priority: 0.8, changeFrequency: "monthly" as const },
  ...resumeData.projects.map((p) => ({
    path: `/projects/${p.url}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
];

export const fullProfile = {
  profile,
  stats,
  skills,
  experience,
  education,
  projects,
  publications,
  certifications,
};

/**
 * Keyword set derived from the data rather than hand-listed, so a new engine,
 * language, or project tech shows up in page metadata automatically.
 *
 * Note: <meta name="keywords"> carries no weight with Google. It is emitted
 * for smaller search engines and resume/ATS parsers that still read it; the
 * ranking work is done by titles, descriptions, and the JSON-LD graph.
 */
const dedupe = (values: string[]) =>
  Array.from(new Set(values.filter(Boolean).map((v) => v.trim())));

/** Every technology named across all projects. */
const projectTech = projects.flatMap((p) => p.technologies);

export const keywords = {
  /** Identity terms — someone searching the person by name. */
  identity: dedupe([
    resumeData.name,
    resumeData.fullName,
    `${resumeData.name} portfolio`,
    `${resumeData.name} ${resumeData.title}`,
    `${resumeData.name} game developer`,
  ]),

  /** Skills and tooling, from the skills block plus per-project tech. */
  skills: dedupe([
    ...skills.primary.map((s) => s.name),
    ...skills.technical,
    ...projectTech,
  ]),

  /** Role/intent phrases a recruiter or hiring search would actually type. */
  roles: dedupe([
    resumeData.title,
    "game developer",
    "game programmer",
    "gameplay programmer",
    "game development portfolio",
    "Unity developer",
    "Unreal Engine developer",
    "software engineer",
    `game developer ${resumeData.location}`,
    "game developer intern",
    "game development co-op",
  ]),

  /** Project names, so each title is independently searchable. */
  projects: dedupe(projects.map((p) => p.title)),
};

/** Flattened list for the root <meta name="keywords">. */
export const allKeywords = dedupe([
  ...keywords.identity,
  ...keywords.roles,
  ...keywords.skills,
  ...keywords.projects,
]);

/** Keywords for a single project page. */
export const projectKeywords = (slug: string) => {
  const proj = projects.find((p) => p.slug === slug);
  if (!proj) return allKeywords;

  return dedupe([
    proj.title,
    `${proj.title} ${proj.type === "game" ? "game" : "project"}`,
    ...proj.technologies,
    proj.category,
    resumeData.name,
    `${resumeData.name} ${proj.title}`,
    ...(proj.type === "game" ? ["indie game", "game development"] : []),
  ]);
};
