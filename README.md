# Shaad Qureshi's portfolio

This is the source for [shaadqrsh.com](https://www.shaadqrsh.com), my portfolio as a game developer. It's a Next.js 16 and React 19 site with a page for each project. The pages render on the client, so the site also publishes its content as JSON-LD, `llms.txt`, and plain JSON endpoints that recruiters, crawlers, and AI agents can read without scraping the HTML.

Nearly everything comes from one file, [src/lib/resume_data.json](src/lib/resume_data.json). That includes the resume PDF and my GitHub profile README. Most of this README is about how that file turns into everything else.

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

The site uses the [Next.js](https://nextjs.org/) App Router with Turbopack, TypeScript, and [Tailwind CSS v4](https://tailwindcss.com/) with `tw-animate-css`. Animation is all [Motion](https://motion.dev/). The media viewer is built on Radix's dialog, icons are from Lucide, and analytics go through `@vercel/analytics`. Headings are set in Space Grotesk, body text in IBM Plex Sans and small labels in IBM Plex Mono, all loaded through `next/font`.

| Route | What it shows |
| --- | --- |
| `/home` | Landing page with the three featured projects (`/` redirects here) |
| `/about` | Bio, skills, experience, game jams and hackathons, education, publications, certifications |
| `/projects` | All projects, grouped into collapsible categories |
| `/projects/[project]` | Project page with the description, features, tech stack, responsibilities, screenshots, videos and notes |
| `/resume` | A preview of the resume that opens the PDF, plus download buttons and the date it was last generated |

Every page fades out and the next one fades in when you navigate. [template.tsx](src/app/(main)/template.tsx) wraps each page in the transition, and links go through `TransitionLink` in [PageTransition.tsx](src/components/PageTransition.tsx) so the fade out plays before the route changes. The browser's back and forward buttons only get the fade in. Animations respect reduced motion.

Each route also generates its own OpenGraph image in the site's fonts and colors, so a link pasted into Discord, WhatsApp, iMessage or LinkedIn shows a proper preview card.

```text
shaad-portfolio/
├── src/
│   ├── app/
│   │   ├── (main)/              # home, about, projects, projects/[project], resume
│   │   │   └── template.tsx     # page transition wrapper
│   │   ├── api/                 # profile.json, projects.json, resume.json
│   │   ├── llms.txt/            # llms.txt route
│   │   ├── sitemap.ts, robots.ts
│   │   └── opengraph-image.tsx  # default social preview card
│   ├── components/
│   │   ├── sections/            # About page sections (Skills, Experience, Jams, ...)
│   │   ├── projects/            # Project page pieces (hero, overview, details, media panel and viewer)
│   │   ├── ui/                  # Shared primitives (button, card, tag, section, logo, ...)
│   │   └── ...                  # Navbar, footer, loader, page transitions, home backdrop
│   ├── lib/
│   │   ├── resume_data.json     # Single source of truth for site content
│   │   ├── projectId.ts         # Long-form detail for each project page
│   │   ├── agentProfile.ts      # Flattened profile used by every machine-readable surface
│   │   ├── images.ts            # Finds each image's real file, whether .png or .jpg
│   │   ├── dates.ts             # Parses and formats the dd/mm/yyyy dates in the JSON
│   │   ├── og-fonts/            # Font files for the OpenGraph cards
│   │   └── ...                  # Typed adapters (Experience, Skills, Jams, ...), OG + JSON-LD helpers
│   └── types.ts
├── public/
│   ├── project_<url>/           # cover, icon, img_1 ... img_N per project (.png or .jpg)
│   ├── jams/, skills/, about/   # Section icons and images
│   ├── resume.pdf               # Resume served on the site (generated)
│   ├── resume.png               # Preview image of the resume for /resume (generated)
│   └── resume_gen/
│       ├── scripts/
│       │   ├── generate_resume.py     # resume_data.json -> resume.html -> resume.pdf + resume.png
│       │   ├── generate_pdf.py        # HTML -> single-page A4 PDF via headless Chromium
│       │   ├── check_requirements.py  # Installs missing Python deps + Chromium on first run
│       │   └── requirements.txt
│       └── templates/
│           ├── resume_template.html
│           └── cover_letter_template.html
└── .github/
    ├── workflows/
    │   ├── resume.yml           # Regenerates the resume on push
    │   └── profile-readme.yml   # Rebuilds the GitHub profile README on push
    └── scripts/resume_fingerprint.py
```

## Editing content

`resume_data.json` holds the name, bio, nav links, experience, education, publications, certifications, jams, skills, the project list, and the order of project categories. The files in `src/lib/` are thin typed adapters over it. When you edit the JSON, the pages, the resume, and the machine-readable data all follow.

Dates are `dd/mm/yyyy` strings, and `00` stands for an unknown day or month. `00/08/2026` shows as Aug 2026 and `00/00/2025` as just 2025.

Images live in `public/` and can be `.png`, `.jpg` or `.jpeg` in any letter case. An image path in the JSON finds the file in whichever format it's saved, so swapping a PNG for a JPG doesn't mean editing anything.

### Adding a project

1. Add an entry to `projects` in `resume_data.json`. Its `url` field becomes the route (`/projects/<url>`), and its `desc` is the one-line summary used on the projects list, the project page and the resume.
2. Add a matching key to `data` in [src/lib/projectId.ts](src/lib/projectId.ts) with the description, features, technologies, responsibilities and extra notes. `captions` has one caption per screenshot in order, so `captions[0]` goes under `img_1`. `videos` is a list of YouTube links, each with the video's `title` and `channel`.
3. Create `public/project_<url>/` with a `cover`, an `icon`, and screenshots named `img_1`, `img_2`, and so on, each as a `.png` or `.jpg`.

You don't have to record how many screenshots there are or what format each one is in. At build time, [next.config.ts](next.config.ts) lists every image in `public/`, and [src/lib/images.ts](src/lib/images.ts) uses that list to find each file and count the screenshots. The count stops at the first gap in the `img_N` sequence, so a missing file can't turn into a broken image. If one image exists in both formats, the build warns and uses the `.png`. The list is only read when the server starts, so restart `npm run dev` after adding or renaming images.

After that, pushing is enough. The sitemap, `llms.txt`, the JSON endpoints and the JSON-LD pick up the new project on their own, and the resume gets a link to its page.

### Featured projects

A project with a `featured` number gets ranked by it, lowest first. The home page shows the first three, and the resume lists the first `counts.projects` of them. Projects without a `featured` number still get their own page and show up on `/projects`, but they stay off the home page and the resume.

### Jams

Each entry in `jams` has a `kind` and an optional `result` such as `1st of 46`. The About page splits jams into two tabs, with `Game Jam` entries under Game Jams and every other kind (Hackathon, Challenge) under Hackathons. The `result` shows under the title in the list, and entries without one show their `kind` there instead. If the jam produced one of the projects, set `project` to that project's `url` and the entry gets a link to its page.

### Skills

Every skill in `top3`, `main` and `other` needs a `category`. The resume prints one line per category, like `Languages & Frameworks: C#, C++, ...`. Categories appear in the order of their first skill, and skills keep their order from the JSON, so reordering skills on the site reorders them on the resume too. If a skill has no `category`, the build fails instead of leaving that skill off the resume.

## The resume

The resume is generated from the same `resume_data.json` as the site, which keeps the two in sync. You don't build it by hand for the live site, because a GitHub Action does that on push.

### How the PDF is built

[generate_resume.py](public/resume_gen/scripts/generate_resume.py) does four things.

1. Loads `src/lib/resume_data.json` and maps it to the resume's format. It strips icons and images, keeps LinkedIn, Website and Email as the contact links, groups skills by `category`, and picks the featured projects.
2. Fills in [resume_template.html](public/resume_gen/templates/resume_template.html) and writes `public/resume.html`.
3. Converts that HTML into `public/resume.pdf`, which the site serves at `/resume.pdf`. Visitors who click download get it saved as `{name} - Resume.pdf`.
4. Renders the PDF's page to `public/resume.png` at 250 dpi with PyMuPDF. That's the image `/resume` shows, drawn at well over twice its display size so the text stays sharp. The "last updated" date on that page comes from the PDF's own creation date.

The conversion happens in [generate_pdf.py](public/resume_gen/scripts/generate_pdf.py), which prints the HTML to an A4 PDF in headless Chromium. If the full-size render runs past one page, it binary-searches the print scale between 0.1 and 1.0 (stopping at a 0.005 window) for the largest value that still fits on one page. It never scales up, so a resume that fits at full size prints at full size, and adding content never means hand-tuning margins or font sizes.

The PDF keeps real hyperlinks, which some studios ask for on application resumes. Each project title links to its page on the site, `<websiteUrl>/projects/<url>`, using the same `url` field that names the route. If `url` is already a full `http(s)://` address, it's used as is, so a project can point somewhere else. Only the title is linked and no address is printed next to it, which means a resume parser reads exactly the same text. The LinkedIn, website and email lines in the header are clickable too (`mailto:` for the email). The cover letter template links the same lines in its header and signature, along with any of them quoted in the letter itself. Links are blue on screen and look like ordinary text in a black-and-white print.

### How it gets deployed

On every push to `main`, the [Regenerate resume](.github/workflows/resume.yml) Action checks whether the resume changed. If it did, the Action runs `generate_resume.py`, commits the new `public/resume.pdf` and `public/resume.png` back to `main`, and Vercel deploys that commit. You can also start the Action by hand from the repo's Actions tab.

Whether the resume changed is decided by [resume_fingerprint.py](.github/scripts/resume_fingerprint.py). It hashes the HTML the generator would write together with the PDF script, and compares that with the fingerprint the committed PDF was built from (`.github/resume-fingerprint`). Site-only edits, such as images, testimonials or the About text, leave the fingerprint alone, so those pushes deploy normally with no bot commit.

Vercel runs the same script as its [ignored build step](vercel.json). When a push changes the resume, Vercel skips that push and deploys the Action's commit instead, so the site changes and the new PDF go live in a single deployment. The downside is that if the Action fails, the push won't deploy until it's fixed. To deploy anyway, put `[force deploy]` in a commit message.

### Building it yourself

To preview the PDF locally, run `python public/resume_gen/scripts/generate_resume.py`. You don't need to commit the output, since the Action rebuilds it.

Each script calls [check_requirements.py](public/resume_gen/scripts/check_requirements.py) first. It checks [requirements.txt](public/resume_gen/scripts/requirements.txt) (`pyyaml`, `python-dotenv`, `playwright`, `pypdf`, `pymupdf`), pip-installs whatever is missing, and downloads Playwright's headless Chromium if it had to install Playwright. Python 3.8+ is all you need to start.

You can also run `generate_pdf.py` on its own to batch-convert any `resume.html` or `cover_letter.html` files in `public/resume_gen/` and one folder below it. The cover letter layout is in [cover_letter_template.html](public/resume_gen/templates/cover_letter_template.html).

## GitHub profile README

The README on my GitHub profile ([shaadqrsh/shaadqrsh](https://github.com/shaadqrsh/shaadqrsh)) is built from this repo's data too. The [Update profile README](.github/workflows/profile-readme.yml) Action runs when `resume_data.json`, `projectId.ts` or the resume fingerprint changes on `main`. It checks out the profile repo, runs its `scripts/build_readme.mjs` against this repo, and pushes the new README there if anything changed.

The generator, the template and the hand-written project blurbs all live in the profile repo. Locally that repo is cloned into `portfolio_entry/`, which this repo ignores. Pushing to it needs a `PROFILE_README_TOKEN` secret, a fine-grained token with read and write access to that one repo's contents.

## Machine-readable data

Since the pages render on the client, the site also publishes its content in formats that are easy to parse.

- `/llms.txt` is the whole portfolio as one Markdown document, following the [llmstxt.org](https://llmstxt.org) convention.
- `/api/profile.json` has the full profile, including experience, education, projects and skills.
- `/api/projects.json` has only the projects, in full detail.
- `/api/resume.json` is a [JSON Resume](https://jsonresume.org) v1.0.0 export for resume parsers.
- Every page's `<head>` carries a Schema.org `Person` graph as JSON-LD.
- `/sitemap.xml` and `/robots.txt` are generated from the same data, and `robots.txt` explicitly allows the major AI crawlers.

All of these are statically generated from [src/lib/agentProfile.ts](src/lib/agentProfile.ts), so they update whenever the JSON does.

Absolute URLs (OG images, the sitemap, JSON-LD) are resolved in [src/lib/siteUrl.ts](src/lib/siteUrl.ts). It tries `NEXT_PUBLIC_SITE_URL` first, then `websiteUrl` in `resume_data.json`, then Vercel's production domain, and finally the per-deployment Vercel URL. The per-deployment URL comes last on purpose, because those URLs sit behind Vercel's login wall and that breaks social preview images.

## Credits

The UI and website design are by [Hardik Malhotra](https://hardik-malhotra.vercel.app).
