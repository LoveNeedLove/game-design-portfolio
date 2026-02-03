import { Project } from '../types';

export const blcs: Project = {
  id: "blcs",
  featured: false,
  title: "BLCS",
  description: "Your ship has crashed, and it's time to rebuild your dream boat from the wreckage. But this time, you aren't looking for crewmates. Use floating logs and washed-up tools to ensure you are the only survivor in this merciless tactical board game.",
  shortDescription: "A tactical board game created in 6 hours where players build modular rafts and compete to be the last survivor.",
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
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: [
    { type: 'iframe', url: '/projects/GD1/BLCS/Content/blcsrules.html' },
    { type: 'image', url: '/projects/GD1/BLCS/Content/BECS_Photo.png' },
    { type: 'image', url: '/projects/GD1/BLCS/Content/BECS_Photo 2.png' },
    { type: 'image', url: '/projects/GD1/BLCS/Content/BECS_Photo 3.png' }
  ]
};
