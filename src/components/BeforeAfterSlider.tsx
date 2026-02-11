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
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
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
      className={`relative select-none overflow-hidden cursor-ew-resize ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onClick={(e) => handleMove(e.clientX)}
    >
      {/* After image (full background) */}
      <img
        src={afterImage}
        alt="Na"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Voor"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            width: containerRef.current
              ? `${containerRef.current.offsetWidth}px`
              : "100vw",
            maxWidth: "none",
          }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider z-20 pointer-events-none">
        Voor
      </div>
      <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider z-20 pointer-events-none">
        Na
      </div>

      {/* Slider line + handle */}
      <div
        className="absolute inset-y-0 z-30 flex items-center"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white/90 shadow-lg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize border border-gray-200">
          <span className="material-symbols-outlined text-dark text-lg">
            code
          </span>
        </div>
      </div>

      {/* Invisible spacer to maintain aspect ratio */}
      <div className="w-full" style={{ paddingBottom: "66.66%" }} />
    </div>
  );
}
