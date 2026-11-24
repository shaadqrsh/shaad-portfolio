import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("/about");

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
