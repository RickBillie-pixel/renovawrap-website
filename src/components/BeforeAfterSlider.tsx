import { useState, useRef, useCallback } from "react";

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

  const getPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.max(0, Math.min(100, (x / rect.width) * 100));
  }, []);

  // Mouse: simple drag within container only (desktop)
  const handleMouseDown = useCallback(() => {
    const onMove = (e: MouseEvent) => {
      e.preventDefault();
      setSliderPosition(getPosition(e.clientX));
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [getPosition]);

  // Touch: handle entirely on the container element, NO document listeners
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches[0]) {
      setSliderPosition(getPosition(e.touches[0].clientX));
    }
  }, [getPosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevent scrolling only while sliding
    e.stopPropagation();
    if (e.touches[0]) {
      setSliderPosition(getPosition(e.touches[0].clientX));
    }
  }, [getPosition]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={(e) => setSliderPosition(getPosition(e.clientX))}
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

      {/* Slider line + handle */}
      <div
        className="absolute inset-y-0 z-30 flex items-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-100/50 backdrop-blur-sm">
          <span className="material-symbols-outlined text-dark text-sm">
            unfold_more
          </span>
        </div>
      </div>
    </div>
  );
}
