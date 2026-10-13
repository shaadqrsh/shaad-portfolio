import resumeData from "./resume_data.json";
import { img } from "./images";

export const education = resumeData.education.map((e) => ({
  ...e,
  image: img(e.image),
}));
