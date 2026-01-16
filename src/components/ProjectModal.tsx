"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../data/projects";
import MediaGallery from "./MediaGallery";

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
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
        className="relative bg-white border border-black w-full max-w-7xl h-[90vh] rounded-sm shadow-[30px_30px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 hover:bg-zinc-100 rounded-full transition-all group font-black text-[10px]"
        >
          [X]
        </button>

        {/* Content container */}
        <div className="relative w-full h-full overflow-hidden flex flex-col md:flex-row">
          {/* LEFT COLUMN - Fixed */}
          <div className="w-full md:w-[42%] flex flex-col border-r border-zinc-100 bg-white">
            <div className="flex-1 p-8 md:p-10 flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-tight tracking-tighter">
                  {project.title}
                </h2>

                {/* Genres with Date on the right */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.genres.map((genre, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-mono text-zinc-400 whitespace-nowrap">{project.date}</span>
                </div>
              </div>

              {/* Media Gallery */}
              <MediaGallery
                mediaList={[
                  { type: 'image', url: project.coverImage },
                  ...project.mediaList
                ]}
                onExpandChange={setIsMediaExpanded}
              />

              {/* Description */}
              <AnimatePresence>
                {!isMediaExpanded && (
                  <motion.div
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <span className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase block mb-2">
                      Description
                    </span>
                    <p className="text-zinc-600 font-medium leading-relaxed italic">
                      {project.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Link Button */}
            {project.linkUrl && (
              <div className="p-8 md:p-10 bg-white border-t border-zinc-50">
                <a
                  href={project.linkUrl}
                  target="_blank"
                  className="block w-full py-5 bg-black text-white text-center font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-600 transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)]"
                >
                  {project.linkTitle || "Deploy_Build.exe"}
                </a>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Animated */}
          <div className="w-full md:w-[58%] bg-zinc-50/50 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {scrollPosition === 'top' ? (
                <motion.div
                  key="top"
                  initial={{ y: 0 }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 p-8 md:p-12 flex flex-col text-center"
                >
                  {/* Context Section */}
                  <div className="flex-[0.6] flex flex-col justify-center min-h-0">
                    <span className="text-[8px] font-black text-zinc-400 tracking-[0.3em] uppercase block mb-2">
                      Context
                    </span>

                    {/* Team Composition and Development Time */}
                    <p className="text-[11px] font-medium text-zinc-500 leading-tight italic mb-2">
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

                    <p className="text-base md:text-lg font-medium text-black leading-snug">
                      {project.mission}
                    </p>
                  </div>

                  {/* Role Section - Tasks Grid 2x2 */}
                  <div className="flex-[1.4] flex flex-col justify-center min-h-0">
                    <span className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase block mb-4 text-center">
                      Role
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.tasks.map((task, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (i * 0.05) }}
                          className="bg-white border border-zinc-200 p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow text-left"
                        >
                          <h3 className="text-sm font-black text-zinc-900 mb-1.5">{task.title}</h3>
                          <p className="text-xs font-medium text-zinc-600 leading-relaxed">{task.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll Down Button */}
                  <div className="flex justify-center pt-4 flex-shrink-0">
                    <button
                      onClick={scrollToBottom}
                      className="p-3 bg-zinc-200 hover:bg-zinc-300 rounded-full transition-all group"
                      title="See Challenge & Solution"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
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
                  className="absolute inset-0 p-8 md:p-12 flex flex-col text-center"
                >
                  {/* Scroll Up Button */}
                  <div className="flex justify-center pb-4 flex-shrink-0">
                    <button
                      onClick={scrollToTop}
                      className="p-3 bg-zinc-200 hover:bg-zinc-300 rounded-full transition-all group"
                      title="Back to Overview"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
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
                    <span className="text-[8px] font-black text-zinc-400 tracking-[0.3em] uppercase block mb-3">
                      Challenge
                    </span>
                    <p className="text-base md:text-lg font-medium text-black leading-snug">
                      {project.challenge}
                    </p>
                  </div>

                  {/* Solution Section */}
                  <div className="flex-1 flex flex-col justify-center min-h-0">
                    <span className="text-[8px] font-black text-zinc-400 tracking-[0.3em] uppercase block mb-3">
                      Solution
                    </span>
                    <p className="text-base md:text-lg font-medium text-black leading-snug">
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
