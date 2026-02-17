import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

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

  // Scroll to top is handled by ScrollToTop component in App.tsx

  return null;
}
