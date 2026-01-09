export interface CombatLog {
  step: string;
  content: string;
}

export interface MediaItem {
  type: 'youtube' | 'video' | 'image' | 'iframe';
  url: string;
  thumbnail?: string;
}

export interface Project {
  id: string;
  featured: boolean;
  title: string;
  description: string;
  coverImage: string;
  overlayColor: string;
  bannerColor: string; // Nouvelle propriété pour la couleur du bandeau
  mediaList: MediaItem[];
  combatLog: CombatLog[];
  linkUrl?: string;
  linkTitle?: string;
}

export const projects: Project[] = [
  {
    id: "space-operator",
    featured: true,
    title: "Space Operator",
    description: "Simulateur de gestion de crise spatiale haute tension.",
    coverImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1200",
    overlayColor: "rgba(0, 100, 255, 0.1)",
    bannerColor: "#eff6ff", // Bleu clair
    linkUrl: "https://itch.io",
    linkTitle: "Accéder_au_Prototype",
    mediaList: [
      { type: 'youtube', url: 'dQw4w9WgXcQ' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1541411191165-f18b6f5d1c1c?w=1200' }
    ],
    combatLog: [
      { step: "MISSION", content: "Maintenir l'intégrité d'une station orbitale en perdition." },
      { step: "RÔLE", content: "Lead Game Designer : Équilibrage des systèmes." },
      { step: "SOLUTION", content: "Implémentation d'alarmes diégétiques et visuelles." }
    ]
  },
  {
    id: "neon-protocol",
    featured: true,
    title: "Neon Protocol",
    description: "Jeu de tactique au tour par tour dans un futur cybernétique.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
    overlayColor: "rgba(255, 0, 150, 0.1)",
    bannerColor: "#fff7ed", // Orange très clair
    linkUrl: "https://docs.google.com/document/d/example",
    linkTitle: "Consulter_le_GDD",
    mediaList: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200' }
    ],
    combatLog: [
      { step: "MISSION", content: "Infiltration tactique via hacking réseau." },
      { step: "RÔLE", content: "Game Designer : Mécaniques de classes." }
    ]
  },
    {
    id: "neo-rotocol",
    featured: true,
    title: "Neon Protocol",
    description: "Jeu de tactique au tour par tour dans un futur cybernétique.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
    overlayColor: "rgba(255, 0, 150, 0.1)",
    bannerColor: "#ffedeeff", // Orange très clair
    linkUrl: "https://docs.google.com/document/d/example",
    linkTitle: "Consulter_le_GDD",
    mediaList: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200' }
    ],
    combatLog: [
      { step: "MISSION", content: "Infiltration tactique via hacking réseau." },
      { step: "RÔLE", content: "Game Designer : Mécaniques de classes." }
    ]
  },
  {
    id: "echo-signal",
    featured: false, // Ce projet n'apparaît pas dans le bandeau du haut
    title: "Echo Signal",
    description: "Exploration sonore dans un environnement minimaliste.",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200",
    overlayColor: "rgba(0, 0, 0, 0.1)",
    bannerColor: "#f4f4f5", // Zinc/Gris
    mediaList: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200' }
    ],
    combatLog: [
      { step: "MISSION", content: "Créer une expérience atmosphérique basée sur le son." },
      { step: "RÔLE", content: "Solo Dev : Programmation et Audio." }
    ]
  }
];