"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Project, CombatLog } from "../data/projects";
import MediaGallery from "./MediaGallery";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
      {/* OVERLAY */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-white/80 backdrop-blur-xl"
        style={{ backgroundColor: project.overlayColor }}
      />

      {/* FENÊTRE DE PROJET */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: 50, opacity: 0 }}
        className="relative bg-white border border-black w-full max-w-7xl h-[90vh] rounded-sm shadow-[30px_30px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row"
      >
        {/* COLONNE GAUCHE (42%) : TITRE, MÉDIAS ET ACTION */}
        <div className="w-full md:w-[42%] flex flex-col border-r border-zinc-100 bg-white overflow-hidden">
          {/* Zone Scrollable interne */}
          <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-blue-600 tracking-[0.4em] uppercase">
                  Mission_Intel
                </span>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-tight tracking-tighter">
                  {project.title}
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-zinc-100 rounded-full transition-all group"
              >
                <span className="text-[10px] font-black uppercase block tracking-tighter">[X]</span>
              </button>
            </div>

            {/* GALERIE MULTIMÉDIA */}
            <MediaGallery mediaList={project.mediaList} />
          </div>

          {/* BOUTON D'ACTION (FIXÉ EN BAS DE LA COLONNE GAUCHE) */}
          <div className="p-8 md:p-10 bg-white border-t border-zinc-50">
            {project.linkUrl ? (
              <a 
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-5 bg-black text-white text-center font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-600 transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none"
              >
                {project.linkTitle || "Lancer_le_Build.exe"}
              </a>
            ) : (
              <div className="py-5 bg-zinc-100 text-zinc-400 text-center font-black uppercase tracking-[0.3em] text-[10px] cursor-not-allowed">
                Build_Indisponible
              </div>
            )}
          </div>
        </div>

        {/* COLONNE DROITE (58%) : DESCRIPTIONS ET LOGS */}
        <div className="w-full md:w-[58%] bg-zinc-50/50 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="space-y-16">
            {/* CONTEXTE */}
            <div className="border-b border-black/5 pb-10">
              <span className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase mb-6 block underline decoration-zinc-200 underline-offset-8">
                Executive_Summary
              </span>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed italic">
                {project.description}
              </p>
            </div>

            {/* COMBAT LOGS (DESCRIPTION TECHNIQUE) */}
            <div className="space-y-14">
              <span className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase block">
                Field_Operations_Log
              </span>
              <div className="space-y-12">
                {project.combatLog.map((log: CombatLog, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="relative pl-8 border-l-2 border-zinc-200 hover:border-black transition-colors group"
                  >
                    <h3 className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase mb-3 group-hover:text-blue-600 transition-colors">
                      [{log.step}]
                    </h3>
                    <p className="text-xl md:text-2xl font-medium leading-tight text-black tracking-tight">
                      {log.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* PIED DE PAGE INTERNE */}
          <div className="mt-20 pt-10 border-t border-black/5 opacity-20 flex justify-between items-center">
            <span className="text-[8px] font-mono font-bold tracking-[0.4em] uppercase">Auth_Ismail_01</span>
            <span className="text-[8px] font-mono font-bold tracking-[0.4em] uppercase leading-none">Status: Read_Only</span>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
      `}</style>
    </div>
  );
}