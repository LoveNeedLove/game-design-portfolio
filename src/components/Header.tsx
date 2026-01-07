"use client";

import React from 'react';

export default function Header() {
  return (
    <header className="pt-16 pb-12 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-4">
        {/* IDENTITÉ : Style Pixel Art */}
        <div className="text-left">
          <h1 
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2" 
            style={{ fontFamily: '"Press Start 2P", "Courier New", monospace' }}
          >
            ISMAIL BENKIRANE
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
            Game Designer Junior
          </p>
        </div>

        {/* NAVIGATION SECONDAIRE */}
        <nav className="flex gap-8 text-[10px] font-black uppercase tracking-widest mt-8 md:mt-0">
          <a href="#featured" className="hover:line-through transition-all cursor-pointer">Projets</a>
          <a href="#about" className="hover:line-through transition-all cursor-pointer">À propos</a>
          <a href="#contact" className="hover:line-through transition-all text-zinc-400 cursor-pointer">Contact</a>
        </nav>
      </div>
      
      {/* LIGNE DE STRUCTURE NOIRE */}
      <div className="w-full h-[2px] bg-black" />
    </header>
  );
}