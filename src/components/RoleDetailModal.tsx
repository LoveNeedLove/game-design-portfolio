"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Task } from "../data/projects";

interface RoleDetailModalProps {
  tasks: Task[];
  initialTaskIndex: number;
  onClose: () => void;
  accentColor?: string;
}

export default function RoleDetailModal({ tasks, initialTaskIndex, onClose, accentColor = "#3b82f6" }: RoleDetailModalProps) {
  const [activeTaskIndex, setActiveTaskIndex] = useState(initialTaskIndex);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeTask = tasks[activeTaskIndex];
  const illustrations = activeTask?.illustrations || [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && illustrations.length > 1) {
        setActiveImageIndex(prev => (prev - 1 + illustrations.length) % illustrations.length);
      }
      if (e.key === 'ArrowRight' && illustrations.length > 1) {
        setActiveImageIndex(prev => (prev + 1) % illustrations.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, illustrations.length]);

  // Reset image index when changing task
  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeTaskIndex]);

  // Filter tasks that have illustrations
  const tasksWithIllustrations = tasks.filter(t => t.illustrations && t.illustrations.length > 0);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col w-full max-w-[900px]"
        style={{ maxHeight: '85vh' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-2 hover:bg-zinc-100 rounded-full transition-all font-black text-zinc-500 hover:text-zinc-900"
          style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)' }}
        >
          [X]
        </button>

        {/* Header with role title */}
        <div
          className="flex-shrink-0 border-b border-zinc-100"
          style={{ padding: 'clamp(16px, 3vmin, 32px)' }}
        >
          <h2
            className="font-black text-zinc-900 leading-tight"
            style={{ fontSize: 'clamp(18px, 3vmin, 32px)' }}
          >
            {activeTask.title}
          </h2>
          <p
            className="text-zinc-600 mt-2 leading-relaxed"
            style={{ fontSize: 'clamp(12px, 1.8vmin, 18px)' }}
          >
            {activeTask.description}
          </p>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-hidden flex flex-col" style={{ padding: 'clamp(16px, 3vmin, 32px)' }}>
          {/* Image viewer */}
          {illustrations.length > 0 && (
            <div className="flex-1 min-h-0 flex flex-col">
              {/* Main image */}
              <div className="flex-1 min-h-0 bg-zinc-100 rounded-lg overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={illustrations[activeImageIndex].url}
                    alt={`Illustration ${activeImageIndex + 1}`}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>

                {/* Navigation arrows */}
                {illustrations.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev - 1 + illustrations.length) % illustrations.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev + 1) % illustrations.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </>
                )}

                {/* Image counter */}
                {illustrations.length > 1 && (
                  <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {activeImageIndex + 1} / {illustrations.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {illustrations.length > 1 && (
                <div
                  className="flex-shrink-0 flex gap-2 overflow-x-auto mt-3"
                  style={{ paddingBottom: '4px' }}
                >
                  {illustrations.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                        index === activeImageIndex
                          ? 'border-blue-500 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      style={{ width: 'clamp(60px, 10vmin, 100px)', aspectRatio: '16/9' }}
                    >
                      <img
                        src={item.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Other roles navigation */}
        {tasksWithIllustrations.length > 1 && (
          <div
            className="flex-shrink-0 border-t border-zinc-100 bg-zinc-50"
            style={{ padding: 'clamp(12px, 2vmin, 20px)' }}
          >
            <span
              className="font-black text-zinc-400 tracking-wider uppercase block mb-2"
              style={{ fontSize: 'clamp(8px, 1vmin, 11px)' }}
            >
              Other Roles
            </span>
            <div className="flex gap-2 overflow-x-auto">
              {tasksWithIllustrations.map((task, index) => {
                const originalIndex = tasks.findIndex(t => t === task);
                const isActive = originalIndex === activeTaskIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTaskIndex(originalIndex)}
                    className={`flex-shrink-0 px-3 py-2 rounded-md font-medium transition-all ${
                      isActive
                        ? 'bg-zinc-900 text-white'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-400'
                    }`}
                    style={{ fontSize: 'clamp(10px, 1.3vmin, 14px)' }}
                  >
                    {task.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
