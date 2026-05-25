import resumeData from "./resume_data.json";

export const name = resumeData.name;
export const fullName = resumeData.fullName;
export const title = resumeData.title;

export const maxWorkExperienceCount = resumeData.counts.workExperience;
export const maxProjectsCount = resumeData.counts.projects;
export const maxEducationCount = resumeData.counts.education;
export const maxCertificatesCount = resumeData.counts.certificates;
export const maxSkillsCount = resumeData.counts.skills;
export const maxPublicationsCount = resumeData.counts.publications;

export const homePara = resumeData.summary;
export const whoAmI = resumeData.about;
export const testimonials = resumeData.testimonials;
