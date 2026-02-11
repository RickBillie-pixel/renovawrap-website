import { useEffect } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface Project {
  id: string;
  name: string;
  category: string;
  before_image_url: string | null;
  after_image_url: string | null;
  Uitdaging: string | null;
  Oplossing: string | null;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const hasBothImages = project.before_image_url && project.after_image_url;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative z-10 bg-dark/95 w-full max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col lg:flex-row rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-white text-xl">
            close
          </span>
        </button>

        {/* Left: Image / Slider */}
        <div className="lg:w-3/5 flex-shrink-0">
          {hasBothImages ? (
            <BeforeAfterSlider
              beforeImage={project.before_image_url!}
              afterImage={project.after_image_url!}
              className="w-full h-full min-h-[300px] lg:min-h-[500px]"
            />
          ) : project.after_image_url ? (
            <img
              src={project.after_image_url}
              alt={project.name}
              className="w-full h-full object-cover min-h-[300px] lg:min-h-[500px]"
            />
          ) : project.before_image_url ? (
            <img
              src={project.before_image_url}
              alt={project.name}
              className="w-full h-full object-cover min-h-[300px] lg:min-h-[500px]"
            />
          ) : (
            <div className="w-full h-full min-h-[300px] lg:min-h-[500px] bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500 text-sm uppercase tracking-widest">Geen afbeelding</span>
            </div>
          )}
        </div>

        {/* Right: Project Info */}
        <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
          <span className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2 block">
            {project.category}
          </span>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-2 leading-tight">
            {project.name}
          </h2>
          <div className="w-10 h-0.5 bg-primary mb-8" />

          {project.Uitdaging && (
            <div className="mb-6">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">
                De Uitdaging
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.Uitdaging}
              </p>
            </div>
          )}

          {project.Oplossing && (
            <div className="mb-6">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">
                De Oplossing
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.Oplossing}
              </p>
            </div>
          )}

          <a
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-primary/80 transition-colors w-fit"
          >
            Vergelijkbaar Project?
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
