import resumeData from "./resume_data.json";
import { img } from "./images";

export interface Jam {
  title: string;
  date: string;
  icon: string;
  bullets: string[];
  project?: string;
  url?: string;
}

export const Jams: Jam[] = resumeData.jams.map((j) => ({ ...j, icon: img(j.icon) }));
