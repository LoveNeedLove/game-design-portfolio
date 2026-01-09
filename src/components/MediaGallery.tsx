"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { MediaItem } from '../data/projects';

interface MediaGalleryProps {
  mediaList?: MediaItem[];
}

export default function MediaGallery({ mediaList = [] }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
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
        return <video className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'}`} src={item.url} autoPlay muted loop playsInline />;
      default:
        return <img src={item.url} className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'}`} alt="Focus" />;
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-4 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`bg-black rounded-sm border border-black/5 overflow-hidden flex items-center justify-center relative aspect-video transition-all duration-300 ${isTheaterMode ? 'min-h-[400px]' : ''}`}>
        <div className="absolute inset-0">
          {renderMedia(activeMedia, isTheaterMode)}
        </div>
      </div>

      {mediaList.length > 1 && (
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
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
      )}
    </motion.div>
  );
}