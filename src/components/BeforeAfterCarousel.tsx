import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { cn } from "../lib/utils";

const transformations = [
  {
    id: 1,
    title: "Keuken Renovatie",
    subtitle: "Een complete transformatie van de koelkast en kasten in één dag tijd.",
    before: "/kast.png",
    after: "/kast-after.png",
  },
  {
    id: 2,
    title: "Detail Afwerking",
    subtitle: "Zelfs de moeilijkste hoeken en panelen worden naadloos en strak hersteld.",
    before: "/kast2-before.png",
    after: "/kast2-after.png",
  },
];

export default function BeforeAfterCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  return (
    <section className="py-24 bg-background-light overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
              Transformatie
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-dark leading-tight">
              Bekijk de <span className="italic font-normal">transformatie</span> <br /> van dit project
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-dark/10 flex items-center justify-center hover:bg-dark hover:text-white transition-all duration-300 group"
              aria-label="Vorige"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div className="flex items-center gap-2 px-4">
              {transformations.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 transition-all duration-500 rounded-full",
                    i === currentIndex ? "w-10 bg-primary" : "w-1.5 bg-dark/10"
                  )}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border border-dark/10 flex items-center justify-center hover:bg-dark hover:text-white transition-all duration-300 group"
              aria-label="Volgende"
            >
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative h-[800px] md:h-[750px] lg:h-[850px] w-full bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ x: direction * 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 50, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col md:flex-row h-full"
            >
              {/* Image Side - Carousel itself (Left) - Now vertical focus */}
              <div className="w-full md:w-[45%] lg:w-[40%] h-[60%] md:h-full relative bg-gray-50">
                <BeforeAfterSlider
                  beforeImage={transformations[currentIndex].before}
                  afterImage={transformations[currentIndex].after}
                  className="w-full h-full"
                />
              </div>

              {/* Info Side (Right) */}
              <div className="w-full md:w-[55%] lg:w-[60%] p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
                <div className="max-w-xl">
                   <div className="flex items-center gap-4 mb-8">
                      <span className="w-16 h-[1px] bg-primary" />
                      <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Focus: {transformations[currentIndex].id === 1 ? "Keuken" : "Details"}</span>
                   </div>
                  <h3 className="text-4xl lg:text-6xl font-display font-medium text-dark mb-8 tracking-tight leading-none">
                    {transformations[currentIndex].title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-lg lg:text-xl font-light mb-12">
                    {transformations[currentIndex].subtitle}
                  </p>
                  
                   <div className="space-y-8 mb-16">
                      <div className="flex items-start gap-6">
                        <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                          <span className="material-symbols-outlined text-xl">speed</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-dark uppercase text-xs tracking-widest mb-1">Tijdsduur</h4>
                          <p className="text-gray-500 text-sm">Gerealiseerd binnen 2-3 uur zonder sloopwerk.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-6">
                        <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                          <span className="material-symbols-outlined text-xl">workspace_premium</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-dark uppercase text-xs tracking-widest mb-1">Garantie</h4>
                          <p className="text-gray-500 text-sm">5 jaar garantie op hechting en kleurvastheid.</p>
                        </div>
                      </div>
                   </div>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-12 border-t border-gray-100 pt-12">
                   <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Service</span>
                      <span className="text-base text-dark font-medium leading-none">Keuken Wrapping</span>
                   </div>
                   <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Besparing</span>
                      <span className="text-base text-dark font-medium leading-none">± 70% t.o.v. Nieuw</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
