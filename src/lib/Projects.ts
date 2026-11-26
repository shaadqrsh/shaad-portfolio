import resumeData from "./resume_data.json";

/**
 * The projects the site shows. A record with `"hidden": true` stays in
 * resume_data.json for the resume generator and the GitHub profile README, but
 * gets no card, page, preview image, sitemap entry or agent-endpoint listing.
 * Everything on the site reads projects from here, never from the JSON.
 */
const projects = resumeData.projects.filter((p) => !("hidden" in p && p.hidden));

/**
 * Projects with a "featured" rank, in that order. The home page shows the
 * first three. The resume picks RESUME_COUNTS['projects'] of them (see
 * resume_projects in generate_resume.py).
 */
export const featuredProjects = projects
  .filter((p): p is typeof p & { featured: number } => typeof (p as { featured?: number }).featured === "number")
  .sort((a, b) => a.featured - b.featured);

export default projects;
