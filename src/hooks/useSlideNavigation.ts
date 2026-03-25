import { useState, useCallback, useEffect, useRef } from "react";

interface UseSlideNavigationOptions {
  totalSlides: number;
}

interface TouchStart {
  x: number;
  y: number;
}

export default function useSlideNavigation({ totalSlides }: UseSlideNavigationOptions) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<TouchStart | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= totalSlides || idx === currentSlide || transitioning) return;
      setDirection(idx > currentSlide ? 1 : -1);
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(idx);
        setTransitioning(false);
        containerRef.current?.scrollTo?.({ top: 0, behavior: "instant" as ScrollBehavior });
      }, 250);
    },
    [currentSlide, transitioning, totalSlides]
  );

  const next = useCallback(() => goTo(currentSlide + 1), [goTo, currentSlide]);
  const prev = useCallback(() => goTo(currentSlide - 1), [goTo, currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
        if (dx < 0) next();
        else prev();
      }
      touchStartRef.current = null;
    },
    [next, prev]
  );

  return {
    currentSlide,
    transitioning,
    direction,
    containerRef,
    goTo,
    next,
    prev,
    handleTouchStart,
    handleTouchEnd,
  };
}
