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

/**
 * Schema.org graph embedded in every page's <head>. This is what Google,
 * Bing, and most recruiter-side enrichment tools read first, and it is the
 * only structured description that survives the site being client-rendered.
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
        image: abs("/icon.png"),
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
        // Gives search results the Home › Projects hierarchy rather than a
        // bare URL under each listing.
        "@type": "BreadcrumbList",
        "@id": abs("/#breadcrumbs"),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/home") },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: abs("/projects"),
          },
        ],
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
        image: abs(`/project_${proj.slug}/icon.png`),
        dateCreated: proj.date,
        author: { "@id": abs("/#person") },
        applicationCategory:
          proj.type === "game" ? "GameApplication" : "WebApplication",
        keywords: proj.technologies.join(", "),
        ...(proj.type === "game" ? { genre: proj.category } : {}),
      })),
    ],
  };
};
