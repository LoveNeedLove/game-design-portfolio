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
  onProgressChange?: (progress: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  renderWrapper?: (cardsElement: ReactNode, navElement: ReactNode, progressElement: ReactNode) => ReactNode;
  triggerNext?: number;
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
  onProgressChange,
  skewAmount = 6,
  easing = 'linear',
  renderWrapper,
  triggerNext,
  children
}) => {
  const config = useMemo(
    () =>
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
          },
    [easing]
  );

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const isAnimating = useRef<boolean>(false);
  const [progress, setProgress] = React.useState(0);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const progressIntervalRef = useRef<number>(0);
  const prevTriggerNext = useRef<number>(0);

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
    // Ne pas arrêter les timers, juste déclencher le swap
    swap();
  }, [swap]);

  const goToPrev = React.useCallback(() => {
    if (order.current.length < 2 || !refs[0]?.current || isAnimating.current) return;

    isAnimating.current = true;
    clearInterval(intervalRef.current);
    clearInterval(progressIntervalRef.current);
    setProgress(0);

    const last = order.current[order.current.length - 1];
    const rest = order.current.slice(0, -1);
    const elLast = refs[last].current;
    if (!elLast) {
      isAnimating.current = false;
      return;
    }

    const tl = gsap.timeline();

    // 1. Animation de montée de la dernière carte (inverse de la descente)
    tl.to(elLast, {
      y: '-=500',
      duration: config.durDrop,
      ease: config.ease
    });

    // 2. Démotion des autres cartes (elles reculent toutes d'un cran)
    tl.addLabel('demote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'demote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `demote+=${i * 0.15}`
      );
    });

    // 3. Retour de la dernière carte vers l'avant
    const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `demote+=${config.durMove * config.returnDelay}`);
    tl.set(elLast, { zIndex: frontSlot.zIndex }, 'return');
    tl.to(
      elLast,
      {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    // Mise à jour immédiate de l'ordre dès le début de l'animation de retour
    tl.addLabel('updateOrder', 'return');
    tl.call(() => {
      order.current = [last, ...rest];
      setProgress(0);

      // Mettre à jour le flou immédiatement
      const newActiveImg = refs[last].current?.querySelector('img');
      const oldActiveImg = refs[rest[0]].current?.querySelector('img');
      if (newActiveImg) gsap.to(newActiveImg, { filter: 'blur(0px)', duration: 0.2 });
      if (oldActiveImg) gsap.to(oldActiveImg, { filter: 'blur(4px)', duration: 0.2 });

      forceUpdate();
      if (onActiveIndexChange) {
        onActiveIndexChange(last);
      }
    }, undefined, 'updateOrder');

    tl.eventCallback('onComplete', () => {
      isAnimating.current = false;
    });
  }, [refs, cardDistance, verticalDistance, config, onActiveIndexChange, forceUpdate]);

  // Aller à une carte spécifique
  const goToCard = React.useCallback((targetCardIndex: number) => {
    if (isAnimating.current) return;

    const currentIndex = order.current[0];
    if (currentIndex === targetCardIndex) return; // Déjà sur cette carte

    // Trouver la position de la carte cible dans l'ordre actuel
    const targetPosition = order.current.indexOf(targetCardIndex);

    // Si la carte cible est juste après la carte active (position 1), utiliser swap()
    if (targetPosition === 1) {
      goToNext();
      return;
    }

    // Sinon, utiliser l'animation goToPrev inversée pour amener cette carte devant
    if (targetPosition > 1) {
      // Réorganiser l'ordre pour mettre la carte cible à la fin, puis faire goToPrev
      const before = order.current.slice(0, targetPosition);
      const after = order.current.slice(targetPosition + 1);
      order.current = [...before, ...after, targetCardIndex];

      // Repositionner toutes les cartes sans animation
      const total = refs.length;
      order.current.forEach((cardIdx, i) => {
        placeNow(refs[cardIdx].current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      });

      // Puis faire l'animation goToPrev
      goToPrev();
    }
  }, [refs, cardDistance, verticalDistance, skewAmount, goToNext, goToPrev]);

  // Initialisation et positionnement (ne s'exécute qu'une fois au montage)
  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (!r.current) return;
      placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      // Appliquer le flou aux cartes non-actives
      const img = r.current.querySelector('img');
      if (img && i !== 0) {
        gsap.set(img, { filter: 'blur(4px)' });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notifier les changements de progression
  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [progress, onProgressChange]);

  // Déclencher manuellement le passage à la carte suivante
  useEffect(() => {
    if (triggerNext !== undefined && triggerNext > 0 && triggerNext !== prevTriggerNext.current) {
      console.log('Triggering next, triggerNext =', triggerNext);
      prevTriggerNext.current = triggerNext;
      goToNext();
    }
  }, [triggerNext, goToNext]);

  // Gestion du timer automatique et de la progression
  useEffect(() => {
    // Nettoyer les anciens timers
    clearInterval(intervalRef.current);
    clearInterval(progressIntervalRef.current);

    if (!pauseOnHover) {
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
          return next >= 100 ? 100 : next;
        });
      }, 50);
    } else {
      setProgress(0);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [pauseOnHover, delay, swap]);

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
            if (!isActive) {
              // Aller directement à la carte cliquée
              goToCard(i);
            } else {
              // Only open popup if clicking on the active card
              onCardClick?.(i);
            }
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child;
  });

  const currentIndex = order.current[0];

  // Élément des cartes
  const cardsElement = (
    <div
      ref={container}
      className="relative perspective-[900px] overflow-visible"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );

  // Élément de navigation
  const navElement = (
    <div className="flex gap-2 justify-center">
      {/* Indicateurs de page cliquables */}
      {childArr.map((_, idx) => (
        <button
          key={idx}
          onClick={() => goToCard(idx)}
          className={`h-1.5 rounded-full transition-all cursor-pointer hover:opacity-70 ${
            idx === currentIndex ? 'w-8 bg-black' : 'w-1.5 bg-zinc-300'
          }`}
          aria-label={`Go to card ${idx + 1}`}
        />
      ))}
    </div>
  );

  // Élément de la jauge de progression (séparé)
  const progressElement = (
    <div className="w-full h-2 overflow-hidden bg-yellow-500">
      <div
        className="h-full bg-red-500 transition-all duration-50"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  // Si renderWrapper est fourni, l'utiliser pour positionner indépendamment les éléments
  if (renderWrapper) {
    return <>{renderWrapper(cardsElement, navElement, progressElement)}</>;
  }

  // Rendu par défaut
  return (
    <div className="flex flex-col gap-6">
      {cardsElement}
      {navElement}
    </div>
  );
};

export default CardSwap;
