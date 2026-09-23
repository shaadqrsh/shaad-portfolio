# Shaad Qureshi - Portfolio

Source for [shaadqrsh.com](https://www.shaadqrsh.com), my personal portfolio as a game developer. It's a Next.js 16 / React 19 site with animated pages, a page for each project, and a machine-readable layer (JSON-LD, `llms.txt`, JSON endpoints) so recruiters, crawlers, and AI agents can read it without scraping the client-rendered HTML.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack) with React 19 and TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css`
- **Animation**: [Motion](https://motion.dev/), [React Spring Parallax](https://react-spring.dev/), `react-scroll-parallax`
- **UI**: [Radix UI](https://www.radix-ui.com/) primitives, Embla Carousel, Lucide icons
- **Hosting & Analytics**: Vercel, `@vercel/analytics`

## Pages

| Route | What it shows |
| --- | --- |
| `/home` | Landing page (`/` redirects here) |
| `/about` | Bio, skills, experience, game jams & hackathons, education, publications, certifications |
| `/projects` | All projects, grouped into collapsible categories |
| `/projects/[project]` | Project page: description, features, tech stack, responsibilities, videos, screenshots, and notes |
| `/resume` | Embedded resume PDF with a download button |

Every route has its own generated OpenGraph image, so links shared on Discord, WhatsApp, iMessage, LinkedIn, etc. show a proper preview card.

## Project Structure

```text
shaad-portfolio/
├── src/
│   ├── app/
│   │   ├── (main)/              # home, about, projects, projects/[project]
│   │   ├── resume/              # resume viewer
│   │   ├── api/                 # profile.json, projects.json, resume.json
│   │   ├── llms.txt/            # llms.txt route
│   │   ├── sitemap.ts, robots.ts
│   │   └── opengraph-image.tsx  # default social preview card
│   ├── components/
│   │   ├── sections/            # About page sections (Skills, Experience, Jams, ...)
│   │   ├── projects/            # Project page pieces (cover, screenshots, videos, tech)
│   │   └── ui/                  # Shared primitives (button, card, carousel, dialog)
│   ├── lib/
│   │   ├── resume_data.json     # Single source of truth for site content
│   │   ├── projectId.ts         # Long-form detail for each project page
│   │   ├── agentProfile.ts      # Flattened profile used by every machine-readable surface
│   │   └── ...                  # Typed adapters (Experience, Skills, Jams, ...), OG + JSON-LD helpers
│   └── types.ts
└── public/
    ├── project_<url>/           # cover.png, icon.png, img_1.png ... img_N.png per project
    ├── jams/, skills/, about/   # Section icons and images
    ├── resume.pdf               # Resume served on the site (generated)
    └── resume_gen/
        ├── scripts/
        │   ├── generate_resume.py     # resume_data.json -> resume.html -> resume.pdf
        │   ├── generate_pdf.py        # HTML -> single-page A4 PDF via headless Chromium
        │   ├── check_requirements.py  # Installs missing Python deps + Chromium on first run
        │   └── requirements.txt
        └── templates/
            ├── resume_template.html
            └── cover_letter_template.html
```

## Content

Almost everything on the site is read from [src/lib/resume_data.json](src/lib/resume_data.json): name, bio, nav links, experience, education, publications, certifications, jams, skills, project list, and project category order. The files in `src/lib/` are thin typed adapters over that JSON.

### Adding a project

1. Add an entry to `projects` in `resume_data.json`. Its `url` field becomes the route (`/projects/<url>`).
2. Add a matching key to `data` in [src/lib/projectId.ts](src/lib/projectId.ts) with the description, features, technologies, responsibilities, videos, and extra notes.
3. Create `public/project_<url>/` containing `cover.png`, `icon.png`, and screenshots named `img_1.png`, `img_2.png`, and so on.

You don't need to record a screenshot count anywhere. [next.config.ts](next.config.ts) scans the `project_*` folders at build time and inlines the counts, stopping at the first gap in the `img_N.png` sequence so a missing file never becomes a broken image. The sitemap, `llms.txt`, JSON endpoints, and JSON-LD all pick up the new project automatically.

## Resume Generation

The resume is built from the same `resume_data.json` as the website, so the two never drift apart.

```bash
npm run resume
```

This runs [generate_resume.py](public/resume_gen/scripts/generate_resume.py), which:

1. Loads `src/lib/resume_data.json` and maps it to the resume's format (strips icons/images, keeps LinkedIn, Website, and Email as the contact links).
2. Fills in [resume_template.html](public/resume_gen/templates/resume_template.html) and writes `public/resume.html`.
3. Converts that HTML into `public/resume.pdf`, which the site serves at `/resume.pdf`. Visitors who click download get it saved as `{name} - Resume.pdf`.

### Zero-setup Python

Every script calls [check_requirements.py](public/resume_gen/scripts/check_requirements.py) first. It checks [requirements.txt](public/resume_gen/scripts/requirements.txt) (`pyyaml`, `python-dotenv`, `playwright`, `pypdf`), pip-installs anything missing, and downloads Playwright's headless Chromium. All you need is Python 3.8+.

### One-page PDF scaling

[generate_pdf.py](public/resume_gen/scripts/generate_pdf.py) prints the HTML to an A4 PDF in headless Chromium. If the full-scale render runs past one page, it binary-searches the print scale (between 0.1 and 2.0, stopping at a 0.005 window) for the largest value that still fits on exactly one page. Content changes never mean hand-tuning margins or font sizes.

Run it directly to batch-convert any `resume.html` / `cover_letter.html` files in `public/resume_gen/` and one folder below it. The cover letter layout lives in [cover_letter_template.html](public/resume_gen/templates/cover_letter_template.html).

## Machine-Readable Data

The site is client-rendered, so it also publishes its content in forms that are easy to parse:

- **`/llms.txt`**: the whole portfolio as one Markdown document, following the [llmstxt.org](https://llmstxt.org) convention
- **`/api/profile.json`**: the full profile (experience, education, projects, skills, and more)
- **`/api/projects.json`**: just the projects, with full detail
- **`/api/resume.json`**: a [JSON Resume](https://jsonresume.org) v1.0.0 export for resume parsers
- **JSON-LD**: a Schema.org `Person` graph in every page's `<head>`
- **`/sitemap.xml`** and **`/robots.txt`**: generated from the same data. `robots.txt` explicitly allows the major AI crawlers.

All of these are statically generated and built from [src/lib/agentProfile.ts](src/lib/agentProfile.ts), so editing the JSON updates every one of them.

### Site URL

Absolute URLs (OG images, sitemap, JSON-LD) are resolved in [src/lib/siteUrl.ts](src/lib/siteUrl.ts), in this order: `NEXT_PUBLIC_SITE_URL`, `websiteUrl` in `resume_data.json`, Vercel's production domain, then the per-deployment Vercel URL. The canonical domain is deliberately checked before the per-deployment URL: per-deployment URLs sit behind Vercel's login wall, which breaks social preview images.

## Getting Started

**Prerequisites:** Node.js and npm, plus Python 3.8+ if you want to regenerate the resume

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run resume` | Regenerate `public/resume.html` and `public/resume.pdf` from `resume_data.json` |

The site is deployed on Vercel (see [vercel.json](vercel.json)).

## Credits

- **Design**: UI and website design by [Hardik Malhotra](https://hardik-malhotra.vercel.app).
