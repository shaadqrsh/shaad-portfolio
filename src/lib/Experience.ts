import resumeData from "./resume_data.json";
import { img } from "./images";

export const experience = resumeData.experience.map((e) => ({
  ...e,
  image: img(e.image),
}));
