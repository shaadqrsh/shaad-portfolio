import resumeData from "./resume_data.json";

export const name = resumeData.name;
export const fullName = resumeData.fullName;
export const title = resumeData.title;

export const homePara = resumeData.summary;
export const whoAmI = resumeData.about;
// Stats the data can count are counted from it, so they never go stale. The
// rest (years, clients) are typed in resume_data.json.
const counted: Record<string, number> = { Jams: resumeData.jams.length };
export const testimonials = resumeData.testimonials.map((t) =>
  t.label in counted ? { ...t, count: String(counted[t.label]) } : t
);
