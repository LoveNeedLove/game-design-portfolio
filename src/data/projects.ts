export interface MediaItem {
  type: 'youtube' | 'video' | 'image' | 'iframe';
  url: string;
  thumbnail?: string;
}

export interface TeamMember {
  count: number;
  role: string;
}

export interface CombatLog {
  step: string;
  content: string;
}

export interface Project {
  id: string;
  featured: boolean;
  title: string;
  description: string;
  shortDescription: string;

  // Project details
  date: string; // Format: "Month Year" (e.g., "January 2024")
  developmentTime: string; // Format: "X days/months/years" (e.g., "3 months")
  genres: string[]; // List of genre tags
  roles: string[]; // List of role tags (e.g., "UX", "GD")
  teamSize: TeamMember[]; // Team composition

  // Project content
  mission: string; // Project constraints and concept description
  tasks: string[]; // List of accomplished tasks
  challenge: string; // Development obstacle encountered
  solution: string; // Solution found to overcome the obstacle
  combatLog: CombatLog[]; // Combat log entries for display

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
    id: "space-operator",
    featured: true,
    title: "Space Operator",
    description: "Simulateur de gestion de crise spatiale haute tension.",
    shortDescription: "A top-down brawler where the reaper tries to retire",

    date: "December 2024",
    developmentTime: "6 months",
    genres: ["Simulation", "Management", "Sci-Fi"],
    roles: ["Lead GD", "Systems Design"],
    teamSize: [
      { count: 1, role: "Game Designer" },
      { count: 2, role: "Programmers" },
      { count: 1, role: "Artist" }
    ],

    mission: "Maintenir l'intégrité d'une station orbitale en perdition face à des crises multiples et simultanées.",
    tasks: [
      "Conception du système de gestion de crises",
      "Équilibrage des systèmes de ressources",
      "Design des alarmes et feedbacks diégétiques"
    ],
    challenge: "Les joueurs se sentaient submergés par les crises simultanées et perdaient rapidement le contrôle.",
    solution: "Implémentation d'alarmes diégétiques et visuelles hiérarchisées permettant de prioriser les urgences.",
    combatLog: [
      { step: "MISSION", content: "Maintenir l'intégrité d'une station orbitale en perdition." },
      { step: "RÔLE", content: "Lead Game Designer : Équilibrage des systèmes." },
      { step: "SOLUTION", content: "Implémentation d'alarmes diégétiques et visuelles." }
    ],

    coverImage: "/projects/GD1/Fling/Fling.png",
    overlayColor: "rgba(0, 100, 255, 0.1)",
    bannerColor: "#eff6ff",
    mediaList: [
      { type: 'youtube', url: 'dQw4w9WgXcQ' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1541411191165-f18b6f5d1c1c?w=1200' }
    ],
    linkUrl: "https://itch.io",
    linkTitle: "Accéder_au_Prototype"
  },
  {
    id: "neon-protocol",
    featured: true,
    title: "Neon Protocol",
    description: "Jeu de tactique au tour par tour dans un futur cybernétique.",
    shortDescription: "A top-down brawler where the reaper tries to retire",

    date: "June 2023",
    developmentTime: "4 months",
    genres: ["Tactical", "Turn-Based", "Cyberpunk"],
    roles: ["GD", "Level Design"],
    teamSize: [
      { count: 1, role: "Game Designer" },
      { count: 1, role: "Programmer" },
      { count: 1, role: "Artist" }
    ],

    mission: "Créer un jeu tactique avec des mécaniques de hacking permettant différentes approches stratégiques.",
    tasks: [
      "Design des classes et leurs compétences uniques",
      "Conception des mécaniques de hacking réseau",
      "Level design des missions d'infiltration"
    ],
    challenge: "Le système de hacking était trop complexe et ralentissait le rythme des combats tactiques.",
    solution: "Simplification du système en intégrant le hacking directement dans les compétences des classes.",
    combatLog: [
      { step: "MISSION", content: "Infiltration tactique via hacking réseau." },
      { step: "RÔLE", content: "Game Designer : Mécaniques de classes." }
    ],

    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
    overlayColor: "rgba(255, 0, 150, 0.1)",
    bannerColor: "#fff7ed",
    mediaList: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200' }
    ],
    linkUrl: "https://docs.google.com/document/d/example",
    linkTitle: "Consulter_le_GDD"
  },
  {
    id: "neon-prorrtocol",
    featured: true,
    title: "Cyber Tactics",
    description: "Prototype de combat tactique rapide.",
    shortDescription: "Fast-paced tactical combat prototype",

    date: "March 2022",
    developmentTime: "2 months",
    genres: ["Tactical", "Action"],
    roles: ["GD", "UX"],
    teamSize: [
      { count: 1, role: "Game Designer" },
      { count: 1, role: "Programmer" }
    ],

    mission: "Prototype explorant des mécaniques de combat tactique en temps réel avec pause.",
    tasks: [
      "Design du système de pause tactique",
      "Prototypage des contrôles et feedback",
      "Tests utilisateurs et itérations"
    ],
    challenge: "Difficulté à équilibrer vitesse d'action et profondeur tactique.",
    solution: "Ajout d'un système de ralentissement temporel au lieu d'une pause complète.",
    combatLog: [
      { step: "MISSION", content: "Combat tactique en temps réel avec pause." },
      { step: "RÔLE", content: "Game Designer : Systèmes de combat." }
    ],

    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
    overlayColor: "rgba(255, 0, 150, 0.1)",
    bannerColor: "#ff8c00",
    mediaList: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200' }
    ],
    linkUrl: "https://docs.google.com/document/d/example",
    linkTitle: "Consulter_le_GDD"
  },
  {
    id: "neo-rotocol",
    featured: true,
    title: "Neural Nexus",
    description: "Expérience narrative interactive explorant l'IA et la conscience.",
    shortDescription: "Interactive narrative about AI consciousness",

    date: "January 2025",
    developmentTime: "3 months",
    genres: ["Narrative", "Interactive Fiction", "Sci-Fi"],
    roles: ["GD", "Narrative Design"],
    teamSize: [
      { count: 1, role: "Game Designer" },
      { count: 1, role: "Writer" },
      { count: 1, role: "Programmer" }
    ],

    mission: "Créer une expérience narrative où les choix du joueur influencent l'évolution d'une IA.",
    tasks: [
      "Écriture du système de dialogue branché",
      "Design des mécaniques de progression de l'IA",
      "Conception de l'interface conversationnelle"
    ],
    challenge: "Les joueurs ne comprenaient pas l'impact de leurs choix sur l'évolution de l'IA.",
    solution: "Ajout de feedbacks visuels montrant en temps réel les changements de personnalité de l'IA.",
    combatLog: [
      { step: "MISSION", content: "Expérience narrative interactive sur l'IA." },
      { step: "RÔLE", content: "Game Designer : Narrative Design." }
    ],

    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
    overlayColor: "rgba(255, 0, 150, 0.1)",
    bannerColor: "#ffedeeff",
    mediaList: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200' }
    ],
    linkUrl: "https://docs.google.com/document/d/example",
    linkTitle: "Consulter_le_GDD"
  },
  {
    id: "echo-signal",
    featured: false,
    title: "Echo Signal",
    description: "Exploration sonore dans un environnement minimaliste.",
    shortDescription: "Minimalist sound-based exploration",

    date: "September 2021",
    developmentTime: "45 days",
    genres: ["Exploration", "Audio", "Experimental"],
    roles: ["Solo Dev"],
    teamSize: [
      { count: 1, role: "Solo Developer" }
    ],

    mission: "Créer une expérience atmosphérique où le son est le principal moyen de navigation et d'exploration.",
    tasks: [
      "Programmation du système audio spatial",
      "Design des puzzles basés sur l'écholocation",
      "Création de l'ambiance sonore"
    ],
    challenge: "Les joueurs se perdaient facilement sans repères visuels clairs.",
    solution: "Ajout de signaux sonores directionnels subtils guidant vers les objectifs.",
    combatLog: [
      { step: "MISSION", content: "Créer une expérience atmosphérique basée sur le son." },
      { step: "RÔLE", content: "Solo Dev : Programmation et Audio." }
    ],

    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bannerColor: "#f4f4f5",
    mediaList: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200' }
    ]
  }
];