"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MediaItem } from '../data/projects';

interface MediaGalleryProps {
  mediaList?: MediaItem[];
}

export default function MediaGallery({ mediaList = [] }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Centrer la miniature active dans la barre de défilement
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

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % mediaList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  if (!mediaList || mediaList.length === 0) {
    return (
      <div className="w-full aspect-video bg-zinc-100 flex items-center justify-center border border-dashed border-zinc-200 rounded-sm text-zinc-400 font-mono text-[9px] uppercase tracking-widest">
        Données multimédia manquantes
      </div>
    );
  }

  const activeMedia = mediaList[activeIndex];

  const renderActiveMedia = (item: MediaItem) => {
    if (!item) return null;
    const cleanID = getYouTubeID(item.url);

    switch (item.type) {
      case 'youtube':
        return (
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${cleanID}?autoplay=1&mute=1&modestbranding=1&rel=0`}
            allow="autoplay; encrypted-media" 
            allowFullScreen
          />
        );
      case 'video':
        return (
          <video className="w-full h-full object-cover" src={item.url} autoPlay muted loop playsInline />
        );
      case 'iframe':
        return (
          <iframe className="w-full h-full border-none" src={item.url} />
        );
      default:
        return (
          <img src={item.url} className="w-full h-full object-cover" alt="Focus" />
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* LECTEUR PRINCIPAL AVEC FLÈCHES */}
      <div className="w-full aspect-video bg-black rounded-sm border border-black/5 overflow-hidden shadow-inner flex items-center justify-center relative group">
        {renderActiveMedia(activeMedia)}

        {/* FLÈCHES DE NAVIGATION (LOOP AROUND) */}
        {mediaList.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-4 z-20 p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 z-20 p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </>
        )}

        {/* INDICATEUR D'INDEX */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-sm px-2 py-1 rounded font-mono text-[8px] text-white/70 uppercase">
          Media {activeIndex + 1} / {mediaList.length}
        </div>
      </div>

      {/* RUBAN DE MINIATURES (AUTO-SCROLL) */}
      {mediaList.length > 1 && (
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 snap-x custom-scrollbar scroll-smooth"
        >
          {mediaList.map((item, index) => {
            const cleanID = getYouTubeID(item.url);
            return (
              <div 
                key={index} 
                ref={(el) => { thumbRefs.current[index] = el; }}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 w-24 md:w-32 aspect-video bg-zinc-100 rounded-sm overflow-hidden border-2 cursor-pointer snap-center transition-all relative
                  ${activeIndex === index ? 'border-black opacity-100 scale-105 z-10 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}
                `}
              >
                <img 
                  src={item.type === 'youtube' ? `https://img.youtube.com/vi/${cleanID}/mqdefault.jpg` : item.url} 
                  className="w-full h-full object-cover" 
                  alt={`Thumbnail ${index}`}
                />
              </div>
            );
          })}
        </div>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8f8f8; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
      `}</style>
    </div>
  );
}