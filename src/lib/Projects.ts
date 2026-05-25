import resumeData from "./resume_data.json";

interface CategoryConfig {
  name: string;
  minimizedByDefault: boolean;
}

export const categoryOrder: CategoryConfig[] = resumeData.categoryOrder;

const projects = resumeData.projects;

export default projects;