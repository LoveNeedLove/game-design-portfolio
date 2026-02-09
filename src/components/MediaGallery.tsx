"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem } from '../data';

interface MediaGalleryProps {
  mediaList?: MediaItem[];
  onExpandChange?: (isExpanded: boolean) => void;
}

// Extended item for flattened list (includes slideshow children)
interface FlattenedItem {
  item: MediaItem;
  originalIndex: number;
  isSlideshow: boolean;
  isSlideshowChild: boolean;
  slideshowParentIndex?: number;
  childIndex?: number;
  totalChildren?: number;
}

export default function MediaGallery({ mediaList = [], onExpandChange }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [expandedSlideshows, setExpandedSlideshows] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Flatten the media list based on expanded slideshows
  const flattenedList = useMemo((): FlattenedItem[] => {
    const result: FlattenedItem[] = [];

    mediaList.forEach((item, originalIndex) => {
      if (item.type === 'slideshow' && item.images && item.images.length > 0) {
        // Add the slideshow folder itself
        result.push({
          item,
          originalIndex,
          isSlideshow: true,
          isSlideshowChild: false,
          totalChildren: item.images.length
        });

        // If expanded, add all children
        if (expandedSlideshows.has(originalIndex)) {
          item.images.forEach((imageUrl, childIndex) => {
            result.push({
              item: { type: 'image', url: imageUrl },
              originalIndex,
              isSlideshow: false,
              isSlideshowChild: true,
              slideshowParentIndex: originalIndex,
              childIndex,
              totalChildren: item.images!.length
            });
          });
        }
      } else {
        result.push({
          item,
          originalIndex,
          isSlideshow: false,
          isSlideshowChild: false
        });
      }
    });

    return result;
  }, [mediaList, expandedSlideshows]);

  const toggleSlideshow = (originalIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSlideshows(prev => {
      const next = new Set(prev);
      if (next.has(originalIndex)) {
        next.delete(originalIndex);
      } else {
        next.add(originalIndex);
      }
      return next;
    });
  };

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
  }, [flattenedList, isLightboxOpen, activeIndex]);

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
    onExpandChange?.(isLightboxOpen || isTheaterMode);
  }, [isLightboxOpen, isTheaterMode, onExpandChange]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [activeIndex, isLightboxOpen, isTheaterMode]);

  // Reset active index if it's out of bounds after collapse
  useEffect(() => {
    if (activeIndex >= flattenedList.length) {
      setActiveIndex(Math.max(0, flattenedList.length - 1));
    }
  }, [flattenedList.length, activeIndex]);

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isTheaterMode || isLightboxOpen) {
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

  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleNext = () => {
    // Skip slideshow folders when navigating
    let nextIndex = (activeIndex + 1) % flattenedList.length;
    while (flattenedList[nextIndex]?.isSlideshow && flattenedList.length > 1) {
      nextIndex = (nextIndex + 1) % flattenedList.length;
      if (nextIndex === activeIndex) break; // Prevent infinite loop
    }
    setActiveIndex(nextIndex);
  };

  const handlePrev = () => {
    // Skip slideshow folders when navigating
    let prevIndex = (activeIndex - 1 + flattenedList.length) % flattenedList.length;
    while (flattenedList[prevIndex]?.isSlideshow && flattenedList.length > 1) {
      prevIndex = (prevIndex - 1 + flattenedList.length) % flattenedList.length;
      if (prevIndex === activeIndex) break; // Prevent infinite loop
    }
    setActiveIndex(prevIndex);
  };

  if (!mediaList || mediaList.length === 0) return null;

  const activeFlattened = flattenedList[activeIndex];
  const activeMedia = activeFlattened?.item;

  // If active is a slideshow folder, show first image as preview
  const displayMedia = activeFlattened?.isSlideshow && activeMedia?.images?.[0]
    ? { type: 'image' as const, url: activeMedia.images[0] }
    : activeMedia;

  const renderMedia = (item: MediaItem | undefined, isContain: boolean = false) => {
    if (!item) return null;
    const cleanID = getYouTubeID(item.url);
    switch (item.type) {
      case 'youtube':
        return <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${cleanID}?autoplay=1&mute=1&modestbranding=1`} allowFullScreen />;
      case 'video':
        return <video className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'}`} src={item.url} autoPlay muted loop playsInline draggable={false} />;
      case 'iframe':
        return <iframe className="w-full h-full" src={item.url} allowFullScreen />;
      case 'slideshow':
        // Show first image as preview for slideshow
        if (item.images && item.images.length > 0) {
          return <img src={item.images[0]} className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'}`} alt="Slideshow preview" draggable={false} onDragStart={(e) => e.preventDefault()} />;
        }
        return null;
      default:
        return <img src={item.url} className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'}`} alt="Focus" draggable={false} onDragStart={(e) => e.preventDefault()} />;
    }
  };

  const renderThumbnail = (flattened: FlattenedItem, index: number, isLightbox: boolean = false) => {
    const { item, isSlideshow, isSlideshowChild, originalIndex, childIndex, totalChildren } = flattened;
    const isActive = activeIndex === index;

    if (isSlideshow) {
      // Render as folder
      const isExpanded = expandedSlideshows.has(originalIndex);
      return (
        <div
          key={`slideshow-${originalIndex}`}
          ref={(el) => { thumbRefs.current[index] = el; }}
          className={`flex-shrink-0 aspect-video rounded-sm overflow-hidden border-2 cursor-pointer transition-all relative ${
            isActive
              ? (isLightbox ? 'border-white scale-105' : 'border-blue-500 scale-105')
              : (isLightbox ? 'border-transparent opacity-50 hover:opacity-100' : 'border-transparent opacity-40 hover:opacity-100')
          }`}
          style={{ width: isLightbox ? '80px' : 'clamp(50px, 8vmin, 96px)' }}
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex(index);
          }}
        >
          {/* Folder background with first image */}
          <div className="absolute inset-0 bg-zinc-700">
            {item.images && item.images[0] && (
              <img
                src={item.images[0]}
                className="w-full h-full object-cover opacity-60"
                alt="Folder preview"
              />
            )}
          </div>

          {/* Folder overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-1">
            {/* Folder icon */}
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4 mb-0.5 drop-shadow"
            >
              <path d="M3 5c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5z"/>
            </svg>
            <span className="text-white text-[8px] font-bold drop-shadow">{totalChildren}</span>
          </div>

          {/* Expand/Collapse button */}
          <button
            onClick={(e) => toggleSlideshow(originalIndex, e)}
            className="absolute top-0.5 right-0.5 p-0.5 bg-black/60 hover:bg-black/80 rounded transition-all z-10"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            >
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      );
    }

    // Regular thumbnail or slideshow child
    return (
      <div
        key={isSlideshowChild ? `slideshow-${originalIndex}-child-${childIndex}` : `media-${index}`}
        ref={(el) => { thumbRefs.current[index] = el; }}
        onClick={(e) => {
          e.stopPropagation();
          setActiveIndex(index);
        }}
        className={`flex-shrink-0 aspect-video rounded-sm overflow-hidden border-2 cursor-pointer transition-all relative ${
          isActive
            ? (isLightbox ? 'border-white scale-105' : 'border-blue-500 scale-105')
            : (isLightbox ? 'border-transparent opacity-50 hover:opacity-100' : 'border-transparent opacity-40 hover:opacity-100')
        } ${isSlideshowChild ? 'ml-1' : ''}`}
        style={{
          width: isLightbox ? '80px' : 'clamp(50px, 8vmin, 96px)',
          backgroundColor: isLightbox ? '#27272a' : '#f4f4f5'
        }}
      >
        <img
          src={item.type === 'youtube' ? `https://img.youtube.com/vi/${getYouTubeID(item.url)}/mqdefault.jpg` : item.url}
          className="w-full h-full object-cover"
          alt={`Thumb ${index}`}
        />
        {/* Slideshow child indicator */}
        {isSlideshowChild && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] text-center py-0.5">
            {(childIndex ?? 0) + 1}/{totalChildren}
          </div>
        )}
      </div>
    );
  };

  const isYouTube = activeMedia?.type === 'youtube';
  const hideControls = isYouTube;

  return (
    <motion.div
      className={`flex flex-col w-full transition-all duration-300 ${isTheaterMode ? 'h-full' : ''}`}
      style={{ gap: 'clamp(4px, 0.8vmin, 10px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`bg-black rounded-sm border border-black/5 overflow-hidden flex items-center justify-center relative transition-all duration-300 ${isTheaterMode ? 'flex-1 min-h-0' : 'aspect-video flex-shrink-0'} group`}>
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
          {renderMedia(displayMedia, isTheaterMode)}
        </div>

        {/* Slideshow info overlay */}
        {activeFlattened?.isSlideshow && (
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white z-10">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M3 5c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5z"/>
              </svg>
              <span className="font-medium">{activeMedia?.title || 'Slideshow'}</span>
              <span className="text-white/60">({activeMedia?.images?.length} images)</span>
            </div>
            <p className="text-white/60 text-sm mt-1">Click the arrow on the thumbnail to expand</p>
          </div>
        )}

        {/* ICÔNES DISCRÈTES EN HAUT À DROITE */}
        {!hideControls && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/40 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-1.5 hover:bg-white/20 rounded transition-all"
              title="Fullscreen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            </button>
            <button
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className="p-1.5 hover:bg-white/20 rounded transition-all"
              title={isTheaterMode ? "Exit Theater Mode" : "Theater Mode"}
            >
              {isTheaterMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M8 11h6"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
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
      {flattenedList.length > 1 && (
        <div className="flex items-center flex-shrink-0" style={{ gap: 'clamp(4px, 0.8vmin, 12px)' }}>
          {/* FLÈCHE GAUCHE */}
          <button
            onClick={handlePrev}
            className="flex-shrink-0 hover:bg-zinc-100 rounded transition-all"
            style={{ padding: 'clamp(4px, 0.6vmin, 10px)' }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 'clamp(12px, 2vmin, 20px)', height: 'clamp(12px, 2vmin, 20px)' }}>
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* MINIATURES */}
          <div ref={scrollRef} className="flex overflow-x-auto overflow-y-hidden flex-1" style={{ gap: 'clamp(4px, 0.8vmin, 12px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {flattenedList.map((flattened, index) => renderThumbnail(flattened, index, false))}
          </div>

          {/* FLÈCHE DROITE */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 hover:bg-zinc-100 rounded transition-all"
            style={{ padding: 'clamp(4px, 0.6vmin, 10px)' }}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 'clamp(12px, 2vmin, 20px)', height: 'clamp(12px, 2vmin, 20px)' }}>
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

            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom/pan wrapper */}
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
                {/* Animation wrapper */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {renderMedia(displayMedia, true)}
                  </motion.div>
                </AnimatePresence>
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

            {flattenedList.length > 1 && (
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

                {/* BARRE DE MINIATURES EN BAS - cachée par défaut */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-40"
                  onMouseEnter={() => setShowThumbnails(true)}
                  onMouseLeave={() => setShowThumbnails(false)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Zone de détection hover */}
                  <div className="h-24" />

                  {/* Conteneur des miniatures */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                      y: showThumbnails ? 0 : 100,
                      opacity: showThumbnails ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="pb-6 px-4"
                  >
                    <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex gap-3 overflow-x-auto overflow-y-hidden justify-center" style={{ scrollbarWidth: 'thin' }}>
                        {flattenedList.map((flattened, index) => renderThumbnail(flattened, index, true))}
                      </div>
                    </div>
                    {/* Compteur d'images */}
                    <p className="text-center text-white/50 text-sm mt-2">
                      {activeFlattened?.isSlideshow
                        ? `Slideshow (${activeMedia?.images?.length} images)`
                        : `${activeIndex + 1} / ${flattenedList.length}`
                      }
                    </p>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
