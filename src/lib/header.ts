import {
  Github,
  House,
  Joystick,
  Linkedin,
  Mail,
  Twitter,
  User,
} from "lucide-react";
import resumeData from "./resume_data.json";

const iconMap = {
  House,
  User,
  Joystick,
  Linkedin,
  Twitter,
  Github,
  Mail,
};

export const headers = resumeData.headers.map((h) => ({
  ...h,
  icon: iconMap[h.icon as keyof typeof iconMap],
}));

export const links = resumeData.links.map((l) => ({
  ...l,
  label: iconMap[l.label as keyof typeof iconMap],
}));

export const eduEmail = resumeData.eduEmail;
export const websiteUrl = resumeData.websiteUrl;
