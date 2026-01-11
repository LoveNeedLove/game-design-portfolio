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
        <span className="text-xs font-semibold text-zinc-400 mb-2 block tracking-wide uppercase">Project #{project.id}</span>
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
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [triggerNext, setTriggerNext] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const featuredMissions = projects.filter((p) => p.featured);
  const otherMissions = projects.filter((p) => !p.featured);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
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
              <h2 className="text-sm font-black text-zinc-800 uppercase tracking-wider">
                About Me
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-zinc-800">
                Welcome! I am a Game Designer dedicated to crafting deep, systemic experiences with a focus on User Experience and Economy Design. I believe games are at their best when they foster connection—whether through community-driven gameplay or seamless collaborative development.
                <br /><br />
                I am driven by a desire to translate ambitious creative visions into polished reality, utilizing a diverse toolkit to balance complex systems with intuitive feel.
                <br /><br />
                Currently, I am honing my craft at Isart Digital, Paris.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SECTION FEATURED */}
      <section
        id="featured"
        className="relative py-24 overflow-visible"
      >
        {/* BANNIÈRE DE COULEUR SUR TOUTE LA LARGEUR DU SITE */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full transition-colors duration-700"
          style={{ height: '350px' }}
          animate={{
            backgroundColor: featuredMissions[activeCardIndex].bannerColor
          }}
        />

        {/* Contrôles en bas à droite - avec z-index élevé */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none" style={{ height: '350px', zIndex: 100 }}>
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3 pointer-events-auto">
            {/* Bouton Next avec progression radiale */}
            <button
              onClick={() => setTriggerNext(prev => prev + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all group relative overflow-hidden"
              aria-label="Next project"
              style={{
                background: `conic-gradient(
                  rgba(0, 0, 0, 0.4) 0deg,
                  rgba(0, 0, 0, 0.4) ${progress * 3.6}deg,
                  rgba(0, 0, 0, 0.2) ${progress * 3.6}deg,
                  rgba(0, 0, 0, 0.2) 360deg
                )`
              }}
            >
              <div className="absolute inset-0 backdrop-blur-sm rounded-full" />
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white/70 group-hover:text-white transition-colors relative z-10"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Toggle Auto-play */}
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-white/70 font-medium">Auto</span>
              <input
                type="checkbox"
                checked={autoPlayEnabled}
                onChange={(e) => setAutoPlayEnabled(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="px-6 max-w-6xl mx-auto overflow-visible relative z-10 w-full">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-black text-zinc-800 uppercase tracking-wider mb-8"
          >
            Featured Project
          </motion.h2>

          <div className="relative flex flex-col md:flex-row gap-16 items-center overflow-visible">

            {/* GAUCHE: INFO DU PROJET */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 md:-mt-8">
              <motion.div
                key={activeCardIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black italic text-xl">
                    {featuredMissions[activeCardIndex].title.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                      {featuredMissions[activeCardIndex].title}
                    </h2>
                  </div>
                </div>

                <p className="text-xl font-medium leading-relaxed italic text-zinc-800 max-w-md">
                  {featuredMissions[activeCardIndex].description}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedProject(featuredMissions[activeCardIndex])}
                    className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none"
                  >
                    Access_Project_Intel
                  </button>
                </div>
              </motion.div>
            </div>

            {/* DROITE: CARDS */}
            <div className="w-full md:w-1/2 relative" style={{ marginTop: '25px' }}>
              {/* Cards et navigation - positions indépendantes */}
              <CardSwap
                width={450}
                height={350}
                cardDistance={60}
                verticalDistance={70}
                delay={7000}
                pauseOnHover={!autoPlayEnabled}
                easing="elastic"
                skewAmount={6}
                onCardClick={(idx) => setSelectedProject(featuredMissions[idx])}
                onActiveIndexChange={(idx) => setActiveCardIndex(idx)}
                onProgressChange={(p) => setProgress(p)}
                triggerNext={triggerNext}
                renderWrapper={(cardsElement, navElement) => (
                  <>
                    {/* Fenêtres/Cartes - avec masque de dégradé */}
                    <div style={{
                      paddingTop: '150px',
                      marginTop: '-150px',
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 30%, black 70%, transparent 77%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 30%, black 70%, transparent 77%)',
                      paddingBottom: '200px'
                    }}>
                      {cardsElement}
                    </div>

                    {/* Barre de navigation - position indépendante */}
                    <div style={{ marginTop: '-176px', position: 'relative', zIndex: 20 }}>
                      {navElement}
                    </div>
                  </>
                )}
              >
                {featuredMissions.map((p) => (
                  <Card key={p.id} customClass="cursor-pointer overflow-hidden">
                    <img
                      src={p.coverImage}
                      className="w-full h-full object-cover transition-all duration-300"
                      style={{ filter: 'blur(0px)' }}
                      alt={p.title}
                      data-card-id={p.id}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <span className="text-white font-black italic uppercase text-lg tracking-tighter">{p.title}</span>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT LIST (Operational History) */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-sm font-black text-zinc-800 uppercase tracking-wider mb-20"
        >
          All Projects
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
    </>
  );
}