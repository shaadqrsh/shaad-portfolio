import {
  certifications,
  education,
  experience,
  profile,
  projects,
  publications,
  skills,
} from "@/lib/agentProfile";

export const dynamic = "force-static";

/**
 * JSON Resume (jsonresume.org) v1.0.0 export. Recruiter-side parsers and
 * resume-ingestion tools already understand this schema, so it is worth
 * emitting alongside the site's own shape in /api/profile.json.
 */
export async function GET() {
  const [city, region] = profile.location.split(",").map((s) => s.trim());

  const body = {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: profile.fullName,
      label: profile.headline,
      email: profile.contact.email,
      url: profile.url,
      summary: profile.about,
      location: { city, region, countryCode: "US" },
      profiles: profile.profiles.map((p) => ({
        network: p.network,
        url: p.url,
        username: p.url.replace(/\/$/, "").split("/").pop(),
      })),
    },
    work: experience.map((job) => ({
      name: job.organization,
      position: job.role,
      startDate: job.start,
      endDate: job.end,
      highlights: job.highlights,
    })),
    education: education.map((edu) => ({
      institution: edu.institution,
      area: edu.credential,
      studyType: edu.credential.split(" - ")[0],
      startDate: edu.start,
      endDate: edu.end,
      score: edu.grade,
    })),
    projects: projects.map((proj) => ({
      name: proj.title,
      description: proj.description || proj.summary,
      highlights: proj.contributions,
      keywords: proj.technologies,
      startDate: proj.date,
      url: proj.url,
      type: proj.type,
    })),
    publications: publications.map((pub) => ({
      name: pub.title,
      publisher: pub.venue,
      releaseDate: pub.date,
      url: pub.url,
    })),
    certificates: certifications.map((cert) => ({
      name: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      url: cert.url,
    })),
    skills: [
      {
        name: "Game Development",
        keywords: skills.primary.map((s) => s.name),
      },
      { name: "Technical", keywords: skills.technical },
      { name: "Professional", keywords: skills.professional },
    ],
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
