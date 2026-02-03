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
      description: "I devised and designed the foundational rules for movement, cooperation, and the corruption transition."
    },
    {
      title: "Content Writing",
      description: "I wrote over 40 unique moral dilemmas and designed 20+ unique items, each with specialized mechanical effects."
    },
    {
      title: "Prototyping & Templating",
      description: "I created the physical prototypes and visual templates for every card and game element to ensure readability and functional playtesting."
    },
    {
      title: "Documentation",
      description: "I authored the comprehensive rulebook and prepared all project documentation and pitch materials."
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
