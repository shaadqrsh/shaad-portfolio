# Shaad Qureshi's portfolio

This is the source for [shaadqrsh.com](https://www.shaadqrsh.com), my portfolio as a game developer. It's a Next.js 16 and React 19 site with animated pages and a page for each project. The site renders on the client, so it also publishes its content as JSON-LD, `llms.txt`, and plain JSON endpoints that recruiters, crawlers, and AI agents can read without scraping the HTML.

Nearly everything, the resume PDF included, comes from one file: [src/lib/resume_data.json](src/lib/resume_data.json). Most of this README is about how that file becomes the site and the resume.

## Running it locally

You need Node.js and npm. Python 3.8+ only matters if you want to build the resume yourself.

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

The live site is hosted on Vercel, with its settings in [vercel.json](vercel.json).

## What's in here

The site uses the [Next.js](https://nextjs.org/) App Router with Turbopack, TypeScript, and [Tailwind CSS v4](https://tailwindcss.com/) with `tw-animate-css`. Animation comes from [Motion](https://motion.dev/), [React Spring Parallax](https://react-spring.dev/) and `react-scroll-parallax`. The UI is built on [Radix UI](https://www.radix-ui.com/) primitives, Embla Carousel and Lucide icons, and analytics go through `@vercel/analytics`.

| Route | What it shows |
| --- | --- |
| `/home` | Landing page (`/` redirects here) |
| `/about` | Bio, skills, experience, game jams & hackathons, education, publications, certifications |
| `/projects` | All projects, grouped into collapsible categories |
| `/projects/[project]` | Project page: description, features, tech stack, responsibilities, videos, screenshots, and notes |
| `/resume` | Embedded resume PDF with a download button |

Each route generates its own OpenGraph image, so a link pasted into Discord, WhatsApp, iMessage or LinkedIn shows a proper preview card.

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

## Editing content

`resume_data.json` holds the name, bio, nav links, experience, education, publications, certifications, jams, skills, the project list, and the order of project categories. The files in `src/lib/` are thin typed adapters over it. When you edit the JSON, the pages, the resume, and the machine-readable data all follow.

### Adding a project

1. Add an entry to `projects` in `resume_data.json`. Its `url` field becomes the route (`/projects/<url>`).
2. Add a matching key to `data` in [src/lib/projectId.ts](src/lib/projectId.ts) with the description, features, technologies, responsibilities, videos, and extra notes.
3. Create `public/project_<url>/` with `cover.png`, `icon.png`, and screenshots named `img_1.png`, `img_2.png`, and so on.

You don't have to record how many screenshots there are. [next.config.ts](next.config.ts) scans the `project_*` folders at build time and inlines the counts. It stops at the first gap in the `img_N.png` sequence, so a missing file can't turn into a broken image.

After that, pushing is enough. The sitemap, `llms.txt`, the JSON endpoints and the JSON-LD pick up the new project on their own, and the resume gets a link to its page.

### Skills

Every skill in `top3`, `main` and `other` needs a `category`. The resume prints one line per category, like `Languages & Frameworks: C#, C++, ...`. Categories appear in the order of their first skill, and skills keep their order from the JSON, so reordering skills on the site reorders them on the resume too. If a skill has no `category`, the build fails instead of leaving that skill off the resume.

## The resume

The resume is generated from the same `resume_data.json` as the site, which keeps the two in sync. You don't build it by hand for the live site; a GitHub Action does that on push.

### How the PDF is built

[generate_resume.py](public/resume_gen/scripts/generate_resume.py) does three things:

1. Loads `src/lib/resume_data.json` and maps it to the resume's format. It strips icons and images, keeps LinkedIn, Website and Email as the contact links, and groups skills by `category`.
2. Fills in [resume_template.html](public/resume_gen/templates/resume_template.html) and writes `public/resume.html`.
3. Converts that HTML into `public/resume.pdf`, which the site serves at `/resume.pdf`. Visitors who click download get it saved as `{name} - Resume.pdf`.

The conversion happens in [generate_pdf.py](public/resume_gen/scripts/generate_pdf.py), which prints the HTML to an A4 PDF in headless Chromium. If the full-size render runs past one page, it binary-searches the print scale between 0.1 and 1.0 (stopping at a 0.005 window) for the largest value that still fits on one page. It never scales up, so a resume that fits at full size prints at full size, and adding content never means hand-tuning margins or font sizes.

The PDF keeps real hyperlinks, which some studios ask for on application resumes. Each project title links to its page on the site, `<websiteUrl>/projects/<url>`, using the same `url` field that names the route. If `url` is already a full `http(s)://` address, it's used as is, so a project can point somewhere else. Only the title is linked and no address is printed next to it, which means a resume parser reads exactly the same text. The LinkedIn, website and email lines in the header are clickable too (`mailto:` for the email). The cover letter template links the same lines in its header and signature, along with any of them quoted in the letter itself. Links are blue on screen and look like ordinary text in a black-and-white print.

### How it gets deployed

On every push to `main`, the [Regenerate resume](.github/workflows/resume.yml) Action checks whether the resume changed. If it did, the Action runs `generate_resume.py`, commits the new `public/resume.pdf` back to `main`, and Vercel deploys that commit. You can also start the Action by hand from the repo's Actions tab.

Whether the resume changed is decided by [resume_fingerprint.py](.github/scripts/resume_fingerprint.py). It hashes the HTML the generator would write together with the PDF script, and compares that with the fingerprint the committed PDF was built from (`.github/resume-fingerprint`). Site-only edits, such as images, testimonials or the About text, leave the fingerprint alone, so those pushes deploy normally with no bot commit.

Vercel runs the same script as its [ignored build step](vercel.json). When a push changes the resume, Vercel skips that push and deploys the Action's commit instead, so the site changes and the new PDF go live in a single deployment. The downside is that if the Action fails, the push won't deploy until it's fixed. To deploy anyway, put `[force deploy]` in a commit message.

### Building it yourself

To preview the PDF locally, run `python public/resume_gen/scripts/generate_resume.py`. You don't need to commit the output, since the Action rebuilds it.

Each script calls [check_requirements.py](public/resume_gen/scripts/check_requirements.py) first. It checks [requirements.txt](public/resume_gen/scripts/requirements.txt) (`pyyaml`, `python-dotenv`, `playwright`, `pypdf`), pip-installs whatever is missing, and downloads Playwright's headless Chromium if it had to install Playwright. Python 3.8+ is all you need to start.

You can also run `generate_pdf.py` on its own to batch-convert any `resume.html` or `cover_letter.html` files in `public/resume_gen/` and one folder below it. The cover letter layout is in [cover_letter_template.html](public/resume_gen/templates/cover_letter_template.html).

## Machine-readable data

Since the pages render on the client, the site also publishes its content in formats that are easy to parse:

- `/llms.txt` is the whole portfolio as one Markdown document, following the [llmstxt.org](https://llmstxt.org) convention.
- `/api/profile.json` has the full profile: experience, education, projects, skills and the rest.
- `/api/projects.json` has only the projects, in full detail.
- `/api/resume.json` is a [JSON Resume](https://jsonresume.org) v1.0.0 export for resume parsers.
- Every page's `<head>` carries a Schema.org `Person` graph as JSON-LD.
- `/sitemap.xml` and `/robots.txt` are generated from the same data, and `robots.txt` explicitly allows the major AI crawlers.

All of these are statically generated from [src/lib/agentProfile.ts](src/lib/agentProfile.ts), so they update whenever the JSON does.

Absolute URLs (OG images, the sitemap, JSON-LD) are resolved in [src/lib/siteUrl.ts](src/lib/siteUrl.ts). It tries `NEXT_PUBLIC_SITE_URL` first, then `websiteUrl` in `resume_data.json`, then Vercel's production domain, and finally the per-deployment Vercel URL. The per-deployment URL comes last on purpose: those URLs sit behind Vercel's login wall, which breaks social preview images.

## Credits

The UI and website design are by [Hardik Malhotra](https://hardik-malhotra.vercel.app).
