import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FAQ from "../components/FAQ";
import { windowFaqs } from "../data/faqs";
import KeuzehulpKozijnen from "../components/KeuzehulpKozijnen";


export default function KozijnenDesktop() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Using window/exterior specific before/afters if available, otherwise utilizing high-quality generic renovation shots
  const heroImages = [
    {
      before: "https://images.unsplash.com/photo-1503708990387-99049a051e06?q=80&w=2070&auto=format&fit=crop", // Placeholder for window before
      after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", // Placeholder for window after (modern)
    },
    {
       before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
       after: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      
      {/* 1. Hero Section (Replica of KeukenWrapping) */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[15rem] md:text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            KOZIJNEN
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
                <p className="font-display text-lg italic text-gray-500 mb-6">Upgrade uw woning, verlaag uw kosten.</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Zwarte Kozijnen <br />
                <span className="italic font-normal text-primary">Zonder Schilderen</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Kozijnen schilderen? Dit kost al snel enkele duizenden euro's en geeft veel rommel. Wij wrappen uw kozijnen, ramen en schuifpuien met UV-bestendige buitenfolie (niet van gepoedercoat aluminium te onderscheiden).
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
                <span>Kozijnen</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="#keuzehulp">
                  Gratis Offerte Zo Snel Mogelijk
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="#portfolio">
                  Bekijk Voor & Na Foto's
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
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

      {/* 2. Intro Section "Binnen & Buiten Harmonie" */}
      <section className="py-24 bg-white" id="portfolio">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               
               {/* Left: Collage */}
               <div className="relative h-[600px] w-full">
                  {/* Left Tall Image */}
                  <div className="absolute top-0 left-0 w-[45%] h-full overflow-hidden rounded-2xl shadow-lg z-10">
                     <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1500&auto=format&fit=crop" alt="Nature leaf" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  {/* Top Right Image */}
                  <div className="absolute top-0 right-0 w-[48%] h-[45%] overflow-hidden rounded-2xl shadow-lg z-20">
                     <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1000&auto=format&fit=crop" alt="Interior lounge" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  {/* Bottom Right Image */}
                  <div className="absolute bottom-0 right-0 w-[48%] h-[48%] overflow-hidden rounded-2xl shadow-lg z-30">
                     <img src="https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=1500&auto=format&fit=crop" alt="Wood texture" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
               </div>

               {/* Right: Text Content */}
               <div className="lg:pl-12">
                  <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Esthetiek & Kwaliteit</span>
                  <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-8">
                     Binnen & Buiten <span className="italic text-[#C4A47C] font-serif">Harmonie</span>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                     Onze hoogwaardige architecturale folies zijn niet van echt te onderscheiden. Of u nu kiest voor een strakke matzwarte afwerking of een warme, natuurlijke houtlook, wij transformeren uw kozijnen tot een designelement.
                  </p>
                  <p className="text-gray-500 leading-relaxed mb-10">
                     De folies zijn speciaal ontwikkeld voor zowel interieur- als exterieurtoepassingen, bestand tegen alle weersinvloeden en UV-straling. Creëer eenheid in uw woning door binnen en buiten naadloos op elkaar aan te laten sluiten.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                     <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-[#FAF9F6] flex items-center justify-center shrink-0">
                           <span className="material-symbols-outlined text-[#C4A47C]">texture</span>
                        </div>
                        <div>
                           <h4 className="font-display text-lg text-dark mb-1">Authentieke Textuur</h4>
                           <p className="text-xs text-gray-500 leading-relaxed">Voelbare nerven en matte finishes voor een realistische look.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-[#FAF9F6] flex items-center justify-center shrink-0">
                           <span className="material-symbols-outlined text-[#C4A47C]">wb_sunny</span>
                        </div>
                        <div>
                           <h4 className="font-display text-lg text-dark mb-1">Weersbestendig</h4>
                           <p className="text-xs text-gray-500 leading-relaxed">Gegarandeerd kleurvast en beschermd tegen vocht en zon.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Waarom Kozijnen Wrappen? (Dark Section) */}
      <section className="py-24 bg-[#1A1A1A] text-white">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16 relative">
                <div className="absolute inline-block px-4 py-1 rounded-full border border-white/20 text-[10px] tracking-widest uppercase mb-4 top-0 left-1/2 -translate-x-1/2 -translate-y-12">
                   Voordelen
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                   Waarom Kozijnen <span className="italic text-[#C4A47C] font-serif">Wrappen?</span>
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto text-sm">
                   Ontdek de kracht van renovatie met een ziel. Duurzaam, stijlvol en verrassend betaalbaar.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Card 1: 70% Goedkoper */}
               <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 md:col-span-2 relative overflow-hidden group">
                  <div className="relative z-10">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-[#C4A47C]">
                        <span className="material-symbols-outlined">savings</span>
                     </div>
                     <h3 className="font-display text-3xl mb-4">Tot 70% Goedkoper</h3>
                     <p className="text-white/60 leading-relaxed max-w-lg">
                        Nieuwe kunststof of aluminium kozijnen zijn een enorme investering. Wrappen kan al vanaf een fractie van de prijs, zonder in te leveren op kwaliteit en uitstraling. Bespaar aanzienlijk op uw renovatiebudget.
                     </p>
                  </div>
                  <span className="absolute right-0 bottom-0 text-[12rem] font-display text-white/[0.02] leading-none -mr-12 -mb-12 pointer-events-none group-hover:scale-105 transition-transform duration-700">01</span>
               </div>

               {/* Card 2: Snel Resultaat (Highlighted) */}
               <div className="bg-[#C4A47C] p-10 rounded-2xl text-[#1A1A1A] flex flex-col justify-between relative overflow-hidden group">
                  <div className="relative z-10">
                     <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center mb-6 text-[#1A1A1A]">
                        <span className="material-symbols-outlined">timer</span>
                     </div>
                     <h3 className="font-display text-3xl mb-4">Snel Resultaat</h3>
                     <p className="text-[#1A1A1A]/80 leading-relaxed text-sm mb-6">
                        Geen wekenlange verbouwingen in stof en lawaai. In de meeste gevallen zijn uw kozijnen binnen 1 dag volledig getransformeerd.
                     </p>
                     <p className="font-display italic font-bold text-lg">
                        "Vandaag geplaatst, vanavond genieten."
                     </p>
                  </div>
                  <span className="absolute right-0 top-0 text-[10rem] font-display text-black/[0.05] leading-none -mr-8 -mt-8 pointer-events-none group-hover:rotate-12 transition-transform duration-700">02</span>
               </div>

               {/* Card 3: Onderhoudsarm */}
               <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#C4A47C]">
                     <span className="material-symbols-outlined text-xl">cleaning_services</span>
                  </div>
                  <h3 className="font-display text-xl mb-3">Onderhoudsarm</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                     Een natte doek is alles wat u nodig heeft. De hoogwaardige folies zijn krasbestendig, duurzaam en vuilafstotend.
                  </p>
               </div>

               {/* Card 4: Eindeloze Opties */}
               <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#C4A47C]">
                     <span className="material-symbols-outlined text-xl">palette</span>
                  </div>
                  <h3 className="font-display text-xl mb-3">Eindeloze Opties</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                     Van mat zwart tot marmerlook of warme houttinten. Meer dan 300 premium designs beschikbaar.
                  </p>
               </div>

               {/* Card 5: Duurzaam */}
               <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#C4A47C]">
                     <span className="material-symbols-outlined text-xl">recycling</span>
                  </div>
                  <h3 className="font-display text-xl mb-3">Duurzaam</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                     Geen afval van oude kozijnen. We hergebruiken de basis, wat beter is voor uw portemonnee én de planeet.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Zicht op Kwaliteit & Transformatie */}
      <section className="py-24 bg-background-light overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6">
            
            {/* Part A: Zicht op Kwaliteit */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
               <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070&auto=format&fit=crop" alt="Window detail close-up" className="w-full h-full object-cover" />
                  </div>
                  {/* Floating detail insert */}
                  <div className="absolute -bottom-10 right-10 w-48 h-48 border-4 border-white shadow-xl overflow-hidden hidden md:block">
                     <img src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop" alt="Corner detail" className="w-full h-full object-cover" />
                  </div>
               </div>
               <div className="lg:col-span-5 lg:pl-8">
                  <span className="w-10 h-[2px] bg-[#C4A47C] block mb-6"></span>
                  <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-6">
                     Zicht op <span className="italic text-[#C4A47C] font-serif">Kwaliteit</span>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                     Onze hoogwaardige interieurfolies zijn niet van echt te onderscheiden. Of u nu kiest voor een strakke matzwarte look of een warme houtnerf, de structuur is voelbaar en zichtbaar authentiek.
                  </p>
                  <p className="text-gray-500 leading-relaxed mb-8">
                     Speciaal ontwikkeld voor duurzaamheid, krasbestendig en eenvoudig te reinigen. Een upgrade die niet alleen mooi is, maar jarenlang meegaat.
                  </p>
                  <a href="/catalogus" className="text-xs font-bold tracking-widest uppercase border-b border-dark pb-1 hover:text-[#C4A47C] hover:border-[#C4A47C] transition-colors">
                     Bekijk Collectie
                  </a>
               </div>
            </div>

            {/* Part B: Het Verloop (Timeline Style) */}
            <div className="text-center mb-24 relative z-10">
               <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Zorgeloze Renovatie</span>
               <h2 className="font-display text-4xl md:text-5xl text-dark">
                  Het Verloop <span className="italic text-gray-400 font-serif">Van Uw Project</span>
               </h2>
            </div>
            
            <div className="space-y-24">
               {[
                  { 
                     step: "01", 
                     title: "Advies & Opmeting", 
                     desc: "We komen bij u langs om de kozijnen te bekijken en nauwkeurig op te meten. We bespreken uw wensen en laten u de mogelijkheden zien.",
                     img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                  },
                  { 
                     step: "02", 
                     title: "Materiaalkeuze", 
                     desc: "Kies de perfecte match. Met meer dan 300 opties in kleuren en structuren vinden we altijd iets dat past bij de uitstraling van uw woning.",
                     img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
                     reverse: true
                  },
                  { 
                     step: "03", 
                     title: "Montage Zonder Sloop", 
                     desc: "Onze specialisten wrappen uw kozijnen vakkundig op locatie. Geen sloopwerk, geen rommel. Vaak zijn we binnen enkele dagen klaar.",
                     img: "https://images.unsplash.com/photo-1599690963544-2f22b822d14c?q=80&w=2670&auto=format&fit=crop"
                  },
                  { 
                     step: "04", 
                     title: "Oplevering & Service", 
                     desc: "Samen lopen we het eindresultaat na. U ontvangt een garantiecertificaat en onderhoudsadvies. Geniet direct van uw 'nieuwe' kozijnen.",
                     img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2670&auto=format&fit=crop",
                     reverse: true
                  }
               ].map((item, idx) => (
                  <div key={idx} className={`relative flex flex-col items-center gap-12 md:gap-24 ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                     
                     {/* Timeline Dot (Desktop) */}
                     <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center font-display text-primary shadow-sm z-20">
                        {item.step}
                     </div>

                     <div className="flex-1 w-full">
                        <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative shadow-lg group">
                           <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                           <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                        </div>
                     </div>
                     <div className="flex-1 text-center md:text-left">
                        <span className="text-[#C4A47C] font-serif italic text-xl mb-4 block md:hidden">Stap {item.step}</span>
                        <h3 className="font-display text-3xl md:text-4xl text-dark mb-6">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                           {item.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>

         </div>
      </section>

      {/* 5. Visualizer & Social Proof */}
      <section className="py-32 bg-[#1a1a1a] relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm shadow-lg">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(217,119,6,0.5)]"></span>
                <span className="text-[10px] text-white tracking-[0.2em] uppercase font-bold">Nieuw: AI Visualizer</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white leading-[1.1]">
                Visualiseer Uw <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 italic">Droomwoning</span>
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                Upload een foto van uw huidige kozijnen en zie binnen enkele minuten hoe onze folies de ruimte transformeren. Technologie ontmoet ambacht.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/configurator" className="group bg-primary text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-all shadow-[0_10px_30px_-10px_rgba(217,119,6,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(217,119,6,0.5)] flex items-center justify-center">
                  <span>Start Configurator</span>
                  <span className="material-symbols-outlined text-lg ml-2 group-hover:rotate-12 transition-transform">auto_fix_high</span>
                </a>
                <a href="/projecten" className="px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-white border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center">
                  Zie Projecten
                </a>
              </div>
            </div>

            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-black/50">
                  <BeforeAfterSlider
                    beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"
                    afterImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                    className="w-full h-full"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materialen Catalogus */}
      <section className="py-32 bg-background-light text-dark">
         <div className="max-w-[1400px] mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             <div className="lg:col-span-4">
               <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Collectie</span>
               <h2 className="font-display text-4xl text-dark mb-6">Premium <br /><span className="italic font-light">Materialen</span></h2>
               <p className="text-gray-500 text-sm leading-relaxed mb-8">
                 Onze collectie omvat meer dan 300 hoogwaardige afwerkingen — van realistische houtnerven en natuursteen tot ultra-matte kleuren en metallic accenten. Elke folie is kras- en stootvast.
               </p>
               <a className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-dark border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors" href="/catalogus">
                 Bekijk Catalogus
                 <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
               </a>
             </div>
             <div className="lg:col-span-8">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { title: "Eikenhout", count: "16+ Variaties", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqUtBVZB4jfDKg40sM8nu8elmT9aC71nACxdbMGxI8RvNDGV_X7djngTbvar8z45btnMmc4Oq4t5yguRYvbTUzxDNKjCK6iNWSmlzDEkwPr66di0YivmeUe9O3oKDjGDE5xuXeDUP7mAiBSGtHl85Xt1sdTpU7jpi94JnrQfu1BTPQ0CindwQ2qdRA2KcLc12RBPBPkd5hcXFgsveEOW_q_rCd0KMn7XnSJEH2i64BsClk-dHIT58vFA40Fm_HxK5ks_ittzJN9Jo" },
                   { title: "Ultra Mat", count: "50+ Variaties", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsvqwxsUEdDIcqrvI8AA5r9MWQbn24oripIYtHCqFgtwJsqwQKXhfdO40A4vJZ1FCHMKr-d3_o6z_YwiSFcaOYGoXoyLFutTLv16mojhZAkY7K5sdUVTsDKjL6tyjDLIB7k4Ab2vltriKnICg8gbouC5Ml9x4NPjZTJBRhL21YVt-l9wj8oR6roB61uKmUCKd87ZsnVtZAxEsIa6x_jKnbjPeOSHrOFXitrV91wivNE_RmlJbpgBofTlOOtBAMYmjIPrWVaDhprZM" },
                   { title: "Metallic", count: "15+ Variaties", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2ikwTkRZPr3ERP5NrmRMOHehJai4aLEDwVFxBsYqNxZ3XuGalDfO6iBhHgFkAQGk4_CeHmHCSWl0jTnr7MNULmck1Mz5aj5W1zORqO5kJa4Yg_bUduJIU_dpC5JHNNzhs5uryM5QbiUvrgjnZ96gCqiqR3l-rVmY2H9506zUHp576tylDtFZTuk3_SZsO4vR5zMXjoTI6Q3wJUbSiM-RpOB9Xgs7pls9vxbtLWcXRjzatW0CadkSFOdCH5m82JPelkDFCA-R7HKI" },
                   { title: "Natuursteen", count: "25+ Variaties", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeAl7EgmXSRq_9kwP0fgkb1f9lgoWzOSgPOLKS2TA8LqwdAMieqI_gUV1nNcKf8XU6fxqe9Wihvo69V0Z00vRnv_Q8DP4Db37_TZabKKxZ9WuP2SketmgjvoyPqTjqL40IptSEfGtD0qKnc7Z0rO00-3l1vGAnVLD7LpuhWRXZ2l5V0DqKxUmGwWSHPnaCT2hclf_MF_n8j_ZF92JmxEBewcmvXKAdTDhS8W-eVUsNjTNZ93REZ-fpogn91grqCUQjp_DFW9wP3yc" },
                 ].map((item, index) => (
                   <div key={index} className="group cursor-pointer">
                     <div className="aspect-square overflow-hidden mb-4 bg-gray-100">
                       <img
                         alt={item.title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                         src={item.image}
                       />
                     </div>
                     <h3 className="font-display text-xl text-dark">{item.title}</h3>
                     <p className="text-xs text-gray-400 font-mono mt-1">{item.count}</p>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Reviews Section */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">format_quote</span>
              <h2 className="font-display text-4xl text-dark">Wat Onze Klanten <span className="italic text-gray-400">Zeggen</span></h2>
            </div>
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div 
                className="flex animate-scroll gap-12 w-max items-start py-12 hover:[animation-play-state:paused]"
                style={{ "--animation-duration": "80s" } as React.CSSProperties}
              >
                {[
                  { quote: "Voor een fractie van de prijs heb ik nu precies de look die ik wilde. De kwaliteit van de folie is echt verbluffend — het voelt als echt hout!", author: "Sophie van der Berg", detail: "Matte Black Finish — Hoekwoning Haarlem", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw" },
                  { quote: "De monteur was super professioneel. Om 9 uur begonnen, om 16 uur klaar. Geen rommel, geen stank en een compleet andere keuken. Ongelofelijk!", author: "Thomas Dekker", detail: "Betonlook — Appartement Amsterdam", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY", className: "md:-mt-8" },
                  { quote: "We wilden een warme houtlook voor ons kookeiland. De nerfstructuur voelt heel natuurlijk aan, en na 2 jaar ziet het er nog steeds perfect uit.", author: "Elise & Mark", detail: "Rustiek Eiken — Twee-onder-een-kap Breda", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRwo0QG3cGcazJtGiKDKbSOSl5YrYgkC7bd5re6bFLjJ5RpJkUnTqxqjICK7bs7v50fEdVvEMnFOdETrAlScnkiGEwjl6xhZsJujHVw0RcucCL0boKG-95d_auEwgBO-RxhmgPfZ1CHPKk3nAkta6T3aamp6RFXn_q3-x3yOtLwx9xRVLyIOQ3EZqsBJE6Lwk9HnostG-8vZNR6nYrxqTqDXGfUUhWqw3qKOen9-ZzCBXUyKlW6Rv7DiCvDQ23oj0L82cNKdHU940" },
                  { quote: "Onze keuken was nog goed, maar de kleur stond ons niet meer aan. Wrappen was de perfecte oplossing. Het resultaat is niet van echt natuursteen te onderscheiden.", author: "Fam. Visser", detail: "Marmerlook — Vrijstaande Woning Utrecht", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                  { quote: "Super blij met de nieuwe kleur! De monteur dacht goed mee over de kleine details en de afwerking is echt top. Een aanrader.", author: "Lisa & Tom", detail: "Soft Touch Moss Green — Nieuwbouw Leidsche Rijn", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" },
                  { quote: "Strak, modern en snel geregeld. Binnen 2 dagen een compleet nieuwe look in ons appartement. Scheelt enorm veel geld vergeleken met een nieuwe keuken.", author: "Jeroen", detail: "Industrial Concrete — Loft Rotterdam", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                  { quote: "We waren bang dat het nep zou lijken, maar de structuur voelt echt aan. Geeft onze woonboot precies die frisse uitstraling die we zochten.", author: "Karin de Jong", detail: "Houtstructuur Licht Eiken — Woonboot Groningen", rating: 5, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80" },
                  { quote: "Zeer professioneel bedrijf. Goede communicatie vooraf en de montage verliep vlekkeloos. Het resultaat straalt luxe uit.", author: "Dhr. S. Bakker", detail: "Ultra Mat Antraciet — Penthouse Den Haag", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                  // Duplicate for smooth loop
                  { quote: "Voor een fractie van de prijs heb ik nu precies de look die ik wilde. De kwaliteit van de folie is echt verbluffend — het voelt als echt hout!", author: "Sophie van der Berg", detail: "Matte Black Finish — Hoekwoning Haarlem", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw" },
                  { quote: "De monteur was super professioneel. Om 9 uur begonnen, om 16 uur klaar. Geen rommel, geen stank en een compleet andere keuken. Ongelofelijk!", author: "Thomas Dekker", detail: "Betonlook — Appartement Amsterdam", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY", className: "md:-mt-8" },
                  { quote: "We wilden een warme houtlook voor ons kookeiland. De nerfstructuur voelt heel natuurlijk aan, en na 2 jaar ziet het er nog steeds perfect uit.", author: "Elise & Mark", detail: "Rustiek Eiken — Twee-onder-een-kap Breda", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRwo0QG3cGcazJtGiKDKbSOSl5YrYgkC7bd5re6bFLjJ5RpJkUnTqxqjICK7bs7v50fEdVvEMnFOdETrAlScnkiGEwjl6xhZsJujHVw0RcucCL0boKG-95d_auEwgBO-RxhmgPfZ1CHPKk3nAkta6T3aamp6RFXn_q3-x3yOtLwx9xRVLyIOQ3EZqsBJE6Lwk9HnostG-8vZNR6nYrxqTqDXGfUUhWqw3qKOen9-ZzCBXUyKlW6Rv7DiCvDQ23oj0L82cNKdHU940" },
                  { quote: "Onze keuken was nog goed, maar de kleur stond ons niet meer aan. Wrappen was de perfecte oplossing. Het resultaat is niet van echt natuursteen te onderscheiden.", author: "Fam. Visser", detail: "Marmerlook — Vrijstaande Woning Utrecht", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                  { quote: "Super blij met de nieuwe kleur! De monteur dacht goed mee over de kleine details en de afwerking is echt top. Een aanrader.", author: "Lisa & Tom", detail: "Soft Touch Moss Green — Nieuwbouw Leidsche Rijn", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" },
                  { quote: "Strak, modern en snel geregeld. Binnen 2 dagen een compleet nieuwe look in ons appartement. Scheelt enorm veel geld vergeleken met een nieuwe keuken.", author: "Jeroen", detail: "Industrial Concrete — Loft Rotterdam", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                  { quote: "We waren bang dat het nep zou lijken, maar de structuur voelt echt aan. Geeft onze woonboot precies die frisse uitstraling die we zochten.", author: "Karin de Jong", detail: "Houtstructuur Licht Eiken — Woonboot Groningen", rating: 5, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80" },
                  { quote: "Zeer professioneel bedrijf. Goede communicatie vooraf en de montage verliep vlekkeloos. Het resultaat straalt luxe uit.", author: "Dhr. S. Bakker", detail: "Ultra Mat Antraciet — Penthouse Den Haag", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                ].map((item, index) => (
                  <div key={index} className={`text-center group w-[400px] shrink-0 ${item.className || ''}`}>
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img alt="Customer" className="w-full h-full object-cover" src={item.image} />
                    </div>
                    <div className="flex justify-center gap-0.5 mb-4">
                      {Array.from({length: item.rating}).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-primary text-sm">star</span>
                      ))}
                    </div>
                    <p className="font-display text-lg italic text-gray-600 mb-6 leading-relaxed">"{item.quote}"</p>
                    <div className="border-t border-gray-100 pt-4 inline-block w-full">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-dark">{item.author}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* 6. FAQ */}
      <FAQ items={windowFaqs} />

      {/* 7. Keuzehulp (Wizard) */}
      <section className="py-16 bg-background-light border-t border-gray-200" id="keuzehulp">
         <div className="max-w-[1400px] mx-auto px-6 text-center mb-12">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Gratis & Vrijblijvend</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-4">
              Uw Kozijnen <span className="italic text-primary">Renovatie Plan</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Beantwoord een paar simpele vragen en ontvang een indicatie op maat. Geen verplichtingen.
            </p>
         </div>
         <div className="max-w-[1400px] mx-auto px-6">
            <KeuzehulpKozijnen />
         </div>
      </section>

    </main>
  );
}
