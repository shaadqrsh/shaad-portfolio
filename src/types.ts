export type projectData = {
  title: string;
  year: string;
  game: boolean;
  imgCount: number;
  urls: { label: string; icon: string; url: string }[];
  desc: string;
  features: { heading: string; content: string }[];
  technologies: { name: string; icon: string }[];
  responsibilities: string[];
  videos: string[];
  additional: string[];
};

export interface ProjectIdPageProps {
  project: projectData;
  url?: string;
}













