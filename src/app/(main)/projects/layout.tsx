import type { Metadata } from "next";
import { keywords, profile, projects } from "@/lib/agentProfile";

const description =
    `Games and software built by ${profile.fullName}, including ` +
    `${projects.slice(0, 4).map((p) => p.title).join(", ")} and more. ` +
    `Built with ${keywords.skills.slice(0, 6).join(", ")}.`;

export const metadata: Metadata = {
    title: "Projects",
    description,
    keywords: [...keywords.projects, ...keywords.skills, ...keywords.roles],
    alternates: { canonical: "/projects" },
    openGraph: { title: `Projects | ${profile.fullName}`, description, url: "/projects" },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
