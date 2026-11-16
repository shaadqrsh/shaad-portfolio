import resumeData from "./resume_data.json";
import { img } from "./images";

export interface Jam {
  title: string;
  date: string;
  /** "Game Jam", "Hackathon" or "Challenge". The About page's filter groups everything that isn't a game jam. */
  kind: string;
  /** Placement or rating, e.g. "1st of 46". Optional. */
  result?: string;
  icon: string;
  bullets: string[];
  project?: string;
  url?: string;
}

export const Jams: Jam[] = resumeData.jams.map((j) => ({ ...j, icon: img(j.icon) }));
