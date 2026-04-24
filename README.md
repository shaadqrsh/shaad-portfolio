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
├── public/                 # Static assets and Resume Generator Scripts
│   ├── scripts/
│   │   ├── lib_to_yaml.py  # Python script to parse TypeScript data -> YAML
│   │   ├── yaml_to_html.py # Python script to parse YAML -> Printable HTML Resume
│   ├── ...                 # Images and icons
├── src/
│   ├── app/                # Next.js App Router root
│   │   └── (main)/         # Main layout group (Home, About, Projects, etc.)
│   ├── components/         # Reusable React components
│   │   ├── sections/       # Distinct sections of the site (Experience, Education, etc.)
│   │   └── ui/             # Reusable core UI blocks (Cards, Nav, Loader, etc.)
│   ├── hooks/              # Custom React hooks
│   └── lib/                # CENTRALIZED DATA STORE (*.ts files)
```

## 🛠️ Centralized Data & Resume Generation

One unique aspect of this project is the **single source of truth** pattern used for all portfolio copy and details. 

All distinct personal information (Experience, Education, Projects, Skills) is housed as clean exported objects in the `src/lib/` directory (e.g., `Data.ts`, `Experience.ts`, `Projects.ts`).

### The Resume Pipeline
To ensure synchronization between the live website and my downloadable résumé, the project includes Python scripts located in the `public/scripts/` folder:

1. **`lib_to_yaml.py`**: Parses the TypeScript files in `src/lib/` directly into a structured `resume_data.yaml` file.
2. **`yaml_to_html.py`**: Reads the `resume_data.yaml` file and generates a tightly constrained, print-ready `resume.html` document perfectly styled for an A4 format.

To update the resume, simply modify the files in `src/lib/` and run:

```bash
npm run resume
```

### 📄 Converting to PDF
Once you have generated the `resume.html` file, converting it to a PDF is a manual step:
1. Open `public/resume.html` in your browser (Chrome or Edge recommended).
2. Use the **Print** command (Ctrl+P) and select **Microsoft Print to PDF** as the destination.
3. Ensure "Background Graphics" is enabled for the best look.

> [!NOTE]
> This part of the pipeline is currently a **WIP (Work In Progress)**. Automated HTML-to-PDF conversion was producing inconsistent results, so a manual print-to-PDF step is recommended to ensure the resume maintains its high-fidelity styling.

---

## 💻 Getting Started

### Prerequisites

- Node.js & npm (or yarn / pnpm)
- Python 3+ (if you wish to build the resume)

### Running Locally

First, install dependencies:

```bash
npm install
```

Start the development server with turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying components. The page auto-updates as you edit the file.

---

## 👏 Credits

- **Design**: UI and Website Design by [Hardik Malhotra](https://hardik-malhotra.vercel.app).
