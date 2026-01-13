"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le header sticky après avoir scrollé de 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pt-16 pb-12 px-6 max-w-6xl mx-auto"
      >
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
              Junior Game Designer
            </p>
          </div>

          {/* NAVIGATION SECONDAIRE */}
          <nav className="flex gap-8 text-[10px] font-black uppercase tracking-widest mt-8 md:mt-0">
            <a href="#featured" className="hover:line-through transition-all cursor-pointer">Projects</a>
            <a href="#about" className="hover:line-through transition-all cursor-pointer">About</a>
            <a href="#contact" className="hover:line-through transition-all text-zinc-400 cursor-pointer">Contact</a>
          </nav>
        </div>

        {/* LIGNE DE STRUCTURE NOIRE */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="h-[2px] bg-black"
        />
      </motion.header>

      {/* HEADER STICKY */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[150] bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-black uppercase tracking-tighter">
                ISMAIL BENKIRANE
              </h2>
              <nav className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                <a href="#about" className="hover:line-through transition-all cursor-pointer">About</a>
                <a href="#featured" className="hover:line-through transition-all cursor-pointer">Projects</a>
                <a href="#contact" className="hover:line-through transition-all text-zinc-400 cursor-pointer">Contact</a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}