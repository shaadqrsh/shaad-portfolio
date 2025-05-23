import { projectData } from "@/types";

export const data: { [key: string]: projectData } = {
  bushido: {
    title: "Pokémon Bushido",
    year: "2021",
    game: true,
    imgCount: 9,
    urls: [
      {
        label: "Direct Download",
        icon: "",
        url: "https://drive.google.com/file/d/1IZ3AlFv5rm8xrUn9YbwLe4i-Bu9YwHpO/view",
      },
      {
        label: "Eevee Expo",
        icon: "",
        url: "https://eeveeexpo.com/bushido/",
      },
      {
        label: "GitHub",
        icon: "",
        url: "https://github.com/TheLuxDiablo/Pokemon-Bushido",
      },
    ],
    desc: "Journey into the Aisho Region, a land steeped in ancient traditions and home to the captivating world of Pokémon Bushido. As the child of the Royal Samurai, your path unfolds through a rich narrative, where you'll train alongside your Pokémon in the martial arts, discover the role of a 'Kenshi', and confront the enigmatic Akui Clan with their dangerous Shadow Pokémon. This fangame offers a fresh take on the Pokémon formula, blending classic gameplay with a distinct feudal Japanese aesthetic, featuring new mechanics, visually stunning environments, riveting story and challenging gameplay that will test your honor and skill.",
    features: [
      {
        heading: "Immersive Feudal Japan-Inspired World",
        content:
          "Explore the Aisho region, a brand new land meticulously designed with a rich samurai-themed aesthetic, offering a unique departure from traditional Pokémon settings.",
      },
      {
        heading: "Diverse Roster of Pokémon",
        content:
          "Build your team with a wide selection of Pokémon, featuring species from up to the 8th Generation, all rendered in classic Gen 4-styled graphics for a nostalgic yet expanded experience.",
      },
      {
        heading: "Original Storyline",
        content:
          "Embark on a 10-15 hour narrative-driven adventure as the child of the Royal Samurai, training to become a Kenshi and uncovering the secrets and conflicts within the Aisho region, including the nefarious Akui Clan.",
      },
      {
        heading: "Return of Shadow Pokémon",
        content:
          "Encounter and battle formidable Shadow Pokémon, a concept inspired by Pokémon XD: Gale of Darkness. These corrupted Pokémon present unique challenges and can be snagged from opposing trainers for purification.",
      },
      {
        heading: "Katana Styles",
        content:
          "Experience a fresh take on HMs with the introduction of Katanas. These powerful blades not only grant passage through obstacles but can also be wielded in battle to strategically alter weather conditions or inflict status effects.",
      },
    ],
    technologies: ["RGSS", "Ruby", "C++", "Photoshop", "Aseprite"],
    responsibilities: [
      "Developed the core engine in which the game was made.",
      "Created new mechanics (Katana techniques, mid-battle dialogue, Following Pokémon, battle animations, etc) to differenciate it from mainline Pokémom games.",
      "Aggregated publically available assets for developing the game within 30 days.",
      "Evented multiple in-game cutscenes, while also writing custom scripts for functionality.",
      "Designed various UI/UX elements to enhance the immersion of the battle system, with detailed battle backgrounds and themes to fit the game's aesthetic.",
      "Assisted in the design of the game's narrative and core gameplay loop.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=OH5pCKUim3k",
      "https://www.youtube.com/watch?v=NNM4zsBrNFQ",
      "https://www.youtube.com/watch?v=L5ClFPCufkc",
      "https://www.youtube.com/watch?v=QWEIOSc5Euw",
    ],
    additional: [
      "This game was developed for the Relic Castle (Eevee Expo) Winter Game Jam #2. It was developed in 30 days, and the team ended up winning the competition.",
      "The idea of setting a game in a feudal Japan setting was devised months before the official Pokémon games took a similar direction with Pokémon Legends: Arceus.",
      "Future expansions were planned, to expand the Aisho region and provide more story for important characters in the game. The team, however, disbanded and further expansions were scrapped.",
      "The game draws heavy inspiration from mainline entries like Pokémon Conquest and Pokémon XD: Gale of Darkness, and borrows assets from them, along with other mainline Pokémon games.",
      "The development of this project was headed by Thundaga, a YouTuber, and the development of this game has been recorded as VODs on their YouTube and Twitch.",
      "This is one of the highest rated and most viewed games on Eevee Expo (formerly Relic Castle), the forum on which this game was initially launched.",
      "This game has been regarded as one of the best Pokémon Fangames of 2021.",
    ],
  },
  splice: {
    title: "Pokémon Splice",
    year: "2020",
    game: true,
    imgCount: 9,
    urls: [
      {
        label: "Direct Download",
        icon: "",
        url: "https://drive.google.com/file/d/1igsvdRzCU9S3AgiGcCIR9jpDKJBDoWgv/view",
      },
      {
        label: "Eevee Expo",
        icon: "",
        url: "https://eeveeexpo.com/splice/",
      },
    ],
    desc: "Assume the role of a research assistant aiding Professor Cypress in the study of newly discovered Pokémon forms in this new fangame. Embark on a journey through the Stacona region with a new starter Pokémon, Arenay, which possesses the ability to change its type. Align with either Team Biogress, emphasizing natural development, or Team Quantech, focused on technological enhancement. Experience a branching storyline, where you are presented with significant choices which will completely alter your experience. The fate of Pokémon research hangs in the balance - whose side will you choose?",
    features: [
      {
        heading: "New Region",
        content:
          "Pokémon Splice is set in the entirely new Stacona Region, a brand new world with its own unique environments and never before seen Pokémon species.",
      },
      {
        heading: "New Pokémon Species",
        content:
          "The game features several new species of Pokémon, such as Arenay, the starter with a unique form changing gimmick, as well as evolutions and pre-evolutions for existing Pokémon like Pinsir, Skarmory and Combee and more!",
      },
      {
        heading: "Branching Storylines",
        content:
          "Players make a pivotal choice to join one of two opposing research organizations: Team Biogress or Team Quantech. This decision significantly influences the story's direction and the player's objectives throughout the game.",
      },
      {
        heading: "New Regional Forms",
        content:
          "The region houses brand new regional forms. Some of them are naturally occuring, like Dunsparce, and some are the result of experimentation by the 2 research factions, such as the new forms of the Solosis, Lotad, Raichu and Electivire.",
      },
      {
        heading: "Distinct Gen-3 Artsyle",
        content:
          "The game pays hommage to the GameBoy Advance generation of Pokémon games with its environment and UI design, but still has all the QOL improvements of the modern games.",
      },
    ],
    technologies: ["RGSS", "Ruby", "C++", "Photoshop", "Aseprite"],
    responsibilities: [
      "Developed the core engine in which the game was made.",
      "Created new mechanics (Form changing, mid-battle dialogue, Following Pokémon, battle animations, etc) to differenciate it from mainline Pokémom games.",
      "Aggregated publically available assets for developing the game within 30 days.",
      "Evented multiple in-game cutscenes, while also writing custom scripts for functionality.",
      "Designed various UI/UX elements to enhance the immersion of the battle system, with detailed battle backgrounds and themes to fit the Generation 3 aesthetic.",
      "Assisted in the design of the game's narrative and core gameplay loop.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=B9DS0Nyegag",
      "https://www.youtube.com/watch?v=X34OZt5Tvdk",
      "https://www.youtube.com/watch?v=-XgNEFjSQmc&list=PLsWAsarmQkCdE1hRoOdWehJlpGgInKzNL",
    ],
    additional: [
      "This game was developed for the Relic Castle (Eevee Expo) Game Jam 6. It was developed in 30 days, and the team ended up winning the competition.",
      "Future chapters were planned, and assets were developed for them (new legendaries and forms, they are still in the game files). The team, however, disbanded and further expansions were scrapped.",
      "The development of this project was headed by Thundaga, a YouTuber, and the development of this game has been recorded as VODs on their YouTube and Twitch.",
      "This game was discontinued in 2023 and the entire team moved on to other projects.",
    ],
  },
};
