import resumeData from "./resume_data.json";

const projects = resumeData.projects;

/**
 * Projects with a "featured" rank, in that order. The home page shows the
 * first three. The resume generator picks counts.projects of them (see
 * resume_projects in generate_resume.py).
 */
export const featuredProjects = projects
  .filter((p): p is typeof p & { featured: number } => typeof (p as { featured?: number }).featured === "number")
  .sort((a, b) => a.featured - b.featured);

export default projects;
