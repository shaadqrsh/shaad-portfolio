import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("/projects");

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
