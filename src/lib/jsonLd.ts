import {
  certifications,
  education,
  experience,
  profile,
  projects,
  publications,
  skills,
} from "./agentProfile";
import { abs } from "./siteUrl";
import { img, projectImg } from "./images";

/**
 * JSON for a <script type="application/ld+json"> tag. Plain JSON.stringify
 * leaves "</script>" alone, so a title containing it would end the tag early
 * and the rest would run as HTML. Escaping "<" (and the two line separators
 * that old JS parsers treat as newlines) keeps the JSON identical once parsed.
 */
export const jsonLdHtml = (data: unknown) =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

/**
 * Schema.org graph embedded in every page's <head>. This is what Google,
 * Bing, and most recruiter-side enrichment tools read first, and it is the
 * description most of them trust over the page text.
 */
export const personJsonLd = () => {
  const [city, region] = profile.location.split(",").map((s) => s.trim());

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": abs("/#person"),
        name: profile.fullName,
        alternateName: profile.name,
        jobTitle: profile.headline,
        description: profile.summary,
        email: profile.contact.email
          ? `mailto:${profile.contact.email}`
          : undefined,
        url: profile.url,
        image: abs(img("/icon")),
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: region,
          addressCountry: "US",
        },
        sameAs: profile.profiles.map((p) => p.url),
        knowsAbout: [
          ...skills.primary.map((s) => s.name),
          ...skills.technical,
          ...skills.professional,
        ],
        alumniOf: education
          .filter((e) => e.institution)
          .map((e) => ({
            "@type": "EducationalOrganization",
            name: e.institution,
          })),
        hasOccupation: experience.map((job) => ({
          "@type": "Occupation",
          name: job.role,
          description: job.highlights.join(" "),
        })),
        hasCredential: certifications.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert.title,
          recognizedBy: { "@type": "Organization", name: cert.issuer },
          url: cert.url,
        })),
        subjectOf: publications.map((pub) => ({
          "@type": "ScholarlyArticle",
          headline: pub.title,
          publisher: { "@type": "Organization", name: pub.venue },
          datePublished: pub.date,
          url: pub.url,
        })),
      },
      {
        "@type": "WebSite",
        "@id": abs("/#website"),
        url: profile.url,
        name: `${profile.fullName} — Portfolio`,
        description: profile.summary,
        author: { "@id": abs("/#person") },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        "@id": abs("/projects#list"),
        name: `Projects by ${profile.fullName}`,
        numberOfItems: projects.length,
        itemListElement: projects.map((proj, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: proj.title,
          url: proj.url,
        })),
      },
      ...projects.map((proj) => ({
        "@type": proj.type === "game" ? "VideoGame" : "SoftwareApplication",
        "@id": `${proj.url}#project`,
        name: proj.title,
        description: proj.description || proj.summary,
        url: proj.url,
        image: abs(projectImg(proj.slug, "icon")),
        dateCreated: proj.date,
        author: { "@id": abs("/#person") },
        applicationCategory:
          proj.type === "game" ? "GameApplication" : "WebApplication",
        keywords: proj.technologies.join(", "),
      })),
    ],
  };
};

/**
 * Breadcrumbs for a project page, Home > Projects > the project, matching the
 * trail shown at the top of the page. Search results show it under the link.
 */
export const projectBreadcrumbJsonLd = (slug: string, title: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: abs("/home") },
    { "@type": "ListItem", position: 2, name: "Projects", item: abs("/projects") },
    { "@type": "ListItem", position: 3, name: title, item: abs(`/projects/${slug}`) },
  ],
});
