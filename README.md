# Shaad Qureshi - Portfolio

A modern, responsive, and animated personal portfolio built for showcasing my work as an aspiring Game Developer. The application is built with Next.js 16 (App Router & React 19) and utilizes a centralized data approach to power both the website content and an auto-generated, print-ready HTML/PDF resume suite.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations & Parallax**: [Framer Motion](https://motion.dev/), [React Spring](https://react-spring.dev/) (`@react-spring/parallax`)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (primitives), Embla Carousel, Lucide React (icons)
- **Deployment & Analytics**: Vercel & `@vercel/analytics`
- **Data & Typing**: TypeScript
- **Scripting (Resume & PDF Gen)**: Python 3 with Playwright, PyPDF, and PyYAML

---

## Project Structure

```text
shaad-portfolio/
├── src/
│   ├── app/                    # Next.js App Router root
│   │   └── (main)/             # Main layout pages (Home, About, Projects, etc.)
│   ├── components/             # Reusable React components & page sections
│   └── lib/                    # CENTRALIZED DATABASE & ADAPTERS
│       ├── resume_data.json    # <-- CENTRAL DATABASE (Single Source of Truth)
│       └── ...                 # TypeScript adapters (Data, Skills, Projects, etc.)
├── public/
│   ├── resume.pdf              # The main resume PDF served on the website
│   └── resume_gen/             # Everything resume-related lives here (gitignored except tracked scripts & templates)
│       ├── resume.html         # Generated base HTML resume (gitignored)
│       ├── resume.pdf          # Generated base PDF resume (gitignored)
│       ├── scripts/
│       │   ├── generate_resume.py     # Generates base HTML & PDF resume from JSON database
│       │   ├── generate_pdf.py        # Scaled HTML to single-page A4 PDF compiler
│       │   ├── check_requirements.py  # Self-installing requirements validator
│       │   └── requirements.txt       # Python dependency checklist
│       └── templates/
│           ├── resume_template.html       # HTML template for the resume layout
│           └── cover_letter_template.html # HTML template for the cover letter layout
```

> [!IMPORTANT]
> The primary resume PDF served on the site must be placed at **`public/resume.pdf`**. The download button names the file `{name} - Resume.pdf` automatically when clicked by a visitor.

---

## Centralized Data & Resume Generation

All portfolio content (Experience, Education, Projects, Publications, Skills) lives in a single JSON file: [resume_data.json](file:///e:/Work/shaad-portfolio/src/lib/resume_data.json). This serves as the unified database for both the Next.js website (via backward-compatible TypeScript adapters in `src/lib/`) and the Python resume/cover letter compilers.

### Zero-Setup Python Pipeline
All resume scripts are self-verifying. When the resume compiler is run, it automatically calls [check_requirements.py](file:///e:/Work/shaad-portfolio/public/resume_gen/scripts/check_requirements.py) which reads [requirements.txt](file:///e:/Work/shaad-portfolio/public/resume_gen/scripts/requirements.txt), automatically installs missing libraries (`pyyaml`, `playwright`, `pypdf`) using pip, and installs the headless Playwright Chromium browser binaries silently.

### Available NPM Command

Your `package.json` provides the following clean development shortcut:

#### **`npm run resume`**
Loads the centralized JSON database and compiles the base print-ready resume inside `public/resume_gen/`:
* Generates `public/resume_gen/resume.html`
* Automatically compiles and saves the A4-scaled PDF copy to `public/resume_gen/resume.pdf`

---

## How Automated PDF Scaling Works
Manual PDF printing is completely obsolete! Under the hood, [generate_pdf.py](file:///e:/Work/shaad-portfolio/public/resume_gen/scripts/generate_pdf.py) runs headlessly inside Chromium via Playwright and emulates a high-fidelity print medium:
1. It measures the height of the document on the page.
2. It executes an intelligent binary search to discover the exact largest scale factor (within $0.5\%$ tolerance) that compiles the entire document onto **exactly one A4 page** with zero overflow or trailing empty pages.
3. It prints and saves the resulting single-page PDF, preserving typography and alignment perfectly.

---

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.8+ (for resume generation)

### Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view your animated portfolio.

---

## Credits

- **Design**: UI and Website Design by [Hardik Malhotra](https://hardik-malhotra.vercel.app).
