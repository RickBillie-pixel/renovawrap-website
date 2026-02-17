import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  direction = "up",
}: FadeInProps & { direction?: "up" | "down" | "left" | "right" | "none" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const getTransform = () => {
    if (direction === "none") return "";
    if (isVisible) return "translate-x-0 translate-y-0";
    
    switch (direction) {
      case "up": return "translate-y-10";
      case "down": return "-translate-y-10"; // actually usually down enters from top, so -y
      case "left": return "-translate-x-10"; // enters from left? No, "coming from left" usually means starts at -x and goes to 0. 
      // "When you scrolling down, cards come from left to right". So start: left (-x), end: center (0).
      case "right": return "translate-x-10"; // starts at right (+x), goes to 0.
      default: return "translate-y-10";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-1000 ease-out will-change-[opacity,transform]",
        isVisible ? "opacity-100" : "opacity-0",
        getTransform(),
        className
      )}
    >
      {children}
    </div>
  );
}
