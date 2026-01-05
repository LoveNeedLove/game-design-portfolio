"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "../data/projects";
import Header from "../components/Header";
import ProjectModal from "../components/ProjectModal";

// Fonction utilitaire pour extraire l'ID YouTube (réutilisée)
const getYouTubeID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

// Composant pour une carte de projet avec prévisualisation au hover
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Construction de la liste des aperçus avec métadonnées (vidéo ou image)
  const previews = [
    { url: project.coverImage, isVideo: false },
    ...project.mediaList
      .filter(m => m.type === 'image' || m.type === 'youtube')
      .map(m => ({
        url: m.type === 'youtube' 
          ? `https://img.youtube.com/vi/${getYouTubeID(m.url)}/mqdefault.jpg` 
          : m.url,
        isVideo: m.type === 'youtube'
      }))
  ];

  useEffect(() => {
    let interval: any;
    if (isHovered && previews.length > 1) {
      interval = setInterval(() => {
        setPreviewIndex((prev) => (prev + 1) % previews.length);
      }, 1500); // Défilement ralenti à 1.5s
    } else {
      setPreviewIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, previews.length]);

  return (
    <motion.div 
      whileHover={{ x: 10 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col md:flex-row gap-10 items-start border-b border-zinc-100 pb-20"
    >
      {/* Zone Image avec Prévisualisation */}
      <div className="w-full md:w-2/3 aspect-video bg-zinc-100 relative overflow-hidden rounded-sm border border-zinc-200">
         <AnimatePresence mode="wait">
           <motion.div 
             key={previewIndex}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.4 }}
             className="absolute inset-0"
           >
             <img 
               src={previews[previewIndex].url} 
               className="absolute inset-0 w-full h-full object-cover"
               alt={project.title}
             />
             
             {/* Icône Play pour les vidéos YouTube */}
             {previews[previewIndex].isVideo && (
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full border border-white/20 text-white shadow-xl">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M8 5v14l11-7z"/>
                   </svg>
                 </div>
               </div>
             )}
           </motion.div>
         </AnimatePresence>

         {/* Overlay au survol */}
         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px] z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white px-4 py-2 border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              [ Voir_Dossier_Mission ]
            </span>
         </div>
      </div>

      {/* Infos Projet */}
      <div className="w-full md:w-1/3">
        <span className="text-xs font-mono text-zinc-400 mb-2 block tracking-tighter uppercase">Mission_ID: {project.id}</span>
        <h3 className="text-4xl font-black uppercase italic leading-none mb-4 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed font-medium">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFixedNav, setShowFixedNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowFixedNav(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredMissions = projects.filter((p) => p.featured);
  const archivedMissions = projects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      
      <Header />

      {/* SECTION : ABOUT ME */}
      <section id="about" className="px-6 max-w-6xl mx-auto py-12 border-b border-zinc-100">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.5em]">
              // Bio_Data
            </h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-zinc-800">
              Game Designer Junior passionné par la création de mécaniques systémiques et l'équilibrage de gameplay. 
              Mon approche allie une vision créative forte à une rigueur technique, visant à transformer chaque interaction en une expérience mémorable pour le joueur.
            </p>
            <div className="mt-8 flex gap-6 text-[10px] font-black uppercase tracking-widest">
              <span className="text-blue-600">Location: France</span>
              <span className="text-zinc-300">|</span>
              <span>Available for Missions</span>
            </div>
          </div>
        </div>
      </section>

      {/* NAV FIXE */}
      <AnimatePresence>
        {showFixedNav && (
          <motion.nav 
            initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
            className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-black z-50 px-10 py-4 flex justify-between items-center"
          >
            <span className="font-black text-xs uppercase" style={{ fontFamily: '"Press Start 2P", monospace' }}>Ismaïl</span>
            <div className="flex gap-6 text-[9px] font-bold uppercase tracking-widest">
              <a href="#featured">Missions</a>
              <a href="#others">Archives</a>
              <a href="#about">Bio</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* PROJETS À LA UNE */}
      <section id="featured" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.5em] mb-20">
          // Active_Missions
        </h2>
        
        <div className="grid grid-cols-1 gap-32">
          {featuredMissions.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
          ))}
        </div>
      </section>

      {/* ARCHIVES */}
      <section id="others" className="py-20 px-6 max-w-6xl mx-auto border-t border-zinc-100">
        <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.5em] mb-12">
          // Side_Logs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {archivedMissions.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProject(p)} 
              className="p-8 border border-zinc-100 hover:border-black transition-all cursor-pointer bg-zinc-50/50 group"
            >
              <h4 className="font-bold uppercase text-sm group-hover:text-blue-600 transition-colors">
                {p.title}
              </h4>
              <p className="text-[9px] text-zinc-400 mt-2 uppercase tracking-widest">Archive_0{p.id}</p>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <footer className="py-20 text-center border-t border-zinc-100">
        <p className="text-[9px] font-mono text-zinc-300 uppercase tracking-widest">
          SYSTEM_STATE: STABLE // © {new Date().getFullYear()} — Ismail
        </p>
      </footer>
    </main>
  );
}