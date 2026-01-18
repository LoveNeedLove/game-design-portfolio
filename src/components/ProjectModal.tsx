"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../data/projects";
import MediaGallery from "./MediaGallery";

// Format du pop-up (largeur/hauteur) - modifier cette valeur pour changer le ratio
const MODAL_ASPECT_RATIO = "16/11"; // Options: "16/9", "16/10", "8/5", "4/3", "21/9"

// Proportion de la section gauche (image/description) en pourcentage
const IMAGE_SECTION_PROPORTION = 42; // 0-100 (ex: 42 = 42% pour la gauche, 58% pour la droite)

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [scrollPosition, setScrollPosition] = useState<'top' | 'bottom'>('top');
  const [isMediaExpanded, setIsMediaExpanded] = useState(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  const scrollToBottom = () => {
    setScrollPosition('bottom');
  };

  const scrollToTop = () => {
    setScrollPosition('top');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
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
        className="relative bg-white border border-black w-full max-w-[1400px] rounded-xl shadow-[30px_30px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col"
        style={{ aspectRatio: MODAL_ASPECT_RATIO, maxHeight: '92vh' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 hover:bg-zinc-100 rounded-full transition-all group font-black"
          style={{ fontSize: 'clamp(8px, 1.2vmin, 12px)' }}
        >
          [X]
        </button>

        {/* Content container */}
        <div className="relative w-full h-full overflow-hidden flex flex-col md:flex-row">
          {/* LEFT COLUMN */}
          <div
            className="w-full h-full flex flex-col border-r border-zinc-100 bg-white overflow-hidden"
            style={{ width: `${IMAGE_SECTION_PROPORTION}%` }}
          >
            <div
              className="flex-1 flex flex-col overflow-hidden"
              style={{ padding: 'clamp(12px, 2vmin, 24px)', gap: 'clamp(8px, 1.5vmin, 16px)' }}
            >
              {/* Title */}
              <div className="flex flex-col flex-shrink-0" style={{ gap: 'clamp(4px, 1vmin, 12px)' }}>
                <h2
                  className="font-black uppercase italic leading-tight tracking-tighter"
                  style={{ fontSize: 'clamp(16px, 3.5vmin, 40px)' }}
                >
                  {project.title}
                </h2>

                {/* Genres with Date on the right */}
                <div className="flex items-center justify-between flex-wrap" style={{ gap: 'clamp(4px, 0.8vmin, 8px)' }}>
                  <div className="flex flex-wrap" style={{ gap: 'clamp(2px, 0.5vmin, 6px)' }}>
                    {project.genres.map((genre, i) => (
                      <span
                        key={i}
                        className="bg-zinc-100 text-zinc-800 font-bold uppercase tracking-wider rounded-sm"
                        style={{
                          fontSize: 'clamp(7px, 1vmin, 11px)',
                          padding: 'clamp(2px, 0.4vmin, 4px) clamp(4px, 0.8vmin, 10px)'
                        }}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <span
                    className="font-mono text-zinc-400 whitespace-nowrap"
                    style={{ fontSize: 'clamp(8px, 1.1vmin, 13px)' }}
                  >
                    {project.date}
                  </span>
                </div>
              </div>

              {/* Media Gallery + Description - collées ensemble */}
              <div className={`overflow-hidden flex flex-col ${isMediaExpanded ? 'flex-1 min-h-0' : ''}`}>
                <div className={isMediaExpanded ? 'flex-1 min-h-0' : ''}>
                  <MediaGallery
                    mediaList={[
                      { type: 'image', url: project.coverImage },
                      ...project.mediaList
                    ]}
                    onExpandChange={setIsMediaExpanded}
                  />
                </div>

                {/* Description - séparée de la gallery, cachée en mode expanded */}
                {!isMediaExpanded && (
                  <div className="flex-shrink-0 flex flex-col items-center" style={{ marginTop: 'clamp(10px, 2vmin, 20px)' }}>
                    {/* Ligne séparatrice */}
                    <div
                      className="bg-zinc-200 rounded-full"
                      style={{
                        width: '90%',
                        height: 'clamp(1px, 0.2vmin, 2px)',
                        marginBottom: 'clamp(10px, 2vmin, 20px)'
                      }}
                    />
                    <div className="w-full">
                      <span
                        className="font-black text-zinc-400 tracking-[0.3em] uppercase block"
                        style={{ fontSize: 'clamp(6px, 0.9vmin, 10px)', marginBottom: 'clamp(2px, 0.5vmin, 6px)' }}
                      >
                        Description
                      </span>
                      <p
                        className="text-zinc-600 font-medium leading-relaxed italic"
                        style={{ fontSize: 'clamp(9px, 1.3vmin, 15px)' }}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Link Button */}
            {project.linkUrl && (
              <div
                className="bg-white border-t border-zinc-50 flex-shrink-0"
                style={{ padding: 'clamp(12px, 2vmin, 24px)' }}
              >
                <a
                  href={project.linkUrl}
                  target="_blank"
                  className="block w-full bg-black text-white text-center font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)]"
                  style={{
                    fontSize: 'clamp(7px, 1vmin, 11px)',
                    padding: 'clamp(8px, 1.5vmin, 18px) 0'
                  }}
                >
                  {project.linkTitle || "Deploy_Build.exe"}
                </a>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Animated */}
          <div
            className="w-full h-full bg-zinc-50/50 relative overflow-hidden"
            style={{ width: `${100 - IMAGE_SECTION_PROPORTION}%` }}
          >
            <AnimatePresence mode="wait">
              {scrollPosition === 'top' ? (
                <motion.div
                  key="top"
                  initial={{ y: 0 }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col text-center overflow-hidden"
                  style={{ padding: 'clamp(12px, 2vmin, 32px)' }}
                >
                  {/* Context Section */}
                  <div className="flex-[0.6] flex flex-col justify-center min-h-0">
                    <span
                      className="font-black text-zinc-400 tracking-[0.3em] uppercase block"
                      style={{ fontSize: 'clamp(6px, 0.8vmin, 10px)', marginBottom: 'clamp(2px, 0.5vmin, 6px)' }}
                    >
                      Context
                    </span>

                    {/* Team Composition and Development Time */}
                    <p
                      className="font-medium text-zinc-500 leading-tight italic"
                      style={{ fontSize: 'clamp(8px, 1.1vmin, 12px)', marginBottom: 'clamp(2px, 0.5vmin, 6px)' }}
                    >
                      {(() => {
                        const totalMembers = project.teamSize.reduce((sum, member) => sum + member.count, 0);
                        if (totalMembers === 1) {
                          return `Solo project, ${project.developmentTime}`;
                        }
                        return (
                          <>
                            {project.teamSize.map((member, i) => {
                              const text = `${member.count} ${member.role}${member.count > 1 ? 's' : ''}`;
                              if (i === project.teamSize.length - 1 && project.teamSize.length > 1) {
                                return `and ${text}`;
                              } else if (i === project.teamSize.length - 2 && project.teamSize.length > 2) {
                                return `${text}, `;
                              } else if (i < project.teamSize.length - 1) {
                                return `${text}, `;
                              }
                              return text;
                            }).join('')} — {project.developmentTime}
                          </>
                        );
                      })()}
                    </p>

                    <p
                      className="font-medium text-black leading-snug"
                      style={{ fontSize: 'clamp(10px, 1.5vmin, 18px)' }}
                    >
                      {project.mission}
                    </p>
                  </div>

                  {/* Role Section - Tasks Grid 2x2 */}
                  <div className="flex-[1.4] flex flex-col justify-center min-h-0 overflow-hidden">
                    <span
                      className="font-black text-zinc-400 tracking-[0.3em] uppercase block text-center"
                      style={{ fontSize: 'clamp(6px, 0.9vmin, 10px)', marginBottom: 'clamp(6px, 1.2vmin, 14px)' }}
                    >
                      Role
                    </span>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 overflow-hidden"
                      style={{ gap: 'clamp(6px, 1.2vmin, 14px)' }}
                    >
                      {project.tasks.map((task, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (i * 0.05) }}
                          className="bg-white border border-zinc-200 rounded-sm shadow-sm hover:shadow-md transition-shadow text-left overflow-hidden"
                          style={{ padding: 'clamp(6px, 1.2vmin, 14px)' }}
                        >
                          <h3
                            className="font-black text-zinc-900"
                            style={{ fontSize: 'clamp(8px, 1.2vmin, 14px)', marginBottom: 'clamp(1px, 0.3vmin, 4px)' }}
                          >
                            {task.title}
                          </h3>
                          <p
                            className="font-medium text-zinc-600 leading-relaxed"
                            style={{ fontSize: 'clamp(7px, 1.1vmin, 12px)' }}
                          >
                            {task.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll Down Button */}
                  <div className="flex justify-center flex-shrink-0" style={{ paddingTop: 'clamp(6px, 1.2vmin, 14px)' }}>
                    <button
                      onClick={scrollToBottom}
                      className="bg-zinc-200 hover:bg-zinc-300 rounded-full transition-all group"
                      title="See Challenge & Solution"
                      style={{ padding: 'clamp(6px, 1.2vmin, 14px)' }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
                        style={{ width: 'clamp(10px, 1.8vmin, 18px)', height: 'clamp(10px, 1.8vmin, 18px)' }}
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="bottom"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col text-center overflow-hidden"
                  style={{ padding: 'clamp(12px, 2vmin, 32px)' }}
                >
                  {/* Scroll Up Button */}
                  <div className="flex justify-center flex-shrink-0" style={{ paddingBottom: 'clamp(6px, 1.2vmin, 14px)' }}>
                    <button
                      onClick={scrollToTop}
                      className="bg-zinc-200 hover:bg-zinc-300 rounded-full transition-all group"
                      title="Back to Overview"
                      style={{ padding: 'clamp(6px, 1.2vmin, 14px)' }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
                        style={{ width: 'clamp(10px, 1.8vmin, 18px)', height: 'clamp(10px, 1.8vmin, 18px)' }}
                      >
                        <path
                          d="M12 10L8 6L4 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Challenge Section */}
                  <div className="flex-1 flex flex-col justify-center min-h-0">
                    <span
                      className="font-black text-zinc-400 tracking-[0.3em] uppercase block"
                      style={{ fontSize: 'clamp(6px, 0.8vmin, 10px)', marginBottom: 'clamp(4px, 0.8vmin, 10px)' }}
                    >
                      Challenge
                    </span>
                    <p
                      className="font-medium text-black leading-snug"
                      style={{ fontSize: 'clamp(10px, 1.5vmin, 18px)' }}
                    >
                      {project.challenge}
                    </p>
                  </div>

                  {/* Solution Section */}
                  <div className="flex-1 flex flex-col justify-center min-h-0">
                    <span
                      className="font-black text-zinc-400 tracking-[0.3em] uppercase block"
                      style={{ fontSize: 'clamp(6px, 0.8vmin, 10px)', marginBottom: 'clamp(4px, 0.8vmin, 10px)' }}
                    >
                      Solution
                    </span>
                    <p
                      className="font-medium text-black leading-snug"
                      style={{ fontSize: 'clamp(10px, 1.5vmin, 18px)' }}
                    >
                      {project.solution}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
