import { Project } from '../types';

export const waSirLtaxi: Project = {
  id: "wa-sir-ltaxi",
  featured: true,
  title: "Wa Sir L'taxi",
  description: "Your trusty red taxi won't stop! Guess it's the perfect opportunity to register for the White House City GP. Buckle up, because the meter is running, the brakes are broken, and the only way to the finish line is forward!",
  shortDescription: "A one-button racing game with wacky physics designed for speedrunning, controlled entirely with the Space bar.",
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
  bannerColor: "#ffedb7",
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: [
    { type: 'youtube', url: '0jdoxy1O4_o' },
    { type: 'image', url: '/projects/GD1/Wa Sir L\'taxi/Content/Wa Sir l\'taxi 1.png' },
    { type: 'image', url: '/projects/GD1/Wa Sir L\'taxi/Content/Wa Sir l\'taxi 2.png' },
    { type: 'image', url: '/projects/GD1/Wa Sir L\'taxi/Content/Wa Sir l\'taxi 3.png' }
  ]
};
