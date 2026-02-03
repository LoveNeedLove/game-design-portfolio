import { Project } from '../types';

export const fling: Project = {
  id: "fling",
  featured: true,
  title: "Fling",
  description: "You've crash-landed in an unknown habitat, but you have a unique advantage: the ability to possess and fling spherical objects. Jump, dash, and throw your way through six unique levels to reach the core of this hostile planet—literally!",
  shortDescription: "A 2.5D platformer with a unique recoil-based mobility system where projecting objects flings you in the opposite direction.",
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
  bannerColor: "#babbfa",
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: [
    { type: 'youtube', url: 'dQw4w9WgXcQ' },
    { type: 'image', url: '/projects/GD1/Fling/Content/Fling 1.png' },
    { type: 'image', url: '/projects/GD1/Fling/Content/Fling 2.png' },
    { type: 'image', url: '/projects/GD1/Fling/Content/Fling 3.png' }
  ],
  linkUrl: "https://example.com/fling",
  linkTitle: "Play Fling"
};
