import resumeData from "./resume_data.json";

interface CategoryConfig {
  name: string;
  minimizedByDefault: boolean;
}

export const categoryOrder: CategoryConfig[] = resumeData.categoryOrder;

const projects = resumeData.projects;

/**
 * Projects with a "featured" rank, in that order. The home page shows the
 * first three; the resume generator lists the first counts.projects.
 */
export const featuredProjects = projects
  .filter((p): p is typeof p & { featured: number } => typeof (p as { featured?: number }).featured === "number")
  .sort((a, b) => a.featured - b.featured);

export default projects;
