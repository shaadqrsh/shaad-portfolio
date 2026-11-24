import type { Metadata } from "next";
import { keywords, profile, projectKeywords, projects } from "./agentProfile";
import { data as projectDetail } from "./projectId";

/**
 * Every page's title, description and link-preview text, in one table. Each
 * page's layout or page file calls metaFor() with its path, and project pages
 * call projectMeta(). Next writes these into the server HTML and swaps them
 * on client-side navigation.
 */

type PageEntry = {
  title: string;
  /** The whole tab title, when "<title> | Shaad Qureshi" would not say what the page is. */
  fullTitle?: string;
  description: string;
  /** Link preview title, when it should differ from the tab title. */
  ogTitle?: string;
  keywords?: string[];
  /** False for pages with no value in search results. They are left out of the sitemap too. */
  index?: boolean;
};

const projectsDescription =
  `Games and software built by ${profile.fullName}, including ` +
  `${projects.slice(0, 4).map((p) => p.title).join(", ")} and more. ` +
  `Built with ${keywords.skills.slice(0, 6).join(", ")}.`;

export const pageMeta = {
  // The tab title says who and what, not "Home".
  "/home": {
    title: "Home",
    fullTitle: `${profile.name} | ${profile.headline}`,
    description: profile.summary,
    ogTitle: `${profile.fullName} | ${profile.headline}`,
    keywords: [...keywords.identity, ...keywords.roles],
  },
  // The about page carries the skills content, so lead its description with
  // the long-form bio and key its keywords to skills and education.
  "/about": {
    title: "About",
    description: profile.about.slice(0, 300),
    ogTitle: `About ${profile.fullName}`,
    keywords: [...keywords.identity, ...keywords.skills],
  },
  "/projects": {
    title: "Projects",
    description: projectsDescription,
    ogTitle: `Projects | ${profile.fullName}`,
    keywords: [...keywords.projects, ...keywords.skills, ...keywords.roles],
  },
  "/resume": {
    title: "Resume",
    description: `Resume of ${profile.fullName}, ${profile.headline} based in ${profile.location}. Download as PDF.`,
    ogTitle: `Resume | ${profile.fullName}`,
    keywords: [...keywords.identity.map((k) => `${k} resume`), ...keywords.roles, ...keywords.skills],
  },
  "/privacy": {
    title: "Privacy Policy",
    description: `What this site collects about visitors, who else sees it and how to have it deleted.`,
    index: false,
  },
  "/cookies": {
    title: "Cookie Policy",
    description: `The cookies and browser storage this site uses: none of its own, and YouTube's only after you play a video.`,
    index: false,
  },
  "/credits": {
    title: "Credits",
    description: `Fonts, icons and libraries this site uses, with their licenses.`,
    index: false,
  },
} satisfies Record<string, PageEntry>;

export type PagePath = keyof typeof pageMeta;

const build = (path: string, entry: PageEntry): Metadata => {
  const ogTitle = entry.ogTitle ?? `${entry.title} | ${profile.fullName}`;
  return {
    // Absolute, because a parent layout's own title stops the root template
    // from reaching nested pages like /projects/<slug>.
    title: { absolute: entry.fullTitle ?? `${entry.title} | ${profile.name}` },
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: path },
    openGraph: { title: ogTitle, description: entry.description, url: path },
    twitter: { card: "summary_large_image", title: ogTitle, description: entry.description },
    ...(entry.index === false && { robots: { index: false, follow: true } }),
  };
};

/** Metadata for one of the fixed pages. */
export const metaFor = (path: PagePath): Metadata => build(path, pageMeta[path]);

/** Metadata for a project page, from its entry in projectId.ts. */
export const projectMeta = (slug: string): Metadata => {
  const detail = projectDetail[slug];
  if (!detail) return { title: { absolute: `Page not found | ${profile.name}` }, robots: { index: false, follow: true } };

  const tech = projects.find((p) => p.slug === slug)?.technologies ?? [];
  const kind = detail.game ? "game" : "project";

  // Lead the description with the project's own summary, then name the stack,
  // which is what most "<tech> game project" style searches match on.
  const description = tech.length
    ? `${detail.desc.slice(0, 200)} Built with ${tech.join(", ")}.`
    : detail.desc.slice(0, 260);

  const meta = build(`/projects/${slug}`, {
    title: detail.title,
    description,
    ogTitle: `${detail.title} - a ${kind} by ${profile.name}`,
    keywords: projectKeywords(slug),
  });
  // No `images` here on purpose: opengraph-image.tsx in the project folder
  // generates a per-project card, and an explicit images array would override it.
  return { ...meta, openGraph: { ...meta.openGraph, type: "website" } };
};
