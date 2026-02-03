import { Project } from '../types';

export const lastScythe: Project = {
  id: "last-scythe",
  featured: true,
  title: "Last Scythe",
  description: "The work of a reaper is never over... and that's exactly why you're ready to quit! Take on waves of vengeful souls with your trusty scythe, explore various arenas, and uncover the truth behind your retirement plan. Because let's be honest: even death deserves a vacation.",
  shortDescription: "A top-down brawler with a spacing-focused combat system where your scythe only deals damage at the tip of the blade.",
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
      description: "I designed and fully implemented the entire UI architecture, including all menus, the tutorial flow, and a dynamic HUD that tracks off-screen threats to maintain combat awareness.",
      illustrations: [
        { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 1.png' },
        { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 1.png' }
      ],
      content: [
        {
          type: 'heading',
          content: 'Designing for Combat Clarity',
          size: 'large',
          align: 'left'
        },
        {
          type: 'text',
          content: '"The best UI is the one players never notice—until it saves their life."',
          variant: 'quote',
          size: 'medium',
          align: 'left'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 1.png',
          size: 'large',
          align: 'left'
        },
        {
          type: 'text',
          content: 'The core challenge was maintaining player awareness in a fast-paced top-down brawler where threats can approach from any direction.',
          variant: 'accent',
          size: 'small',
          align: 'left'
        },
        {
          type: 'text',
          content: 'Traditional HUD elements would clutter the screen and break immersion, so I developed a minimalist approach that conveys critical information without distraction. The goal was to create an interface that feels invisible during normal gameplay but becomes immediately readable in moments of crisis.',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 1.png',
          size: 'medium',
          align: 'left'
        },
        {
          type: 'list',
          content: 'Key UI Systems Implemented',
          items: [
            'Off-screen threat indicators that pulse based on enemy distance and danger level',
            'Contextual health bars that only appear during active combat',
            'Tutorial system using in-world visual cues rather than text overlays',
            'Dynamic menu transitions that maintain the game\'s dark aesthetic'
          ],
          variant: 'highlight',
          size: 'medium',
          align: 'right'
        },
        {
          type: 'text',
          content: 'Every UI element was designed to feel like a natural extension of the game world. The HUD uses the same color palette as the environment, and animations mirror the weight and impact of the combat system. This cohesion ensures players stay immersed while still receiving all the information they need to survive.',
          variant: 'highlight',
          size: 'large',
          align: 'center'
        }
      ]
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
  coverImage: "/projects/GD2/Last Scythe/Last Scythe.png",
  overlayColor: "rgba(220, 38, 38, 0.05)",
  bannerColor: "#161616",
  featuredTextColor: "#f1f1f1",
  secondaryTextColor: "#5de9ff",
  mediaList: [
    { type: 'youtube', url: '20m89_nlSHE' },
    { type: 'youtube', url: 'eIs244Z9ESw' },
    { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 1.png' },
    { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 2.png' },
    { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 3.png' },
    { type: 'image', url: '/projects/GD2/Last Scythe/Content/Last_Scythe_Screenshot 4.png' }
  ]
};
