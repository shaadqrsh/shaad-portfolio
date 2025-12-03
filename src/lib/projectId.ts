import { projectData } from '@/types';

export const data: { [key: string]: projectData } = {
  bushido: {
    title: 'Pokémon Bushido',
    year: 'August 2021',
    game: true,
    imgCount: 9,
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
    desc: "Journey into the Aisho Region, a land steeped in ancient traditions and home to the captivating world of Pokémon Bushido. As the child of the Royal Samurai, your path unfolds through a rich narrative, where you'll train alongside your Pokémon in the martial arts, discover the role of a 'Kenshi', and confront the enigmatic Akui Clan with their dangerous Shadow Pokémon. This fangame offers a fresh take on the Pokémon formula, blending classic gameplay with a distinct feudal Japanese aesthetic, featuring new mechanics, visually stunning environments, riveting story and challenging gameplay that will test your honor and skill.",
    features: [
      {
        heading: 'Immersive Feudal Japan-Inspired World',
        content:
          'Explore the Aisho region, a brand new land meticulously designed with a rich samurai-themed aesthetic, offering a unique departure from traditional Pokémon settings.',
      },
      {
        heading: 'Diverse Roster of Pokémon',
        content:
          'Build your team with a wide selection of Pokémon, featuring species from up to the 8th Generation, all rendered in classic Gen 4-styled graphics for a nostalgic yet expanded experience.',
      },
      {
        heading: 'Original Storyline',
        content:
          'Embark on a 10-15 hour narrative-driven adventure as the child of the Royal Samurai, training to become a Kenshi and uncovering the secrets and conflicts within the Aisho region, including the nefarious Akui Clan.',
      },
      {
        heading: 'Return of Shadow Pokémon',
        content:
          'Encounter and battle formidable Shadow Pokémon, a concept inspired by Pokémon XD: Gale of Darkness. These corrupted Pokémon present unique challenges and can be snagged from opposing trainers for purification.',
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
      'Created new mechanics (Katana techniques, mid-battle dialogue, Following Pokémon, battle animations, etc) to differenciate it from mainline Pokémom games.',
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
      'The idea of setting a game in a feudal Japan setting was devised months before the official Pokémon games took a similar direction with Pokémon Legends: Arceus.',
      'Future expansions were planned, to expand the Aisho region and provide more story for important characters in the game. The team, however, disbanded and further expansions were scrapped.',
      'The game draws heavy inspiration from mainline entries like Pokémon Conquest and Pokémon XD: Gale of Darkness, and borrows assets from them, along with other mainline Pokémon games.',
      'The development of this project was headed by Thundaga, a YouTuber, and the development of this game has been recorded as VODs on their YouTube and Twitch.',
      'This is one of the highest rated and most viewed games on Eevee Expo (formerly Relic Castle), the forum on which this game was initially launched.',
      'This game has been regarded as one of the best Pokémon Fangames of 2021.',
    ],
  },
  splice: {
    title: 'Pokémon Splice',
    year: 'August 2020',
    game: true,
    imgCount: 9,
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
    desc: 'Assume the role of a research assistant aiding Professor Cypress in the study of newly discovered Pokémon forms in this new fangame. Embark on a journey through the Stacona region with a new starter Pokémon, Arenay, which possesses the ability to change its type. Align with either Team Biogress, emphasizing natural development, or Team Quantech, focused on technological enhancement. Experience a branching storyline, where you are presented with significant choices which will completely alter your experience. The fate of Pokémon research hangs in the balance - whose side will you choose?',
    features: [
      {
        heading: 'New Region',
        content:
          'Pokémon Splice is set in the entirely new Stacona Region, a brand new world with its own unique environments and never before seen Pokémon species.',
      },
      {
        heading: 'New Pokémon Species',
        content:
          'The game features several new species of Pokémon, such as Arenay, the starter with a unique form changing gimmick, as well as evolutions and pre-evolutions for existing Pokémon like Pinsir, Skarmory and Combee and more!',
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
          'The game pays hommage to the GameBoy Advance generation of Pokémon games with its environment and UI design, but still has all the QOL improvements of the modern games.',
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
      'Created new mechanics (Form changing, mid-battle dialogue, Following Pokémon, battle animations, etc) to differenciate it from mainline Pokémom games.',
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
    title: 'CareerPath AI',
    year: 'November 2025',
    game: false,
    imgCount: 9,
    urls: [
      {
        label: 'Live Project',
        icon: '',
        url: 'https://pathfinder-ai-nine.vercel.app/',
      },
      /*      
        {
              label: 'GitHub',
              icon: '',
              url: 'https://github.com/shaadqrsh/pathfinder-ai',
            },
      */
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
  homi: {
    title: 'HOMI - Helpful Online Mentor Interface',
    year: 'February 2025',
    game: false,
    imgCount: 10,
    urls: [
      {
        label: 'Live Project',
        icon: '',
        url: 'https://homi-bot.in/',
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
    title: 'Findly - Lost and Found Application',
    year: 'January 2025',
    game: false,
    imgCount: 9,
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
