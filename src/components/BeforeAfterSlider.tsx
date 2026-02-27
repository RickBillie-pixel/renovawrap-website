import { useState, useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current) return;
      // Only prevent default when actively dragging the slider handle
      e.preventDefault();
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    // Use passive: false only needed when dragging; we control this via isDragging
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onClick={(e) => handleMove(e.clientX)}
    >
      {/* After image (background) */}
      <img
        src={afterImage}
        alt="Na"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Na Label (Right) */}
      <div className="absolute top-4 right-4 z-20 bg-white/80 text-dark text-[10px] uppercase tracking-widest px-2 py-1 backdrop-blur-sm pointer-events-none">
        Na
      </div>

      {/* Before image (foreground with clip-path) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt="Voor"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* Voor Label (Left) */}
        <div className="absolute top-4 left-4 z-20 bg-dark/80 text-white text-[10px] uppercase tracking-widest px-2 py-1 backdrop-blur-sm pointer-events-none">
          Voor
        </div>
      </div>

      {/* Slider line + handle — only THIS element starts drag on touch */}
      <div
        className="absolute inset-y-0 z-30 flex items-center"
        style={{ left: `${sliderPosition}%` }}
        onTouchStart={(e) => {
          e.stopPropagation();
          handleMouseDown();
        }}
      >
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-100/50 backdrop-blur-sm cursor-ew-resize">
          <span className="material-symbols-outlined text-dark text-sm">
            unfold_more
          </span>
        </div>
      </div>
    </div>
  );
}
