"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  onActiveIndexChange?: (idx: number) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-sm border border-black bg-white shadow-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onActiveIndexChange,
  onNavigate,
  skewAmount = 6,
  easing = 'linear',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const isAnimating = useRef<boolean>(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const progressIntervalRef = useRef<number>(0);

  // Notifier l'index initial au montage
  useEffect(() => {
    if (onActiveIndexChange && order.current.length > 0) {
      onActiveIndexChange(order.current[0]);
    }
  }, []);

  // Fonction de swap
  const swap = React.useCallback(() => {
    if (order.current.length < 2 || !refs[0]?.current || isAnimating.current) return;

    isAnimating.current = true;
    const [front, ...rest] = order.current;
    const elFront = refs[front].current;
    if (!elFront) {
      isAnimating.current = false;
      return;
    }

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Animation de descente de la carte frontale
    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    // Promotion des autres cartes
    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    // Retour de la carte frontale à l'arrière
    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.set(elFront, { zIndex: backSlot.zIndex }, 'return');
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    // Mise à jour immédiate de l'ordre dès le début de l'animation de retour
    tl.addLabel('updateOrder', 'return');
    tl.call(() => {
      order.current = [...rest, front];
      setProgress(0);

      // Mettre à jour le flou immédiatement
      const newActiveImg = refs[rest[0]].current?.querySelector('img');
      const oldActiveImg = refs[front].current?.querySelector('img');
      if (newActiveImg) gsap.to(newActiveImg, { filter: 'blur(0px)', duration: 0.2 });
      if (oldActiveImg) gsap.to(oldActiveImg, { filter: 'blur(4px)', duration: 0.2 });

      forceUpdate();
      if (onActiveIndexChange) {
        onActiveIndexChange(rest[0]);
      }
    }, undefined, 'updateOrder');

    // Libérer le verrou d'animation à la fin
    tl.eventCallback('onComplete', () => {
      isAnimating.current = false;
    });
  }, [refs, cardDistance, verticalDistance, config, onActiveIndexChange, forceUpdate]);

  // Navigation manuelle
  const goToNext = React.useCallback(() => {
    clearInterval(intervalRef.current);
    clearInterval(progressIntervalRef.current);
    setProgress(0);
    swap();
  }, [swap]);

  const goToPrev = React.useCallback(() => {
    if (order.current.length < 2 || isAnimating.current) return;

    isAnimating.current = true;
    clearInterval(intervalRef.current);
    clearInterval(progressIntervalRef.current);
    setProgress(0);

    // Inverser l'ordre pour aller en arrière
    const last = order.current[order.current.length - 1];
    const rest = order.current.slice(0, -1);
    order.current = [last, ...rest];

    const total = refs.length;
    refs.forEach((r, i) => {
      placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    // Mettre à jour le flou instantanément
    refs.forEach((r, i) => {
      const img = r.current?.querySelector('img');
      if (img) {
        const isActive = order.current[0] === i;
        gsap.to(img, { filter: isActive ? 'blur(0px)' : 'blur(4px)', duration: 0.2 });
      }
    });

    forceUpdate();
    if (onActiveIndexChange) {
      onActiveIndexChange(order.current[0]);
    }

    // Libérer le verrou après un court délai
    setTimeout(() => {
      isAnimating.current = false;
    }, 300);
  }, [refs, cardDistance, verticalDistance, skewAmount, onActiveIndexChange, forceUpdate]);

  // Initialisation et positionnement (ne s'exécute qu'une fois au montage)
  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      // Appliquer le flou aux cartes non-actives
      const img = r.current!.querySelector('img');
      if (img && i !== 0) {
        gsap.set(img, { filter: 'blur(4px)' });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gestion du timer automatique et de la progression
  useEffect(() => {
    // Nettoyer les anciens timers
    clearInterval(intervalRef.current);
    clearInterval(progressIntervalRef.current);

    if (!isHovered) {
      // Réinitialiser la progression au début
      setProgress(0);

      // Timer pour le swap automatique
      intervalRef.current = window.setInterval(() => {
        swap();
      }, delay);

      // Timer pour la barre de progression
      const progressStep = 100 / (delay / 50);
      progressIntervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          const next = prev + progressStep;
          if (next >= 100) return 100;
          return next;
        });
      }, 50);
    } else {
      setProgress(0);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [isHovered, delay, swap]);

  const rendered = childArr.map((child, i) => {
    const isActive = order.current[0] === i;
    return isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          className: `${child.props.customClass ?? ''} ${!isActive ? 'card-inactive' : ''}`,
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            // Si on clique sur une carte en arrière-plan, passer à la suivante
            if (!isActive) {
              goToNext();
            } else {
              // Only open popup if clicking on the active card
              onCardClick?.(i);
            }
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child;
  });

  const currentIndex = order.current[0];

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={container}
        className="relative perspective-[900px] overflow-visible"
        style={{ width, height }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {rendered}
      </div>

      {/* Barre de navigation */}
      <div className="flex items-center gap-3">
        {/* Flèche précédent */}
        <button
          onClick={goToPrev}
          className="flex-shrink-0 p-2 hover:bg-zinc-100 rounded transition-all"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* Barre de progression */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Indicateurs de page */}
          <div className="flex gap-2 justify-center">
            {childArr.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-black' : 'w-1.5 bg-zinc-300'
                }`}
              />
            ))}
          </div>

          {/* Jauge de progression (visible uniquement quand pas en hover) */}
          {!isHovered && (
            <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-50"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Flèche suivant */}
        <button
          onClick={goToNext}
          className="flex-shrink-0 p-2 hover:bg-zinc-100 rounded transition-all"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardSwap;
