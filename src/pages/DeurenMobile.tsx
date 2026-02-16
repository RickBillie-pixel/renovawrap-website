import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FAQ from "../components/FAQ";
import KeuzehulpDeuren from "../components/KeuzehulpDeuren";

import { getWrapColors, type WrapColor } from "@/lib/wrapColors";

// Helper component for individual color circle with independent timing
const ColorCircle = ({ 
    initialDelay, 
    startIndex,
    className 
}: { 
    initialDelay: number; 
    startIndex: number;
    className?: string 
}) => {
    const wrapColors = getWrapColors();
    // Initialize with the offset index so they look different immediately
    const [currentIndex, setCurrentIndex] = useState(startIndex % (wrapColors.length || 1));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    useEffect(() => {
        if (!isInView || wrapColors.length === 0) return;
        
        // "wanneer je over de section komt na 6 seconden beginnen met bewegen"
        // Total delay = 6000ms base + staggered offset
        const totalDelay = 6000 + initialDelay;

        const timeoutId = setTimeout(() => {
            const intervalId = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % wrapColors.length);
            }, 7000); // 7 seconds per user request

            return () => clearInterval(intervalId);
        }, totalDelay);

        return () => clearTimeout(timeoutId);
    }, [isInView, wrapColors.length, initialDelay]);

    return (
        <ColorDisplay 
            ref={ref}
            color={wrapColors.length > 0 ? wrapColors[currentIndex] : null} 
            className={className} 
        />
    );
};

// Inner display component to handle animations cleanly
const ColorDisplay = ({ color, className, ref }: { color: WrapColor | null, className?: string, ref?: any }) => {
    return (
        <div className={`text-center ${className}`} ref={ref}>
            <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4 mx-auto">
                <AnimatePresence mode="wait">
                    {color && (
                        <motion.div
                            key={color.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }} // Slower, smoother transition
                            className="absolute inset-0 rounded-full overflow-hidden border-2 border-transparent hover:border-[#C4A47C] transition-all bg-gray-100 shadow-lg"
                        >
                            <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="h-12 flex flex-col items-center justify-center overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {color && (
                        <motion.div
                            key={color.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8, ease: "easeOut" }} // Smooth text transition
                            className="flex flex-col items-center absolute w-full"
                        >
                            <h4 className="font-display text-base text-dark truncate w-full px-2">{color.name}</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest truncate w-full px-2">{color.code || "Collectie"}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function DeurenMobile() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const wrapColors = getWrapColors();
  const totalColors = wrapColors.length || 1;

  const heroImages = [
    {
      before: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLQfVa9fZjZPK_NK_bQzLKVSR0S0ZdJfPXanUgVC0GRKBmJcU34Ea1chqPiy9K1LJkMRghQShPyim5Nk5QKl4y4AsKFXK-K-b10GprhTkVPc-j_jOnV2cDMmYmX0R7hAVzyu6CV00XU9ycD1WyGob0yHqXNsD18vqz26epnmDfBUuil4oK8YQ2FZfpUl75081-0Pa51Wb_oQf-JIrIhBqQxGfRGTUeHKcuVFG_ylhhahXPX8eH6pr6aLsHvhm6EmSgMTZHPsSGhI", 
      after: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLQfVa9fZjZPK_NK_bQzLKVSR0S0ZdJfPXanUgVC0GRKBmJcU34Ea1chqPiy9K1LJkMRghQShPyim5Nk5QKl4y4AsKFXK-K-b10GprhTkVPc-j_jOnV2cDMmYmX0R7hAVzyu6CV00XU9ycD1WyGob0yHqXNsD18vqz26epnmDfBUuil4oK8YQ2FZfpUl75081-0Pa51Wb_oQf-JIrIhBqQxGfRGTUeHKcuVFG_ylhhahXPX8eH6pr6aLsHvhm6EmSgMTZHPsSGhI",
    },
     {
      before: "/project-fotos/before7.webp", 
      after: "/project-fotos/after7.webp",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section (Matched to KeukenWrapping) */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="hidden lg:block absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            DEUREN
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center h-full relative">
            {/* Background text watermark (Mobile) */}
            <div className="lg:hidden absolute inset-0 flex items-start justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden pt-8">
              <span className="font-display font-bold text-[20vw] leading-none text-dark whitespace-nowrap tracking-tighter">
                DEUREN
              </span>
            </div>

            {/* Mobile Layout (Visible only on < lg) */}
            <div className="lg:hidden flex flex-col h-[calc(100vh-140px)] justify-between pb-6 pt-5 relative z-10">
               <div className="border-b border-dark/10 pb-4 mb-6">
                 <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-dark">
                  Deuren <br />
                  <span className="italic text-primary">Als Nieuw</span>
                </h1>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                    Bespaar tot 70% t.o.v. nieuwe deuren. Wij voorzien uw deuren van een premium toplaag. Niet van echt te onderscheiden.
                  </p>

                   {/* Trust Badges - Single Line */}
                  <div className="flex items-center gap-2 pt-4 text-xs text-gray-400 whitespace-nowrap overflow-hidden">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                      <span className="ml-1 font-bold text-dark">4.9/5</span>
                      <span className="ml-1">Google Reviews</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="font-bold text-dark">10+</span>
                    <span>Deuren</span>
                  </div>
                </div>
               </div>

              {/* Slider (Fills remaining space) */}
              <div className="relative w-full flex-1 min-h-[200px] shadow-lg overflow-hidden bg-gray-100 mt-4 mb-4 rounded-lg">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <BeforeAfterSlider
                        afterImage={heroImages[currentImageIndex].after}
                        beforeImage={heroImages[currentImageIndex].before}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
              </div>

               <div className="flex flex-col gap-3">
                <a className="bg-dark text-white px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center w-full shadow-lg" href="#keuzehulp">
                  Gratis Offerte
                </a>
                <a className="flex items-center justify-center text-xs font-bold tracking-widest uppercase border border-dark px-6 py-4 hover:bg-dark hover:text-white transition-all w-full" href="#portfolio">
                  Bekijk Voor & Na Foto's
                </a>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Deur Renovatie Specialist</span>
                <p className="font-display text-lg italic text-gray-500">Zonder sloopwerk. Binnen één dag.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Deur Renovatie <br />
                <span className="italic font-normal text-primary">Zonder Sloopwerk</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Bespaar tot wel 70% ten opzichte van nieuwe deuren door uw bestaande deuren te laten wrappen. Wij voorzien uw huidige deuren van een hoogwaardige toplaag die niet van echt te onderscheiden is.
              </p>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                  <span className="ml-1 font-bold text-dark">4.9/5</span>
                  <span className="ml-1">Google Reviews</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">10+</span>
                <span>Deuren Gewrapt</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="#keuzehulp">
                  Gratis Offerte Zo Snel Mogelijk
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="/projecten">
                  Bekijk Voor & Na Foto's
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-6 justify-center">
              <div className="relative w-full max-w-xl">
                <div className="relative z-10 w-full aspect-square shadow-2xl overflow-hidden bg-gray-100">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <BeforeAfterSlider
                        afterImage={heroImages[currentImageIndex].after}
                        beforeImage={heroImages[currentImageIndex].before}
                        className="w-full h-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-32 h-32 md:w-48 md:h-48 bg-white p-4 md:p-8 shadow-xl hidden md:block z-20">
                  <div className="h-full w-full border border-primary/20 flex flex-col justify-center items-center text-center">
                    <span className="font-display text-2xl md:text-4xl text-primary">5</span>
                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold mt-1">Jaar Garantie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Anatomie van een Renovatie */}
      <section className="py-24 bg-background-light" id="anatomie">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
               <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 block">Technische Opbouw</span>
               <h2 className="font-display text-4xl md:text-5xl text-dark">Waar U Voor <span className="italic text-[#C4A47C]">Betaalt</span></h2>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
               <div className="relative aspect-[4/3] md:aspect-video shadow-2xl bg-white">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJLQfVa9fZjZPK_NK_bQzLKVSR0S0ZdJfPXanUgVC0GRKBmJcU34Ea1chqPiy9K1LJkMRghQShPyim5Nk5QKl4y4AsKFXK-K-b10GprhTkVPc-j_jOnV2cDMmYmX0R7hAVzyu6CV00XU9ycD1WyGob0yHqXNsD18vqz26epnmDfBUuil4oK8YQ2FZfpUl75081-0Pa51Wb_oQf-JIrIhBqQxGfRGTUeHKcuVFG_ylhhahXPX8eH6pr6aLsHvhm6EmSgMTZHPsSGhI" alt="Door Anatomy" className="w-full h-full object-cover" />
                  
                  {/* Hotspots */}
                  {/* Top Right - Omsluiting */}
                  <div className="absolute top-[20%] right-[-20%] md:right-[-15%] w-48 hidden md:block text-left">
                     <h4 className="font-display italic text-lg text-dark">Volledige Omsluiting</h4>
                     <p className="text-xs text-gray-500">De folie wordt om de kopse kanten getrokken voor een verbinding die niet loslaat.</p>
                     <div className="absolute top-1/2 left-[-2rem] w-8 h-[1px] bg-[#C4A47C]"></div>
                     <div className="absolute top-1/2 left-[-2rem] w-2 h-2 rounded-full bg-[#C4A47C] -translate-x-1/2 -translate-y-1/2"></div>
                  </div>

                   {/* Middle Right - Stootvast */}
                  <div className="absolute top-[50%] right-[-20%] md:right-[-15%] w-48 hidden md:block text-left">
                     <h4 className="font-display italic text-lg text-dark">Industriële Toplaag</h4>
                     <p className="text-xs text-gray-500">Ontwikkeld voor intensief gebruik. Bestand tegen stoten, krassen en schoonmaakmiddelen.</p>
                     <div className="absolute top-1/2 left-[-2rem] w-8 h-[1px] bg-[#C4A47C]"></div>
                     <div className="absolute top-1/2 left-[-2rem] w-2 h-2 rounded-full bg-[#C4A47C] -translate-x-1/2 -translate-y-1/2"></div>
                  </div>

                  {/* Bottom Left - Beslag */}
                  <div className="absolute bottom-[20%] left-[-20%] md:left-[-15%] w-48 hidden md:block text-right">
                     <h4 className="font-display italic text-lg text-dark">Montage & Demontage</h4>
                     <p className="text-xs text-gray-500">Wij demonteren uw beslag en plaatsen het vakkundig terug voor het strakste resultaat.</p>
                     <div className="absolute top-1/2 right-[-2rem] w-8 h-[1px] bg-[#C4A47C]"></div>
                     <div className="absolute top-1/2 right-[-2rem] w-2 h-2 rounded-full bg-[#C4A47C] translate-x-1/2 -translate-y-1/2"></div>
                  </div>
               </div>
               
               {/* Mobile Descriptions */}
               <div className="grid grid-cols-1 gap-6 mt-8 md:hidden">
                  <div>
                     <h4 className="font-display italic text-lg text-dark mb-1">Volledige Omsluiting</h4>
                     <p className="text-sm text-gray-500">De folie wordt om de kopse kanten getrokken voor een verbinding die niet loslaat.</p>
                  </div>
                  <div>
                     <h4 className="font-display italic text-lg text-dark mb-1">Industriële Toplaag</h4>
                     <p className="text-sm text-gray-500">Ontwikkeld voor intensief gebruik. Bestand tegen stoten, krassen en schoonmaakmiddelen.</p>
                  </div>
                  <div>
                      <h4 className="font-display italic text-lg text-dark mb-1">Montage & Demontage</h4>
                     <p className="text-sm text-gray-500">Wij demonteren uw beslag en plaatsen het vakkundig terug voor het strakste resultaat.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Kies uw stijl of kleur (Dynamic Carousel) */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="max-w-md">
              <h2 className="font-display text-4xl text-dark mb-4">Kies uw stijl of <span className="italic text-[#C4A47C]">kleur</span></h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Creëer de look van massief eikenhout, modern mat zwart of stoer beton. Bekijk onze collectie van meer dan 300 duurzame afwerkingen.
              </p>
              <a href="/catalogus" className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-[#C4A47C] mt-4 hover:border-b hover:border-[#C4A47C] transition-all pb-1">
                Bekijk alle kleuren <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
              </a>
            </div>
            
            <div className="flex gap-6 md:gap-10 mt-8 md:mt-0">
               {/* Color 1 - Updates every 8s, Start 0s. StartIndex 0 (beginning) */}
               <ColorCircle initialDelay={0} startIndex={0} />

               {/* Color 2 - Updates every 8s, Start 2.5s. StartIndex ~1/3 (middle) */}
               <ColorCircle initialDelay={2500} startIndex={Math.floor(totalColors / 3)} />

                {/* Color 3 - Updates every 8s, Start 5s. StartIndex ~2/3 (end) */}
               <ColorCircle initialDelay={5000} startIndex={Math.floor(totalColors * 2 / 3)} />
            </div>
          </div>
        </div>
      </section>

      {/* Waarom Deuren Wrappen (Dark Section) */}
      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="max-w-[1400px] mx-auto px-6 text-center mb-16">
           <div className="inline-block px-4 py-1 rounded-full border border-white/20 text-[10px] tracking-widest uppercase mb-4">
               De Voordelen
           </div>
           <h2 className="font-display text-4xl md:text-5xl text-white">
              Waarom <span className="italic text-[#C4A47C]">Wrappen?</span>
           </h2>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6 text-[#C4A47C]">
                 <span className="material-symbols-outlined">savings</span>
              </div>
              <h3 className="font-display text-xl mb-3">Bespaar Kosten</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                 Wrappen is tot 70% voordeliger dan het vervangen van deuren en kozijnen. U behoudt de degelijke basis, maar vernieuwt de uitstraling.
              </p>
           </div>
           <div className="bg-[#C4A47C] p-8 rounded-xl text-dark">
               <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center mb-6 text-[#1A1A1A]">
                 <span className="material-symbols-outlined">timer</span>
              </div>
              <h3 className="font-display text-xl mb-3">Direct Resultaat</h3>
              <p className="text-dark/80 text-sm leading-relaxed mb-6">
                 Geen wekenlange verbouwing. Wij zijn vaak binnen één dag klaar met een verdieping. Geen stof, geen lawaai, direct genieten.
              </p>
              <p className="text-xs font-bold uppercase tracking-widest border-t border-black/10 pt-4">Vandaag geplaatst, vanavond klaar</p>
           </div>
           <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6 text-[#C4A47C]">
                 <span className="material-symbols-outlined">cleaning_services</span>
              </div>
              <h3 className="font-display text-xl mb-3">Onderhoudsvriendelijk</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                 Nooit meer schilderen. Onze folies zijn kleurvast en eenvoudig schoon te maken met een vochtige doek.
              </p>
           </div>
        </div>
      </section>

      {/* Visualiseer Uw Droomdeuren */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                 Inspiratie
              </span>
              <h2 className="font-display text-5xl md:text-7xl text-dark leading-[1.1]">
                Zie Het Resultaat <br />
                <span className="italic text-[#C4A47C]">In Uw Huis</span>
              </h2>
              <p className="text-gray-500 text-base font-light leading-relaxed max-w-md">
                Benieuwd hoe een mat zwarte deur in uw hal staat? Upload een foto en visualiseer direct de nieuwe look.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="/configurator" className="bg-[#C4A47C] text-white px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#b08d55] transition-all shadow-xl flex items-center justify-center">
                  <span>Start Visualizer</span>
                  <span className="material-symbols-outlined text-lg ml-2">auto_fix_high</span>
                </a>
                <a href="#keuzehulp" className="px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase text-dark border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center">
                  Bereken Prijs
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video bg-gray-100 max-h-[500px]">
                  <BeforeAfterSlider
                    beforeImage="/project-fotos/before7.webp"
                    afterImage="/project-fotos/after7.webp"
                    className="w-full h-full"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <FAQ />

      {/* 7. Keuzehulp (Wizard) */}
      <section className="py-16 bg-background-light border-t border-gray-200" id="keuzehulp">
         <div className="max-w-[1400px] mx-auto px-6 text-center mb-12">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Gratis & Vrijblijvend</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-4">
              Bereken Uw <span className="italic text-primary">Kosten</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Elke deur is anders. Vul de specificaties in en ontvang een richtprijs voor uw project.
            </p>
         </div>
         <div className="max-w-[1400px] mx-auto px-6">
            <KeuzehulpDeuren />
         </div>
      </section>
    </main>
  );
}
