import { Project } from '../types';

export const ostin8to: Project = {
  id: "ostin8to",
  featured: false,
  title: "Ostin8to",
  description: "You're stuck in a loop, but your enemies aren't. Oh, and bombs are spawning everywhere. Survive the frantic, explosive chaos for as many loops as possible in this high-intensity survival FPS.",
  shortDescription: "A frantic survival FPS created in 24 hours for GMTK Game Jam 2025 with the theme 'Loop'.",
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
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: [
    { type: 'image', url: '/projects/GD1/Ostin8to/Content/ostin8to_photo.png' },
    { type: 'image', url: '/projects/GD1/Ostin8to/Content/osin8to_flip.gif' },
    { type: 'image', url: '/projects/GD1/Ostin8to/Content/ostin8tosexy.gif' }
  ]
};
