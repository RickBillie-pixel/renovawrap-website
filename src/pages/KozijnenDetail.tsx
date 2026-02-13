import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FAQ from "../components/FAQ";
import KeuzehulpKozijnen from "../components/KeuzehulpKozijnen";
import { useSEO, buildBreadcrumbs, buildService } from "@/hooks/useSEO";

export default function KozijnenDetail() {
  useSEO({
    title: "Kozijnen Wrappen — Zwarte Kozijnen Zonder Schilderwerk | Renovawrap",
    description: "Kozijnen, ramen en schuifpuien wrappen met UV-bestendige buitenfolie. Niet van gepoedercoat aluminium te onderscheiden.",
    canonical: "https://renovawrap.nl/diensten/kozijnen",
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: "https://renovawrap.nl/" },
        { name: "Diensten", url: "https://renovawrap.nl/diensten" },
        { name: "Kozijnen", url: "https://renovawrap.nl/diensten/kozijnen" },
      ]),
      ...buildService("Kozijnen Wrappen", "Kozijnen, ramen en schuifpuien wrappen met UV-bestendige buitenfolie. Zonder steigers, zonder sloopwerk."),
    ],
  });

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
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Exterieur & Interieur</span>
                <p className="font-display text-lg italic text-gray-500">De aluminium look, zonder de prijs.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Zwarte Kozijnen <br />
                <span className="italic font-normal text-primary">Zonder Schilderen</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Witte kunststof kozijnen? Vervangen kost al snel €15.000+. Wij wrappen uw kozijnen, ramen en schuifpuien met UV-bestendige buitenfolie — niet van gepoedercoat aluminium te onderscheiden.
              </p>
              
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-primary text-sm">star</span>)}
                  <span className="ml-1 font-bold text-dark">4.9</span>
                  <span className="ml-1">Google Reviews</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">10 Jaar</span>
                <span>Garantie</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="#keuzehulp">
                  Gratis Offerte
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="#portfolio">
                  Bekijk Resultaten
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
                    <span className="font-display text-2xl md:text-4xl text-primary">10</span>
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
                     Een natte doek is alles wat u nodig heeft. De hoogwaardige folies zijn krasbestendig, hittebestendig en vuilafstotend.
                  </p>
               </div>

               {/* Card 4: Eindeloze Opties */}
               <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#C4A47C]">
                     <span className="material-symbols-outlined text-xl">palette</span>
                  </div>
                  <h3 className="font-display text-xl mb-3">Eindeloze Opties</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                     Van mat zwart tot marmerlook of warme houttinten. Meer dan 200 premium designs beschikbaar.
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

            {/* Part B: De Transformatie (Process - ZigZag) */}
            <div className="text-center mb-16 relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 opacity-10">
                    <span className="font-display text-9xl text-gray-300">01</span>
                 </div>
                 <span className="inline-block px-4 py-1 rounded-full border border-gray-200 text-gray-400 text-[10px] tracking-widest uppercase mb-4 relative z-10 bg-background-light">
                   Werkwijze
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-dark relative z-10">
                   De <span className="italic text-[#C4A47C] font-serif">Transformatie</span>
                </h2>
            </div>

            {/* Step 1: Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
               {/* Image */}
               <div className="space-y-6">
                  <div className="aspect-video overflow-hidden shadow-lg border border-gray-100 relative group">
                     <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1500&auto=format&fit=crop" alt="Voorbereiding" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-4 left-4 font-display text-6xl text-white/20 font-bold">01</div>
                  </div>
               </div>
               {/* Text */}
               <div>
                  <h3 className="font-display text-2xl text-dark mb-2">Voorbereiding & Reiniging</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     Alles begint met een perfecte basis. We ontvetten de kozijnen grondig en egaliseren eventuele oneffenheden. Geen stof, geen sloopwerk, enkel precisie.
                  </p>
                  <ul className="mt-4 space-y-2">
                     <li className="text-xs text-gray-400 flex items-center gap-2"><span className="text-[#C4A47C]">✓</span> Dieptereiniging</li>
                     <li className="text-xs text-gray-400 flex items-center gap-2"><span className="text-[#C4A47C]">✓</span> Reparatie beschadigingen</li>
                  </ul>
               </div>
            </div>

            {/* Step 2: Text Left, Image Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
               {/* Text (Order 2 on mobile, Order 1 on desktop) */}
               <div className="order-2 md:order-1">
                  <h3 className="font-display text-2xl text-dark mb-2">Applicatie</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     Onze gecertificeerde specialisten brengen de folie aan met chirurgische precisie. De folie vormt zich naadloos om hoeken en randen door middel van hitte-techniek.
                  </p>
                  <ul className="mt-4 space-y-2">
                     <li className="text-xs text-gray-400 flex items-center gap-2"><span className="text-[#C4A47C]">✓</span> Naadloze hoeken</li>
                     <li className="text-xs text-gray-400 flex items-center gap-2"><span className="text-[#C4A47C]">✓</span> Luchtbelvrij resultaat</li>
                  </ul>
               </div>
               {/* Image (Order 1 on mobile, Order 2 on desktop) */}
               <div className="space-y-6 order-1 md:order-2">
                  <div className="aspect-video overflow-hidden shadow-lg border border-gray-100 relative group">
                     <img src="https://images.unsplash.com/photo-1621293954908-eae6d5e53434?q=80&w=1500&auto=format&fit=crop" alt="Applicatie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-4 right-4 font-display text-6xl text-white/20 font-bold">02</div>
                  </div>
               </div>
            </div>

            {/* Step 3: Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               {/* Image */}
               <div className="space-y-6">
                   <div className="aspect-video overflow-hidden shadow-lg border border-gray-100 relative group">
                     <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1500&auto=format&fit=crop" alt="Finishing Touch" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-4 left-4 font-display text-6xl text-white/20 font-bold">03</div>
                  </div>
               </div>
               {/* Text */}
               <div>
                  <h3 className="font-display text-2xl text-dark mb-2">Finishing Touch</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     Het resultaat is verbluffend. We kitten de randen strak af voor een waterdichte en esthetische perfecte aansluiting. Uw kozijnen zijn niet van nieuw te onderscheiden.
                  </p>
                  <div className="mt-4">
                     <a href="/projecten" className="text-xs text-[#C4A47C] border-b border-[#C4A47C]/30 hover:border-[#C4A47C] transition-colors pb-1">Bekijk voor en na foto's</a>
                  </div>
               </div>
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
                Upload een foto van uw huidige kozijnen en zie binnen seconden hoe onze folies de ruimte transformeren. Technologie ontmoet ambacht.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/configurator" className="group bg-primary text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-all shadow-[0_10px_30px_-10px_rgba(217,119,6,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(217,119,6,0.5)] flex items-center justify-center">
                  <span>Start Configurator</span>
                  <span className="material-symbols-outlined text-lg ml-2 group-hover:rotate-12 transition-transform">auto_fix_high</span>
                </a>
                <a href="#werkwijze" className="px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-white border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center">
                  Hoe het werkt
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
          <div className="max-w-[1400px] mx-auto px-6 text-center mb-16">
             <span className="material-symbols-outlined text-3xl text-[#C4A47C]/50">format_quote</span>
             <h2 className="font-display text-4xl md:text-5xl text-dark mt-4">
               Wat Onze Klanten <span className="italic text-[#C4A47C] font-serif">Zeggen</span>
             </h2>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center text-[#C4A47C] text-sm mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6">"Strak, modern en snel geregeld. Binnen 2 dagen een compleet nieuwe look voor onze kozijnen."</p>
                <div className="text-xs font-bold uppercase tracking-widest text-dark">Jeroen</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Loft Rotterdam</div>
             </div>
             <div className="text-center p-8 bg-gray-50 rounded-2xl md:-mt-8 shadow-xl relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white">
                   <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center text-[#C4A47C] text-sm mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6">"We waren bang dat het nep zou lijken, maar de structuur voelt echt aan. Geeft onze woonboot precies die frisse uitstraling."</p>
                <div className="text-xs font-bold uppercase tracking-widest text-dark">Karin De Jong</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Woonboot Groningen</div>
             </div>
             <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center text-[#C4A47C] text-sm mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6">"Zeer professioneel bedrijf. Goede communicatie vooraf en de montage verliep vlekkeloos."</p>
                <div className="text-xs font-bold uppercase tracking-widest text-dark">Dhr. S. Bakker</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Penthouse Den Haag</div>
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
