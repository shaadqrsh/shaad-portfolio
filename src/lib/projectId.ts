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
        url: 'https://github.com/shaadqrsh/harvest-rush',
      },
    ],
    desc: 'Harvest Rush is a one or two player farming game about running out of time, with the same kind of juggling as Overcooked. A delivery truck docks at the edge of a tile-based farm with an order to fill, and you have until it leaves to fill it. That means tilling soil, sowing seeds, watering crops through their growth stages, and carrying finished carrots, wheat, and tomatoes to the loading dock. Pests burrow up from the corners to steal produce, and fires spread across the field and block the paths you were counting on. With two players the whole thing becomes a shouting match about who is doing what.',
    features: [
      {
        heading: 'Frantic Couch Co-op & Solo Play',
        content:
          'Two people share a keyboard, or one person runs the farm alone. Three game lengths (Short, Medium, Long) change the wave budgets and how hard the hazards push, so a solo run has its own tuning instead of being the same game with fewer hands.',
      },
      {
        heading: 'Context-Sensitive Tool Pipeline',
        content:
          'There is a single action button, and what it does depends on the tile you are facing and what you are holding. It can till with a rake, plant from a reusable seed bag, water a plot, pull a crop up by hand, or set produce down on a work table, so you never hunt for the right key.',
      },
      {
        heading: 'Pests & Spreading Fire',
        content:
          'Pests come up from burrows in the corners and take crops off plots and tables. Fires scorch neighboring tiles and cut off paths. A rake sweeps the pests away and a watering can puts out fire, so the tool you need for the emergency is usually the one you just put down.',
      },
      {
        heading: 'Wave-Based Delivery Truck & Score Chasing',
        content:
          'Waves run back to back. The truck arrives at the loading bay wanting specific produce, and filling the order pays out per crop plus a completion bonus that grows as you keep up. The day ends on a results board that keeps top runs per farm and mode.',
      },
      {
        heading: 'Pixel-Art Farm & Clear Feedback',
        content:
          'The farm is 16:9 pixel art, with animated growth stages for every crop. Color-tint pulses, fill meters, and audio cues tell you what changed, which matters when both players are watching opposite corners of the screen.',
      },
    ],
    technologies: [
      { name: 'C++', icon: 'icon_cpp.svg' },
      { name: 'SDL3', icon: 'icon_cpp.svg' },
      { name: 'CMake', icon: 'icon_cmake.svg' },
      { name: 'Python', icon: 'icon_python.svg' },
      { name: 'Aseprite', icon: 'icon_aseprite.svg' },
      { name: 'Photoshop', icon: 'icon_photoshop.svg' },
    ],
    responsibilities: [
      'Wrote a 2D game engine in C++20 and SDL3 around a cache-friendly Entity Component System (ECS).',
      'Built grid-locked movement that glides from tile to tile, directional facing, and one context-sensitive interaction system that both players use on the same keyboard.',
      'Implemented A* pathfinding for the pests, using blackboard coordinate sets so they route around live fires and each other in real time.',
      'Wrote a procedural order generator that uses recursive backtracking with reachability pruning, so every wave order fits its labor budget and never deadlocks or asks for something impossible.',
      'Built a modular timer system for interactions, covering channels that freeze the player, safe aborts between partners, and flood-fill logic for putting out fires.',
      'Wrote TTF font rendering with generated outlines, color-flash shader effects, and atomic file writes so high scores save safely.',
      'Wrote Python scripts that pack the sprite sheets, and set up the cross-platform CMake build and automated test harnesses.',
    ],
    captions: [
      'The title screen. You set the number of farmers, the farm and the length of the day here.',
      "The How to Play screen fits the whole loop and both players' controls on one page.",
      'The score board keeps the best runs for each farm and player count.',
      'Two farmers at the start of a day. The panel in the top left shows the first order, three carrots and one wheat.',
      'Every plot starts out untilled, so the first few seconds of a wave go to raking.',
      'Mid-wave. One wheat is ready to pick, two plots are watered, and a fire is spreading between them while pests wander in.',
      'The truck has docked in the bottom left, and the fire now cuts across the paths to it.',
      'Day Complete shows the final score and where the run lands on the high-score table.',
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=vy0YEP0-qF8', title: 'Harvest Rush - Gameplay Demo', channel: 'Shaad Qureshi' },
    ],
    additional: [
      'This was my capstone final project for CS 5850 (Building Game Engines) at Northeastern University, built on top of an engine I wrote from scratch over the semester.',
      'The design borrows the co-op panic of Overcooked and the farming loop of Stardew Valley.',
      'The decorative background art on the title screen, help menu, and end-of-day scores screens is generative AI. I ran out of time to illustrate three full-screen images before the deadline. Everything in the game itself, the sprites, tiles, and HUD, is a mix of my own assets and public assets from itch.io.',
      'Playtesting cut two mechanics I had been attached to, running to a central water trough and stockpiling produce in storage bins. Both slowed the game down. Passing tools hand to hand and staging crops on tables replaced them.',
      'It used to have a hard quota you either met or failed. That made the fires and pests feel punishing instead of funny, so I moved it to a score attack where every crop you load still counts for something.',
      'I wrote a headless test harness that ran 50,000 simulated wave generations to check that the procedural delivery algorithm was actually fair, rather than trusting that it looked fine in play.',
      'Solo and two-player runs have separate tuning profiles across the three lengths (Short, Medium, Long).',
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
    desc: 'Someone is counting themselves to sleep, and you are the sheep. Each number they count becomes a floor of glowing cloud-cubes in the shape of that numeral. When the count ticks down, the floor reflows. Unstable clouds shudder and drop into the dark, and new ones rise out of the fog somewhere else. Ride the count all the way down and the sleeper drifts off. Miss a jump and you wake them up.',
    features: [
      {
        heading: 'Shifting Cloud Floors',
        content:
          'Every number is drawn in a 5x7 pixel font, and each lit pixel is a cube you can stand on. When the count drops, clouds that are about to vanish flash and shake first, and incoming clouds show up as faint ghosts, so you have a moment to jump before the tile under you disappears.',
      },
      {
        heading: 'Floaty, Buoyant Platforming',
        content:
          'The sheep hovers on a spring above the clouds and falls slowly. A standing jump clears a one-cube gap and a running jump clears about two. You can still jump for a split second after leaving a ledge, and you can hang a little past an edge without falling.',
      },
      {
        heading: 'Reactive Audio & Randomized Bleats',
        content:
          'An ambient drone plays underneath, with chimes when the floor changes. The sheep bleats when it jumps, lands, grabs a star, nearly falls, and falls asleep, and every bleat has a randomized pitch, length and vibrato.',
      },
      {
        heading: 'Dream, Endless & Zen Modes',
        content:
          'Dream runs count down through a set sequence such as Fibonacci, primes, halving, or a 20-to-1 Long Night. Endless Mode is the high score chase, with star combos and a timer that tightens the longer you last. Zen Mode has no fail state and floats you back to safety when you drift off a cloud.',
      },
      {
        heading: 'Dream Journal HUD & Minimap',
        content:
          'The HUD is styled as a dream journal. Instead of a progress bar there is a pen-sketched eye whose lid closes as the run goes on and startles open when you fall. A top-down minimap shows your position and the shape of the next number, so you can plan a route before the floor changes.',
      },
    ],
    technologies: [
      { name: 'Unity', icon: 'icon_unity.svg' },
      { name: 'C#', icon: 'icon_cs.svg' },
      { name: 'Universal Render Pipeline (URP)', icon: 'icon_unity.svg' },
      { name: 'Shader Graph', icon: 'icon_unity.svg' },
      { name: 'VFX Graph', icon: 'icon_unity.svg' },
      { name: 'UI Toolkit', icon: 'icon_unity.svg' },
      { name: 'Blender', icon: 'icon_blender.svg' },
    ],
    responsibilities: [
      'Built the game solo in Unity 6 and C# in 96 hours for the GMTK Game Jam 2026, around ScriptableObject config assets, event channels and a game state machine',
      'Wrote a custom kinematic character controller with a damped hover spring, low gravity, coyote time and an inflated support footprint for forgiving ledges',
      'Built the number floor as a fixed pool of cube slots drawn with GPU instancing, so each reflow toggles cell state and never creates or destroys objects',
      'Made a Shader Graph material for the cloud cubes with Fresnel rim lighting, emissive glow and alpha-clip crumbling',
      'Wrote a procedural synthesizer in C# that renders randomized sheep bleats from detuned saw waves and a formant filter, then pitch-bends them live through an AudioMixer',
      'Implemented the dream-journal HUD in UI Toolkit, including the animated eyelid sleep gauge and a minimap that previews the next number',
      'Modelled the sheep, cloud cube and star in Blender and exported them to Unity as FBX',
    ],
    captions: [
      'The sheep on a floor of cloud-cubes shaped like the current number. The map in the top right previews the next one.',
      'Level select. Each level counts down a different sequence, from plain countdowns to primes and Fibonacci.',
      "The How to Play page sets up the premise. You're a sheep in someone's dream, riding their count down to sleep.",
      'High scores for Endless mode and for every level at the Short game length.',
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=5QQGjnN5d8g', title: 'Counting Sheep - Gameplay Demo', channel: 'Shaad Qureshi' },
    ],
    additional: [
      'Made solo in 96 hours for the GMTK Game Jam 2026. Counting sheep is already a countdown ritual, and sheep jump, so the theme fit the premise without any stretching.',
      'Players rated it 4.5 out of 5 in every category except Audio, from 15 ratings.',
      'The guiding rule was "logic blocky, render fluffy". Movement and collision run on an exact cube grid, and the soft glowing clouds are only drawn on top.',
      "My rule for difficulty was that a death should feel like your fault, not the game's. Turning the slider up only shortens the timing. The warning flash and the grace window never go away.",
      'The look comes from storybooks and ink dream diaries, with handwritten type on an indigo and starlight palette.',
      'Zen Mode is there for unwinding. It has no timer pressure, no score and no way to fail.',
      'It plays with a gamepad or a keyboard.',
    ],
  },
  tictacgone: {
    ...getProjBase('tictacgone'),
    game: true,
    urls: [
      {
        label: 'Itch.io',
        icon: '',
        url: 'https://bro-skito.itch.io/tic-tac-gone',
      },
    ],
    desc: "Tic-Tac-Gone is tic-tac-toe with a short memory. Each player can only have three pieces on the board, so placing a fourth removes your oldest one and the grid never fills up into a draw. The piece you are about to lose fades and pulses, and that is where most of the thinking happens because a line you are blocking can open up the moment your own piece leaves. It started as a scrapbook idea from undergrad and now runs in the browser on desktop and phones, against a friend on the same device or against the computer.",
    features: [
      {
        heading: 'Three-Piece FIFO Rule & No Draws',
        content: "Each player can have three pieces on the board. Placing a fourth removes that player's oldest piece, so every game ends with a winner. The next piece to go fades and pulses, and the pips on each player card show the same queue.",
      },
      {
        heading: 'Three-Tier Computer Opponent',
        content: 'Easy plays mostly at random and spots an immediate win half the time. Normal takes a winning move, otherwise blocks yours, and accounts for its own oldest piece disappearing when it blocks. Hard searches 6 moves ahead early in the game and 9 once the board is full.',
      },
      {
        heading: 'Beat-the-Clock Turn Timer',
        content: 'An optional limit of 5, 10, 20 or 30 seconds per move. When it runs out, the game either plays a random move for you or skips your turn, depending on the setting. The timer stops while the game is paused and never applies to the computer.',
      },
      {
        heading: 'Tactile 3D Board on Desktop & Mobile',
        content: 'Pieces drop onto a low-poly wooden board, and you can drag to tilt it. On a phone, pressing a tile previews your piece, lifting your finger on the same tile places it, and sliding away cancels. Keyboard players can use 1 to 9 or the arrow keys and Enter.',
      },
      {
        heading: 'Fully Synthesized Audio',
        content: 'Every sound effect and the ambient music are generated at runtime with the Web Audio API. There are no audio files in the game. Music and effects have separate volume sliders.',
      },
      {
        heading: 'Living Title Screen & Rematch Scoring',
        content: 'A computer-vs-computer game plays behind the main menu. The result screen keeps score across rematches, and settings are saved in localStorage between visits.',
      },
    ],
    technologies: [
      { name: 'JavaScript', icon: 'icon_javascript.svg' },
      { name: 'Three.js', icon: '' },
      { name: 'Vite', icon: 'icon_vite.svg' },
      { name: 'Web Audio API', icon: '' },
      { name: 'HTML5', icon: '' },
      { name: 'CSS', icon: '' },
      { name: 'Claude Fable', icon: 'icon_claude.svg' },
    ],
    responsibilities: [
      'Wrote the game design document defining the three-piece FIFO rule, the win condition, both game modes and the original rule-based AI',
      'Designed the faded, pulsing "next to go" cue so players can always see which of their pieces leaves on their next move',
      'Set the art direction of warm low-poly wood against a cool navy backdrop and used Claude Fable to model the board, pieces and background shapes procedurally in Three.js',
      'Wrote large parts of the JavaScript and Three.js code across 7 modules covering rules, AI, rendering, audio, UI, game flow and settings',
      'Refined and extended the codebase with Claude Fable, reviewing each change before keeping it',
      'Playtested builds on desktop and mobile, covering the three AI difficulty levels, the turn timer and touch controls',
      'Prepared the itch.io HTML5 release with a Vite build using relative asset paths and a one-command ZIP script',
    ],
    captions: [
      'The title screen. A computer-vs-computer game plays on the board behind the menu.',
      'A two-player game in progress. The faded X is the piece Player 1 loses on their next move.',
      'Player 1 wins with three in a row on move 11, and the score carries over into the rematch.',
      'How to Play fits all four rules and the controls on one screen.',
      'Setting up a game against the computer. You choose whether to move first and pick one of three difficulties.',
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=ILDVz_3mmkk', title: 'Tic-Tac-Gone - Gameplay Demo', channel: 'Shaad Qureshi' },
    ],
    additional: [
      'This started as a scrapbook idea from undergrad, tic-tac-toe where your pieces do not stay forever. I first pictured it in Unity, but a full engine felt like too much for a 3x3 board, so I built it for the browser instead.',
      "I mainly wanted an HTML5 Three.js project under my belt. It was also my first time using Claude Fable, which I tried through Claude's introductory $100 in credits.",
      'I wrote big chunks of the code myself and used Fable to refine it. Fable made the 3D models, and I was impressed by how well it handled modelling in code.',
      'There are no image, model or audio files in the game. The board and pieces are built from Three.js geometry, and the music and sound effects are synthesized with Web Audio.',
      'The design doc only called for an AI that wins, blocks or plays randomly. That became Normal difficulty, and the finished game also has Easy and a Hard mode that runs a negamax search with alpha-beta pruning.',
      "What I'm proudest of is taking a simple scrapbook game and making it feel fresh. Solo personal project, finished in October 2026.",
    ],
  },
  bushido: {
    ...getProjBase('bushido'),
    game: true,
    urls: [
      {
        label: 'Eevee Expo',
        icon: '',
        url: 'https://eeveeexpo.com/bushido/',
      },
      {
        label: 'Direct Download',
        icon: '',
        url: 'https://drive.google.com/file/d/1IZ3AlFv5rm8xrUn9YbwLe4i-Bu9YwHpO/view',
      },
      {
        label: 'GitHub',
        icon: '',
        url: 'https://github.com/TheLuxDiablo/Pokemon-Bushido',
      },
    ],
    desc: "Pokémon Bushido is set in the Aisho Region, a land of old traditions modeled on feudal Japan. You play the child of the Royal Samurai, training in the martial arts alongside your Pokémon, learning what it means to be a Kenshi, and going up against the Akui Clan and their Shadow Pokémon. It keeps the classic Pokémon gameplay and adds new mechanics like Katana techniques, a samurai look across the whole region, and a story that runs 10 to 15 hours.",
    features: [
      {
        heading: 'A Feudal Japan-Inspired World',
        content:
          'The Aisho region is a brand new land with a samurai look, which is a big change from the usual Pokémon settings.',
      },
      {
        heading: 'Pokémon up to Gen 8',
        content:
          'You can build a team from Pokémon up to Generation 8, all drawn in the classic Gen 4 sprite style.',
      },
      {
        heading: 'Original Storyline',
        content:
          'A 10 to 15 hour story where you play the child of the Royal Samurai, training to become a Kenshi and digging into the secrets and conflicts of the Aisho region, including what the Akui Clan is up to.',
      },
      {
        heading: 'Return of Shadow Pokémon',
        content:
          'Shadow Pokémon, an idea taken from Pokémon XD: Gale of Darkness, are back. These corrupted Pokémon are tougher to deal with, and you can snag them from opposing trainers and purify them.',
      },
      {
        heading: 'Katana Styles',
        content:
          'Katanas replace HMs. Each one gets you past certain obstacles in the overworld, and you can also use them in battle to change the weather or inflict status effects.',
      },
    ],
    technologies: [
      { name: 'Ruby', icon: 'icon_ruby.svg' },
      { name: 'C++', icon: 'icon_cpp.svg' },
      { name: 'Photoshop', icon: 'icon_photoshop.svg' },
      { name: 'Aseprite', icon: 'icon_aseprite.svg' },
    ],
    responsibilities: [
      'Developed the core engine the game runs on.',
      'Created new mechanics that set it apart from the mainline Pokémon games, including Katana techniques, mid-battle dialogue, following Pokémon and battle animations.',
      'Gathered publicly available assets so the game could be finished within 30 days.',
      'Evented several in-game cutscenes and wrote custom scripts for new functionality.',
      "Designed UI for the battle system, including detailed battle backgrounds and themes that match the game's samurai look.",
      "Helped design the game's story and core gameplay loop.",
    ],
    captions: [
      'The Aisho Shogun opens the story by testing you in front of the court.',
      'The versus screen for Tsuku, one of the Kenshi you fight along the way.',
      "A trainer asks about the Kenshi's moral code in the middle of a battle.",
      'An Akui Clan grunt sends out a Shadow Pokémon.',
      "The Katana of Light's Water Walking Style lets you cross water instead of using Surf.",
      'A wild Virizion whose soul has been locked away.',
      'Ryo Masayoshi, the Royal Samurai, gives you your first task.',
      'A cave battle against an Akui Clan member and their Pangoro.',
      'Celebi leads you to a shrine hidden in the forest.',
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=OH5pCKUim3k', title: 'SHADOW POKEMON and a NEW JOURNEY! Pokemon Bushido Nuzlocke - EP1', channel: 'aDrive' },
      { url: 'https://www.youtube.com/watch?v=NNM4zsBrNFQ', title: 'Pokemon Bushido The Awesome Fangame With SAMURAI CULTS!', channel: 'zwiggo' },
      { url: 'https://www.youtube.com/watch?v=L5ClFPCufkc', title: 'The Pokemon game where you play as a SAMURAI!', channel: 'Twig' },
      { url: 'https://www.youtube.com/watch?v=QWEIOSc5Euw', title: 'The Pokemon game where you BECOME A SAMURAI', channel: 'Moopsten' },
    ],
    additional: [
      'We made this in 30 days for the Relic Castle (Eevee Expo) Winter Game Jam #2, and it won first place.',
      'We came up with the feudal Japan setting months before the official games went in a similar direction with Pokémon Legends: Arceus.',
      'We planned expansions that would have made the Aisho region bigger and given the main characters more story, but the team broke up and they were scrapped.',
      'It takes a lot from Pokémon Conquest and Pokémon XD: Gale of Darkness, including assets from both, and borrows assets from other official Pokémon games too.',
      'Thundaga, a YouTuber, led the project, and the development was recorded as VODs on their YouTube and Twitch channels.',
      "It's one of the highest rated and most viewed games on Eevee Expo (formerly Relic Castle), the forum where it first launched.",
      'People have called it one of the best Pokémon fangames of 2021.',
    ],
  },
  splice: {
    ...getProjBase('splice'),
    game: true,
    urls: [
      {
        label: 'Eevee Expo',
        icon: '',
        url: 'https://eeveeexpo.com/splice/',
      },
      {
        label: 'Direct Download',
        icon: '',
        url: 'https://drive.google.com/file/d/1igsvdRzCU9S3AgiGcCIR9jpDKJBDoWgv/view',
      },
    ],
    desc: "You play a research assistant helping Professor Cypress study newly discovered Pokémon forms. Your starter, Arenay, can change its type, and you take it across the Stacona region. Along the way you side with either Team Biogress, who believe in natural development, or Team Quantech, who want to improve Pokémon with technology. That choice changes how the rest of the story plays out, and it decides which side of the fight over Pokémon research you end up on.",
    features: [
      {
        heading: 'New Region',
        content:
          "Pokémon Splice is set in the Stacona Region, a brand new world with its own environments and Pokémon species you haven't seen before.",
      },
      {
        heading: 'New Pokémon Species',
        content:
          'There are several new species, like Arenay, the starter that changes form, plus new evolutions and pre-evolutions for existing Pokémon such as Pinsir, Skarmory and Combee.',
      },
      {
        heading: 'Branching Storylines',
        content:
          "You join one of two rival research groups, Team Biogress or Team Quantech. The choice changes the direction of the story and what you're working toward for the rest of the game.",
      },
      {
        heading: 'New Regional Forms',
        content:
          "Stacona has its own regional forms. Some occur naturally, like Dunsparce's, and others came out of the two research teams' experiments, like the new forms of Solosis, Lotad, Raichu and Electivire.",
      },
      {
        heading: 'Gen 3 Art Style',
        content:
          'The environments and UI are a tribute to the Game Boy Advance era of Pokémon, but the game keeps all the quality-of-life improvements of the modern games.',
      },
    ],
    technologies: [
      { name: 'Ruby', icon: 'icon_ruby.svg' },
      { name: 'C++', icon: 'icon_cpp.svg' },
      { name: 'Photoshop', icon: 'icon_photoshop.svg' },
      { name: 'Aseprite', icon: 'icon_aseprite.svg' },
    ],
    responsibilities: [
      'Developed the core engine the game runs on.',
      'Created new mechanics that set it apart from the mainline Pokémon games, including form changing, mid-battle dialogue, following Pokémon and battle animations.',
      'Gathered publicly available assets so the game could be finished within 30 days.',
      'Evented several in-game cutscenes and wrote custom scripts for new functionality.',
      'Designed UI for the battle system, including detailed battle backgrounds and themes that fit the Generation 3 style.',
      "Helped design the game's story and core gameplay loop.",
    ],
    captions: [
      'Naming Arenay, the starter that can change its type.',
      'Running tests on Arenay in the Cypress Lab.',
      "A rival turns up outside the lab, asking about Professor Cypress's research.",
      "Arenay's first battle, against a Zubat with Intimidate.",
      'Lumigen City, one of the towns in the Stacona region.',
      "Arenay's summary page, showing it as an Electric type.",
      'Exploring an ice cave with Arenay following behind.',
      'A wild Heraplex, one of the new species in the game.',
      'Someone holding an egg takes a closer look at your Arenay.',
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=B9DS0Nyegag', title: 'Pokémon Splice - Episode 1 / FUSION REBORN!', channel: 'MunchingOrange' },
      { url: 'https://www.youtube.com/watch?v=X34OZt5Tvdk', title: 'Speedrunning Pokémon Splice', channel: 'Thundaga' },
      { url: 'https://www.youtube.com/watch?v=-XgNEFjSQmc', title: "Pokemon Splice - Part 1 - FAKEMON STARTER (Walkthrough/Let's Play)", channel: 'MxRK GG' },
    ],
    additional: [
      'We made this in 30 days for the Relic Castle (Eevee Expo) Game Jam 6, and it won first place.',
      'We planned more chapters and made assets for them, including new legendaries and forms that are still in the game files, but the team broke up and the expansions were scrapped.',
      'Thundaga, a YouTuber, led the project, and the development was recorded as VODs on their YouTube and Twitch channels.',
      'The game was discontinued in 2023, and everyone on the team moved on to other projects.',
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
    desc: "CareerPath AI was my test of how far 'vibe coding' with Gemini 3 Pro could go. I built it over a single three-day weekend, and it works as a career counselor that tries to go past generic advice. You give it some background about yourself and take a quiz, and it suggests careers that fit you, each with a roadmap for getting there. It can also generate a realistic 'day in the life' slideshow for a career, so a job title turns into a picture of what the work looks like from day to day. It's a full-stack app with a React front end and a Python backend, and the AI wrote nearly all of it.",
    features: [
      {
        heading: 'Profile Analysis',
        content:
          'Google Gemini 2.5 Flash reads through your profile and quiz answers and matches you with careers based on your aptitude and personality instead of keywords.',
      },
      {
        heading: 'Career Roadmaps',
        content:
          'Each career comes with a step-by-step plan for the education and experience you need to get there from where you are now, including advice for where you live.',
      },
      {
        heading: 'Day-in-the-Life Slideshows',
        content:
          "Google's Nano Banana image model generates a realistic slideshow of an ordinary day in a job, without glamorizing it, so you can get a feel for whether you'd actually want to do it.",
      },
      {
        heading: 'Backend Proxy',
        content:
          'The React front end never talks to Gemini directly. A Python FastAPI backend sits in between as a proxy and holds the API keys and the business logic.',
      },
      {
        heading: 'Daily Limits',
        content:
          'A quota system in the database caps how many times a day each user can run the expensive parts, like image generation and detailed career analysis.',
      },
    ],
    technologies: [
      { name: 'React', icon: 'icon_react.svg' },
      { name: 'TypeScript', icon: 'icon_typescript.svg' },
      { name: 'Python', icon: 'icon_python.svg' },
      { name: 'Supabase', icon: 'icon_supabase.svg' },
      { name: 'Google Gemini', icon: 'icon_gemini.svg' },
      { name: 'TailwindCSS', icon: 'icon_tailwind.svg' },
      { name: 'PostgreSQL', icon: 'icon_postgresql.svg' },
      { name: 'Docker', icon: 'icon_docker.svg' },
    ],
    responsibilities: [
      'Built the full-stack codebase by prompting Gemini 3 Pro. I made the architecture decisions and the AI wrote the implementation.',
      'Deployed the backend to Hugging Face Spaces with Docker and the front end to Vercel.',
      'Designed the Supabase schema and Row Level Security policies so each user can only see their own data.',
      'Set up image generation as parallel async API calls, which cut down how long users wait for their slideshows.',
      'Used Zustand to manage state across the whole flow, from onboarding through to the results.'
    ],
    captions: [
      'The login page.',
      'The dashboard, where you pick a quiz for one field or take the general quiz.',
      'A quiz question asking how much the industry matters to you.',
      'The loading screen while Gemini reads your profile and looks for matches.',
      'Your career matches, ranked by match score with salary ranges and growth outlook.',
      "A career's detail page, with why it fits you and the skills it asks for.",
      'The roadmap from your current background to the role, broken into steps with rough timelines.',
      'A generated day-in-the-life slideshow for a Product Analyst.',
      'Saved careers, which you can reopen or delete.',
    ],
    videos: [],
    additional: [
      'I built this to see how well Gemini 3 Pro could reason through a real project. It took 3 days, and the AI wrote nearly all of the code.',
      'Most of what makes the app work is strict prompting that forces the LLM to answer in JSON, so the front end always gets structured data it can render.',
      'The Gemini API keys stay on the backend proxy, so they never show up in the client-side code.',
      'To save on tokens, career details load lazily. The detailed roadmap for a career is only generated when someone clicks into it.',
      'The loading screens have a "Nano Banana" badge as a nod to the image model\'s codename.',
    ],
  },
  sentineldesk: {
    ...getProjBase('sentineldesk'),
    game: false,
    urls: [{ label: 'GitHub', icon: '', url: 'https://github.com/miluskapajuelo/GDG-cloudburst' }],
    desc: 'SentinelDesk takes a raw support ticket in English or German and decides what happens to it. A classifier predicts its type, queue and priority, and a FAISS index finds the closest resolved tickets in either language. A rule-based gate then sends the ticket to the on-call engineer, to human review, or on to an AI draft. Gemini writes that draft, but it may only state facts from the past tickets it cites, and a person approves it before anything is sent.',
    features: [
      {
        heading: 'Probability-Based Escalation Gate',
        content: 'The gate escalates when P(high priority) is at least 0.20 and P(Incident) is at least 0.30, instead of trusting the most likely label. On the 5,718-ticket holdout it sent 90.7% of high-priority incidents to a person, where the classifier labels alone caught 69.2%. The price is a 47% escalation rate, and we chose that on purpose because a missed outage costs more than a human review.',
      },
      {
        heading: 'Grounded Drafts & Citation Checks',
        content: "Gemini drafts the reply in the customer's language and has to cite the past tickets it used. A validator rejects any citation to an unknown ticket and any money or percentage figure that isn't in the cited answers. All 39 drafts in a 40-ticket holdout sample passed.",
      },
      {
        heading: 'Cross-Lingual Precedent Search',
        content: 'English and German tickets share one multilingual MiniLM embedding space, so a German ticket can be answered from English resolutions. In the demo, a German hospital VPN outage pulls two English VPN tickets at similarity 0.81 and 0.80, and the German reply cites both.',
      },
      {
        heading: 'Major-Incident Burst Radar',
        content: 'When 3 or more similar tickets that share a rare term like "vpn" arrive within 15 minutes, the console shows a red banner with the cluster size. The rare-term rule kept false banners at 0% with 10 random tickets in the window. Similarity alone gave 21%.',
      },
      {
        heading: 'PII Masking Before the LLM',
        content: 'The API replaces emails, IBANs, Luhn-checked card numbers, IPs and phone numbers before any text reaches Gemini. It leaves ticket IDs, dates and version numbers alone, and the console shows how many items of each kind it masked.',
      },
      {
        heading: 'Human-in-the-Loop Operator Console',
        content: "The support agent sees the predictions with their confidence, the reason codes behind each decision and the cited precedents side by side. Nothing goes out without an explicit approval step. The judges said it was much friendlier to use than the other teams' dashboards.",
      },
    ],
    technologies: [
      { name: 'Python', icon: '' },
      { name: 'Google Gemini', icon: '' },
      { name: 'scikit-learn', icon: '' },
      { name: 'FastAPI', icon: '' },
      { name: 'React', icon: '' },
      { name: 'FAISS', icon: '' },
      { name: 'Sentence Transformers', icon: '' },
      { name: 'TypeScript', icon: '' },
      { name: 'Vite', icon: '' },
      { name: 'Tailwind CSS', icon: '' },
      { name: 'pandas', icon: '' },
      { name: 'pytest', icon: '' },
    ],
    responsibilities: [
      'Led a team of five in three parallel sub-teams and wrote the plan, the HTTP and Python API contract, the escalation policy and per-team task files before kickoff.',
      'Wrote one set of operating rules for the five coding agents working in the repo, covering folder ownership, one task per branch and a PR-only process for contract changes.',
      'Built the seed-42 80/20 data split with a SHA-256 fingerprint of the test IDs that every machine checked, keeping test labels in a separate file that only the eval script reads.',
      'Trained a TF-IDF (word 1-2 grams and char 3-5 grams) and logistic regression classifier with separate heads for type, queue and priority, reaching 0.878 type macro-F1 on the 5,718-ticket holdout.',
      'Measured expected calibration error on a validation slice, switched to C=10 and rejected sigmoid calibration because it lowered macro-F1 on every head.',
      'Built the first FastAPI mock server, service orchestrator and holdout evaluation script so the frontend and agent teams could work against real endpoints early.',
      'Ran the demo machine, wrote the slides and speaker notes, and presented the live demo to the judges.',
    ],
    captions: [],
    videos: [],
    additional: [
      'Placed 5th of 20 teams at the GDG Cloud Boston x Northeastern University Hackathon on 21 November 2026.',
      "The judges' main feedback was that our console was much friendlier than the other teams' dashboards, even though it had fewer features.",
      'The event gave us 6 hours and we planned the build for 5. Five of us split into three teams (ML and eval, the agent, and the frontend). I owned the data split and the classifier, and picked up API, eval and console tasks for teammates when they asked.',
      'Every one of us ran their own coding agent, so I wrote the rules all five agents followed. A shared contract fixed every field name up front, and each team built against mock responses until the real modules landed.',
      "Priority is the weak spot at 0.63 macro-F1. The labels are noisy and often depend on context the ticket doesn't state, so I put the effort into calibrated probabilities the gate could threshold. That is how escalation recall reached 90.7% when the classifier alone was at 69.2%.",
      'We were strict about leakage. Thresholds were tuned only on a 10% validation slice of the knowledge base, and only 1 test ticket body (0.02%) duplicated a knowledge-base body.',
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
    desc: "SQLift is a full-stack workout tracker we built for CS-5200 Database Management. You plan workouts from a library of 1000+ exercises, log each set's weight and reps during a live session, and look back at your progress through graphs and personal records. You can also add friends, compete on global and friends-only leaderboards ranked by total workout volume, and earn achievements for hitting fitness milestones.",
    features: [
      {
        heading: 'Live Session Tracking',
        content:
          'During a workout you log each set as you go, with the weight, reps, RPE, rest time and set type (warm-up, working or drop). Each new set auto-fills from the one before it to save typing.',
      },
      {
        heading: 'Exercise Library',
        content:
          'The library has 1000+ exercises pulled from the Wger API, each tagged with the muscle groups it works and the equipment it needs, and you can filter and browse it by category.',
      },
      {
        heading: 'Progress Analytics',
        content:
          'The stats page charts your progress on each exercise over a time range you choose, tracks body measurements, breaks down volume by muscle group, and shows headline numbers like total volume, heaviest set and session streaks.',
      },
      {
        heading: 'Social & Leaderboards',
        content:
          'You can send and manage friend requests, choose how much your friends can see, and compete on a global or friends-only leaderboard ranked by total workout volume.',
      },
      {
        heading: 'Achievements & Goals',
        content:
          'Achievements award badges for fitness milestones, and goals let you set a personal target with a completion date and track it over time.',
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
      'Designed the relational database schema, including the multi-level hierarchy from sessions down to individual set records, the friendship graph, and the achievements and goals tables.',
      'Built and maintained the Flask API modules for workout CRUD, live session tracking, analytics, leaderboard calculations and achievements.',
      'Wrote the Python web scraper that filled the exercise library with 1000+ entries, muscle group mappings and equipment data from the Wger API.',
      'Implemented session-based authentication with bcrypt password hashing and worked on the profile and friend management endpoints.',
      'Worked on the React front end, including the live session page, stats visualizations and leaderboard views.',
      'Set up the GitHub Actions CI/CD pipeline that deploys to Vercel and runs smoke tests against the live backend.',
    ],
    captions: [
      'The landing page.',
      'The Command Center home page, with saved programs and a summary of your training.',
      'The exercise library, with search and muscle group filters.',
      'The profile page, with your details, latest body measurements and goals.',
      'Achievements further down the profile page, each with the date it was earned.',
      'Performance Metrics, where you log body measurements and track goals.',
      'Workout streaks and a calendar of past sessions, above your lifetime bests and an exercise progression chart.',
      'Progress charts for body measurements over time.',
      'The leaderboard, ranked by total volume lifted, with a toggle between friends and everyone.',
    ],
    videos: [],
    additional: [
      'This was our final project for CS-5200 Database Management Systems at Northeastern University, so most of the effort went into relational database design and complex SQL queries.',
      'The schema has 15+ tables covering users, workouts, sessions, set logs, exercises, muscle groups, equipment, measurements, friendships, goals and achievements.',
      "The backend connects through Supabase's transaction pooler on port 6543, which lets the stateless Vercel serverless functions talk to PostgreSQL without running out of connections.",
      'My scraper filled the exercise library by paging through the open-source Wger fitness API and normalizing what came back.',
      'We also planned separate user roles for trainers, more achievements and profile picture uploads, but ran out of time.',
      "I built it with Ben O'Neil and Sudaiv Shetty, and we worked on feature branches in Git.",
    ],
  },
  nanorewind: {
    ...getProjBase('nanorewind'),
    game: false,
    urls: [
      { label: 'GitHub', icon: '', url: 'https://github.com/shaadqrsh/nanorewind-4k' },
      { label: 'Live Site', icon: '', url: 'https://nanorewind-4k.vercel.app' },
    ],
    desc: "NanoRewind 4K takes a scan of an old family photo and has Gemini's image model repair the scratches, tears and faded color. Before restoring you pick one of six photographic processes, like Cyanotype or Kodachrome 64, and afterwards you compare the result against the original with a loupe, a slider or side by side. Every restoration goes into a private album, and any of them can be published as an unlisted share link. Accounts start with 3 free credits and get 1 more every 24 hours. It is built to run in public, with privacy, terms and cookie policies, an 18+ sign-up check, WCAG AA contrast, full keyboard support and a strict Content Security Policy. Despite the name, output is about one megapixel for now.",
    features: [
      {
        heading: 'Six Darkroom Processes & Atmospheric Modifiers',
        content: 'Before restoring, you choose Standard, Silver Gelatin, Albumen, Cyanotype, Lumière Autochrome or Kodachrome 64. Two optional extras go on top of that, Chiaroscuro for deeper shadows and Matte Emulsion for softer, paper-like highlights.',
      },
      {
        heading: 'Loupe, Slider & Side-by-Side Comparison',
        content: 'The loupe is a 2.4x lens that shows the restored photo over the original wherever you hover. The slider is drag to reveal, and side by side shows both images with their pixel sizes. The app remembers the mode you used last.',
      },
      {
        heading: 'Private Family Album',
        content: 'Every restoration is saved to your album automatically. From there you can reopen one in the workspace with its original style settings, download it, share it or delete it. Settings has a single button that deletes every stored photo.',
      },
      {
        heading: 'Unlisted Share Links With Generated Preview Cards',
        content: 'Sharing a photo gives it a link at /share/<id> with a before/after slider. Each link gets its own 1200x630 preview card for chat apps, drawn on the server with the before and after held in photo corners. Links are kept out of search engines and can be turned off at any time.',
      },
      {
        heading: 'Batch Restore Queue',
        content: 'Drop up to 10 photos and they restore one after another, each with its own status and progress bar. When credits run out, the rest are marked "No credits left" and get picked up on the next run. Photos over 3 MB are shrunk in the browser to fit Vercel\'s 4.5 MB request limit.',
      },
      {
        heading: 'Locked-Down Accounts & Rate-Limited API',
        content: 'Sessions live in HttpOnly cookies, and email links carry a one-time PKCE code that only works in the browser that asked for it. Restores are capped at 5 per 10 minutes per IP. Location and camera data are stripped from photos in the browser before upload.',
      },
    ],
    technologies: [
      { name: 'React', icon: 'icon_react.svg' },
      { name: 'TypeScript', icon: 'icon_typescript.svg' },
      { name: 'Vite', icon: 'icon_vite.svg' },
      { name: 'Supabase', icon: 'icon_supabase.svg' },
      { name: 'Google Gemini', icon: 'icon_gemini.svg' },
      { name: 'Tailwind CSS', icon: 'icon_tailwind.svg' },
      { name: 'Node.js', icon: '' },
      { name: 'PostgreSQL', icon: 'icon_postgresql.svg' },
      { name: 'Vercel', icon: 'icon_vercel.svg' },
      { name: 'GitHub Actions', icon: '' },
    ],
    responsibilities: [
      'Built the React 19 and TypeScript front end with Vite and Tailwind CSS, including the restore workspace, the album view and three before/after comparison modes.',
      'Wrote Vercel serverless functions in TypeScript that call the Gemini image model, store originals and results in a private Supabase Storage bucket, and deduct credits through a Postgres RPC.',
      'Designed the Supabase schema with row-level security and least-privilege grants, limiting each user to their own profile, album rows and storage folder.',
      'Implemented per-IP rate limiting as a withRateLimit wrapper backed by an atomic sliding-window Postgres function that stores client IPs only as hashes.',
      'Moved sign-in sessions to HttpOnly, SameSite=Strict cookies with server-side renewal, and switched confirmation and password reset emails to PKCE links.',
      "Wrote privacy, terms and cookie policies covering India's DPDP Act and the GDPR, plus a Vite build plugin that prerenders them as static HTML and emits per-route meta tags and sitemap.xml.",
      'Brought all text to WCAG AA contrast (lowest 5.37:1), added skip links and focus trapping in dialogs, and code-split the bundle to cut home page JavaScript from 91 to 79 KB gzipped.',
    ],
    captions: [
      'The sign-in page, with a before and after of a restored print.',
      'The restore page, where you add a photo and choose one of six styles.',
      'Three photos queued up and waiting to be restored.',
      'A photo partway through restoring. It usually takes a few seconds.',
      'Side by side view of the original and the restored photo.',
      'The slider view. Drag the line to compare before and after.',
      'The loupe shows the restored photo at 2.4x wherever you hover.',
      'The album, where every restoration is saved.',
      'Creating an unlisted share link for a photo.',
      "What you see once the day's three free restorations are used up, with a countdown to the refill.",
    ],
    videos: [],
    additional: [
      'A solo personal project, built on and off between December 2025 and November 2026.',
      "The \"4K\" is only the name. Free restorations come out at about one megapixel, and I rewrote the landing page, terms and preview card to say so. Real 4K output is planned for a paid tier with Stripe, which I haven't built yet.",
      "Some of my own marketing copy was wrong. \"3 free restorations a day\" didn't match the logic, which refills 1 credit every 24 hours, and \"a few seconds\" was closer to a minute. I fixed both everywhere, including the preview image.",
      'I ran a security audit partway through. It found a token leak in the Decap CMS login proxy that lives in this repo, where any website could receive a CMS user\'s GitHub token. It now only goes to an allowlist of origins, and the same pass took dependency advisories from 23 to 0.',
      'I left out a public gallery on purpose. These are mostly family photos, so share links stay unlisted.',
      "For the redesign I wrote down what I didn't want it to look like, which was purple and black, glassmorphism, bento grids and Inter. I picked an oxblood family-album look out of three mockups.",
      "Before calling it ready for the public I spent a whole phase on compliance and accessibility. It is 18+ because India's DPDP Act treats under-18s as children and the Gemini API terms rule them out. I also dropped Google Fonts, since it sent every visitor's IP to Google, and now self-host the fonts.",
    ],
  },
  emaadportfolio: {
    ...getProjBase('emaadportfolio'),
    game: false,
    urls: [
      { label: 'Live Project', icon: '', url: 'https://emmeqqu-08.github.io/emaad-portfolio/' },
      { label: 'GitHub', icon: '', url: 'https://github.com/emmeqqu-08/emaad-portfolio' },
    ],
    desc: "A dark, cinematic portfolio site for Emaad's art, with a look borrowed from JoJo's Bizarre Adventure. There's a home page with a hero and a strip of selected pieces, a Works page with a filterable masonry grid, and an About page. Emaad runs it without me. They log into a Decap CMS dashboard with GitHub, drop in an image, fill out a form, and hit Publish, and the site rebuilds on its own. The whole setup costs nothing to run.",
    features: [
      {
        heading: 'No-Code Artist Dashboard',
        content: 'Emaad visits /admin, logs in with GitHub, and gets a form for each artwork with fields for the image, title, description, year, medium, dimensions, categories, and whether it is for sale. Publishing commits the file to the repo and the site redeploys.',
      },
      {
        heading: 'Masonry Gallery & Fullscreen Lightbox',
        content: 'The Works page lays pieces out in a Pinterest-style masonry grid. Visitors can filter by category and change the sort order. Clicking a piece opens a fullscreen lightbox with its full details, and the arrow keys and Escape work inside it.',
      },
      {
        heading: 'Every Word Editable from the CMS',
        content: 'The site name, tagline, hero statement, About text, portraits, category list, and social links all live in one settings file that the dashboard edits. Social links take any number of entries, each with an icon picked from a dropdown of 12 options.',
      },
      {
        heading: 'Curated Auto-Scrolling Selected Strip',
        content: 'Emaad picks which works appear on the home page with a searchable picker. If more are picked than fit on one row, the strip turns into a looping carousel that pauses on hover or touch and stays still for visitors who prefer reduced motion.',
      },
      {
        heading: 'Link Previews That Actually Work',
        content: 'Because it is a single-page app, crawlers from Discord, Slack, iMessage and X would only see an empty HTML shell. A post-build script writes the editable title and description into the static index.html so shared links show the right preview.',
      },
    ],
    technologies: [
      { name: 'React', icon: 'icon_react.svg' },
      { name: 'Vite', icon: 'icon_vite.svg' },
      { name: 'Decap CMS', icon: 'icon_decap.svg' },
      { name: 'GitHub Pages', icon: 'icon_git.svg' },
      { name: 'JavaScript', icon: 'icon_javascript.svg' },
      { name: 'Motion', icon: 'icon_motion.svg' },
      { name: 'GitHub Actions', icon: 'icon_git.svg' },
      { name: 'Vercel', icon: 'icon_vercel.svg' },
    ],
    responsibilities: [
      'Built a three-page React 19 and Vite site with React Router and Motion animations',
      'Integrated Decap CMS with a GitHub backend so a non-technical artist can publish artwork through a web form',
      'Wrote a dependency-free YAML frontmatter parser that loads CMS markdown files at build time through import.meta.glob',
      'Self-hosted a GitHub OAuth proxy for Decap as serverless functions on an existing Vercel project, after public proxies kept shutting down',
      'Configured a GitHub Actions workflow that builds and deploys to GitHub Pages on every push, deriving the Vite base path from the repo name',
      'Wrote a post-build Node script that injects CMS-editable title and Open Graph tags into the static HTML for social link previews',
      'Built a reusable auto-scrolling carousel hook that only activates on overflow and respects prefers-reduced-motion',
    ],
    captions: [
      'The home page hero.',
      'The Spotlight strip of selected pieces on the home page.',
      'The Works page, a masonry grid you can filter by category.',
      'The About page.',
      'The Decap CMS form Emaad fills out to add a new piece.',
      'The list of artworks in the CMS dashboard.',
    ],
    videos: [],
    additional: [
      "I built this for free for Emaad, who is family, so their art would have one place to live.",
      'The code took about five days, June 11 to 15, 2026. After that I transferred the repo to their GitHub account so the site belongs to them.',
      'Since launch Emaad has made over 110 commits through the dashboard without touching code, and the site had 68 artworks on it as of September 2026.',
      'Hosting is free end to end. GitHub Pages serves the site, GitHub Actions builds it, and the OAuth login runs on a Vercel project I already had for NanoRewind.',
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
    desc: "HOMI is a full-stack study assistant for BSc IT students, built on a fine-tuned large language model (LLM). It writes study material tailored to you, generates multiple-choice questions that match your level, and answers your doubts through a chatbot as they come up. It also keeps track of your attendance and assignments. We built it because regular classes don't adapt to how each student is doing, and we wanted studying to feel more personal and interactive.",
    features: [
      {
        heading: 'Fine-Tuned LLM',
        content:
          'A customized LLM based on DeepSeek does the AI work, like answering questions and generating tests.',
      },
      {
        heading: 'Chatbot',
        content:
          'You can chat with the model to ask questions or generate study material, and sort everything it gives you into folders.',
      },
      {
        heading: 'Attendance and Assignment Tracking',
        content:
          'You log your attendance for each subject, and HOMI works out how many more classes you can miss and still stay above your target. You can also log assignments and use the site as a checklist for them.',
      },
      {
        heading: 'Test Generation',
        content:
          "You can test yourself on a topic you've studied with graded multiple-choice tests or with flashcards.",
      },
      {
        heading: 'Secure Authentication',
        content:
          'Logging in uses secure authentication, and a PostgreSQL database stores user details, questions, tests and the rest.',
      },
    ],
    technologies: [
      { name: 'Next.js', icon: 'icon_nextjs.svg' },
      { name: 'Django', icon: 'icon_django.svg' },
      { name: 'PostgreSQL', icon: 'icon_postgresql.svg' },
      { name: 'DeepSeek R1', icon: 'icon_deepseek.svg' },
      { name: 'Gemini', icon: 'icon_gemini.svg' },
      { name: 'TailwindCSS', icon: 'icon_tailwind.svg' },
      { name: 'Typescript', icon: 'icon_typescript.svg' },
      { name: 'ReactQuery', icon: 'icon_supabase.svg' },
      { name: 'Docker', icon: 'icon_docker.svg' },
    ],
    responsibilities: [
      'Worked as project manager for the team of 6 people building it.',
      'Trained the LLM (based on DeepSeek R1) on cloud and local machines.',
      'Collected the training data from textbooks, using manual scanning, distillation and several scraping techniques.',
      'Built several backend features, mostly the parts that talk to the model.',
      'Helped deploy the backend to Hugging Face Spaces, and uploaded the model to Hugging Face.',
      'Helped design several UI components and pages.',
      'Paid for development myself until our college gave us a grant.',
    ],
    captions: [
      "HOMI answering a question about the 8051's timer registers.",
      'The chat sidebar, where conversations can be sorted into folders.',
      'Attendance by subject, with how many more classes you can miss and still stay above your target.',
      'Adding an assignment with its marks and due date.',
      'Ongoing and submitted assignments.',
      'Starting a test on a topic. You can practice with HOMI or take a timed test.',
      'A timed multiple-choice question on database normalization.',
      'The results page, with every question marked right or wrong.',
      'An explanation of why an answer was wrong.',
      'The sign-up page.',
    ],
    videos: [],
    additional: [
      'This was my undergrad capstone. It took seven months from the first idea to the final presentation, which happened before I graduated.',
      'We also planned a mental health guide, a study roadmap generator and PDF export for chats, but ran out of time.',
      'The project got a grant from outside investors, who plan to keep building on it.',
      'Our research for it turned into 3 papers. One was presented at an IEEE conference, one was published in IJERT, and one is still under review.',
      'During the final assessment, an examiner from IIT Bombay (Indian Institute of Technology Bombay) singled out the project for its technical depth and originality.',
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
    desc: "Findly is an Android app for lost and found items. People post listings for things they've lost or found, with a category, description and photos, and then chat inside the app to work out how to get each item back to its owner. You can also manage your own listings and your profile from the app.",
    features: [
      {
        heading: 'Instant Item Updates',
        content:
          'The feed of lost and found items updates live, so new posts and changes to existing ones show up right away.',
      },
      {
        heading: 'In-App Chat',
        content:
          'Two people can chat privately inside the app to talk through an item and arrange to return it.',
      },
      {
        heading: 'Camera and Gallery Integration',
        content:
          'You can attach photos to listings and set a profile picture straight from the camera or the photo gallery.',
      },
      {
        heading: 'Secure Contact Sharing',
        content:
          "From inside a chat you can share your phone number, your email or both, so your contact details only go to the person you're talking to.",
      },
      {
        heading: 'Lost, Found & Mine Tabs',
        content:
          'Listings are split into Lost, Found and Mine, where Mine holds your own posts, and each tab has its own search.',
      },
    ],
    technologies: [
      { name: 'Java', icon: 'icon_java.svg' },
      { name: 'Android Studio', icon: 'icon_android.svg' },
      { name: 'Firebase', icon: 'icon_firebase.svg' },
      { name: 'XML', icon: 'icon_xml.svg' },
    ],
    responsibilities: [
      'Designed, built and maintained the Android app.',
      'Structured the Firebase Realtime Database that stores user profiles, item listings and chat messages.',
      'Wrote custom sign-up and login flows and session handling, and made sure users can only see and change their own data.',
      'Built photo capture and selection, with uploads to and downloads from Firebase Storage.',
      'Built the layouts, navigation and on-screen feedback in XML and Java.',
    ],
    captions: [
      "The Lost feed, with each item's category, status and when it was posted.",
      "An item's page, with who posted it and buttons to edit it or mark it closed.",
      'Adding a photo to a listing from the camera or the gallery.',
      'The profile page, where you change your picture and contact details.',
      'A chat with the person who found your item.',
      'Sharing your phone number from inside the chat.',
      'The messages inbox, with one thread per item.',
      'Creating an account.',
      'Logging in.',
    ],
    videos: [],
    additional: [
      'I made this for my Advanced Mobile Programming course. It took 3 weeks and was done 3 months before our evaluation.',
      "The idea came from dealing with our campus lost-and-found, which was badly run. I wanted to replace the messy lost-and-found boxes with an app.",
      'Our professor liked it enough that there was some talk of making it the official lost-and-found system for the whole campus.',
      'I thought about adding Google Maps to show where items were lost, AI image matching between lost and found posts, and push notifications for categories you follow, but left them out of the first release to get the main features working first.',
      "Since I was working alone, I went with Firebase for the backend because its real-time features covered the live feed and chat. It needed a credit card, but it saved me from setting up servers, so I could spend my time on the app's UI and logic. It ended up being the only project in our batch with a real server backend.",
      "I couldn't get Firebase Authentication working, so I wrote my own login system on top of Firebase with traditional encryption. The GitHub release doesn't include it, and passwords there are stored in plain text."
    ],
  },
  // Hidden in resume_data.json: used by the resume and the GitHub profile
  // README, never shown on the site itself.
  portfolio: {
    ...getProjBase('portfolio'),
    game: false,
    urls: [
      { label: 'Live Site', icon: '', url: 'https://www.shaadqrsh.com' },
      { label: 'GitHub', icon: '', url: 'https://github.com/shaadqrsh/shaad-portfolio' },
    ],
    desc: "shaadqrsh.com is my portfolio site, with a page for every project I've shipped, my experience, and a resume you can view or download. All of it comes from one JSON data file. The same file feeds a one-page resume PDF that rebuilds itself when the data changes, the README on my GitHub profile, and a set of machine-readable endpoints for search engines and AI agents. Every page also gets its own link preview card, drawn from the project's cover art and tech stack.",
    features: [
      {
        heading: 'One Data File, Every Output',
        content: 'The site, the resume PDF, the GitHub profile README and the JSON endpoints all read the same resume_data.json and projectId.ts. Adding a project to the data puts it on the Projects page, the sitemap, the resume and the profile README with no other edits.',
      },
      {
        heading: 'Self-Updating One-Page Resume',
        content: 'When the resume data changes, a GitHub Action renders the resume in headless Chromium and scales it to fit exactly one A4 page. Vercel skips the push that made the change and deploys the commit with the new PDF instead, so each change deploys once.',
      },
      {
        heading: 'Link Previews That Refresh',
        content: "Every page and project gets its own 1200x630 preview card, built from its cover, icon and tech. The card's URL carries a hash of everything it's drawn from, so LinkedIn and other apps fetch a new image after an edit instead of showing their cached copy.",
      },
      {
        heading: 'Readable by Recruiter Tools & AI Agents',
        content: 'Besides the pages, the site publishes an llms.txt summary, JSON endpoints for the full profile and the projects, a JSON Resume export, and Schema.org data in every page. Crawlers and agents can read the whole profile without scraping several pages.',
      },
      {
        heading: 'Privacy-First Media & Fonts',
        content: "Fonts are served from the site, and YouTube thumbnails go through the site's own image optimizer, so a visitor's browser doesn't contact Google until they press play. The player then loads from youtube-nocookie.com.",
      },
    ],
    technologies: [
      { name: 'Next.js', icon: 'icon_nextjs.svg' },
      { name: 'React', icon: 'icon_react.svg' },
      { name: 'TypeScript', icon: 'icon_typescript.svg' },
      { name: 'Tailwind CSS', icon: 'icon_tailwind.svg' },
      { name: 'Vercel', icon: 'icon_vercel.svg' },
      { name: 'Motion', icon: 'icon_motion.svg' },
      { name: 'Python', icon: 'icon_python.svg' },
      { name: 'Playwright', icon: '' },
      { name: 'GitHub Actions', icon: '' },
    ],
    responsibilities: [
      'Built the site in Next.js 16, React 19 and TypeScript with Tailwind CSS 4, starting from Hardik Malhotra\'s original UI, and redesigned the home, about, projects and resume pages in November 2026',
      'Moved all site content into one resume_data.json file that the pages, the resume PDF, the GitHub profile README and the JSON endpoints read',
      'Wrote a Python resume generator that fills an HTML template and prints it to a one-page A4 PDF in headless Chromium with Playwright, scaling the layout to fit',
      'Set up GitHub Actions that rebuild the resume and the GitHub profile README when the data changes, with a content fingerprint that lets Vercel skip the stale deploy',
      'Generated a 1200x630 link preview card for every page with next/og and sharp, versioned by a content hash so cached previews refresh after each change',
      'Added Schema.org JSON-LD, a sitemap, an llms.txt file and JSON endpoints, including a JSON Resume export, for search engines, recruiter tools and AI agents',
      'Upgraded Next.js past 38 security advisories and added a Content Security Policy and security headers, then checked every page in Chromium for violations',
    ],
    captions: [],
    videos: [],
    additional: [
      "Hardik Malhotra designed the site's original UI and built the first navbar, footer and home page in May and June 2025. I've built everything else since, in 165 of the repo's 288 commits.",
      'The resume generator started out reading a YAML file in December 2025. In May 2026 I moved the resume and the site onto one JSON file, and they have read the same data ever since.',
      "Social apps cache link previews by URL, so after a redesign LinkedIn kept showing the old card. Next.js only hashes the image route's own file into the URL, so I added a hash of the card code, fonts, data and images.",
      "The site doesn't list itself on its own Projects page. This entry is hidden and only feeds my resume and my GitHub profile.",
    ],
  },
};
