"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardSwapProps {
  children: ReactNode[];
  onIndexChange?: (index: number) => void;
  onCardClick?: (index: number) => void;
  activeIndex: number;
}

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`w-full h-full relative overflow-hidden rounded-sm border border-black shadow-2xl bg-white ${className}`}>
    {children}
  </div>
);

export default function CardSwap({ 
  children, 
  onIndexChange, 
  onCardClick,
  activeIndex 
}: CardSwapProps) {
  const total = children.length;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence initial={false}>
        {children.map((child, i) => {
          // Calcul de la position relative pour l'empilement
          const distance = (i - activeIndex + total) % total;
          const isActive = distance === 0;
          
          const zIndex = total - distance;
          const scale = 1 - distance * 0.08;
          const xOffset = distance * 25; 
          const yOffset = distance * -20;
          const opacity = 1 - distance * 0.4;

          return (
            <motion.div
              key={i}
              style={{
                zIndex,
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
              animate={{
                scale,
                x: xOffset,
                y: yOffset,
                opacity: Math.max(opacity, 0),
                filter: isActive ? "brightness(1)" : "brightness(0.6)",
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              onClick={() => onCardClick?.(i)}
              className="cursor-pointer"
            >
              {child}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}