# Shaad Qureshi - Portfolio

A modern, responsive, and animated personal portfolio built for showcasing my work as an aspiring Game Developer. The application is built with **Next.js 15 (App Router)** and utilizes a centralized data approach to power both the website content and an auto-generated printable HTML resume.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations & Parallax**: [Framer Motion](https://motion.dev/), [React Spring](https://react-spring.dev/) (`@react-spring/parallax`), and `tw-animate-css`
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (primitives), Embla Carousel, Lucide React (icons)
- **Deployment & Analytics**: Vercel & `@vercel/analytics`
- **Data & Typing**: TypeScript
- **Scripting (Resume Gen)**: Python 3

## 📁 Project Structure

```text
shaad-portfolio/
├── public/
│   ├── resume.pdf              # <-- PUT YOUR PDF HERE (served as the resume on the site)
│   ├── resume_gen/             # Everything resume-related lives here (gitignored except scripts & template)
│   │   ├── jobs.yaml           # Job listings for tailored resume/cover letter generation (gitignored)
│   │   ├── resume_data.yaml    # Generated from src/lib/ by lib_to_yaml.py (gitignored)
│   │   ├── resume.html         # Generated print-ready resume (gitignored)
│   │   ├── scripts/
│   │   │   ├── lib_to_yaml.py      # Parses TypeScript data files -> resume_data.yaml
│   │   │   └── yaml_to_html.py     # Parses resume_data.yaml -> printable HTML resume
│   │   └── templates/
│   │       └── resume_template.html    # HTML template for the resume layout
│   └── ...                     # Static images, icons, and project assets
├── src/
│   ├── app/                    # Next.js App Router root
│   │   └── (main)/             # Main layout group (Home, About, Projects, etc.)
│   ├── components/             # Reusable React components
│   │   ├── sections/           # Distinct page sections (Experience, Education, etc.)
│   │   └── ui/                 # Core UI blocks (Cards, Nav, Loader, etc.)
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # CENTRALIZED DATA STORE (*.ts files)
```

> [!IMPORTANT]
> The resume PDF served on the site must be placed at **`public/resume.pdf`**. The download button names the file `{name} - Resume.pdf` automatically, so you can keep the filename in `public/` generic.

## 🛠️ Centralized Data & Resume Generation

All portfolio content (Experience, Education, Projects, Skills) lives as exported TypeScript objects in `src/lib/`. This is the single source of truth for both the website and the resume.

### The Resume Pipeline

1. **`lib_to_yaml.py`** — Reads the TypeScript files in `src/lib/` and writes a structured `resume_gen/resume_data.yaml`.
2. **`yaml_to_html.py`** — Reads `resume_data.yaml` and produces a print-ready `resume_gen/resume.html` styled for A4.

To regenerate after editing `src/lib/`:

```bash
npm run resume
```

### 📄 Converting to PDF

Once `resume.html` is generated, convert it manually:

1. Open `public/resume_gen/resume.html` in Chrome or Edge.
2. Print (Ctrl+P) and select **Save as PDF** (or Microsoft Print to PDF).
3. Enable **Background Graphics** for correct styling.
4. Save the output as `public/resume.pdf`.

> [!NOTE]
> Automated HTML-to-PDF conversion was producing inconsistent results, so manual print-to-PDF is the recommended approach to preserve fidelity.

---

## 💻 Getting Started

### Prerequisites

- Node.js & npm (or yarn / pnpm)
- Python 3+ (for resume generation)

### Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👏 Credits

- **Design**: UI and Website Design by [Hardik Malhotra](https://hardik-malhotra.vercel.app).
