"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../data";
import MediaGallery from "./MediaGallery";
import RoleDetailModal from "./RoleDetailModal";
import Folder from "../animations/Folder";

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
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number | null>(null);
  const [rolesPage, setRolesPage] = useState(0);

  // Pagination for roles grid (2x2 = 4 per page)
  const ROLES_PER_PAGE = 4;
  const totalRolesPages = Math.ceil(project.tasks.length / ROLES_PER_PAGE);
  const currentPageRoles = project.tasks.slice(
    rolesPage * ROLES_PER_PAGE,
    (rolesPage + 1) * ROLES_PER_PAGE
  );

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
          style={{ fontSize: 'clamp(8px, 1.4vmin, 16px)' }}
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
              style={{ padding: 'clamp(12px, 3vmin, 40px)', gap: 'clamp(8px, 2vmin, 24px)' }}
            >
              {/* Title */}
              <div className="flex flex-col flex-shrink-0" style={{ gap: 'clamp(4px, 1.2vmin, 16px)' }}>
                <h2
                  className="font-black uppercase italic leading-tight tracking-tighter"
                  style={{ fontSize: 'clamp(16px, 4.5vmin, 56px)' }}
                >
                  {project.title}
                </h2>

                {/* Genres with Date on the right */}
                <div className="flex items-center justify-between flex-wrap" style={{ gap: 'clamp(4px, 1vmin, 12px)' }}>
                  <div className="flex flex-wrap" style={{ gap: 'clamp(2px, 0.6vmin, 8px)' }}>
                    {project.genres.map((genre, i) => (
                      <span
                        key={i}
                        className="bg-zinc-100 text-zinc-800 font-bold uppercase tracking-wider rounded-sm"
                        style={{
                          fontSize: 'clamp(7px, 1.2vmin, 14px)',
                          padding: 'clamp(2px, 0.5vmin, 6px) clamp(4px, 1vmin, 14px)'
                        }}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <span
                    className="font-mono text-zinc-400 whitespace-nowrap"
                    style={{ fontSize: 'clamp(8px, 1.3vmin, 16px)' }}
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
                  <div className="flex-shrink-0 flex flex-col items-center" style={{ marginTop: 'clamp(10px, 2.5vmin, 30px)' }}>
                    {/* Ligne séparatrice */}
                    <div
                      className="bg-zinc-200 rounded-full"
                      style={{
                        width: '90%',
                        height: 'clamp(1px, 0.25vmin, 3px)',
                        marginBottom: 'clamp(10px, 2.5vmin, 30px)'
                      }}
                    />
                    <div className="w-full">
                      <span
                        className="font-black text-zinc-400 tracking-[0.3em] uppercase block"
                        style={{ fontSize: 'clamp(6px, 1.1vmin, 13px)', marginBottom: 'clamp(2px, 0.6vmin, 8px)' }}
                      >
                        Description
                      </span>
                      <p
                        className="text-zinc-600 font-medium leading-relaxed italic"
                        style={{ fontSize: 'clamp(9px, 1.3vmin, 14px)' }}
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
                style={{ padding: 'clamp(12px, 3vmin, 36px)' }}
              >
                <a
                  href={project.linkUrl}
                  target="_blank"
                  className="block w-full bg-black text-white text-center font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)]"
                  style={{
                    fontSize: 'clamp(7px, 1.2vmin, 14px)',
                    padding: 'clamp(8px, 2vmin, 24px) 0'
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
                  initial={{ y: '-100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col text-center overflow-hidden"
                  style={{ padding: 'clamp(12px, 3vmin, 48px)' }}
                >
                  {/* Context Section */}
                  <div className="flex-shrink-0 flex flex-col justify-center" style={{ marginTop: 'clamp(20px, 5vmin, 70px)' }}>
                    <span
                      className="font-black text-zinc-400 tracking-[0.3em] uppercase block"
                      style={{ fontSize: 'clamp(6px, 1vmin, 13px)', marginBottom: 'clamp(2px, 0.6vmin, 8px)' }}
                    >
                      Context
                    </span>

                    {/* Team Composition and Development Time */}
                    <p
                      className="font-medium text-zinc-500 leading-tight italic"
                      style={{ fontSize: 'clamp(8px, 1.3vmin, 16px)', marginBottom: 'clamp(2px, 0.6vmin, 8px)' }}
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
                      style={{ fontSize: 'clamp(10px, 1.8vmin, 24px)' }}
                    >
                      {project.mission}
                    </p>
                  </div>

                  {/* Role Section - Vertical by default, grid when space limited */}
                  <div className="flex-1 flex flex-col min-h-0 overflow-visible" style={{ marginTop: 'clamp(10px, 2.5vmin, 36px)' }}>
                    <span
                      className="font-black text-zinc-400 tracking-[0.3em] uppercase block text-center flex-shrink-0"
                      style={{ fontSize: 'clamp(6px, 1.1vmin, 13px)', marginBottom: 'clamp(8px, 2vmin, 24px)' }}
                    >
                      Role
                    </span>
                    <div className="flex flex-1 min-h-0 items-stretch overflow-visible" style={{ gap: 'clamp(4px, 0.8vmin, 12px)' }}>
                      {/* Previous page button */}
                      {totalRolesPages > 1 && (
                        <button
                          onClick={() => setRolesPage(p => Math.max(0, p - 1))}
                          disabled={rolesPage === 0}
                          className={`flex-shrink-0 rounded-full transition-all ${
                            rolesPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-200'
                          }`}
                          style={{ padding: 'clamp(4px, 0.8vmin, 10px)' }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-zinc-600"
                            style={{ width: 'clamp(12px, 2vmin, 24px)', height: 'clamp(12px, 2vmin, 24px)' }}
                          >
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>
                      )}

                      {/* 2x2 Grid - Row by row for sibling hover effect */}
                      <div
                        className="flex flex-col flex-1 min-h-0 justify-around items-center overflow-visible"
                        style={{ padding: 'clamp(4px, 1vmin, 12px)', gap: 'clamp(8px, 1.5vmin, 20px)' }}
                      >
                        {[0, 1].map(rowIndex => {
                          const rowRoles = currentPageRoles.slice(rowIndex * 2, rowIndex * 2 + 2);
                          return (
                            <div
                              key={rowIndex}
                              className="flex flex-row justify-center items-center group/row"
                              style={{ gap: 'clamp(80px, 15vmin, 180px)' }}
                            >
                              {rowRoles.map((task, colIndex) => {
                                const i = rowIndex * 2 + colIndex;
                                const globalIndex = rolesPage * ROLES_PER_PAGE + i;
                                const hasIllustrations = task.illustrations && task.illustrations.length > 0;
                                const isLeftColumn = colIndex === 0;

                                const folderItems = hasIllustrations && task.illustrations
                                  ? task.illustrations.map((img, imgIndex) => (
                                      <img
                                        key={imgIndex}
                                        src={img.type === 'image' ? img.url : img.thumbnail || '/placeholder.jpg'}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    ))
                                  : [];

                                return (
                                  <motion.div
                                    key={globalIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 + (i * 0.03) }}
                                    onClick={() => setSelectedRoleIndex(globalIndex)}
                                    className={`relative cursor-pointer group-hover/row:opacity-60 group-hover/row:scale-95 hover:!opacity-100 hover:!scale-100 hover:!z-10 transition-all duration-300 group/role ${
                                      isLeftColumn
                                        ? 'group-hover/row:-translate-x-16 hover:!-translate-x-24'
                                        : 'group-hover/row:translate-x-16 hover:!translate-x-24'
                                    }`}
                                  >
                                    {/* Zone de détection: petite par défaut, s'étend vers le texte au hover */}
                                    <div
                                      className="absolute inset-0 group-hover/row:pointer-events-none group-hover/role:!pointer-events-auto"
                                    />
                                    <div
                                      className={`absolute pointer-events-none group-hover/role:pointer-events-auto ${
                                        isLeftColumn ? 'left-full' : 'right-full'
                                      }`}
                                      style={{
                                        width: 'clamp(150px, 28vmin, 300px)',
                                        top: '-20px',
                                        bottom: '-20px'
                                      }}
                                    />
                                    <div className="transition-all duration-300">
                                      <Folder
                                        color="#e4e4e7"
                                        size={1.5}
                                        items={folderItems}
                                        label={task.title}
                                      />
                                    </div>
                                    <div
                                      className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 opacity-0 group-hover/role:opacity-100 ${
                                        isLeftColumn
                                          ? 'left-full text-left ml-8 translate-x-0 group-hover/role:translate-x-4'
                                          : 'right-full text-right mr-8 translate-x-0 group-hover/role:-translate-x-4'
                                      }`}
                                      style={{ width: 'clamp(100px, 20vmin, 220px)' }}
                                    >
                                      <p
                                        className={`text-zinc-800 font-bold leading-snug ${isLeftColumn ? 'text-left' : 'text-right'}`}
                                        style={{ fontSize: 'clamp(8px, 1.5vmin, 14px)', marginBottom: 'clamp(2px, 0.5vmin, 6px)' }}
                                      >
                                        {task.title}
                                      </p>
                                      <p
                                        className={`text-zinc-600 leading-snug ${isLeftColumn ? 'text-left' : 'text-right'}`}
                                        style={{ fontSize: 'clamp(6px, 1.2vmin, 12px)' }}
                                      >
                                        {task.description}
                                      </p>
                                      <span
                                        className={`text-zinc-400 block mt-1 ${isLeftColumn ? 'text-left' : 'text-right'}`}
                                        style={{ fontSize: 'clamp(5px, 1vmin, 10px)' }}
                                      >
                                        (click to view)
                                      </span>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>

                      {/* Next page button */}
                      {totalRolesPages > 1 && (
                        <button
                          onClick={() => setRolesPage(p => Math.min(totalRolesPages - 1, p + 1))}
                          disabled={rolesPage === totalRolesPages - 1}
                          className={`flex-shrink-0 rounded-full transition-all ${
                            rolesPage === totalRolesPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-200'
                          }`}
                          style={{ padding: 'clamp(4px, 0.8vmin, 10px)' }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-zinc-600"
                            style={{ width: 'clamp(12px, 2vmin, 24px)', height: 'clamp(12px, 2vmin, 24px)' }}
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Scroll Down Button */}
                  <div className="flex justify-center flex-shrink-0" style={{ paddingTop: 'clamp(6px, 1.5vmin, 20px)' }}>
                    <button
                      onClick={scrollToBottom}
                      className="bg-zinc-200 hover:bg-zinc-300 rounded-full transition-all group"
                      title="See Challenge & Solution"
                      style={{ padding: 'clamp(6px, 1.5vmin, 18px)' }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
                        style={{ width: 'clamp(10px, 2.2vmin, 24px)', height: 'clamp(10px, 2.2vmin, 24px)' }}
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
                  style={{ padding: 'clamp(12px, 3vmin, 48px)' }}
                >
                  {/* Scroll Up Button */}
                  <div className="flex justify-center flex-shrink-0" style={{ paddingBottom: 'clamp(6px, 1.5vmin, 20px)' }}>
                    <button
                      onClick={scrollToTop}
                      className="bg-zinc-200 hover:bg-zinc-300 rounded-full transition-all group"
                      title="Back to Overview"
                      style={{ padding: 'clamp(6px, 1.5vmin, 18px)' }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
                        style={{ width: 'clamp(10px, 2.2vmin, 24px)', height: 'clamp(10px, 2.2vmin, 24px)' }}
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
                      style={{ fontSize: 'clamp(6px, 1.1vmin, 13px)', marginBottom: 'clamp(4px, 1vmin, 14px)' }}
                    >
                      Challenge
                    </span>
                    <p
                      className="font-medium text-black leading-snug"
                      style={{ fontSize: 'clamp(10px, 1.8vmin, 24px)' }}
                    >
                      {project.challenge}
                    </p>
                  </div>

                  {/* Solution Section */}
                  <div className="flex-1 flex flex-col justify-center min-h-0">
                    <span
                      className="font-black text-zinc-400 tracking-[0.3em] uppercase block"
                      style={{ fontSize: 'clamp(6px, 1.1vmin, 13px)', marginBottom: 'clamp(4px, 1vmin, 14px)' }}
                    >
                      Solution
                    </span>
                    <p
                      className="font-medium text-black leading-snug"
                      style={{ fontSize: 'clamp(10px, 1.8vmin, 24px)' }}
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

      {/* Role Detail Modal */}
      <AnimatePresence>
        {selectedRoleIndex !== null && (
          <RoleDetailModal
            tasks={project.tasks}
            initialTaskIndex={selectedRoleIndex}
            onClose={() => setSelectedRoleIndex(null)}
            accentColor={project.bannerColor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
