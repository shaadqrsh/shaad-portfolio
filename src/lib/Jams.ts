import resumeData from "./resume_data.json";

export interface Jam {
  title: string;
  date: string;
  icon: string;
  bullets: string[];
  project?: string;
  url?: string;
}

export const Jams: Jam[] = resumeData.jams;
