import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
      // Increased lerp slightly for better responsiveness (default is usually 0.1)
      lerp: 0.1, 
    });

    lenisRef.current = lenis;
    // Expose globally so other components can use lenis.scrollTo()
    (window as any).__lenis = lenis;

    // Synchronize Lenis with GSAP
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(update);
    // Allow some lag smoothing to prevent stuttering on heavy frames
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on every route change
  useEffect(() => {
    if (lenisRef.current) {
      // Use Lenis for scrolling to top to maintain state consistency
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      // Fallback only if Lenis isn't ready (which shouldn't happen due to initialization order, but safety check)
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
