import fs from "fs";
import path from "path";
import { metaFor } from "@/lib/pageMeta";
import ResumeView from "./ResumeView";

export const metadata = metaFor("/resume");

// Built once, so the PDF is read at build time.
export const dynamic = "force-static";

/**
 * When the PDF was last generated, from its own CreationDate. The generator
 * rewrites the file each time, so this is the date the resume last changed.
 */
function pdfDate(): string | null {
    try {
        const pdf = fs.readFileSync(path.join(process.cwd(), "public", "resume.pdf"), "latin1");
        const m = /\/CreationDate\s*\(D:(\d{4})(\d{2})(\d{2})/.exec(pdf);
        if (!m) return null;
        // Day/month/year, the format the rest of the site's dates use.
        return `${m[3]}/${m[2]}/${m[1]}`;
    } catch {
        return null;
    }
}

export default function Page() {
    return <ResumeView updated={pdfDate()} />;
}
