import type { Metadata } from "next";
import { keywords, profile } from "@/lib/agentProfile";

export const metadata: Metadata = {
    title: "Home",
    description: profile.summary,
    keywords: [...keywords.identity, ...keywords.roles],
    alternates: { canonical: "/home" },
    openGraph: {
        title: `${profile.fullName} | ${profile.headline}`,
        description: profile.summary,
        url: "/home",
    },
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
