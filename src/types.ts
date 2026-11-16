export type projectData = {
  title: string;
  date: string;
  game: boolean;
  urls: { label: string; icon: string; url: string }[];
  desc: string;
  features: { heading: string; content: string }[];
  technologies: { name: string; icon: string }[];
  responsibilities: string[];
  /** One caption per screenshot, in order: captions[0] describes img_1. */
  captions: string[];
  /** YouTube videos. Title and channel come from YouTube's oEmbed data. */
  videos: { url: string; title: string; channel: string }[];
  additional: string[];
};

export interface ProjectIdPageProps {
  project: projectData;
  url?: string;
}













