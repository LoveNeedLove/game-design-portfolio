import { Project } from '../types';

export const journal2050: Project = {
  id: "2050-journal",
  featured: false,
  title: "2050 : Journal de bord",
  description: "The year is 2050. An extreme climatic crisis has forced you to flee the city of Dunkirk, France. In this precarious era for humanity, you must manage your survival diary—designed as a personal scrapbook—and make impossible choices as if you were writing your own story. How will you endure? Who will you meet? And most importantly: is this a vision of the future, or is it already the reality for millions today?",
  shortDescription: "A branching visual novel about climate crisis created for the French Red Cross, linking fictional futures to present realities.",
  date: "June 2025",
  developmentTime: "3 days",
  genres: ["Visual Novel", "Serious Game"],
  roles: ["Narrative Design", "UX"],
  teamSize: [
    { count: 2, role: "Game Designer" },
    { count: 2, role: "Developer" },
    { count: 1, role: "Artist" }
  ],
  mission: "The goal of this project was to create an interactive \"Serious Game\" for the French Red Cross (Croix-Rouge française). Developed during an intensive 3-day hackathon, we were tasked with adapting an existing physical exhibition titled \"Living in 2050\" into a digital format. To preserve the integrity of the exhibition's information while increasing engagement, we transformed the content into a branching visual novel where players navigate various social and environmental risks through a personal, narrative-driven lens.",
  tasks: [
    {
      title: "Narrative Architecture",
      description: "I designed and wrote the complex branching progression tree, ensuring that player choices led to distinct, meaningful story outcomes.",
      content: [
        {
          type: 'text',
          content: "We needed to build a game that could be enjoyed by all ages, including older visitors, while being easily deployable within an exposition setting. To fulfil that goal, we landed on a visual novel concept designed to adapt the content of the exposition, in a neat, intuitive package.",
          group: 'visual-novel'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/journal2050-gameplay/800/450',
          group: 'visual-novel'
        },
        {
          type: 'text',
          content: "To make each playthrough unique, I built a narrative branching tree where the player's choices could directly impact their progress. This architecture allowed the story to \"converge\" at key milestones, which made the writing load more manageable.",
          size: 'full'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/journal2050-branching-tree/1200/500',
          size: 'full'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/journal2050-narrative-choice/600/400',
          group: 'inventory-system'
        },
        {
          type: 'text',
          content: "I also included an inventory system inspired by 60 seconds, by collecting certain items at any point of their journey, the player could access hidden story beats. This mechanic could drive the whole point of the exposition which was to \"imagine your life during a climatic crisis\". While the short deadline forced us to prioritize the overall aesthetic over the final implementation of this system, the design served to flesh out the world-building and provided a clear framework for the story's stakes.",
          group: 'inventory-system'
        }
      ]
    },
    {
      title: "UX & Interface Design",
      description: "I designed the game's interface to mirror a \"scrapbook diary,\" creating an immersive aesthetic that makes the player feel as though the character is hand-writing their own experiences in real-time.",
      content: [
        {
          type: 'text',
          content: "The goal of the experience was to educate about the various climatic crises currently happening all over the world. To immerse the player in the experience, we chose a \"scrapbook\" aesthetic. This look made the game feel like a credible, hand-written diary, yet it was distant enough to be perceived as fiction; a perception we intended to subvert by the end of the story. The scrapbook itself was made to look aged and mysterious, and with every story beat, filled up with sketches, polaroid pictures, crumpled memos, and other memorabilia.",
          size: 'full'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/journal2050-scrapbook/800/450',
          group: 'scrapbook'
        },
        {
          type: 'text',
          content: "I designed the space surrounding the notebook to evolve dynamically, items like maps and empty cans pilled up as the story progressed. These elements made the player's journey more tangible.",
          group: 'scrapbook'
        },
        {
          type: 'text',
          content: "To bridge the gap between our 2050 setting and the actual climatic tragedies currently occurring across the globe, I designed a \"Souvenir\" system. Every time a player meets a character, they receive a special memento to keep in their diary. In order to tie the experience, we replaced the book's pages with plain white layouts, and replace the previously collected \"souvenirs\" with high-fidelity images of actual cities in crisis. This revealed that each character encountered was a representation of a real-life individual's experience, subverting the idea that an apocalyptical crisis was only a thing of fiction.",
          size: 'full'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/seed/journal2050-reveal/1200/500',
          size: 'full'
        }
      ]
    },
    {
      title: "Serious Game Design",
      description: "I designed mechanics and scenarios specifically tailored for a broad audience, ensuring the gameplay was accessible while educating players on real-world social and environmental stakes.",
      content: [
        {
          type: 'image',
          url: 'https://picsum.photos/seed/journal2050-hackathon/600/400',
          group: 'red-cross'
        },
        {
          type: 'text',
          content: "Our goal was to create a digital and interactive experience that worked well alongside a pre-existing interactive exhibition made by the French Red Cross. To ensure the game fulfilled its role effectively, we chose to adapt the core educational content from the physical exhibit into a format that fit a visual novel better.",
          group: 'red-cross'
        },
        {
          type: 'text',
          content: "With each iteration, I worked alongside French Red Cross representatives to make sure that the game's tone and scenario were suitable for their mission. This helped us reach the perfect balance between accurately representing the stakes at hand and making an experience that was enjoyable to play through and fun for all ages.",
          size: 'full'
        }
      ]
    }
  ],
  challenge: "A recurring issue in serious games is the \"empathy gap\"—players often view futuristic scenarios as purely fictional. We struggled to find a way to meaningfully link the player's fictional adventure in 2050 with the actual climatic tragedies currently occurring across the globe.",
  solution: "I designed a \"Souvenir\" system to ground the experience in reality. As players met various characters in the game, they would receive a special memento. At the end of the experience, a concluding debrief revealed that each character encountered was actually a representation of a real-life individual's experience with the current climate crisis. By linking these \"souvenirs\" to contemporary global events, we forced a moment of reflection, transforming a futuristic survival game into a powerful tool for awareness of current human tragedies.",
  coverImage: "/projects/GD1/Journal de bord 2050/Journal de bord - 2050.png",
  overlayColor: "rgba(16, 185, 129, 0.05)",
  bannerColor: "#10b981",
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: [
    { type: 'youtube', url: 'V8atEgIWxNM' }
  ]
};
