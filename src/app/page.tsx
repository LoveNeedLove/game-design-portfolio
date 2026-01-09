"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { projects, Project } from "../data/projects";
import Header from "../components/Header";
import ProjectModal from "../components/ProjectModal";
import CardSwap, { Card } from "../animations/CardSwap";

const getYouTubeID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

// Animation accélérée (0.4s)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  }
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

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
      }, 1200);
    } else {
      setPreviewIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, previews.length]);

  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ x: 10 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col md:flex-row gap-10 items-start border-b border-zinc-100 pb-20"
    >
      <div className="w-full md:w-2/3 aspect-video bg-zinc-100 relative overflow-hidden rounded-sm border border-zinc-200">
         <AnimatePresence mode="wait">
           <motion.div 
             key={previewIndex}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
             className="absolute inset-0"
           >
             <img 
               src={previews[previewIndex].url} 
               className="absolute inset-0 w-full h-full object-cover"
               alt={project.title}
             />
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
         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px] z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white px-4 py-2 border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              [ View_Mission_File ]
            </span>
         </div>
      </div>
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
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredMissions = projects.filter((p) => p.featured);
  const otherMissions = projects.filter((p) => !p.featured);

  const handleNext = () => setFeaturedIndex((prev) => (prev + 1) % featuredMissions.length);
  const handlePrev = () => setFeaturedIndex((prev) => (prev - 1 + featuredMissions.length) % featuredMissions.length);

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
      <Header />

      {/* SECTION FEATURED AVEC COULEUR DYNAMIQUE PAR PROJET */}
      <motion.section 
        id="featured" 
        className="relative py-24 overflow-visible transition-colors duration-700"
        animate={{ 
          backgroundColor: featuredMissions[featuredIndex].bannerColor 
        }}
      >
        <div className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center overflow-visible relative z-10">
          {/* GAUCHE: CARDS + NAVIGATION */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center min-h-[450px] overflow-visible">
            <div className="relative w-full max-w-[400px] h-[300px] mb-12 flex items-center justify-center">
               <CardSwap 
                activeIndex={featuredIndex}
                onCardClick={(idx: number) => {
                  if (idx === featuredIndex) {
                    setSelectedProject(featuredMissions[idx]);
                  } else {
                    setFeaturedIndex(idx);
                  }
                }}
               >
                 {featuredMissions.map((p) => (
                   <Card key={p.id} className="cursor-pointer">
                      <img 
                        src={p.coverImage} 
                        className="w-full h-full object-cover" 
                        alt={p.title} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                        <span className="text-white font-black italic uppercase text-lg tracking-tighter">{p.title}</span>
                      </div>
                   </Card>
                 ))}
               </CardSwap>
            </div>
            
            {/* NAVIGATION AVEC FLÈCHES */}
            <div className="flex items-center gap-10 mt-4 bg-white/50 backdrop-blur-md p-2 rounded-full border border-black/5">
              <button 
                onClick={handlePrev}
                className="p-3 hover:bg-white rounded-full transition-all group shadow-sm"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              <div className="flex gap-2">
                {featuredMissions.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setFeaturedIndex(i)}
                    className={`h-1 transition-all duration-500 rounded-full ${featuredIndex === i ? 'w-8 bg-black' : 'w-2 bg-zinc-300'}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="p-3 hover:bg-white rounded-full transition-all group shadow-sm"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" transform="rotate(180 12 12)"/>
                </svg>
              </button>
            </div>
          </div>

          {/* DROITE: LOGO + INFO AVEC FOND BLANC */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <motion.div
              key={featuredIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 bg-white p-8 md:p-12 border border-black shadow-[20px_20px_0px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black italic text-xl">
                  {featuredMissions[featuredIndex].title.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase">Featured_Mission</span>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                    {featuredMissions[featuredIndex].title}
                  </h2>
                </div>
              </div>
              
              <p className="text-xl font-medium leading-relaxed italic text-zinc-500 max-w-md">
                {featuredMissions[featuredIndex].description}
              </p>

              <div className="pt-4">
                <button 
                  onClick={() => setSelectedProject(featuredMissions[featuredIndex])}
                  className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none"
                >
                  Access_Project_Intel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <motion.section 
        id="about" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-6 max-w-6xl mx-auto py-24 border-b border-zinc-100"
      >
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.5em]">
              // Bio_Data
            </h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-zinc-800">
              Junior Game Designer passionné par la création de mécaniques systémiques et l'équilibrage du gameplay. 
              Mon approche combine une vision créative forte avec une rigueur technique, visant à transformer chaque interaction en une expérience mémorable pour le joueur.
            </p>
          </div>
        </div>
      </motion.section>

      {/* PROJECT LIST (Operational History) */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.5em] mb-20"
        >
          // Operational_History
        </motion.h2>
        
        <div className="grid grid-cols-1 gap-32">
          {otherMissions.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <footer id="contact" className="py-20 text-center border-t border-zinc-100 bg-zinc-50/30">
        <p className="text-[9px] font-mono text-zinc-300 uppercase tracking-widest">
          SYSTEM_STATE: STABLE // © {new Date().getFullYear()} — Ismail
        </p>
        <div className="mt-8 flex justify-center gap-12 text-[10px] font-black uppercase tracking-widest">
           <a href="mailto:ismail@example.com" className="hover:text-blue-600 transition-colors">Direct_Signal</a>
           <a href="#" className="hover:text-blue-600 transition-colors">Linked_In</a>
        </div>
      </footer>
    </main>
  );
}