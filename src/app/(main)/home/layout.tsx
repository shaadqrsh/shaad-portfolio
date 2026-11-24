import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("/home");

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
