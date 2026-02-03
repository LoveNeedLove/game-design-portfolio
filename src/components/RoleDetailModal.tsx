"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Task, ContentBlock } from "../data";

interface RoleDetailModalProps {
  tasks: Task[];
  initialTaskIndex: number;
  onClose: () => void;
  accentColor?: string;
}

export default function RoleDetailModal({ tasks, initialTaskIndex, onClose, accentColor = "#3b82f6" }: RoleDetailModalProps) {
  const [activeTaskIndex, setActiveTaskIndex] = useState(initialTaskIndex);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeTask = tasks[activeTaskIndex];
  const contentBlocks = activeTask?.content || [];

  // Get all images from content for navigation in fullscreen
  const allImages = contentBlocks.filter(b => b.type === 'image').map(b => b.url!);
  const currentImageIndex = selectedImageUrl ? allImages.indexOf(selectedImageUrl) : -1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImageUrl) {
          setSelectedImageUrl(null);
        } else {
          onClose();
        }
      }
      if (selectedImageUrl && allImages.length > 1) {
        if (e.key === 'ArrowLeft') {
          const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
          setSelectedImageUrl(allImages[newIndex]);
        }
        if (e.key === 'ArrowRight') {
          const newIndex = (currentImageIndex + 1) % allImages.length;
          setSelectedImageUrl(allImages[newIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, selectedImageUrl, allImages, currentImageIndex]);

  // Global mouseup handler
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  // Reset zoom when changing images
  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedImageUrl]);

  // Reset scroll when changing task
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTaskIndex]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPanPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };
  const handleZoomReset = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (selectedImageUrl) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.2 : 0.2;
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      setZoomLevel(prev => {
        const newZoom = Math.max(1, Math.min(3, prev + delta));
        if (newZoom === 1) {
          setPanPosition({ x: 0, y: 0 });
        } else if (prev !== newZoom) {
          const imageX = (mouseX - panPosition.x) / prev;
          const imageY = (mouseY - panPosition.y) / prev;
          setPanPosition({
            x: mouseX - imageX * newZoom,
            y: mouseY - imageY * newZoom
          });
        }
        return newZoom;
      });
    }
  };

  const handlePrevImage = () => {
    if (allImages.length > 1) {
      const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
      setSelectedImageUrl(allImages[newIndex]);
    }
  };

  const handleNextImage = () => {
    if (allImages.length > 1) {
      const newIndex = (currentImageIndex + 1) % allImages.length;
      setSelectedImageUrl(allImages[newIndex]);
    }
  };

  // Filter tasks that have content
  const tasksWithContent = tasks.filter(t => (t.content && t.content.length > 0) || (t.illustrations && t.illustrations.length > 0));

  // Render a content block
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        return (
          <motion.div
            key={`heading-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-6"
          >
            <h3
              className="font-black text-white/90 leading-tight"
              style={{ fontSize: 'clamp(24px, 4vmin, 42px)' }}
            >
              {block.content}
            </h3>
          </motion.div>
        );

      case 'text':
        // Variant styles for magazine feel
        const variantStyles = {
          accent: 'text-white/90 font-semibold border-l-4 border-white/40 pl-6',
          quote: 'text-white/80 italic border-l-4 border-white/20 pl-6 text-lg',
          highlight: 'bg-white/5 rounded-xl p-6 text-white/80',
          default: 'text-white/70'
        };
        const textVariant = block.variant || 'default';

        return (
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            <p
              className={`leading-relaxed ${variantStyles[textVariant]}`}
              style={{ fontSize: textVariant === 'quote' ? 'clamp(16px, 2.5vmin, 22px)' : 'clamp(14px, 2vmin, 18px)' }}
            >
              {block.content}
            </p>
          </motion.div>
        );

      case 'list':
        return (
          <motion.div
            key={`list-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            {block.content && (
              <h4
                className="font-bold text-white/90 mb-4"
                style={{ fontSize: 'clamp(16px, 2.2vmin, 22px)' }}
              >
                {block.content}
              </h4>
            )}
            <ul className="space-y-3">
              {block.items?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/70"
                  style={{ fontSize: 'clamp(13px, 1.8vmin, 16px)' }}
                >
                  <span className="text-white/40 mt-1.5 text-lg">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );

      case 'image':
        return (
          <motion.div
            key={`image-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            <div
              className="relative rounded-xl overflow-hidden bg-zinc-800 cursor-pointer group"
              onClick={() => setSelectedImageUrl(block.url!)}
            >
              <img
                src={block.url}
                alt=""
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-md rounded-full p-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[300]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />

      {/* Full screen container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full flex flex-col"
      >
        {/* Fixed header */}
        <div className="flex-shrink-0 relative z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div
            className="flex items-start justify-between"
            style={{ padding: 'clamp(20px, 4vmin, 48px)' }}
          >
            <div className="max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-black text-white leading-tight"
                style={{ fontSize: 'clamp(24px, 5vmin, 56px)' }}
              >
                {activeTask.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/70 mt-3 leading-relaxed max-w-2xl"
                style={{ fontSize: 'clamp(14px, 2vmin, 20px)' }}
              >
                {activeTask.description}
              </motion.p>
            </div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              onClick={onClose}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white font-black backdrop-blur-sm"
              style={{ fontSize: 'clamp(12px, 1.8vmin, 18px)' }}
            >
              [X]
            </motion.button>
          </div>

          {/* Other roles navigation */}
          {tasksWithContent.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pb-4 flex gap-2 overflow-x-auto"
              style={{ paddingLeft: 'clamp(20px, 4vmin, 48px)', paddingRight: 'clamp(20px, 4vmin, 48px)' }}
            >
              {tasksWithContent.map((task, index) => {
                const originalIndex = tasks.findIndex(t => t === task);
                const isActive = originalIndex === activeTaskIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTaskIndex(originalIndex)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all backdrop-blur-sm ${
                      isActive
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                    }`}
                    style={{ fontSize: 'clamp(11px, 1.4vmin, 15px)' }}
                  >
                    {task.title}
                  </button>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Scrollable content - Magazine layout */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden"
        >
          <div
            className="max-w-6xl mx-auto"
            style={{
              padding: 'clamp(16px, 4vmin, 48px)',
              paddingTop: '0'
            }}
          >
            {/* Magazine grid layout */}
            <div className="grid grid-cols-12 gap-6">
              {contentBlocks.map((block, index) => {
                // Determine column span based on size
                const sizeClasses = {
                  full: 'col-span-12',
                  large: 'col-span-12 md:col-span-8',
                  medium: 'col-span-12 md:col-span-6',
                  small: 'col-span-12 md:col-span-4'
                };
                const colSpan = sizeClasses[block.size || 'full'];

                // Determine alignment/offset
                const alignmentClasses = {
                  left: '',
                  center: block.size === 'large' ? 'md:col-start-3' : block.size === 'medium' ? 'md:col-start-4' : block.size === 'small' ? 'md:col-start-5' : '',
                  right: block.size === 'large' ? 'md:col-start-5' : block.size === 'medium' ? 'md:col-start-7' : block.size === 'small' ? 'md:col-start-9' : ''
                };
                const alignClass = alignmentClasses[block.align || 'left'];

                return (
                  <div key={index} className={`${colSpan} ${alignClass}`}>
                    {renderContentBlock(block, index)}
                  </div>
                );
              })}
            </div>

            {/* Fallback: show illustrations if no content blocks */}
            {contentBlocks.length === 0 && activeTask.illustrations && activeTask.illustrations.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTask.illustrations.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="relative rounded-xl overflow-hidden bg-zinc-800 cursor-pointer group"
                    onClick={() => setSelectedImageUrl(img.url)}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </motion.div>
                ))}
              </div>
            )}

            <div style={{ height: 'clamp(40px, 8vmin, 100px)' }} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
      </motion.div>

      {/* Fullscreen image viewer with zoom controls */}
      <AnimatePresence>
        {selectedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImageUrl(null)}
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImageUrl(null); }}
              className="absolute top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Zoom controls */}
            <div className="absolute top-4 left-4 z-50 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all disabled:opacity-30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M8 11h6"/>
                </svg>
              </button>
              <button
                onClick={handleZoomReset}
                className="px-4 py-3 bg-white rounded-full shadow-lg text-sm font-bold hover:bg-zinc-100 transition-all cursor-pointer"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all disabled:opacity-30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </button>
            </div>

            {/* Image container with zoom and pan */}
            <div
              className="relative w-full h-full flex items-center justify-center max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`w-full h-full flex items-center justify-center select-none ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                <img
                  src={selectedImageUrl}
                  alt="Full size"
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* Navigation arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>

                {/* Thumbnails bar */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-full px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex gap-3 overflow-x-auto overflow-y-hidden justify-center" style={{ scrollbarWidth: 'thin' }}>
                      {allImages.map((url, index) => (
                        <div
                          key={index}
                          onClick={(e) => { e.stopPropagation(); setSelectedImageUrl(url); }}
                          className={`flex-shrink-0 w-20 aspect-video bg-zinc-800 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${
                            selectedImageUrl === url
                              ? 'border-white scale-105'
                              : 'border-transparent opacity-50 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={url}
                            className="w-full h-full object-cover"
                            alt={`Thumb ${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
