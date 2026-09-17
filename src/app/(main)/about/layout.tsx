import type { Metadata } from "next";
import { keywords, profile } from "@/lib/agentProfile";

export const metadata: Metadata = {
    title: "About",
    // The about page carries the skills content, so lead its description with
    // the long-form bio and key its keywords to skills and education.
    description: profile.about.slice(0, 300),
    keywords: [...keywords.identity, ...keywords.skills],
    alternates: { canonical: "/about" },
    openGraph: {
        title: `About ${profile.fullName}`,
        description: profile.about.slice(0, 300),
        url: "/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
