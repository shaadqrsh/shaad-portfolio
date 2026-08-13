import { projectData } from '@/types';
import resumeData from './resume_data.json';

const getProjBase = (urlKey: string) => {
  const proj = resumeData.projects.find(p => p.url === urlKey);
  return {
    title: proj?.title || "",
    date: proj?.date || ""
  };
};

export const data: { [key: string]: projectData } = {
  harvestrush: {
    ...getProjBase('harvestrush'),
    game: true,
    urls: [
      {
        label: 'GitHub',
        icon: '',
        url: 'https://github.com/neu-5850-2026/110-finalproject-shaadqrsh',
      },
    ],
    desc: 'Harvest Rush is a frantic one to two player couch co-op and solo farming game inspired by the hectic multitasking of Overcooked. Set on a bustling, tile-based family farm, players scramble against the clock to keep a demanding delivery truck supplied with fresh produce. The peaceful countryside rhythm quickly turns into delightful chaos as players till soil with rakes, sow seeds, water growing crops through distinct visual stages, and rush harvested carrots, wheat, and tomatoes to the loading dock before the truck pulls away. With mischievous burrowing pests hunting for prize vegetables and wild fires threatening to scorch crops and block critical pathways, players must communicate seamlessly, prioritize urgent farm tasks, and master high-stakes agricultural teamwork to rack up high scores.',
    features: [
      {
        heading: 'Frantic Couch Co-op & Solo Play',
        content:
          'Supports two players collaborating on a shared keyboard or a solo farmer managing the entire estate alone, featuring tuned game-length presets (Short, Medium, Long) that tailor wave budgets and hazard pressure to ensure both collaborative chaos and solo score attacks feel rewarding.',
      },
      {
        heading: 'Context-Sensitive Tool Pipeline',
        content:
          'An intuitive, fluid interaction design where a single action button seamlessly adapts based on the tile the farmer faces and the tool in handâ€”effortlessly cycling between tilling soil with rakes, planting reusable seed bags, hydrating plots with watering cans, harvesting crops with bare hands, and staging produce on work tables.',
      },
      {
        heading: 'Dynamic Farm Hazards: Pests & Spreading Fire',
        content:
          'Keeps players on their toes with sneaky pests that emerge from corner burrows to steal crops from plots and tables, alongside spreading fires that scorch adjacent vegetation and block pathways. Players must quickly mount defenses by sweeping pests with rakes or dousing fire lines with watering cans.',
      },
      {
        heading: 'Wave-Based Delivery Truck & Score Chasing',
        content:
          'The gameplay loop is driven by back-to-back delivery waves where a truck docks at the loading bay with specific produce orders. Fulfilling orders awards direct crop payouts and escalating completion bonuses, culminating in a comprehensive end-of-day results board tracking top runs across every farm and mode.',
      },
      {
        heading: 'Vibrant Countryside Atmosphere & Feedback',
        content:
          'Features a warm, colorful 16:9 pixel-art farm layout enhanced with animated crop growth stages, responsive color-tint pulses, visual progress fill-meters, and dynamic audio cues that bring the charming, chaotic farm to life.',
      },
    ],
    technologies: [
      { name: 'C++', icon: 'icon_cpp.svg' },
      { name: 'SDL3', icon: 'icon_sdl.svg' },
      { name: 'CMake', icon: 'icon_cmake.svg' },
      { name: 'Python', icon: 'icon_python.svg' },
      { name: 'Aseprite', icon: 'icon_aseprite.svg' },
      { name: 'Photoshop', icon: 'icon_photoshop.svg' },
    ],
    responsibilities: [
      'Architected and implemented a high-performance 2D game engine in modern C++ (C++20) and SDL3 using a cache-friendly Entity Component System (ECS) pattern.',
      'Engineered grid-locked tile glide movement, directional facing systems, and unified context-sensitive interaction resolution for independent dual-player keyboard control.',
      'Implemented A* pathfinding for pest AI navigation, integrating dynamic obstacle avoidance via blackboard coordinate sets to navigate around live fires and fellow critters in real time.',
      'Developed a recursive backtracking procedural order generator with reachability pruning, ensuring wave orders match balanced labor budgets without deadlocks or impossible requests.',
      'Designed and built a modular interaction timer system supporting player-freezing channels, partner abort safety, and flood-fill fire extinguishing logic.',
      'Created custom TTF font rendering with dynamic outline generation, color-flash shader effects, and atomic file I/O pipelines for persistent high-score serialization.',
      'Built automated Python sprite-sheet packing scripts and configured cross-platform CMake build systems and automated test harnesses.',
    ],
    videos: [],
    additional: [
      'This game was developed as the capstone final project for CS 5850 (Building Game Engines) at Northeastern University, building upon an engine developed from the ground up over the semester.',
      'The game draws heavy design inspiration from the frantic couch co-op energy of Overcooked and the rewarding agricultural rhythm of Stardew Valley, blending rapid multitasking with farming mechanics.',
      'Due to tight submission deadlines and a lack of production time for full-screen illustration, generative AI was utilized to create the decorative background artwork for the title screen, help menu, and end-of-day scores screens, while all in-game sprites, tiles, and HUD elements are a mix of custom assets and public assets from itch.io.',
      'The game evolved through iterative playtesting, cutting tedious mechanics like running to a central water trough and stockpiling in storage bins to emphasize immediate hand-to-hand tool passing and dynamic table staging.',
      'Shifted from a punishing hard-quota win/loss failure state to an engaging score-attack structure, ensuring chaotic hazard moments remain fun while rewarding every successfully loaded crop.',
      'A dedicated headless test harness running 50,000 simulated wave generations was developed to empirically verify the mathematical fairness and distribution of the procedural delivery algorithm.',
      'Includes tailored solo and two-player tuning profiles across multiple difficulty lengths (Short, Medium, Long), ensuring balanced pacing whether playing alone or collaborating with a partner.',
    ],
  },
  countingsheep: {
    ...getProjBase('countingsheep'),
    game: true,
    urls: [
      {
        label: 'Itch.io',
        icon: '',
        url: 'https://bro-skito.itch.io/counting-sheep',
      },
    ],
    desc: "Step into the surreal, tranquil world of a sleeper's dream in Counting Sheep, a 3D platformer where the world itself is a countdown ritual. As a fluffy, buoyant sheep, you drift and hop across floating islands of glowing cloud-voxels arranged in the shapes of countdown numerals. With every tick of the timer, the ground beneath you transformsâ€”unstable clouds shudder and plunge into the endless nocturnal abyss below, while new paths rise softly from the fog. Ride the count all the way down to ease the sleeper into deep rest, or risk falling through the gaps and jolting them awake.",
    features: [
      {
        heading: 'Dynamic Shifting Cloud Floors',
        content:
          'Navigate ever-changing platforms shaped like giant numerals. As the countdown ticks down, disappearing clouds flash visual warning tremors before crumbling away, challenging players to anticipate reflow patterns and leap to safe ground.',
      },
      {
        heading: 'Floaty, Buoyant Platforming',
        content:
          'Experience gentle, airy movement with buoyant hover drift and slow, sweeping jumps. Built-in platforming forgiveness and momentum cushioning reward decisive traversal across perilous void gaps.',
      },
      {
        heading: 'Reactive Soundscape & Dynamic Bleats',
        content:
          'Immerse yourself in a soothing nocturnal dreamscape guided by hypnotic ambient drones, calming resolution chimes, and expressive, randomized sheep vocalizations that respond to jumps, landings, star pickups, and near misses.',
      },
      {
        heading: 'Varied Dream Modes & Pacing',
        content:
          'Tackle structured Dream runs based on descending patterns like Fibonacci, Primes, and Halving sequences, chase high scores and combo multipliers in Endless Mode, or unwind in a tranquil, no-fail Zen Mode with automatic fall rescue.',
      },
      {
        heading: 'Diegetic Sleep Meter & Radar Planning',
        content:
          'Track your progress through an organic dream-journal HUD featuring a closing-eyelid sleep gauge that reacts to your precision, accompanied by a top-down minimap revealing upcoming ghost platforms for strategic route planning.',
      },
    ],
    technologies: [
      { name: 'Unity', icon: 'icon_unity.svg' },
      { name: 'C#', icon: 'icon_csharp.svg' },
      { name: 'Universal Render Pipeline (URP)', icon: 'icon_unity.svg' },
      { name: 'Shader Graph', icon: 'icon_unity.svg' },
      { name: 'VFX Graph', icon: 'icon_unity.svg' },
      { name: 'Blender', icon: 'icon_blender.svg' },
    ],
    responsibilities: [
      'Architected the full Unity game architecture in C# using decoupled ScriptableObject workflows, event channels, and modular state machines for the GMTK Game Jam 2026.',
      'Developed custom Shader Graph materials for fluffy cloud voxels with dynamic rim lighting, emissive glow, and noise-based dissolution effects.',
      'Programmed the custom kinematic character controller from scratch, tuning spring buoyancy, coyote time, and inflated bounding boxes for fluid aerial navigation.',
      'Built high-performance GPU instancing and object pooling systems to guarantee smooth 60+ FPS performance during rapid, large-scale voxel grid reflows.',
      'Designed dynamic audio behavior in Unity AudioMixer with real-time pitch modulation and formant filtering for procedural sheep vocalizations.',
      'Implemented the dream-journal UI system, animated eyelid sleep gauge, and 2D canvas radar minimap for tactical route planning.',
    ],
    videos: [],
    additional: [
      'Developed for the GMTK Game Jam 2026, bringing the countdown theme to life through the classic bedtime tradition of counting sheep.',
      'Built around the guiding design philosophy of "logic blocky, render fluffy" pairing precise, predictable grid-based movement with soft, luminous cloud visuals.',
      'Visual aesthetic draws heavy inspiration from classic storybooks and ink dream diaries, combining handwritten typography with a soothing indigo and starlight color palette.',
      'Includes a dedicated Zen Mode created specifically for unwinding, completely stripping away failure conditions, timers, and scoring in favor of peaceful drift recovery and slower rhythms.',
      'Engineered to deliver a polished, responsive standalone gaming experience with full gamepad and keyboard support.',
    ],
  },
  bushido: {
    ...getProjBase('bushido'),
    game: true,
    urls: [
      {
        label: 'Direct Download',
        icon: '',
        url: 'https://drive.google.com/file/d/1IZ3AlFv5rm8xrUn9YbwLe4i-Bu9YwHpO/view',
      },
      {
        label: 'Eevee Expo',
        icon: '',
        url: 'https://eeveeexpo.com/bushido/',
      },
      {
        label: 'GitHub',
        icon: '',
        url: 'https://github.com/TheLuxDiablo/Pokemon-Bushido',
      },
    ],
    desc: "Journey into the Aisho Region, a land steeped in ancient traditions and home to the captivating world of PokÃ©mon Bushido. As the child of the Royal Samurai, your path unfolds through a rich narrative, where you'll train alongside your PokÃ©mon in the martial arts, discover the role of a 'Kenshi', and confront the enigmatic Akui Clan with their dangerous Shadow PokÃ©mon. This fangame offers a fresh take on the PokÃ©mon formula, blending classic gameplay with a distinct feudal Japanese aesthetic, featuring new mechanics, visually stunning environments, riveting story and challenging gameplay that will test your honor and skill.",
    features: [
      {
        heading: 'Immersive Feudal Japan-Inspired World',
        content:
          'Explore the Aisho region, a brand new land meticulously designed with a rich samurai-themed aesthetic, offering a unique departure from traditional PokÃ©mon settings.',
      },
      {
        heading: 'Diverse Roster of PokÃ©mon',
        content:
          'Build your team with a wide selection of PokÃ©mon, featuring species from up to the 8th Generation, all rendered in classic Gen 4-styled graphics for a nostalgic yet expanded experience.',
      },
      {
        heading: 'Original Storyline',
        content:
          'Embark on a 10-15 hour narrative-driven adventure as the child of the Royal Samurai, training to become a Kenshi and uncovering the secrets and conflicts within the Aisho region, including the nefarious Akui Clan.',
      },
      {
        heading: 'Return of Shadow PokÃ©mon',
        content:
          'Encounter and battle formidable Shadow PokÃ©mon, a concept inspired by PokÃ©mon XD: Gale of Darkness. These corrupted PokÃ©mon present unique challenges and can be snagged from opposing trainers for purification.',
      },
      {
        heading: 'Katana Styles',
        content:
          'Experience a fresh take on HMs with the introduction of Katanas. These powerful blades not only grant passage through obstacles but can also be wielded in battle to strategically alter weather conditions or inflict status effects.',
      },
    ],
    technologies: [
      { name: 'Ruby', icon: 'icon_ruby.svg' },
      { name: 'C++', icon: 'icon_cpp.svg' },
      { name: 'Photoshop', icon: 'icon_photoshop.svg' },
      { name: 'Aseprite', icon: 'icon_aseprite.svg' },
    ],
    responsibilities: [
      'Developed the core engine in which the game was made.',
      'Created new mechanics (Katana techniques, mid-battle dialogue, Following PokÃ©mon, battle animations, etc) to differenciate it from mainline PokÃ©mom games.',
      'Aggregated publically available assets for developing the game within 30 days.',
      'Evented multiple in-game cutscenes, while also writing custom scripts for functionality.',
      "Designed various UI/UX elements to enhance the immersion of the battle system, with detailed battle backgrounds and themes to fit the game's aesthetic.",
      "Assisted in the design of the game's narrative and core gameplay loop.",
    ],
    videos: [
      'https://www.youtube.com/watch?v=OH5pCKUim3k',
      'https://www.youtube.com/watch?v=NNM4zsBrNFQ',
      'https://www.youtube.com/watch?v=L5ClFPCufkc',
      'https://www.youtube.com/watch?v=QWEIOSc5Euw',
    ],
    additional: [
      'This game was developed for the Relic Castle (Eevee Expo) Winter Game Jam #2. It was developed in 30 days, and the team ended up winning the competition.',
      'The idea of setting a game in a feudal Japan setting was devised months before the official PokÃ©mon games took a similar direction with PokÃ©mon Legends: Arceus.',
      'Future expansions were planned, to expand the Aisho region and provide more story for important characters in the game. The team, however, disbanded and further expansions were scrapped.',
      'The game draws heavy inspiration from mainline entries like PokÃ©mon Conquest and PokÃ©mon XD: Gale of Darkness, and borrows assets from them, along with other mainline PokÃ©mon games.',
      'The development of this project was headed by Thundaga, a YouTuber, and the development of this game has been recorded as VODs on their YouTube and Twitch.',
      'This is one of the highest rated and most viewed games on Eevee Expo (formerly Relic Castle), the forum on which this game was initially launched.',
      'This game has been regarded as one of the best PokÃ©mon Fangames of 2021.',
    ],
  },
  splice: {
    ...getProjBase('splice'),
    game: true,
    urls: [
      {
        label: 'Direct Download',
        icon: '',
        url: 'https://drive.google.com/file/d/1igsvdRzCU9S3AgiGcCIR9jpDKJBDoWgv/view',
      },
      {
        label: 'Eevee Expo',
        icon: '',
        url: 'https://eeveeexpo.com/splice/',
      },
    ],
    desc: 'Assume the role of a research assistant aiding Professor Cypress in the study of newly discovered PokÃ©mon forms in this new fangame. Embark on a journey through the Stacona region with a new starter PokÃ©mon, Arenay, which possesses the ability to change its type. Align with either Team Biogress, emphasizing natural development, or Team Quantech, focused on technological enhancement. Experience a branching storyline, where you are presented with significant choices which will completely alter your experience. The fate of PokÃ©mon research hangs in the balance - whose side will you choose?',
    features: [
      {
        heading: 'New Region',
        content:
          'PokÃ©mon Splice is set in the entirely new Stacona Region, a brand new world with its own unique environments and never before seen PokÃ©mon species.',
      },
      {
        heading: 'New PokÃ©mon Species',
        content:
          'The game features several new species of PokÃ©mon, such as Arenay, the starter with a unique form changing gimmick, as well as evolutions and pre-evolutions for existing PokÃ©mon like Pinsir, Skarmory and Combee and more!',
      },
      {
        heading: 'Branching Storylines',
        content:
          "Players make a pivotal choice to join one of two opposing research organizations: Team Biogress or Team Quantech. This decision significantly influences the story's direction and the player's objectives throughout the game.",
      },
      {
        heading: 'New Regional Forms',
        content:
          'The region houses brand new regional forms. Some of them are naturally occuring, like Dunsparce, and some are the result of experimentation by the 2 research factions, such as the new forms of the Solosis, Lotad, Raichu and Electivire.',
      },
      {
        heading: 'Distinct Gen-3 Artsyle',
        content:
          'The game pays hommage to the GameBoy Advance generation of PokÃ©mon games with its environment and UI design, but still has all the QOL improvements of the modern games.',
      },
    ],
    technologies: [
      { name: 'Ruby', icon: 'icon_ruby.svg' },
      { name: 'C++', icon: 'icon_cpp.svg' },
      { name: 'Photoshop', icon: 'icon_photoshop.svg' },
      { name: 'Aseprite', icon: 'icon_aseprite.svg' },
    ],
    responsibilities: [
      'Developed the core engine in which the game was made.',
      'Created new mechanics (Form changing, mid-battle dialogue, Following PokÃ©mon, battle animations, etc) to differenciate it from mainline PokÃ©mom games.',
      'Aggregated publically available assets for developing the game within 30 days.',
      'Evented multiple in-game cutscenes, while also writing custom scripts for functionality.',
      'Designed various UI/UX elements to enhance the immersion of the battle system, with detailed battle backgrounds and themes to fit the Generation 3 aesthetic.',
      "Assisted in the design of the game's narrative and core gameplay loop.",
    ],
    videos: [
      'https://www.youtube.com/watch?v=B9DS0Nyegag',
      'https://www.youtube.com/watch?v=X34OZt5Tvdk',
      'https://www.youtube.com/watch?v=-XgNEFjSQmc',
    ],
    additional: [
      'This game was developed for the Relic Castle (Eevee Expo) Game Jam 6. It was developed in 30 days, and the team ended up winning the competition.',
      'Future chapters were planned, and assets were developed for them (new legendaries and forms, they are still in the game files). The team, however, disbanded and further expansions were scrapped.',
      'The development of this project was headed by Thundaga, a YouTuber, and the development of this game has been recorded as VODs on their YouTube and Twitch.',
      'This game was discontinued in 2023 and the entire team moved on to other projects.',
    ],
  },
  careerpath: {
    ...getProjBase('careerpath'),
    game: false,
    urls: [
      {
        label: 'Live Project',
        icon: '',
        url: 'https://pathfinder-ai-nine.vercel.app/',
      },
      {
        label: 'GitHub',
        icon: '',
        url: 'https://github.com/shaadqrsh/pathfinder-ai',
      },
    ],
    desc: "CareerPath AI serves as a proof-of-concept for the potential of 'vibe coding' with next-gen models. Built entirely over a single three-day weekend using Gemini 3 Pro, this platform acts as an intelligent career counselor that moves beyond generic advice. It ingests user demographics and quiz results to generate hyper-personalized career roadmaps. The system helps users visualize their future by generating realistic 'day-in-the-life' image slideshows using AI, bridging the gap between abstract job titles and daily reality. This project demonstrates how modern AI tools can accelerate the development of complex, full-stack applications with robust architectures.",
    features: [
      {
        heading: 'Deep Profile Analysis',
        content:
          'The core engine utilizes Google Gemini 2.5 Flash to reason through user data, creating matches based on aptitude and personality rather than simple keyword associations.',
      },
      {
        heading: 'Actionable Roadmaps',
        content:
          'Users receive step-by-step educational and professional plans detailing exactly how to transition from their current state to their target career, including location-specific advice.',
      },
      {
        heading: 'Generative Day-in-the-Life',
        content:
          'A unique visualization feature (powered by Google\'s Nano Banana) that generates realistic, non-glamorized photo slideshows of what a specific job looks like daily, helping users emotionally connect with potential career paths.',
      },
      {
        heading: 'Decoupled Architecture',
        content:
          'The application uses a secure "headless" structure with a React frontend and a Python FastAPI backend acting as a proxy to manage API keys and business logic securely.',
      },
      {
        heading: 'Smart Rate Limiting',
        content:
          'To maintain sustainability, a custom database-level quota system manages daily limits for expensive operations like image generation and detailed career analysis.',
      },
    ],
    technologies: [
      { name: 'React', icon: 'icon_react.svg' },
      { name: 'TypeScript', icon: 'icon_typescript.svg' },
      { name: 'TailwindCSS', icon: 'icon_tailwind.svg' },
      { name: 'Python', icon: 'icon_python.svg' },
      { name: 'Supabase', icon: 'icon_supabase.svg' },
      { name: 'PostgreSQL', icon: 'icon_postgresql.svg' },
      { name: 'Google Gemini', icon: 'icon_gemini.svg' },
      { name: 'Docker', icon: 'icon_docker.svg' },
    ],
    responsibilities: [
      'Prompt-engineered the entire full-stack codebase using Gemini 3 Pro, acting as the architect while the AI handled the implementation details.',
      'Deployed the backend to Hugging Face Spaces using Docker and the frontend to Vercel, ensuring a seamless global delivery pipeline.',
      'Designed the comprehensive database schema and Row Level Security policies to ensure strict user data privacy within Supabase.',
      'Orchestrated the asynchronous image generation pipeline, coordinating multiple parallel API calls to reduce wait times for the end user.',
      'Implemented a robust state management system using Zustand to handle the complex user journey from onboarding to result visualization.'
    ],
    videos: [],
    additional: [
      'This project was an experiment in "vibe coding" to test the reasoning capabilities of Gemini 3 Pro. The entire application was built in just 3 days with the AI generating nearly all the code.',
      'The "intelligence" of the app relies on rigid JSON-enforced prompt engineering, which forces the LLM to output structured data that the frontend can reliably render.',
      'Unlike simple API wrappers, this project implements a full backend proxy to secure the Gemini API keys, preventing them from being exposed in the client-side code.',
      'I implemented a "lazy-loading" strategy for the career details to save on token costs; detailed roadmaps are only generated when a user explicitly clicks to explore a specific career.',
      'The UI features a "Nano Banana" badge in the loading screens, a playful nod to the internal codename and the rapid, fluid nature of the development session.',
    ],
  },
  sqllift: {
    ...getProjBase('sqllift'),
    game: false,
    urls: [
      {
        label: 'Live Project',
        icon: '',
        url: 'https://cs-5200-project.vercel.app',
      },
      {
        label: 'GitHub',
        icon: '',
        url: 'https://github.com/btoneil2021/cs-5200-project',
      },
    ],
    desc: 'SQLift is a full-stack workout tracking web application built as a CS-5200 Database Management course project. It lets users plan custom workouts from a library of 1000+ exercises, track live sessions set-by-set with weights and reps, and review progress through analytics graphs and personal records. A social layer allows users to befriend each other and compete on global and friend leaderboards ranked by total workout volume, while an achievements system rewards fitness milestones.',
    features: [
      {
        heading: 'Live Session Tracking',
        content:
          'During an active workout, users log every set in real time, with details like weight, reps, RPE, rest time, and set type (warm-up, working, drop) and with auto-fill from the previous set to speed up logging.',
      },
      {
        heading: 'Exercise Library',
        content:
          'A pre-populated library of 1000+ exercises sourced from the Wger API, each tagged with targeted muscle groups and required equipment, supports filtering and browsing by category.',
      },
      {
        heading: 'Progress Analytics',
        content:
          'The stats page visualizes exercise progression over configurable time ranges, tracks body measurements, displays muscle group volume breakdowns, and surfaces hero stats like total volume, heaviest set, and session streaks.',
      },
      {
        heading: 'Social & Leaderboards',
        content:
          'Users can send and manage friend requests, set friendship visibility levels, and compete on both a global and friends-only leaderboard ranked by cumulative workout volume.',
      },
      {
        heading: 'Achievements & Goals',
        content:
          'An achievements system awards badges for fitness milestones, and a goals feature lets users set personal objectives with target completion dates and track them over time.',
      },
    ],
    technologies: [
      { name: 'React', icon: 'icon_react.svg' },
      { name: 'Python', icon: 'icon_python.svg' },
      { name: 'Flask', icon: 'icon_flask.svg' },
      { name: 'PostgreSQL', icon: 'icon_postgresql.svg' },
      { name: 'Supabase', icon: 'icon_supabase.svg' },
    ],
    responsibilities: [
      'Designed the relational database schema, including the multi-level session of record set hierarchy, friendship graph, achievements, and goals tables.',
      'Built and maintained backend Flask API modules for workout CRUD, live session tracking, analytics, leaderboard calculations, and achievements.',
      'Wrote the Python web scraper to populate the exercise library with 1000+ entries, muscle group mappings, and equipment data from the Wger API.',
      'Implemented session-based authentication with bcrypt password hashing and contributed to profile and friend management endpoints.',
      'Contributed to the React frontend, including the live session page, stats visualizations, and leaderboard views.',
      'Configured the GitHub Actions CI/CD pipeline for automated deployment to Vercel with smoke tests against the live backend.',
    ],
    videos: [],
    additional: [
      'This project was built as the final project for CS-5200 Database Management Systems at Northeastern University, with a focus on relational database design and complex SQL querying.',
      'The database schema spans 15+ tables with multi-level relational hierarchies, covering users, workouts, sessions, set logs, exercises, muscle groups, equipment, measurements, friendships, goals, and achievements.',
      'Supabase transaction pooler (port 6543) is used for efficient connection management, allowing the stateless Vercel serverless backend to interact with PostgreSQL without exhausting connections.',
      'The exercise library was populated using a custom Python scraper that fetched and normalized data from the Wger open-source fitness API across multiple pages.',
      'Additional features were planned, such as multiple user roles (for trainers) as well as more achievements and a way to upload profile pictures, but were scrapped due to time constraints.',
      'The project was built collaboratively by a three-person team (Shaad Qureshi, Ben O\'Neil, Sudaiv Shetty) with Git-based workflows and feature branches.',
    ],
  },
  homi: {
    ...getProjBase('homi'),
    game: false,
    urls: [
      {
        label: 'Live Project',
        icon: '',
        url: 'https://homi-bot.vercel.app',
      },
      {
        label: 'GitHub',
        icon: '',
        url: 'https://github.com/shaadqrsh/HOMI-distro',
      },
    ],
    desc: 'This project is a full-stack application that leverages a fine-tuned Large Language Model (LLM) to provide AI-powered assistance for objective-based learning, specifically for BSc. IT students. The application aims to enhance the learning experience by offering personalized study materials, dynamically generating MCQs based on proficiency levels, resolving user doubts in real-time through a chatbot, and providing tools for assignment tracking, and attendance logging. This system seeks to address the limitations of traditional teaching methods by offering adaptive and interactive educational tools, making learning more accessible, engaging, and effective for IT students.',
    features: [
      {
        heading: 'LLM Integration',
        content:
          'This system utilizes a customized LLM (based on DeepSeek) for core AI functionalities such as query processing and question generation.',
      },
      {
        heading: 'Chatbot Query Resolution',
        content:
          'The user can chat with the model to ask questions, generate personalized study material and store and organize them with a robust folder structure system.',
      },
      {
        heading: 'Attendance and Assignment Tracking',
        content:
          'Users can track and log their attendance and calcuate the number. The user can also log their assignments and use the website as a checklist for these assignments.',
      },
      {
        heading: 'Test Generation',
        content:
          'The user can assess their knowledge about a certain topic they have studied in the form of graded multiple-choice based tests and as flashcards.',
      },
      {
        heading: 'Secure Authentication',
        content:
          'The application uses secure authentication methods to log into the system, and a robust database to store user details, questions, tests and more.',
      },
    ],
    technologies: [
      { name: 'NextJS', icon: 'icon_nextjs.svg' },
      { name: 'TailwindCSS', icon: 'icon_tailwind.svg' },
      { name: 'Typescript', icon: 'icon_typescript.svg' },
      { name: 'ReactQuery', icon: 'icon_supabase.svg' },
      { name: 'Django', icon: 'icon_django.svg' },
      { name: 'PostgreSQL', icon: 'icon_postgresql.svg' },
      { name: 'DeepSeek R1', icon: 'icon_deepseek.svg' },
      { name: 'Gemini', icon: 'icon_gemini.svg' },
      { name: 'Docker', icon: 'icon_docker.svg' },
    ],
    responsibilities: [
      'Assumed the responsibility of "Project Manager" and managed a team of 6 people working on the project',
      'Trained the LLM (based on DeepSeek R1) on cloud and local machines.',
      'Collected the data for training the model from textbooks, using manual scanning and several scraping techniques.',
      'Developed several backend features, especially those related to interfacing with the actual model.',
      'Assisted in deploying the backend onto HuggingFace Spaces, and uploaded the model onto HuggingFaces.',
      'Assisted in designing several UI components and pages in the application.',
      'Funded the development of the application until a grant was offered to us by our college.',
    ],
    videos: [],
    additional: [
      'This capstone project spanned seven months from ideation to presentation and was presented before my graduation.',
      'Features like a mental health guide, study roadmap generator, and PDF chat export were planned, but they were scrapped due to time constraints.',
      'The project successfully attracted an external investor grant, and these investors plan to further expand its capabilities.',
      'The research done on this project yielded 3 research papers. One was presented at an IEEE conference, one was published in the IJERT journal and one is currently under review.',
      "The project's technical sophistication and innovation were highly praised by an examiner from IITB (Indian Institute of Technology - Bombay) during its final assessment.",
    ],
  },
  findly: {
    ...getProjBase('findly'),
    game: false,
    urls: [
      {
        label: 'GitHub',
        icon: '',
        url: 'https://github.com/shaadqrsh/findly-android-studio/',
      }
    ],
    desc: 'A comprehensive Android application designed to help users connect and exchange information about lost and found items. It provides a platform where users can post detailed listings of items they have lost or found, complete with categories, descriptions, and images. The app facilitates direct communication between users through an integrated real-time chat system, allowing for efficient resolution and return of items. It also includes robust user management features, personal item listings, and a dynamic interface for a seamless user experience.',
    features: [
      {
        heading: 'Instant Item Updates',
        content:
          'The live, continuously updating feed of lost and found items lets users see new item posts and existing item updates instantly, ensuring they always have the most current information.',
      },
      {
        heading: 'In-App Chat Feature',
        content:
          'Users can participate in private conversations directly within the app, facilitating direct and secure communication between 2 people to discuss item details and coordinate returns.',
      },
      {
        heading: 'Camera and Gallery Integration',
        content:
          "The app has robust photo upload capabilities, enabling users to attach images to item listings and profile pictures directly from their device's camera or photo gallery.",
      },
      {
        heading: 'Secure Contact Sharing',
        content:
          'Chats feature an integrated option for users to securely share their personal contact details (phone number and/or email), facilitating direct contact while maintaining privacy.',
      },
      {
        heading: 'Personalized Item Browsing Views',
        content:
          'The app offers distinct browsing categories, each with dynamic search capability: "Lost" and "Found" for general listings, and a "Mine" section for the current user\'s items.',
      },
    ],
    technologies: [
      { name: 'Java', icon: 'icon_java.svg' },
      { name: 'XML', icon: 'icon_xml.svg' },
      { name: 'Android Studio', icon: 'icon_android.svg' },
      { name: 'Firebase', icon: 'firebase.svg' }
    ],
    responsibilities: [
      'Designed, implemented, and maintained the client-side Android application',
      'Structured the Firebase Realtime Database for storage and retrieval of user profiles, item listings, and real-time messages.',
      'Implemented custom user registration and login flows, managing user sessions, and ensuring that users can only access and modify data relevant to them.',
      'Developed image capture/select functionality, and integrating with Firebase Storage for secure image uploads and retrieval.',
      'Developing layouts, implementing responsive UI elements, smooth navigation, and providing clear user feedback through XML and Java.',
    ],
    videos: [],
    additional: [
      'This project was developed as a project showcase for the subject "Advanced Mobile Programming". It was developed in a span of 3 weeks, and completed 3 months before our evaluation.',
      'The inspiration for Findly sprang from first-hand experience of the inefficiency of poorly managed lost-and-found system on campus. The vision was to replace messy lost-and-found boxes with a streamlined digital solution.',
      'The practical utility of the app impressed our professor and there were discussions about its potential deployment as the official lost-and-found system for the entire college campus.',
      'Ideas like Google Maps for item location tracking, leveraging AI for image matching between lost and found items, incorporating push notifications for category alerts were considered during planning, but were scrapped for the initial release to focus on getting the key features in place first.',
      "As a solo developer, I opted for Firebase as the backend, for its real-time features for dynamic updates and live chat. Despite the credit card requirement, this choice simplified infrastructure setup, freeing me to concentrate on the Android app's UI/UX and core logic, ultimately making it the sole project in the batch with a robust server backend.",
      'The project utilizes a custom authentication system developed from the ground-up using Firebase and traditional encryption techniques, because I was unable to integrate Firebase Authentication. This was removed in the GitHub release, where passwords are plaintext instead.'
    ],
  },
};
