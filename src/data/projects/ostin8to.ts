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
      description: "I designed and implemented the game's HUD, including the lifebar and a dynamic combo meter to provide immediate feedback on player performance and health.",
      content: [
        {
          type: 'text',
          content: "With survival being at the core of the game, we needed a clear UI that still retained the game's distinctive maximalist style.",
          size: 'full'
        },
        {
          type: 'text',
          content: "The health bar was simple and clear, so I added a little spinning vinyl next to it.",
          group: 'health-vinyl'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/ostin8to-health-vinyl/600/400',
          group: 'health-vinyl'
        },
        {
          type: 'text',
          content: "[i]\"Isn't it adorable\"[/i]",
          variant: 'quote',
          size: 'full'
        },
        {
          type: 'text',
          content: "I also put a lot of care into the combo meter, I went with a unique \"Test Tube\" look that filled up as you defeated enemies. As you increase your combo the meter would shake and change colors, providing the player with clear, yet chaotic feedback of their progression. Alongside the meter, the current combo meter was represented by a clear color as well a \"title\", all inspired by song names.",
          size: 'full'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/ostin8to-combo-meter/1200/500',
          size: 'full'
        }
      ]
    },
    {
      title: "Systems & Combat Design",
      description: "I participated in the design of the enemy archetypes and the arena layout, ensuring the combat space facilitated constant movement and loop-based survival.",
      content: [
        {
          type: 'text',
          content: "Being a game jam, the enemy design needed to be straightforward yet fun in many ways. So we designed our enemies around the player's positioning.",
          size: 'full'
        },
        {
          type: 'text',
          content: "Depending on their type, enemies could divide into smaller menaces, attack from above, hurl huge missiles at you or defend themselves with a shield that requires you to shoot from above.",
          group: 'enemy-types'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/ostin8to-enemy-sprites/600/400',
          group: 'enemy-types'
        },
        {
          type: 'text',
          content: "We really wanted the waves of enemies to reach crazy heights, so we made it so that enemies could climb on top of each other and also gave them really basic path finding, to really give the feeling of the player being submerged by foes.",
          group: 'enemy-stack'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/ostin8to-enemy-stack/600/400',
          group: 'enemy-stack'
        },
        {
          type: 'text',
          content: "[i]I get why they're called enemy \"Waves\" now[/i]",
          variant: 'quote',
          size: 'full'
        },
        {
          type: 'text',
          content: "The player could shoot rapid-fire bullets and jump super high, so we added a lot of ramped obstacles to the arena. To guide the player even further we added a huge pillar with a corkscrew staircase, which prevented the character from jumping while scaling it, but rewarded him by giving him the high ground.",
          group: 'level-design'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/ostin8to-arena-design/800/450',
          group: 'level-design'
        },
        {
          type: 'text',
          content: "I designed a bomb feature, where a bomb would be set exactly where the players last ended the wave. Bombs would be detonated by proximity, when shot or when blasted by another bomb, this allowed for creative plays, while driving the game's pacing forwards as the bombs accumulated.",
          group: 'bombs'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/ostin8to-bomb-feature/600/400',
          group: 'bombs'
        }
      ]
    },
    {
      title: "Collaborative Design",
      description: "Contributed to the rapid iteration process, helping to define the essential gameplay \"bricks\" required for the final production push.",
      content: [
        {
          type: 'text',
          content: "This project was our team's first ever game jam. A lot of the time was spent iterating on many ideas.",
          size: 'full'
        },
        {
          type: 'text',
          content: "We first started by writing down a lot of ideas, discussing their scope and then choosing which one we'd go with.",
          group: 'brainstorming'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/ostin8to-brainstorm-doc/800/450',
          group: 'brainstorming'
        },
        {
          type: 'text',
          content: "We ended up going with an idea that took inspiration from Neon White. It was a speedrun oriented first person 3d platformer game, where the player would have to set their actions on a looping timeline to reach a goal. The game was going along well, but we struggled with the level design, and eventually had to kill the idea, as the scope was maybe too ambitious for the limited resources we had.",
          size: 'full'
        },
        {
          type: 'text',
          content: "To ensure we had a playable game, we collectively decided to reset our concept on the final day, salvaging only the most effective gameplay features from our previous iterations. This experience provided significant insight into production planning; it taught me how to effectively structure design conversations to define clear intent and how to prioritize essential features when working under extreme time constraints.",
          size: 'full'
        },
        {
          type: 'text',
          content: "At the end I still think that we manage to create a core loop that functions well, especially with the game's \"acid\" look.",
          size: 'full'
        }
      ]
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
