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
  mediaList: MediaItem[];
  combatLog: CombatLog[];
  linkUrl?: string; // Assure-toi que cette ligne existe
  linkTitle?: string; // Assure-toi que cette ligne existe
}

export const projects: Project[] = [
  {
    id: "space-operator",
    featured: true,
    title: "Space Operator",
    description: "Simulateur de gestion de crise spatiale haute tension.",
    coverImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1200",
    overlayColor: "rgba(0, 100, 255, 0.1)",
    linkUrl: "https://itch.io", // Le bouton n'apparaît que si cette valeur est remplie
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
  }
];