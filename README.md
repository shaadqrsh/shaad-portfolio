# shaadqrsh.com

Source for [shaadqrsh.com](https://www.shaadqrsh.com), my game development portfolio. It's a Next.js site with a page for every project, plus a one-page resume PDF built from the same data.

The content lives in two files: [src/lib/resume_data.json](src/lib/resume_data.json) for the profile, experience, skills and project list, and [src/lib/projectId.ts](src/lib/projectId.ts) for the long-form text on each project page. The site, the resume, the JSON endpoints and my GitHub profile README are all generated from them. Updating the portfolio usually means editing those files and pushing.

## Getting started

You need Node.js and npm. Python 3.8+ is only needed if you want to build the resume locally.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Stack

The site runs on Next.js 16 with the App Router and Turbopack, React 19, TypeScript and Tailwind CSS v4. Animation uses [Motion](https://motion.dev/), the media viewer is built on Radix Dialog, and icons come from Lucide. Headings are set in Space Grotesk, body text in IBM Plex Sans and small labels in IBM Plex Mono, loaded with `next/font`. It's hosted on Vercel, configured in [vercel.json](vercel.json), with `@vercel/analytics` for analytics.

## Pages

| Route | Contents |
| --- | --- |
| `/home` | Landing page with three featured projects. `/` redirects here. |
| `/about` | Bio, skills, experience, game jams and hackathons, education, publications and certifications |
| `/projects` | All projects, newest first, filterable by All, Games or Other |
| `/projects/[project]` | One project: description, features, tech stack, responsibilities, screenshots, videos and notes |
| `/resume` | Resume preview that opens the PDF, with download buttons and the date it was generated |

Pages fade out and in on navigation. [template.tsx](src/app/(main)/template.tsx) wraps each page in the transition, and internal links use `TransitionLink` from [PageTransition.tsx](src/components/PageTransition.tsx) so the fade out finishes before the route changes. Back and forward navigation only gets the fade in. All animation respects reduced motion.

Each route renders its own OpenGraph card in the site's fonts and colors. Discord, WhatsApp, iMessage and LinkedIn cache previews by URL, so [next.config.ts](next.config.ts) hashes everything the cards are drawn from (the code, fonts and data in `src/lib`, and the images in `public/`) and puts that hash in every card's URL. Any change to a project or to the card design produces new URLs. LinkedIn only re-reads a page when asked, so run the URL through its [Post Inspector](https://www.linkedin.com/post-inspector/) after deploying.

## Layout

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
│   │   ├── resume_data.json     # Site content
│   │   ├── projectId.ts         # Long-form detail for each project page
│   │   ├── agentProfile.ts      # Flattened profile behind the machine-readable endpoints
│   │   ├── images.ts            # Resolves image paths to .png or .jpg files
│   │   ├── dates.ts             # Parses and formats dd/mm/yyyy dates
│   │   ├── siteUrl.ts           # Canonical origin for absolute URLs
│   │   ├── og-fonts/            # Fonts for the OpenGraph cards
│   │   └── ...                  # Typed adapters (Experience, Skills, Jams, ...), OG and JSON-LD helpers
│   └── types.ts
├── public/
│   ├── project_<url>/           # cover, icon, img_1 ... img_N for each project
│   ├── jams/, skills/, about/   # Section icons and images
│   ├── resume.pdf               # Generated resume
│   ├── resume.png               # Generated preview image for /resume
│   └── resume_gen/
│       ├── scripts/
│       │   ├── generate_resume.py     # resume_data.json to resume.html, resume.pdf and resume.png
│       │   ├── generate_pdf.py        # HTML to a one-page A4 PDF in headless Chromium
│       │   ├── check_requirements.py  # Installs missing Python packages and Chromium
│       │   └── requirements.txt
│       └── templates/
│           └── resume_template.html
└── .github/
    ├── workflows/
    │   ├── resume.yml           # Rebuilds the resume on push
    │   └── profile-readme.yml   # Rebuilds the GitHub profile README on push
    └── scripts/resume_fingerprint.py
```

## Editing content

`resume_data.json` holds the name, bio, nav links, experience, education, publications, certifications, jams, skills and projects. The other files in `src/lib/` are typed adapters over it, so the pages, the resume and the machine-readable data all update when it changes.

Dates are `dd/mm/yyyy` strings. Use `00` for an unknown day or month: `00/08/2026` displays as Aug 2026, and `00/00/2025` as 2025.

Images in `public/` can be `.png`, `.jpg` or `.jpeg`, in any letter case. An image path in the data finds the file in whichever format it's saved, so you can swap a PNG for a JPG without touching the data. If both formats exist, the build warns and uses the PNG. The image list is read once when the server starts, so restart `npm run dev` after adding or renaming images.

### Adding a project

1. Add an entry to `projects` in `resume_data.json`. Its `url` becomes the route, `/projects/<url>`. Its `desc` is the one-line summary shown on `/projects`, on the project page and on the resume.
2. Add an entry under the same key in `data` in [projectId.ts](src/lib/projectId.ts) with the description, features, technologies, responsibilities and notes. Set `game` to `true` or `false` to put the project under Games or Other. Add `captions` in screenshot order (`captions[0]` goes under `img_1`), and `videos` as YouTube links, each with a `title` and `channel`.
3. Create `public/project_<url>/` with a `cover`, an `icon`, and screenshots named `img_1`, `img_2` and so on.

Screenshots are counted at build time by [images.ts](src/lib/images.ts), so there's no count to keep in sync. Counting stops at the first missing number in the `img_N` sequence.

Then push. `/projects` sorts by `date`, and the project's position in the array only breaks ties within the same month. The sitemap, `llms.txt`, JSON endpoints and JSON-LD include the new project automatically, and its title on the resume links to its page.

### Featured projects

Give a project a `featured` number to rank it, lowest first. The home page shows the top three.

The resume shows `counts.projects` projects, chosen by `resume_projects` in [generate_resume.py](public/resume_gen/scripts/generate_resume.py). When more projects are featured than that, it takes the newest featured ones and lists them in `featured` order. When fewer are featured, it lists all of them and fills the rest with the newest unfeatured projects.

### Jams

Each entry in `jams` has a `kind` and an optional `result`, such as `1st of 46`. On the About page, `Game Jam` entries go under the Game Jams tab and every other kind (Hackathon, Challenge) goes under Hackathons. The `result` appears under the title, or the `kind` if there's no result. Set `project` to a project's `url` to link the jam to that project's page.

### Skills

Every skill in `top3`, `main` and `other` needs a `category`, and the build fails if one is missing. The resume prints a line per category, such as `Languages & Frameworks: C#, C++, ...`. Categories appear in the order their first skill does, and skills keep their order from the JSON, so the resume follows whatever order the site uses.

## Resume

A GitHub Action builds the resume from `resume_data.json` on push, so it always matches the site.

### Build

[generate_resume.py](public/resume_gen/scripts/generate_resume.py) runs in four steps:

1. Load `resume_data.json` and reshape it for the resume. Icons and images are dropped, LinkedIn, website and email become the contact links, skills are grouped by category, and projects are chosen as described in [Featured projects](#featured-projects).
2. Fill in [resume_template.html](public/resume_gen/templates/resume_template.html) and write `public/resume.html`.
3. Print that HTML to `public/resume.pdf` with [generate_pdf.py](public/resume_gen/scripts/generate_pdf.py). The site serves it at `/resume.pdf`, and the download button saves it as `{name} - Resume.pdf`.
4. Render the PDF to `public/resume.png` at 250 dpi with PyMuPDF, for the preview on `/resume`. The "last updated" date on that page is the PDF's creation date.

`generate_pdf.py` prints to A4 in headless Chromium. If the content runs past one page, it searches for the largest print scale that fits on one page. It never scales above 100%, so you don't have to adjust margins or font sizes when the content grows.

The PDF has working links. Each project title links to `<websiteUrl>/projects/<url>`, or straight to `url` if that's already a full `http(s)://` address. Only the title is linked, with no URL printed beside it, so resume parsers see the same text either way. The LinkedIn, website and email lines in the header are links too, with `mailto:` for email. Links are blue on screen and print as normal text in black and white.

### Deployment

[resume.yml](.github/workflows/resume.yml) runs on every push to `main` and can also be started from the Actions tab. It asks [resume_fingerprint.py](.github/scripts/resume_fingerprint.py) whether the resume changed. The script hashes the HTML the generator would produce together with the PDF script, and compares the result with `.github/resume-fingerprint`, the fingerprint of the committed PDF. If they differ, the Action rebuilds `resume.pdf` and `resume.png` and commits them to `main`.

Vercel runs the same script as its ignored build step. When a push changes the resume, Vercel skips it and deploys the Action's commit instead, so the site changes and the new PDF ship together. Pushes that only touch the site, like images or About text, leave the fingerprint unchanged and deploy straight away. If the Action fails, a push that changes the resume won't deploy until it's fixed. Put `[force deploy]` in the commit message to deploy anyway.

### Building locally

```bash
python public/resume_gen/scripts/generate_resume.py
```

There's no need to commit the output, since the Action rebuilds it. Each script first runs [check_requirements.py](public/resume_gen/scripts/check_requirements.py), which installs anything missing from [requirements.txt](public/resume_gen/scripts/requirements.txt) and downloads Playwright's Chromium if Playwright was just installed.

`generate_pdf.py` also works on its own: it prints `public/resume.html` to `public/resume.pdf`.

## GitHub profile README

My profile README at [shaadqrsh/shaadqrsh](https://github.com/shaadqrsh/shaadqrsh) is generated from this repo. [profile-readme.yml](.github/workflows/profile-readme.yml) runs when `resume_data.json`, `projectId.ts` or the resume fingerprint changes on `main`. It checks out the profile repo, runs its `scripts/build_readme.mjs` against this one, and pushes if the README changed. Projects go into the Games or Projects table according to their `game` flag.

The generator, its template and the hand-written project blurbs live in the profile repo. Locally it's cloned into `portfolio_entry/`, which is gitignored here. The Action pushes with a `PROFILE_README_TOKEN` secret, a fine-grained token with read and write access to that repo's contents.

## Machine-readable data

The pages render on the client, so the content is also published in formats that recruiters' tools, crawlers and AI agents can read without scraping HTML:

- `/llms.txt`: the whole portfolio as one Markdown file, following [llmstxt.org](https://llmstxt.org)
- `/api/profile.json`: the full profile
- `/api/projects.json`: projects only, in full detail
- `/api/resume.json`: a [JSON Resume](https://jsonresume.org) v1.0.0 export
- JSON-LD: a Schema.org `Person` graph in every page's `<head>`
- `/sitemap.xml` and `/robots.txt`, with the major AI crawlers explicitly allowed

They're all generated statically from [agentProfile.ts](src/lib/agentProfile.ts).

Absolute URLs come from [siteUrl.ts](src/lib/siteUrl.ts), which uses the first of `NEXT_PUBLIC_SITE_URL`, `websiteUrl` in `resume_data.json`, Vercel's production domain, and the per-deployment Vercel URL. The per-deployment URL is last because it sits behind Vercel's login, which breaks social preview images.

## Credits

UI and website design by [Hardik Malhotra](https://hardik-malhotra.vercel.app).
