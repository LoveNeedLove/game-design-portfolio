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
      description: "I designed and wrote the complex branching progression tree, ensuring that player choices led to distinct, meaningful story outcomes."
    },
    {
      title: "UX & Interface Design",
      description: "I designed the game's interface to mirror a \"scrapbook diary,\" creating an immersive aesthetic that makes the player feel as though the character is hand-writing their own experiences in real-time."
    },
    {
      title: "Serious Game Design",
      description: "I designed mechanics and scenarios specifically tailored for a broad audience, ensuring the gameplay was accessible while educating players on real-world social and environmental stakes."
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
