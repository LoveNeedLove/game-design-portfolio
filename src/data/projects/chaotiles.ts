import { Project } from '../types';

export const chaotiles: Project = {
  id: "chaotiles",
  featured: false,
  title: "Chaotiles",
  description: "Trapped in a maze controlled by The Entity of Chaos, you must make agonizing decisions to escape. Amidst a backdrop of colliding myths and legends, you must be careful: your choices will one day corrupt you, turning you against the people you once called your allies.",
  shortDescription: "A semi-cooperative board game where moral choices eventually corrupt one player, transforming the game into a 1-vs-All scenario.",
  date: "December 2024",
  developmentTime: "1 month",
  genres: ["Board Game", "Semi-Coop"],
  roles: ["Game Design", "Systems Design"],
  teamSize: [
    { count: 2, role: "Game Designer" }
  ],
  mission: "The objective was to design a board game centered on the theme of \"Chaos.\" We developed a semi-cooperative experience where players must work together to navigate a maze until a tipping point is reached. The player who accumulates the most \"Curse Points\" through their choices is eventually corrupted, transforming the game into a high-stakes 1-vs-All survival scenario.",
  tasks: [
    {
      title: "Core Rule Design",
      description: "I devised and designed the foundational rules for movement, cooperation, and the corruption transition.",
      content: [
        {
          type: 'text',
          content: "Inspired by the Greek entity of Chaos, I designed a board game centered on shifting paths and moral decay. The game begins as an empty grid where players construct the labyrinth in real-time. By revealing tiles with varied configurations—corridors, corners, and crossroads—players must forge their own routes toward four shared objectives, ensuring that no two sessions ever share the same map layout.",
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD1/Chaotiles/Content/Roles/trailer gif.gif',
          size: 'full'
        },
        {
          type: 'image',
          url: '/projects/GD1/Chaotiles/Content/Roles/dual orientation card.gif',
          group: 'dual-card'
        },
        {
          type: 'text',
          content: "To create genuine moral friction, I developed a \"dual-orientation\" card system that handles hidden roles without the need for a digital app. Each dilemma card features Neutral and Chaotic outcomes printed in opposite directions. Because the card backs are symmetrical, players can discreetly commit to a side by orienting the card in their private pile. This physical solution allows for tactile \"reveals\" and chaotic events where a player might be forced to flip their entire deck, instantly subverting their past choices.",
          group: 'dual-card'
        },
        {
          type: 'text',
          content: "The transition from cooperation to confrontation is triggered once the four objectives are met. In this second phase, the \"betrayal\" is finalized: the player with the highest corruption transforms into a monster. This transformation is a pivotal moment where the monster absorbs all corruption points from the other players, rewarding the traitor's cunning while penalizing those who dabbled in corruption but failed to seize control.",
          size: 'full'
        },
        {
          type: 'text',
          content: "I engineered a \"snowball\" mechanic to ensure the monster feels like a growing threat. While the monster starts with base movement, it gains an additional step for every five corruption points it possesses. This system places a high value on early-game interactions and corruption stacking, addressing a key playtest issue where players previously felt the corruption points lacked sufficient mechanical impact on the end-game chase.",
          group: 'monster-chase'
        },
        {
          type: 'image',
          url: '/projects/GD1/Chaotiles/Content/Roles/moster_chase.gif',
          group: 'monster-chase'
        },
        {
          type: 'text',
          content: "The final survival phase is a high-stakes race where heroes must reach two specific tiles simultaneously to win. To prevent a simple sprint, I implemented a curse system: if the monster passes through a hero's tile, both gain curse points. This simultaneously accelerates the monster and can disqualify a hero from exiting. This mechanic ensures that every movement on the board is a calculated risk between speed and spiritual purity.",
          size: 'full'
        },
        {
          type: 'text',
          content: "To balance the monster's power, I repurposed the objective tiles into \"Purification Sites\" during the final phase. Pure players can use these tiles to shield allies or slow down the boss, while cursed players can use them for an emergency purification at the cost of destroying the tile permanently. By using the same resource points across both phases, I ensured that items and status effects gathered early in the game remain strategically relevant until the final turn.",
          size: 'full'
        }
      ]
    },
    {
      title: "Content Writing and Documentation",
      description: "I wrote over 40 unique moral dilemmas and designed 20+ unique items, each with specialized mechanical effects.",
      content: [
        {
          type: 'text',
          content: "I created over 20 unique item effects and 40 distinct dilemma cards. Each dilemma consisted of 2 choices, that each had unique in-game effects that needed to be well balanced.",
          group: 'content-creation'
        },
        {
          type: 'image',
          url: '/projects/GD1/Chaotiles/Content/Roles/card example.png',
          group: 'content-creation'
        },
        {
          type: 'text',
          content: "I wrote the rulebook that seeks to simplify complex mechanics such as the \"dual-orientation\" feature of the dilemma cards. My goal was to provide a manual that allowed players to grasp the core loop quickly, and discover the game progressively.",
          size: 'full'
        },
        {
          type: 'text',
          content: "I prepared pitches and presentations for every major milestone, which ensured that the project's unique selling points were effectively communicated to the pedagogical team throughout the whole development timeline.",
          group: 'presentations'
        },
        {
          type: 'image',
          url: '/projects/GD1/Chaotiles/Content/Roles/presentation.png',
          group: 'presentations'
        }
      ]
    },
    {
      title: "Prototyping & Templating",
      description: "I created the physical prototypes and visual templates for every card and game element to ensure readability and functional playtesting.",
      content: [
        {
          type: 'text',
          content: "I made the visual templates for all the cards in Photoshop and Canva. This required some attention to detail to ensure that the card backs for the dilemmas were perfectly symmetrical.",
          group: 'templates'
        },
        {
          type: 'image',
          url: '/projects/GD1/Chaotiles/Content/Roles/canva template.png',
          group: 'templates'
        },
        {
          type: 'image',
          url: '/projects/GD1/Chaotiles/Content/Roles/prototype.png',
          group: 'prototype'
        },
        {
          type: 'text',
          content: "To facilitate testing throughout every production phase, I built a \"classic\" physical prototype using cardboard and components from existing board games. This allowed the team to iterate on the core loop and movement rules immediately, long before the final assets were finalized.",
          group: 'prototype'
        },
        {
          type: 'text',
          content: "I was responsible for the final layout of all game elements, ensuring high readability during high-stress play sessions. I ensured that players could instantly distinguish between item types, dilemmas, and world tiles, streamlining the overall UX of the physical board.",
          size: 'full'
        }
      ]
    }
  ],
  challenge: "We wanted players to face genuine moral friction by choosing between self-interest and the collective good. The challenge was allowing these choices to remain secret during the cooperative phase, while ensuring they could be verified and tracked for the final \"betrayal\" phase without the need for a digital companion app.",
  solution: "I designed a unique \"dual-orientation\" card system. Each dilemma card featured two outcomes—Neutral and Chaotic—printed in opposite directions (one right-side up and one upside-down). Because the backs of the cards were symmetrical, players could discreetly choose their side by orienting the card in their private pile. This physical system enabled tactile gameplay features: players could \"reveal\" their pile later to calculate their corruption score. It also allowed for chaotic events where a player might be forced to flip their entire pile, effectively swapping their past \"neutral\" choices for \"chaotic\" ones. This utilized the physical medium of the board game to create hidden-role tension that felt both intuitive and fair.",
  coverImage: "/projects/GD1/Chaotiles/Chaotiles.png",
  overlayColor: "rgba(249, 115, 22, 0.05)",
  bannerColor: "#f97316",
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: [
    { type: 'image', url: '/projects/GD1/Chaotiles/Content/Chaotiles_1.png' },
    { type: 'image', url: '/projects/GD1/Chaotiles/Content/Chaotiles_2.png' },
    { type: 'image', url: '/projects/GD1/Chaotiles/Content/Chaotiles_3.png' },
    { type: 'youtube', url: 'fDGHpldf5qQ' }
  ]
};
