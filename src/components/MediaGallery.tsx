"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { MediaItem } from '../data/projects';

interface MediaGalleryProps {
  mediaList?: MediaItem[];
  onExpandChange?: (isExpanded: boolean) => void;
}

export default function MediaGallery({ mediaList = [], onExpandChange }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsTheaterMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mediaList, isLightboxOpen, activeIndex]);

  useEffect(() => {
    if (thumbRefs.current[activeIndex]) {
      thumbRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    onExpandChange?.(isLightboxOpen);
  }, [isLightboxOpen, onExpandChange]);

  // Gérer le mouseup global pour arrêter le drag même en dehors du conteneur
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  // Reset zoom when changing images or closing lightbox
  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [activeIndex, isLightboxOpen, isTheaterMode]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

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
      e.preventDefault(); // Empêche le drag natif de l'image
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isTheaterMode || isLightboxOpen) {
      e.preventDefault();

      const delta = e.deltaY > 0 ? -0.2 : 0.2;
      const rect = e.currentTarget.getBoundingClientRect();

      // Position de la souris dans le conteneur (0,0 au centre)
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      setZoomLevel(prev => {
        const newZoom = Math.max(1, Math.min(3, prev + delta));

        if (newZoom === 1) {
          setPanPosition({ x: 0, y: 0 });
        } else if (prev !== newZoom) {
          // Point dans l'image avant le zoom (en tenant compte du pan actuel)
          const imageX = (mouseX - panPosition.x) / prev;
          const imageY = (mouseY - panPosition.y) / prev;

          // Nouveau pan pour garder ce point sous la souris
          setPanPosition({
            x: mouseX - imageX * newZoom,
            y: mouseY - imageY * newZoom
          });
        }

        return newZoom;
      });
    }
  };

  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % mediaList.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);

  if (!mediaList || mediaList.length === 0) return null;

  const activeMedia = mediaList[activeIndex];

  const renderMedia = (item: MediaItem, isContain: boolean = false) => {
    if (!item) return null;
    const cleanID = getYouTubeID(item.url);
    switch (item.type) {
      case 'youtube':
        return <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${cleanID}?autoplay=1&mute=1&modestbranding=1`} allowFullScreen />;
      case 'video':
        return <video className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'}`} src={item.url} autoPlay muted loop playsInline draggable={false} />;
      case 'iframe':
        return <iframe className="w-full h-full" src={item.url} allowFullScreen />;
      default:
        return <img src={item.url} className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'}`} alt="Focus" draggable={false} onDragStart={(e) => e.preventDefault()} />;
    }
  };

  const isYouTube = activeMedia?.type === 'youtube';
  const hideControls = isYouTube;

  return (
    <motion.div
      className="flex flex-col w-full gap-4 transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`bg-black rounded-sm border border-black/5 overflow-hidden flex items-center justify-center relative transition-all duration-300 ${isTheaterMode ? 'min-h-[600px]' : 'aspect-video'} group`}>
        <div
          className={`absolute inset-0 select-none ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
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
          {renderMedia(activeMedia, isTheaterMode)}
        </div>

        {/* ICÔNES DISCRÈTES EN HAUT À DROITE (seulement si ce n'est pas YouTube) */}
        {!hideControls && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-2 transition-all"
              title="Fullscreen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="drop-shadow-lg">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            </button>
            <button
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className="p-2 transition-all"
              title={isTheaterMode ? "Exit Theater Mode" : "Theater Mode"}
            >
              {isTheaterMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="drop-shadow-lg">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M8 11h6"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="drop-shadow-lg">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              )}
            </button>
          </div>
        )}

        {/* CONTRÔLES DE ZOOM (quand en mode theater) */}
        {!hideControls && isTheaterMode && (
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full transition-all disabled:opacity-30"
              title="Zoom Out"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="drop-shadow-lg">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35M8 11h6"/>
              </svg>
            </button>
            <button
              onClick={handleZoomReset}
              className="px-3 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-bold hover:bg-black/70 transition-all cursor-pointer"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full transition-all disabled:opacity-30"
              title="Zoom In"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="drop-shadow-lg">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* BARRE DE MINIATURES AVEC FLÈCHES */}
      {mediaList.length > 1 && (
        <div className="flex items-center gap-3">
          {/* FLÈCHE GAUCHE */}
          <button
            onClick={handlePrev}
            className="flex-shrink-0 p-2 hover:bg-zinc-100 rounded transition-all"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* MINIATURES */}
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto overflow-y-hidden flex-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {mediaList.map((item, index) => (
              <div
                key={index}
                ref={(el) => { thumbRefs.current[index] = el; }}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 w-24 aspect-video bg-zinc-100 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${activeIndex === index ? 'border-blue-500 scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img
                  src={item.type === 'youtube' ? `https://img.youtube.com/vi/${getYouTubeID(item.url)}/mqdefault.jpg` : item.url}
                  className="w-full h-full object-cover"
                  alt={`Thumb ${index}`}
                />
              </div>
            ))}
          </div>

          {/* FLÈCHE DROITE */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 p-2 hover:bg-zinc-100 rounded transition-all"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}

      {/* LIGHTBOX MODE */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* BOUTON FERMER */}
            <button
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
              className="absolute top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="relative w-full h-full flex items-center justify-center max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
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
                {renderMedia(activeMedia, true)}
              </div>
            </div>

            {/* CONTRÔLES DE ZOOM EN FULLSCREEN */}
            <div className="absolute top-4 left-4 z-50 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all disabled:opacity-30"
                title="Zoom Out"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M8 11h6"/>
                </svg>
              </button>
              <button
                onClick={handleZoomReset}
                className="px-4 py-3 bg-white rounded-full shadow-lg text-sm font-bold hover:bg-zinc-100 transition-all cursor-pointer"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all disabled:opacity-30"
                title="Zoom In"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </button>
            </div>

            {mediaList.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                  aria-label="Previous"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                  aria-label="Next"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>

                {/* BARRE DE MINIATURES EN BAS */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-full px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex gap-3 overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'thin' }}>
                      {mediaList.map((item, index) => (
                        <div
                          key={index}
                          onClick={(e) => { e.stopPropagation(); setActiveIndex(index); }}
                          className={`flex-shrink-0 w-24 aspect-video bg-zinc-800 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${activeIndex === index ? 'border-white scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        >
                          <img
                            src={item.type === 'youtube' ? `https://img.youtube.com/vi/${getYouTubeID(item.url)}/mqdefault.jpg` : item.url}
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
    </motion.div>
  );
}