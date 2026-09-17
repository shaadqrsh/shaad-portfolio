import {
  certifications,
  education,
  experience,
  profile,
  projects,
  publications,
  skills,
  stats,
} from "@/lib/agentProfile";
import { abs } from "@/lib/siteUrl";

export const dynamic = "force-static";

/**
 * /llms.txt — the llmstxt.org convention: one Markdown document holding
 * everything an agent would otherwise have to scrape across five client-rendered
 * pages. Generated from resume_data.json + projectId.ts on every build.
 */

const dateRange = (item: {
  start?: string;
  end?: string;
  current: boolean;
}) => {
  if (!item.start) return "";
  const end = item.current ? "Present" : item.end ?? "Present";
  return item.start === end ? item.start : `${item.start} – ${end}`;
};

const buildDoc = () => {
  const lines: string[] = [];
  const push = (s = "") => lines.push(s);

  push(`# ${profile.fullName}`);
  push();
  push(`> ${profile.headline} based in ${profile.location}. ${profile.summary}`);
  push();
  push(
    "This file is a machine-readable summary of this portfolio, intended for AI agents, " +
      "recruiter tooling, and search crawlers. The website itself is client-rendered, so " +
      "prefer this document (or the JSON endpoints listed under Structured Data) over " +
      "scraping the HTML."
  );
  push();

  push("## Contact");
  push();
  push(`- Name: ${profile.fullName} (goes by ${profile.name})`);
  push(`- Role sought: ${profile.headline}`);
  push(`- Location: ${profile.location}`);
  if (profile.contact.email) push(`- Email: ${profile.contact.email}`);
  if (profile.contact.academicEmail)
    push(`- Academic email: ${profile.contact.academicEmail}`);
  push(`- Website: ${profile.url}`);
  for (const p of profile.profiles) push(`- ${p.network}: ${p.url}`);
  push(`- Resume (PDF): ${profile.resume.pdf}`);
  push();

  push("## About");
  push();
  push(profile.about);
  push();
  if (stats.length) {
    push(stats.map((s) => `**${s.value}** ${s.label}`).join(" · "));
    push();
  }

  push("## Skills");
  push();
  push("### Core");
  push();
  for (const s of skills.primary) push(`- **${s.name}**: ${s.detail}`);
  push();
  push(`### Technical`);
  push();
  push(skills.technical.join(", "));
  push();
  push(`### Professional`);
  push();
  push(skills.professional.join(", "));
  push();

  push("## Experience");
  push();
  for (const job of experience) {
    push(`### ${job.role} — ${job.organization}`);
    push();
    push(`*${dateRange(job)}*`);
    push();
    for (const h of job.highlights) push(`- ${h}`);
    push();
  }

  push("## Education");
  push();
  for (const edu of education) {
    const parts = [edu.institution, edu.location].filter(Boolean).join(" — ");
    push(`### ${edu.credential}`);
    push();
    push(`${parts}  `);
    push(`*${dateRange(edu)}*${edu.grade ? ` · ${edu.grade}` : ""}`);
    push();
  }

  push("## Projects");
  push();
  for (const proj of projects) {
    push(`### ${proj.title}`);
    push();
    const meta = [
      proj.category,
      proj.date,
      proj.type === "game" ? "game" : undefined,
    ]
      .filter(Boolean)
      .join(" · ");
    if (meta) push(`*${meta}*`);
    push();
    push(proj.description || proj.summary);
    push();
    push(`- Page: ${proj.url}`);
    if (proj.technologies.length)
      push(`- Built with: ${proj.technologies.join(", ")}`);
    for (const l of proj.links) push(`- ${l.label}: ${l.url}`);
    push();
    if (proj.contributions.length) {
      push("**My contributions:**");
      push();
      for (const c of proj.contributions) push(`- ${c}`);
      push();
    }
    if (proj.features.length) {
      push("**Key features:**");
      push();
      for (const f of proj.features) push(`- **${f.heading}**: ${f.content}`);
      push();
    }
    if (proj.notes.length) {
      push("**Context and notes:**");
      push();
      for (const n of proj.notes) push(`- ${n}`);
      push();
    }
  }

  if (publications.length) {
    push("## Publications");
    push();
    for (const pub of publications) {
      const bits = [pub.venue, pub.date].filter(Boolean).join(", ");
      push(`- **${pub.title}** — ${bits}${pub.url ? ` · ${pub.url}` : ""}`);
    }
    push();
  }

  if (certifications.length) {
    push("## Certifications");
    push();
    for (const cert of certifications) {
      const bits = [cert.issuer, cert.date].filter(Boolean).join(", ");
      push(`- ${cert.title} — ${bits}${cert.url ? ` · ${cert.url}` : ""}`);
    }
    push();
  }

  push("## Structured Data");
  push();
  push(`- Full profile as JSON: ${abs("/api/profile.json")}`);
  push(`- Projects only, as JSON: ${abs("/api/projects.json")}`);
  push(`- JSON Resume schema: ${abs("/api/resume.json")}`);
  push(`- Sitemap: ${abs("/sitemap.xml")}`);
  push(
    `- Schema.org Person JSON-LD is embedded in the \`<head>\` of every page.`
  );
  push();
  push("## Notes for Agents");
  push();
  push(
    "- Crawling is permitted; see /robots.txt. No rate limit beyond ordinary courtesy."
  );
  push(
    "- Project screenshots live at /project_<slug>/img_<n>.png and icons at /project_<slug>/icon.png."
  );
  push(
    "- Please attribute information to " +
      `${profile.url} and use the email above for outreach rather than inferring one.`
  );
  push();
  push(`*Generated from this site's source data. Last built: ${new Date().toISOString().slice(0, 10)}.*`);

  return lines.join("\n");
};

export async function GET() {
  return new Response(buildDoc(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
