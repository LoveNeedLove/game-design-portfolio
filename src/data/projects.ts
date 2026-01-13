export interface MediaItem {
  type: 'youtube' | 'video' | 'image' | 'iframe';
  url: string;
  thumbnail?: string;
}

export interface TeamMember {
  count: number;
  role: string;
}

export interface Task {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  featured: boolean;
  title: string;
  description: string;

  // Project details
  date: string; // Format: "Month Year" (e.g., "January 2024")
  developmentTime: string; // Format: "X days/months/years" (e.g., "3 months")
  genres: string[]; // List of genre tags
  roles: string[]; // List of role tags (e.g., "UX", "GD")
  teamSize: TeamMember[]; // Team composition

  // Project content
  mission: string; // Project constraints and concept description
  tasks: Task[]; // List of accomplished tasks with title and description
  challenge: string; // Development obstacle encountered
  solution: string; // Solution found to overcome the obstacle

  // Visual
  coverImage: string;
  overlayColor: string;
  bannerColor: string;
  mediaList: MediaItem[];

  // Optional
  linkUrl?: string;
  linkTitle?: string;
}

export const projects: Project[] = [
  {
    id: "fling",
    featured: true,
    title: "Fling",
    description: "You've crash-landed in an unknown habitat, but you have a unique advantage: the ability to possess and fling spherical objects. Jump, dash, and throw your way through six unique levels to reach the core of this hostile planet—literally!",
    date: "May 2025",
    developmentTime: "2 months",
    genres: ["Platformer"],
    roles: ["UX", "Level Design", "Gamefeel"],
    teamSize: [
      { count: 6, role: "Game Designer" },
      { count: 2, role: "Programmer" },
      { count: 2, role: "Music and Sound Designer" }
    ],
    mission: "Our goal was to develop a 2.5D platformer with a distinct \"recoil\" mobility hook. Instead of traditional movement, projecting an object flings the player in the opposite direction, acting as a powerful secondary dash that requires precise aiming and timing to navigate the environment.",
    tasks: [
      {
        title: "Level Design & Implementation",
        description: "I fully implemented the game's final level (Level 6), managing the pacing and difficulty curve for the climactic conclusion."
      },
      {
        title: "Technical Implementation",
        description: "I used C# and Unity Visual Scripting to program specialized gameplay hazards and \"bricks,\" including reactive lava walls and destructible environmental obstacles."
      },
      {
        title: "Gamefeel & Polish",
        description: "I implemented character and object feedback, such as squash-and-stretch logic and dynamic fire trails, to enhance the tactile feel of the physics-based movement."
      },
      {
        title: "Progression & Audio",
        description: "I authored mood documents to define the ambient soundscape and implemented the entire progression system, including a unique playable credits sequence."
      }
    ],
    challenge: "During playtesting, we observed that players struggled to grasp the core controls—specifically the interaction between the dash and the \"fling\" recoil—leading to frustration during high-stakes platforming sections.",
    solution: "To bridge this gap without breaking immersion, I designed and implemented a series of wordless, in-game 2D animations at key progression points. By teaching the mechanics through clear visual observation rather than text, I eliminated the language barrier and allowed players to master the complex controls intuitively.",
    coverImage: "/projects/GD1/Fling/Fling.png",
    overlayColor: "rgba(99, 102, 241, 0.05)",
    bannerColor: "#6366f1",
    mediaList: [
      { type: 'youtube', url: 'dQw4w9WgXcQ' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200' },
    ],
    linkUrl: "https://example.com/fling",
    linkTitle: "Play Fling"
  },
  {
    id: "last-scythe",
    featured: true,
    title: "Last Scythe",
    description: "The work of a reaper is never over... and that's exactly why you're ready to quit! Take on waves of vengeful souls with your trusty scythe, explore various arenas, and uncover the truth behind your retirement plan. Because let's be honest: even death deserves a vacation.",
    date: "December 2025",
    developmentTime: "2 months",
    genres: ["Brawler", "Top-Down"],
    roles: ["UX", "Narrative Design", "Programming"],
    teamSize: [
      { count: 5, role: "Game Designer" }
    ],
    mission: "Our mission was to build a brawler centered around a specific \"spacing\" constraint. We settled on a top-down combat loop where the scythe only deals damage at the tip of the blade, leaving a dangerous \"dead zone\" directly in front of the player. To manage this vulnerability, I integrated a push mechanic that allows players to shove close-range enemies back into the lethal blade range, creating a rhythmic dance of spacing and crowd control.",
    tasks: [
      {
        title: "UX & UI Implementation",
        description: "I designed and fully implemented the entire UI architecture, including all menus, the tutorial flow, and a dynamic HUD that tracks off-screen threats to maintain combat awareness."
      },
      {
        title: "Narrative & Implementation",
        description: "I wrote the script and implemented the entire narrative system, including the full game ending and credits sequence, ensuring a cohesive conclusion to the player experience."
      },
      {
        title: "Systems & Gamefeel",
        description: "I designed the enemy abilities and boss logic, and implemented the \"hitstop\" and particle effects to ensure every strike felt impactful. I also programmed custom C# tools for audio and animation management."
      },
      {
        title: "Project Leadership",
        description: "I prepared all milestone pitches and presentations, managing the vision through several discarded iterations and reviewing level designs."
      }
    ],
    challenge: "Early playtesting revealed a critical engagement drop-off; while the combat mechanics were functional, players didn't feel a strong enough \"pull\" to finish each level or a sufficient sense of reward for their efforts.",
    solution: "I implemented a Hub-world progression system tied to a fully-fledged short storyline. By adding NPCs and furniture to the Hub that unlock as the player advances, I gave the player a tangible, visual representation of their progress. This shifted the motivation from mere survival to personal investment, using the narrative as a powerful hook to keep players engaged until the final credits.",
    coverImage: "/projects/GD2/Last Scythe.png",
    overlayColor: "rgba(220, 38, 38, 0.05)",
    bannerColor: "#dc2626",
    mediaList: []
  },
  {
    id: "wa-sir-ltaxi",
    featured: true,
    title: "Wa Sir L'taxi",
    description: "Your trusty red taxi won't stop! Guess it's the perfect opportunity to register for the White House City GP. Buckle up, because the meter is running, the brakes are broken, and the only way to the finish line is forward!",
    date: "March 2025",
    developmentTime: "1 month",
    genres: ["Racing", "One-Button"],
    roles: ["Solo Project"],
    teamSize: [
      { count: 1, role: "Solo Developer" }
    ],
    mission: "Developed as a solo project, the core constraint was to create an engaging racing game controlled entirely by a single input: the Space bar. I aimed to blend Mario Kart-style arcade racing with wacky, cartoony physics, specifically catering to the speedrunning community through high-skill movement ceilings.",
    tasks: [
      {
        title: "Full System Implementation",
        description: "As a solo developer, I implemented all gameplay systems, logic, and environmental interactions (excluding music and 3D models)."
      },
      {
        title: "Physics Engineering",
        description: "I dedicated the majority of production to polishing the vehicle physics. My goal was to ensure the taxi drove seamlessly across varied surfaces while maintaining a \"weird,\" high-energy handling style that rewarded precise timing."
      },
      {
        title: "Level & Progression Design",
        description: "I designed multiple tracks with specific speedrunning routes in mind, ensuring the wacky physics could be exploited by high-level players for faster times."
      }
    ],
    challenge: "With multiple selectable tracks and two distinct driving styles, the primary UX challenge was designing a menu system that felt tight and responsive while being limited to a single button. I needed to prevent the interface from feeling sluggish or frustrating for players who wanted to jump quickly into the action.",
    solution: "I designed a \"Press vs. Hold\" interface: quick taps for navigation and sustained holds for confirmation. To make this intuitive, I implemented dynamic camera transitions and radial UI animations on every button. These visual cues provided constant feedback on the input state, ensuring the player always felt in control of the menu process despite the hardware limitations.",
    coverImage: "/projects/GD1/Wa Sir L'taxi/Wa Sir l'taxi.png",
    overlayColor: "rgba(234, 179, 8, 0.05)",
    bannerColor: "#eab308",
    mediaList: []
  },
  {
    id: "ostin8to",
    featured: false,
    title: "Ostin8to",
    description: "You're stuck in a loop, but your enemies aren't. Oh, and bombs are spawning everywhere. Survive the frantic, explosive chaos for as many loops as possible in this high-intensity survival FPS.",
    date: "July 2025",
    developmentTime: "24 hours",
    genres: ["FPS", "Survival"],
    roles: ["GD", "UX"],
    teamSize: [
      { count: 2, role: "Game Designer" },
      { count: 2, role: "Programmer" },
      { count: 1, role: "Artist" }
    ],
    mission: "Created for the GMTK Game Jam 2025 under the theme \"Loop.\" After iterating on several complex concepts over the course of the jam, we made a high-pressure pivot on the final day to a streamlined, frantic survival FPS where the player must endure massive enemy waves and environmental hazards.",
    tasks: [
      {
        title: "HUD Implementation",
        description: "I designed and implemented the game's HUD, including the lifebar and a dynamic combo meter to provide immediate feedback on player performance and health."
      },
      {
        title: "Systems & Combat Design",
        description: "I participated in the design of the enemy archetypes and the arena layout, ensuring the combat space facilitated constant movement and loop-based survival."
      },
      {
        title: "Collaborative Design",
        description: "Contributed to the rapid iteration process, helping to define the essential gameplay \"bricks\" required for the final production push."
      }
    ],
    challenge: "The project initially suffered from \"design paralysis,\" as it was difficult to commit to a single design philosophy or core mechanic. This lack of focus during the early stages of the jam threatened our ability to deliver a functional prototype.",
    solution: "To ensure we had a playable game, we collectively decided to reset our concept on the final day, salvaging only the most effective gameplay features from our previous iterations. This experience provided significant insight into production planning; it taught me how to effectively structure design conversations to define clear intent and how to prioritize essential features when working under extreme time constraints.",
    coverImage: "/projects/GD1/Ostin8to/Ostin8to.png",
    overlayColor: "rgba(168, 85, 247, 0.05)",
    bannerColor: "#a855f7",
    mediaList: []
  },
  {
    id: "chaotiles",
    featured: false,
    title: "Chaotiles",
    description: "Trapped in a maze controlled by The Entity of Chaos, you must make agonizing decisions to escape. Amidst a backdrop of colliding myths and legends, you must be careful: your choices will one day corrupt you, turning you against the people you once called your allies.",
    date: "December 2024",
    developmentTime: "2 weeks",
    genres: ["Board Game", "Semi-Coop"],
    roles: ["Game Design", "Systems Design"],
    teamSize: [
      { count: 2, role: "Game Designer" }
    ],
    mission: "The objective was to design a board game centered on the theme of \"Chaos.\" We developed a semi-cooperative experience where players must work together to navigate a maze until a tipping point is reached. The player who accumulates the most \"Curse Points\" through their choices is eventually corrupted, transforming the game into a high-stakes 1-vs-All survival scenario.",
    tasks: [
      {
        title: "Core Rule Design",
        description: "I devised and designed the foundational rules for movement, cooperation, and the corruption transition."
      },
      {
        title: "Content Writing",
        description: "I wrote over 40 unique moral dilemmas and designed 20+ unique items, each with specialized mechanical effects."
      },
      {
        title: "Prototyping & Templating",
        description: "I created the physical prototypes and visual templates for every card and game element to ensure readability and functional playtesting."
      },
      {
        title: "Documentation",
        description: "I authored the comprehensive rulebook and prepared all project documentation and pitch materials."
      }
    ],
    challenge: "We wanted players to face genuine moral friction by choosing between self-interest and the collective good. The challenge was allowing these choices to remain secret during the cooperative phase, while ensuring they could be verified and tracked for the final \"betrayal\" phase without the need for a digital companion app.",
    solution: "I designed a unique \"dual-orientation\" card system. Each dilemma card featured two outcomes—Neutral and Chaotic—printed in opposite directions (one right-side up and one upside-down). Because the backs of the cards were symmetrical, players could discreetly choose their side by orienting the card in their private pile. This physical system enabled tactile gameplay features: players could \"reveal\" their pile later to calculate their corruption score. It also allowed for chaotic events where a player might be forced to flip their entire pile, effectively swapping their past \"neutral\" choices for \"chaotic\" ones. This utilized the physical medium of the board game to create hidden-role tension that felt both intuitive and fair.",
    coverImage: "/projects/GD1/Chaotiles/Chaotiles.png",
    overlayColor: "rgba(249, 115, 22, 0.05)",
    bannerColor: "#f97316",
    mediaList: []
  },
  {
    id: "blcs",
    featured: false,
    title: "BLCS",
    description: "Your ship has crashed, and it's time to rebuild your dream boat from the wreckage. But this time, you aren't looking for crewmates. Use floating logs and washed-up tools to ensure you are the only survivor in this merciless tactical board game.",
    date: "May 2025",
    developmentTime: "6 hours",
    genres: ["Board Game", "Paper Prototyping"],
    roles: ["GD", "UX"],
    teamSize: [
      { count: 4, role: "Game Designer" }
    ],
    mission: "The objective was to develop a functional prototype in a high-pressure 6-hour design sprint. We were tasked with reinterpreting the classic \"Snakes and Ladders\" formula. I helped build a system centered around physical wooden blocks where players could shuffle and reattach components to their rafts to reach specific spaces. Taking inspiration from John Conway's Game of Life, we implemented a survival mechanic where players are eliminated if their raft shrinks below a functional size.",
    tasks: [
      {
        title: "Core Systems Design",
        description: "I designed the primary rules for play and traversal, focusing on how modular raft pieces interacted with a deck of tactical cards (Snake, Ladder, Block, and Cannon)."
      },
      {
        title: "Rapid Prototyping",
        description: "I managed multiple quick-fire iterations of the physical prototype, testing balance and piece-fitting within the tight 6-hour window."
      },
      {
        title: "UX Structuring",
        description: "To ensure the game remained clear and fast-paced, I divided the player's turn into three distinct, easy-to-follow phases, significantly reducing the learning curve for new players."
      },
      {
        title: "Item Mechanics",
        description: "I designed the four core cards—the Block, Ladder, Cannon, and Snake—ensuring that each offered a distinct tactical advantage or environmental interaction."
      }
    ],
    challenge: "In a survival-based board game, player elimination is a common pain point. During playtests, we found that players who were eliminated early felt excluded from the experience, leading to frustration and a lack of interest in the game's conclusion.",
    solution: "To keep all participants engaged until the final turn, I implemented a \"Ghost\" mechanic for eliminated players. Once out of the race, players were allowed to use their turn to remove one block from an opponent's raft (mimicking the effect of the Cannon card). This kept eliminated players active in the game's ecosystem while naturally accelerating the pacing of the endgame. This shift turned a potential moment of frustration into a fun \"snowball effect\" that heightened the tension for the remaining survivors.",
    coverImage: "/projects/GD1/BLCS/BLCS.png",
    overlayColor: "rgba(14, 165, 233, 0.05)",
    bannerColor: "#0ea5e9",
    mediaList: []
  },
  {
    id: "musee",
    featured: false,
    title: "Musée Abdelaziz Tazi",
    description: "Experience the Abdelaziz Tazi Museum through a dual-layered engagement strategy: a physical, activity-filled pamphlet designed to captivate younger audiences, and a digital companion for visitors seeking in-depth knowledge. Scan QR codes throughout the gallery to unlock detailed descriptions of each artwork in three different languages.",
    date: "February 2026",
    developmentTime: "1 month",
    genres: ["Gamification"],
    roles: ["UX", "Content Design"],
    teamSize: [
      { count: 1, role: "UX Designer" }
    ],
    mission: "In this solo project for the upcoming Abdelaziz Tazi Museum of Arts in Casablanca, I was tasked with two primary objectives: first, to deconstruct the idea that museums are \"boring\" for children by creating an interactive physical pamphlet; and second, to provide accessible, multilingual information for visitors via a simple digital interface accessed through QR code integration.",
    tasks: [
      {
        title: "Physical Design & Gamification",
        description: "I designed an interactive pamphlet featuring games and activities that utilize the museum's layout and artwork to encourage active exploration."
      },
      {
        title: "Reward Systems",
        description: "I implemented a \"stamp\" system, providing a tangible sense of achievement for visitors who complete the pamphlet activities."
      },
      {
        title: "Digital Interface Design",
        description: "I designed and deployed mobile-friendly landing pages, creating a lightweight and accessible way for visitors to view additional artwork information on their own devices."
      },
      {
        title: "Content Management",
        description: "Organized and integrated detailed descriptions for the museum's collection across three distinct languages."
      }
    ],
    challenge: "A significant portion of the museum's audience required information to be displayed in Arabic. This presented a complex UX challenge regarding Right-to-Left (RTL) layout consistency and typography legibility within the constraints of the web layout.",
    solution: "I conducted research into Arabic UI/UX standards to adapt my digital designs. This involved restructuring the layout architecture to support RTL flow, ensuring that navigation, alignment, and visual hierarchy were culturally and technically appropriate for Arabic-speaking visitors. This effort ensured that the museum's information was professional and accessible across all three supported languages.",
    coverImage: "/projects/GD1/Fling/Fling.png",
    overlayColor: "rgba(139, 92, 246, 0.05)",
    bannerColor: "#8b5cf6",
    mediaList: []
  },
  {
    id: "2050-journal",
    featured: false,
    title: "2050 : Journal de bord",
    description: "The year is 2050. An extreme climatic crisis has forced you to flee the city of Dunkirk, France. In this precarious era for humanity, you must manage your survival diary—designed as a personal scrapbook—and make impossible choices as if you were writing your own story. How will you endure? Who will you meet? And most importantly: is this a vision of the future, or is it already the reality for millions today?",
    date: "June 2025",
    developmentTime: "3 days",
    genres: ["Visual Novel", "Serious Game"],
    roles: ["Narrative Design", "UX"],
    teamSize: [
      { count: 2, role: "Game Designer" },
      { count: 2, role: "Developer" },
      { count: 1, role: "Artist" }
    ],
    mission: "The goal of this project was to create an interactive \"Serious Game\" for the French Red Cross (Croix-Rouge française). Developed during an intensive 3-day hackathon, we were tasked with adapting an existing physical exhibition titled \"Living in 2050\" into a digital format. To preserve the integrity of the exhibition's information while increasing engagement, we transformed the content into a branching visual novel where players navigate various social and environmental risks through a personal, narrative-driven lens.",
    tasks: [
      {
        title: "Narrative Architecture",
        description: "I designed and wrote the complex branching progression tree, ensuring that player choices led to distinct, meaningful story outcomes."
      },
      {
        title: "UX & Interface Design",
        description: "I designed the game's interface to mirror a \"scrapbook diary,\" creating an immersive aesthetic that makes the player feel as though the character is hand-writing their own experiences in real-time."
      },
      {
        title: "Serious Game Design",
        description: "I designed mechanics and scenarios specifically tailored for a broad audience, ensuring the gameplay was accessible while educating players on real-world social and environmental stakes."
      }
    ],
    challenge: "A recurring issue in serious games is the \"empathy gap\"—players often view futuristic scenarios as purely fictional. We struggled to find a way to meaningfully link the player's fictional adventure in 2050 with the actual climatic tragedies currently occurring across the globe.",
    solution: "I designed a \"Souvenir\" system to ground the experience in reality. As players met various characters in the game, they would receive a special memento. At the end of the experience, a concluding debrief revealed that each character encountered was actually a representation of a real-life individual's experience with the current climate crisis. By linking these \"souvenirs\" to contemporary global events, we forced a moment of reflection, transforming a futuristic survival game into a powerful tool for awareness of current human tragedies.",
    coverImage: "/projects/GD1/Journal de bord 2050/Journal de bord 2050.png",
    overlayColor: "rgba(16, 185, 129, 0.05)",
    bannerColor: "#10b981",
    mediaList: []
  }
];
