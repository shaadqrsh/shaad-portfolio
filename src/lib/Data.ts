import resumeData from "./resume_data.json";

export const name = resumeData.name;
export const fullName = resumeData.fullName;
export const title = resumeData.title;

export const homePara = resumeData.summary;
export const whoAmI = resumeData.about;
// Years, Projects and Jams are counted from the data (see stats.ts); the rest
// are typed in resume_data.json.
export { stats as testimonials } from "./stats";
