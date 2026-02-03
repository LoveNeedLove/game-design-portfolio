"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { projects, Project, MediaItem } from "../data";
import Header from "../components/Header";
import ProjectModal from "../components/ProjectModal";
import CardSwap, { Card } from "../animations/CardSwap";

const getYouTubeID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

// Animation accélérée (0.4s)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

// Variable pour contrôler l'arrondi des coins des images
const IMAGE_BORDER_RADIUS = 12; // en pixels

// Paramètres pour l'effet de dock/propulsion
const DOCK_CONFIG = {
  hoverScale: 1.3,        // Scale de l'élément survolé
  adjacentScale: 0.8,     // Scale des éléments adjacents (même ligne)
  gridGap: 32,            // Gap entre les éléments (en px) - correspond au gap-8 de Tailwind
  // Calcul de la distance horizontale : expansion de l'élément + rétrécissement de l'adjacent + gap existant
  getHorizontalPushDistance: (elementWidth: number) => {
    const hoveredExpansion = elementWidth * (DOCK_CONFIG.hoverScale - 1) / 2; // expansion d'un côté
    const adjacentShrink = elementWidth * (1 - DOCK_CONFIG.adjacentScale) / 2; // rétrécissement d'un côté
    // L'élément du milieu doit compenser l'expansion du survolé, son propre rétrécissement, et maintenir le gap
    return hoveredExpansion + adjacentShrink + DOCK_CONFIG.gridGap;
  },
  // Calcul de la distance verticale : expansion de l'élément + le gap existant
  getVerticalPushDistance: (elementHeight: number) => {
    const expansion = elementHeight * (DOCK_CONFIG.hoverScale - 1) / 2; // expansion d'un côté (haut ou bas)
    // Les lignes adjacentes doivent s'éloigner pour maintenir le gap + compenser l'expansion
    return expansion + DOCK_CONFIG.gridGap;
  }
};

// Composant ProjectGridItem avec carousel d'images
function ProjectGridItem({
  project,
  onClick,
  isHovered,
  onHoverChange,
  columnIndex,
  rowIndex,
  hoveredRowIndex,
  hoveredColumnIndex,
  sameRow
}: {
  project: Project;
  onClick: () => void;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  columnIndex: number;
  rowIndex: number;
  hoveredRowIndex: number | null;
  hoveredColumnIndex: number | null;
  sameRow: boolean;
}) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Créer la liste des médias avec la cover image en premier
  const mediaList = [
    { type: 'image' as const, url: project.coverImage },
    ...project.mediaList
  ];

  // Faire défiler les images quand on hover (plus lent)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && mediaList.length > 1) {
      interval = setInterval(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
      }, 1500); // Ralenti à 1.5 secondes
    } else {
      setCurrentMediaIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, mediaList.length]);

  const currentMedia = mediaList[currentMediaIndex];
  const isYouTube = currentMedia.type === 'youtube';

  // Déterminer l'origine de transformation en fonction de la colonne
  // Utilise 'center' pour le container, l'alignement des images se fera via leur propre transform
  const getTransformOrigin = () => {
    if (columnIndex === 0) return 'left center';
    if (columnIndex === 2) return 'right center';
    return 'center center';
  };

  // Calculer l'effet de proximité (dock-like effect)
  const getProximityEffect = () => {
    // Push vertical : se déclenche dès qu'une ligne est survolée (même entre les projets)
    if (hoveredRowIndex !== null && rowIndex !== hoveredRowIndex) {
      // Lignes différentes de celle survolée : augmenter l'espace vertical et rétrécir
      const estimatedHeight = 225;
      const verticalDistance = DOCK_CONFIG.getVerticalPushDistance(estimatedHeight);

      if (rowIndex < hoveredRowIndex) {
        // Ligne au-dessus : pousser vers le haut et rétrécir
        return { scale: 0.9, x: 0, y: -verticalDistance, opacity: 0.8 };
      } else {
        // Ligne en-dessous : pousser vers le bas et rétrécir
        return { scale: 0.9, x: 0, y: verticalDistance, opacity: 0.8 };
      }
    }

    // Effets horizontaux : uniquement quand un projet spécifique est survolé
    if (hoveredColumnIndex !== null && sameRow) {
      const distance = Math.abs(columnIndex - hoveredColumnIndex);

      if (distance === 0) {
        // C'est le projet survolé
        return { scale: DOCK_CONFIG.hoverScale, x: 0, y: 0, opacity: 1 };
      } else {
        // Autres projets de la même ligne
        if (columnIndex === 1) {
          // L'élément du milieu se déplace en fonction de quel côté est survolé
          const estimatedWidth = 400;
          const pushDistance = DOCK_CONFIG.getHorizontalPushDistance(estimatedWidth);

          const direction = hoveredColumnIndex === 0 ? 1 : -1;
          return { scale: DOCK_CONFIG.adjacentScale, x: direction * pushDistance, y: 0, opacity: 0.7 };
        } else {
          // Les éléments aux extrémités ne se déplacent pas horizontalement mais ont le même scale
          return { scale: DOCK_CONFIG.adjacentScale, x: 0, y: 0, opacity: 0.7 };
        }
      }
    }

    // Si la ligne est survolée mais pas de projet spécifique, agrandir légèrement
    if (hoveredRowIndex !== null && rowIndex === hoveredRowIndex) {
      return { scale: 1, x: 0, y: 0, opacity: 1 };
    }

    // État par défaut : taille réduite
    return { scale: 0.92, x: 0, y: 0, opacity: 1 };
  };

  const proximityEffect = getProximityEffect();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      animate={{
        scale: proximityEffect.scale,
        x: proximityEffect.x,
        y: proximityEffect.y,
        zIndex: isHovered ? 10 : 1
      }}
      style={{
        transformOrigin: getTransformOrigin(),
        position: 'relative',
        willChange: 'transform',
        opacity: proximityEffect.opacity
      }}
      transition={{
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        scale: { duration: 0.5 },
        x: { duration: 0.6 },
        y: { duration: 0.6 }
      }}
      onClick={onClick}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="cursor-pointer group"
    >
      {/* Image du projet avec carousel */}
      <div
        className="relative w-full bg-zinc-100 overflow-hidden mb-4"
        style={{
          aspectRatio: '8/5',
          borderRadius: `${IMAGE_BORDER_RADIUS}px`,
          transformOrigin: 'center bottom'
        }}
      >
        {/* Afficher toutes les images en absolu, une seule visible à la fois */}
        {mediaList.map((media, index) => {
          const mediaIsYouTube = media.type === 'youtube';
          const mediaUrl = mediaIsYouTube
            ? `https://img.youtube.com/vi/${getYouTubeID(media.url)}/mqdefault.jpg`
            : media.url;

          return (
            <motion.img
              key={index}
              src={mediaUrl}
              alt={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentMediaIndex ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          );
        })}

        {/* Overlay sombre au hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Logo YouTube si c'est une vidéo */}
        {isYouTube && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            ▶ YouTube
          </div>
        )}
      </div>

      {/* Conteneur de texte avec rendu optimisé */}
      <div
        style={{
          WebkitFontSmoothing: 'subpixel-antialiased',
          textRendering: 'geometricPrecision'
        }}
      >
        {/* Date et Genres */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">
            {project.date}
          </span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {project.genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Titre du projet */}
        <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all mb-3">
          {project.shortDescription}
        </p>

        {/* Roles */}
        <p className="text-xs font-mono text-zinc-400">
          Roles: {project.roles.join(', ')}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [triggerNext, setTriggerNext] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [hoveredProjectInfo, setHoveredProjectInfo] = useState<{
    id: string;
    rowIndex: number;
    columnIndex: number;
  } | null>(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  // Helper function to parse date strings like "Month Year" into comparable Date objects
  const parseDate = (dateStr: string): Date => {
    const [month, year] = dateStr.split(' ');
    const monthIndex = new Date(Date.parse(month + " 1, 2000")).getMonth();
    return new Date(parseInt(year), monthIndex);
  };

  // Sort projects by date (most recent first)
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Filter featured missions and sort them by date as well
  const featuredMissions = sortedProjects.filter((p) => p.featured);

  // Helper function to determine if a color is dark
  const isColorDark = (hexColor: string): boolean => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
        {/* ABOUT SECTION */}
        <section id="about" className="py-24 border-b border-zinc-100">
          <div className="pl-12 pr-6 max-w-6xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-5xl font-black text-zinc-800 uppercase tracking-wider mb-12"
            >
              About Me
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-zinc-800">
                Welcome! I am a Game Designer dedicated to crafting deep, systemic experiences with a focus on User Experience and Economy Design. I believe games are at their best when they foster connection—whether through community-driven gameplay or seamless collaborative development.
                <br /><br />
                I am driven by a desire to translate ambitious creative visions into polished reality, utilizing a diverse toolkit to balance complex systems with intuitive feel.
                <br /><br />
                Currently, I am honing my craft at Isart Digital, Paris.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION FEATURED */}
      <section
        id="featured"
        className="relative pt-2 pb-12 overflow-hidden"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-black text-zinc-800 uppercase tracking-wider mt-16 mb-0 pl-12 pr-6 italic"
        >
          Featured Projects
        </motion.h2>

        {/* Conteneur principal avec la bannière et les fenêtres liées */}
        <div className="px-6 mx-auto overflow-visible relative z-10 w-full -mt-8" style={{ maxWidth: '1600px' }}>
          {/* BANNIÈRE DE COULEUR - confinée au conteneur */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-full transition-colors duration-700"
            style={{ height: '280px' }}
            animate={{
              backgroundColor: featuredMissions[activeCardIndex].bannerColor
            }}
          />

          {/* Bouton Next - dans le coin en bas à droite de la bannière */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none" style={{ height: '280px', zIndex: 100 }}>
            <div className="absolute bottom-2 right-2 pointer-events-auto">
              <button
                onClick={() => {
                  setTriggerNext(prev => prev + 1);
                  setResetTimer(prev => prev + 1);
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all group relative overflow-hidden"
                aria-label="Next project"
                style={{
                  background: isColorDark(featuredMissions[activeCardIndex].bannerColor)
                    ? `conic-gradient(
                        rgba(255, 255, 255, 0.4) 0deg,
                        rgba(255, 255, 255, 0.4) ${progress * 3.6}deg,
                        rgba(255, 255, 255, 0.2) ${progress * 3.6}deg,
                        rgba(255, 255, 255, 0.2) 360deg
                      )`
                    : `conic-gradient(
                        rgba(0, 0, 0, 0.4) 0deg,
                        rgba(0, 0, 0, 0.4) ${progress * 3.6}deg,
                        rgba(0, 0, 0, 0.2) ${progress * 3.6}deg,
                        rgba(0, 0, 0, 0.2) 360deg
                      )`
                }}
              >
                <div className="absolute inset-0 backdrop-blur-sm rounded-full" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white/70 group-hover:text-white transition-colors relative z-10"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Toggle Auto-play - positionné juste en dessous du bouton Next */}
          <div className="absolute left-0 top-1/2 w-full pointer-events-none" style={{ zIndex: 100 }}>
            <div className="absolute right-2 pointer-events-auto" style={{ top: 'calc(140px + 14px)' }}>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <span className="text-[10px] text-black font-medium">Auto Next</span>
                <input
                  type="checkbox"
                  checked={autoPlayEnabled}
                  onChange={(e) => setAutoPlayEnabled(e.target.checked)}
                  className="w-3 h-3 cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row gap-16 items-center overflow-visible">

            {/* GAUCHE: INFO DU PROJET - centré verticalement avec la bannière */}
            <div className="w-full md:w-[55%] flex flex-col gap-6 pl-8 pr-4 justify-center">
              <motion.div
                key={activeCardIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Titre et Tags de genre */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className="text-4xl font-black italic uppercase tracking-tighter leading-none transition-colors duration-500"
                      style={{ color: featuredMissions[activeCardIndex].featuredTextColor }}
                    >
                      {featuredMissions[activeCardIndex].title}
                    </h2>
                    <p
                      className="text-xs font-mono mt-1 transition-colors duration-500"
                      style={{ color: featuredMissions[activeCardIndex].secondaryTextColor }}
                    >
                      {featuredMissions[activeCardIndex].date}
                    </p>
                  </div>

                  {/* Tags de genre */}
                  <div className="flex flex-wrap gap-2 justify-end pt-1">
                    {featuredMissions[activeCardIndex].genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700 border border-zinc-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-lg font-medium leading-relaxed italic transition-colors duration-500"
                  style={{ color: featuredMissions[activeCardIndex].featuredTextColor }}
                >
                  {featuredMissions[activeCardIndex].description}
                </p>

                {/* Roles */}
                <p
                  className="text-xs font-mono transition-colors duration-500"
                  style={{ color: featuredMissions[activeCardIndex].secondaryTextColor }}
                >
                  Roles: {featuredMissions[activeCardIndex].roles.join(', ')}
                </p>
              </motion.div>
            </div>

            {/* DROITE: CARDS */}
            <div className="w-full md:w-1/2 relative overflow-visible" style={{ marginTop: '60px', marginLeft: '-40px', paddingBottom: '30px' }}>
              {/* Cards et navigation - positions indépendantes */}
              <CardSwap
                width={480}
                height={300}
                cardDistance={60}
                verticalDistance={70}
                delay={7000}
                pauseOnHover={!autoPlayEnabled}
                easing="elastic"
                skewAmount={6}
                onCardClick={(idx) => {
                  setSelectedProject(featuredMissions[idx]);
                  setResetTimer(prev => prev + 1);
                }}
                onActiveIndexChange={(idx) => setActiveCardIndex(idx)}
                onProgressChange={(p) => setProgress(p)}
                triggerNext={triggerNext}
                resetTimer={resetTimer}
                renderWrapper={(cardsElement, navElement) => (
                  <>
                    {/* Fenêtres/Cartes - avec masque de dégradé */}
                    <div style={{
                      paddingTop: '150px',
                      marginTop: '-150px',
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 30%, black 70%, transparent 77%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 30%, black 70%, transparent 77%)',
                      paddingBottom: '200px'
                    }}>
                      {cardsElement}
                    </div>

                    {/* Barre de navigation - position indépendante */}
                    <div style={{ marginTop: '-176px', position: 'relative', zIndex: 20 }}>
                      {navElement}
                    </div>
                  </>
                )}
              >
                {featuredMissions.map((p) => (
                  <Card key={p.id} customClass="cursor-pointer overflow-hidden" style={{ aspectRatio: '8/5' }}>
                    <img
                      src={p.coverImage}
                      className="w-full h-full object-cover transition-all duration-300"
                      style={{ filter: 'blur(0px)', aspectRatio: '8/5' }}
                      alt={p.title}
                      data-card-id={p.id}
                    />
                    <div className="absolute inset-0 flex items-end justify-start p-6">
                      <span className="text-white font-black italic uppercase text-lg tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_100%)]">{p.title}</span>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT LIST (Tous les projets en grille chronologique) */}
      <section
        className="pt-12 pb-24 border-t border-zinc-100"
        onMouseLeave={() => {
          setHoveredRowIndex(null);
        }}
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-5xl font-black text-zinc-800 uppercase tracking-wider mb-20 text-center px-6"
        >
          Projects
        </motion.h2>

        <div className="px-6 max-w-6xl mx-auto">

        {/* Grille de projets - Organisée par lignes pour détecter le hover de ligne */}
        <div className="flex flex-col" style={{ gap: `${DOCK_CONFIG.gridGap}px` }}>
          {(() => {
            const rows: Project[][] = [];

            // Grouper les projets par lignes de 3
            for (let i = 0; i < sortedProjects.length; i += 3) {
              rows.push(sortedProjects.slice(i, i + 3));
            }

            // Utiliser seulement la ligne effectivement survolée, pas de défaut
            const effectiveHoveredRow = hoveredRowIndex;

            return rows.map((rowProjects, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                style={{
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                {/* Zone de gap au-dessus de chaque ligne (sauf la première) pour détecter le hover entre lignes */}
                {rowIndex > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: `-${DOCK_CONFIG.gridGap}px`,
                      left: 0,
                      right: 0,
                      height: `${DOCK_CONFIG.gridGap}px`,
                      zIndex: 1
                    }}
                    onMouseEnter={() => {
                      // Garder la ligne actuellement active si elle existe, sinon prendre la ligne du haut
                      if (hoveredRowIndex === null) {
                        setHoveredRowIndex(rowIndex - 1);
                      }
                    }}
                  />
                )}

                {/* Wrapper avec extensions gauche et droite pour étendre la zone de détection */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  style={{
                    position: 'relative',
                    overflow: 'visible',
                    gap: `${DOCK_CONFIG.gridGap}px`
                  }}
                  onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                  onMouseLeave={(e) => {
                    // Ne pas réinitialiser si on quitte vers une zone de gap
                    const relatedTarget = e.relatedTarget as HTMLElement | null;
                    if (!relatedTarget || (relatedTarget instanceof HTMLElement && !relatedTarget.closest('[data-gap-zone]'))) {
                      if (hoveredRowIndex === rowIndex) {
                        setHoveredRowIndex(null); // Désactiver la mise en valeur
                      }
                    }
                  }}
                >
                  {/* Extension gauche invisible - jusqu'au bord du foreground (48px) */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '100%',
                      top: 0,
                      bottom: 0,
                      width: '48px',
                      pointerEvents: 'auto'
                    }}
                    onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                  />

                  {/* Extension droite invisible - jusqu'au bord du foreground (48px) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '100%',
                      top: 0,
                      bottom: 0,
                      width: '48px',
                      pointerEvents: 'auto'
                    }}
                    onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                  />

                  {rowProjects.map((project, colIndex) => {
                    const isHovered = hoveredProjectInfo?.id === project.id;
                    const sameRow = hoveredProjectInfo ? rowIndex === hoveredProjectInfo.rowIndex : false;

                    return (
                      <div
                        key={project.id}
                        style={{
                          position: 'relative',
                          overflow: 'visible'
                        }}
                      >
                        <ProjectGridItem
                          project={project}
                          onClick={() => setSelectedProject(project)}
                          isHovered={isHovered}
                          onHoverChange={(hovered) =>
                            setHoveredProjectInfo(
                              hovered ? { id: project.id, rowIndex, columnIndex: colIndex } : null
                            )
                          }
                          columnIndex={colIndex}
                          rowIndex={rowIndex}
                          hoveredRowIndex={effectiveHoveredRow}
                          hoveredColumnIndex={hoveredProjectInfo?.columnIndex ?? null}
                          sameRow={sameRow}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ));
          })()}
        </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* CONTACT SECTION */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-6 max-w-6xl mx-auto py-24 border-t border-zinc-100"
      >
        <h2 className="text-4xl font-black text-zinc-800 uppercase tracking-wider mb-12 text-center">
          Contact
        </h2>

        <div className="max-w-2xl mx-auto text-center space-y-8">
          <p className="text-xl font-medium leading-relaxed italic text-zinc-800">
            Let's connect! Whether you have a project in mind or just want to chat about game design, feel free to reach out.
          </p>

          <a href="mailto:ismail@example.com" className="text-2xl font-black text-zinc-900 hover:text-blue-600 transition-colors block">
            ismailbenkirane.pro@gmail.com
          </a>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <a
              href="mailto:ismailbenkirane.pro@gmail.com"
              className="px-8 py-4 bg-black text-white text-sm font-black uppercase tracking-wider hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/ismail-benkirane-gd/"
              className="px-8 py-4 border-2 border-black text-black text-sm font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 text-center">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            © {new Date().getFullYear()} Ismail — Game Designer
          </p>
        </div>
      </motion.section>
    </main>
    </>
  );
}