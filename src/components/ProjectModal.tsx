"use client";

import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { Project, CombatLog } from "../data/projects";
import MediaGallery from "./MediaGallery";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-white/80 backdrop-blur-xl"
        style={{ backgroundColor: project.overlayColor }}
      />

      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white border border-black w-full max-w-7xl h-[90vh] rounded-sm shadow-[30px_30px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row"
      >
        <div className="w-full md:w-[42%] flex flex-col border-r border-zinc-100 bg-white overflow-hidden">
          <div className="flex-1 p-8 md:p-10 overflow-y-auto no-scrollbar flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-blue-600 tracking-[0.4em] uppercase">Mission_Intel</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-tight tracking-tighter">{project.title}</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-all group font-black text-[10px]">[X]</button>
            </div>
            <MediaGallery mediaList={project.mediaList} />
          </div>
          <div className="p-8 md:p-10 bg-white border-t border-zinc-50">
            {project.linkUrl && (
              <a href={project.linkUrl} target="_blank" className="block w-full py-5 bg-black text-white text-center font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-600 transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
                {project.linkTitle || "Deploy_Build.exe"}
              </a>
            )}
          </div>
        </div>

        <div className="w-full md:w-[58%] bg-zinc-50/50 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col">
          <div className="space-y-16">
            <div>
              <span className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase mb-6 block">Executive_Summary</span>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed italic">{project.description}</p>
            </div>
            <div className="space-y-14">
              <span className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase block">Field_Operations_Log</span>
              <div className="space-y-12">
                {project.combatLog.map((log: CombatLog, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + (i * 0.05) }} className="relative pl-8 border-l-2 border-zinc-200">
                    <h3 className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase mb-3">[{log.step}]</h3>
                    <p className="text-xl md:text-2xl font-medium text-black">{log.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}