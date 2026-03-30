import { useState, useRef, useEffect, useCallback } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  objectPosition?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className = "",
  objectPosition = "center",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, []);

  const handleStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [handleMove, handleEnd]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl ${className}`}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition }}
      />

      {/* Before Image (Overlay with Clip Path) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectPosition }}
        />
      </div>

      {/* Divider Line */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(210,180,140,0.5)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-primary/20">
          <span className="material-symbols-outlined text-primary text-xl">unfold_more_double</span>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="bg-dark/60 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20">
          Before
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="bg-primary/80 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20">
          After
        </span>
      </div>
    </div>
  );
}
