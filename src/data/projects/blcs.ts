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
      description: "I designed the primary rules for play and traversal, focusing on how modular raft pieces interacted with a deck of tactical cards (Snake, Ladder, Block, and Cannon).",
      content: [
        {
          type: 'text',
          content: "I was inspired by John Conway's Game of Life to create a mechanic where players shuffle blocks to build the biggest entity possible. This became our main gameplay brick, where every interaction is based on your current \"raft\"—a group of at least two interconnected blocks—and its positioning on the grid. The core survival mechanic is based on adjacency: a player is eliminated if they end their turn on a single, isolated block without the means to move to another.",
          group: 'core-mechanic'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/blcs-prototype-rules/800/500',
          group: 'core-mechanic'
        },
        {
          type: 'text',
          content: "To flesh out player interactions, I designed four \"action cards\" that players can draw at the end of each turn: The Ladder allows for teleportation to steal or escape rafts. The Cannon deletes a block to drive the game's pacing. The Snake allows a player to push an entire row or column, creating tactical plays while staying balanced. Finally, the Block card allows moving any block to any space without increasing the total pool, keeping the overall pacing of the game intact, while offering a lot of gameplay possibilities.",
          group: 'action-cards'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/blcs-action-cards/600/400',
          group: 'action-cards'
        }
      ]
    },
    {
      title: "Rapid Prototyping",
      description: "I managed multiple quick-fire iterations of the physical prototype, testing balance and piece-fitting within the tight 6-hour window.",
      content: [
        {
          type: 'text',
          content: "Prototyping a whole game in only 6 hours meant that we had to iterate extremely quickly. Our first idea was a mix of Poker and Old Maid, where players needed to trade cards within their hands to end up with the best hand. However, we wanted to create a game that would stand on its own; after seeing a bunch of small wooden blocks on the material list, we decided to pivot and build our gameplay loop around that instead, testing balance and piece-fitting within the tight window.",
          size: 'full'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/blcs-game-photo/1200/500',
          size: 'full'
        },
        {
          type: 'text',
          content: "In a survival-based board game, player elimination is a common pain point. During playtests, I found that players who were eliminated early felt excluded, so I implemented a \"Ghost\" mechanic. Once out of the race, players use their turn to remove one block from an opponent's raft (mimicking the effect of the Cannon card). This kept everyone engaged until the final turn and turned a potential frustration into a \"snowball effect\" that heightened the tension for the remaining survivors.",
          size: 'full'
        }
      ]
    },
    {
      title: "UX Structuring",
      description: "To ensure the game remained clear and fast-paced, I divided the player's turn into three distinct, easy-to-follow phases, significantly reducing the learning curve for new players.",
      content: [
        {
          type: 'image',
          url: 'https://picsum.photos/seed/blcs-turn-phases/600/400',
          group: 'ux-phases'
        },
        {
          type: 'text',
          content: "To ensure the game remained clear and fast-paced, I divided the player's turn into three distinct, easy-to-follow phases. This significantly reduced the game's learning curve and alleviated the players' cognitive load. By clearly separating the movement and block-shifting phases, while ending the turn by drawing a card, I ensured that players could focus on strategy rather than struggling to understand the flow of play.",
          group: 'ux-phases'
        },
        {
          type: 'text',
          content: "We made it so that players could use their action cards at any point during their turn, which allowed for a lot of creative plays, made the cards feel more useful, and increased the overall skill expression.",
          size: 'full'
        }
      ]
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
