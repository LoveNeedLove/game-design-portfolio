import { Project } from '../types';

export const musee: Project = {
  id: "musee",
  featured: false,
  title: "Museum Passport and Digital Exhibition",
  description: "Experience an upcoming museum through a dual-layered engagement strategy: a physical, activity-filled pamphlet designed to captivate younger audiences, and a digital companion for visitors seeking in-depth knowledge. Scan QR codes throughout the gallery to unlock detailed descriptions of each artwork in three different languages.",
  shortDescription: "A dual-layered museum experience with an interactive pamphlet for children and QR-based digital content in three languages.",
  date: "February 2026",
  developmentTime: "1 month",
  genres: ["Gamification"],
  roles: ["UX", "Content Design"],
  teamSize: [
    { count: 1, role: "UX Designer" }
  ],
  mission: "In this solo project for an upcoming museum in Casablanca, I was tasked with two primary objectives: first, to deconstruct the idea that museums are \"boring\" for children by creating an interactive physical pamphlet; and second, to provide accessible, multilingual information for visitors via a simple digital interface accessed through QR code integration.",
  tasks: [
    {
      title: "Physical Design & Gamification",
      description: "I designed an interactive pamphlet featuring games and activities that utilize the museum's layout and artwork to encourage active exploration."
    },
    {
      title: "Reward Systems",
      description: "I implemented a \"stamp\" system, providing a tangible sense of achievement for visitors who complete the pamphlet activities."
    },
    {
      title: "Digital Interface Design",
      description: "I designed and deployed mobile-friendly landing pages, creating a lightweight and accessible way for visitors to view additional artwork information on their own devices."
    },
    {
      title: "Content Management",
      description: "Organized and integrated detailed descriptions for the museum's collection across three distinct languages."
    }
  ],
  challenge: "A significant portion of the museum's audience required information to be displayed in Arabic. This presented a complex UX challenge regarding Right-to-Left (RTL) layout consistency and typography legibility within the constraints of the web layout.",
  solution: "I conducted research into Arabic UI/UX standards to adapt my digital designs. This involved restructuring the layout architecture to support RTL flow, ensuring that navigation, alignment, and visual hierarchy were culturally and technically appropriate for Arabic-speaking visitors. This effort ensured that the museum's information was professional and accessible across all three supported languages.",
  coverImage: "/projects/GD2/Musée/Museum.png",
  overlayColor: "rgba(139, 92, 246, 0.05)",
  bannerColor: "#8b5cf6",
  featuredTextColor: "#000000",
  secondaryTextColor: "#6b7280",
  mediaList: []
};
