interface CategoryConfig {
  name: string;
  minimizedByDefault: boolean;
}

export const categoryOrder: CategoryConfig[] = [
  { name: "Game Projects", minimizedByDefault: false },
  { name: "Web Applications", minimizedByDefault: false },
  { name: "Mobile Applications", minimizedByDefault: true },
];

const projects = [
  {
    title: "Pokémon Bushido",
    url: "bushido",
    category: "Game Projects",
    desc: "Pokémon Bushido is a fan-made game set in a feudal Japan-inspired region, where players train Pokémon to become a Kenshi, battling rival clans and dark forces in a unique samurai-themed adventure.",
  },
  {
    title: "Pokémon Splice",
    url: "splice",
    category: "Game Projects",
    desc: "Pokémon Splice is a fan-made game where you're a research assistant helping Professor Cypress discover new Pokémon forms, featuring a unique, type-changing starter and a branching story.",
  },
  {
    title: "CareerPath AI",
    url: "careerpath",
    category: "Web Applications",
    desc: "A 'vibe coding' experiment built in 3 days with Gemini 3 Pro. This AI counselor generates hyper-personalized career roadmaps and realistic 'day-in-the-life' visualizations to help users find their ideal career.",
  },
  {
    title: "SQLift",
    url: "sqllift",
    category: "Web Applications",
    desc: "SQLift is a full-stack workout tracking web application with a rich relational database at its core. Users can plan custom workouts, track live sessions set-by-set, monitor body measurements and analytics over time, and compete on global and friend leaderboards.",
  },
  {
    title: "HOMI - Helpful Online Mentor Interface",
    url: "homi",
    category: "Web Applications",
    desc: "An AI-powered learning assistant for IT students, using LLMs to offer personalized study material, real-time query resolution, automated test generation, and attendance and assignment tracking.",
  },
  {
    title: "Findly - Lost and Found Application",
    url: "findly",
    category: "Mobile Applications",
    desc: "An Android application with a Firebase-powered backend, which acts as a platform to list lost or found items and chat with users to recover lost items or return found ones.",
  }
];

export default projects;