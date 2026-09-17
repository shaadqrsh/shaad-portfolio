import type { Metadata } from "next";
import { keywords, profile } from "@/lib/agentProfile";
import ResumeView from "./ResumeView";

const description =
    `Resume of ${profile.fullName}, ${profile.headline} based in ` +
    `${profile.location}. Download as PDF.`;

export const metadata: Metadata = {
    title: "Resume",
    description,
    keywords: [
        ...keywords.identity.map((k) => `${k} resume`),
        ...keywords.roles,
        ...keywords.skills,
    ],
    alternates: { canonical: "/resume" },
    openGraph: { title: `Resume | ${profile.fullName}`, description, url: "/resume" },
};

export default function Page() {
    return <ResumeView />;
}
