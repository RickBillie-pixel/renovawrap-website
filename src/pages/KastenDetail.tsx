import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FAQ from "../components/FAQ";
import KeuzehulpKasten from "../components/KeuzehulpKasten";
import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "../hooks/useSEO";

export default function KastenDetail() {
  useSEO({
    title: "Inbouwkasten Wrappen — Premium Renovatie Zonder Sloop | Renovawrap",
    description: "Geef uw inbouwkast, kledingkast of dressoir een hoogwaardige design-look. Duurzaam, stofvrij en voordeliger dan nieuw.",
    canonical: canonicalFor("/diensten/kasten"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Kasten", url: canonicalFor("/diensten/kasten") },
      ]),
      ...buildService("Kasten Wrappen", "Kasten en inbouwkasten wrappen met premium interieurfolie. Hoogwaardige afwerking zonder sloopwerk."),
    ],
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Example imagery - Reuse existing or placeholders if specific ones aren't available yet
  // Using some placeholders for now, should be replaced with real Kast before/afters
  const heroImages = [
    {
      before: "/project-fotos/before4.webp", // Assuming this exists or works as placeholder
      after: "/project-fotos/after4.webp",
    },
    {
       before: "/project-fotos/before5.webp",
       after: "/project-fotos/after5.webp",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      
      {/* 1. Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            KASTEN
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Slimme Renovatie</span>
                <p className="font-display text-lg italic text-gray-500">Design Zonder Bouwstof.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Inbouwkasten <br />
                <span className="italic font-normal text-primary">Als Nieuw</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Waarom een nieuwe kast aanschaffen als de basis nog perfect is? Wij transformeren uw bestaande kasten, dressoirs en keukens met hoogwaardige interieurfolies. Het resultaat: een luxe, krasvaste design-look voor een fractie van de nieuwprijs.
              </p>
              
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-primary text-sm">star</span>)}
                  <span className="ml-1 font-bold text-dark">4.9</span>
                  <span className="ml-1">Uitstekend</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">500+</span>
                <span>Kasten Gerenoveerd</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="#keuzehulp">
                  Vrijblijvende Offerte
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="/projecten">
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

      {/* 2. Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-start mb-16">
              <div className="max-w-xl">
                 <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Metamorfose</span>
                 <h2 className="font-display text-4xl md:text-6xl text-dark leading-tight">
                    Inbouwkasten Renovatie <br />
                    <span className="italic text-primary font-serif">Zonder Sloopwerk</span>
                 </h2>
              </div>
              <div className="mt-8 md:mt-0 max-w-md">
                 <p className="text-gray-500 leading-relaxed text-sm">
                    Is de indeling van uw kast nog perfect, maar past de kleur niet meer bij uw interieur? Of wilt u van die standaard witte inbouwkast een echte eyecatcher maken? Met wrappen upgraden wij uw meubels naar een premium niveau, zonder de kosten en overlast van een complete vervanging.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* 3. Categories Zig-Zag Section (Overlapping Cards Style) */}
      <section className="bg-background-light py-12 overflow-hidden">
         {/* Row 1: Slaapkamer & Walk-in */}
         <div className="max-w-[1400px] mx-auto px-6 mb-32">
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
               <div className="md:col-span-8 relative aspect-[4/3] md:aspect-[16/9] shadow-lg overflow-hidden">
                  <img 
                     src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=2560&auto=format&fit=crop" 
                     alt="Slaapkamer kast renovatie" 
                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
               </div>
               <div className="md:col-span-4 md:-ml-24 relative z-10 mt-8 md:mt-0">
                  <div className="bg-white p-12 shadow-2xl border-l-4 border-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
                      <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-4 block group-hover:text-dark transition-colors">01 - Rust & Luxe</span>
                      <h3 className="font-display text-4xl text-dark mb-6 font-serif leading-tight group-hover:text-primary transition-colors">Slaapkamer <span className="italic">&</span> Walk-in</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8">
                         Creëer een oase van rust. Transformeer uw kledingkast met een zachte linnen-structuur of ga voor de exclusieve uitstraling van warm hout.
                      </p>
                      <a href="/projecten" className="text-xs font-bold tracking-widest uppercase border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors">
                         Bekijk Voorbeelden
                      </a>
                  </div>
               </div>
            </div>
         </div>

         {/* Row 2: Hal & Garderobe (Reversed) */}
         <div className="max-w-[1400px] mx-auto px-6 mb-32">
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
               <div className="md:col-span-4 md:-mr-24 relative z-10 mb-8 md:mb-0 order-2 md:order-1">
                  <div className="bg-white p-12 shadow-2xl border-r-4 border-primary text-right md:text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
                      <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-4 block group-hover:text-dark transition-colors">02 - Eerste Indruk</span>
                      <h3 className="font-display text-4xl text-dark mb-6 font-serif leading-tight group-hover:text-primary transition-colors">Hal <span className="italic">&</span> Garderobe</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8">
                         Uw hal is het visitekaartje van uw woning. Maak van een rommelige kapstok of standaard kast een strak en georganiseerd statement.
                      </p>
                      <a href="/projecten" className="text-xs font-bold tracking-widest uppercase border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors">
                         Ontdek Mogelijkheden
                      </a>
                  </div>
               </div>
               <div className="md:col-span-8 relative aspect-[4/3] md:aspect-[16/9] shadow-lg overflow-hidden order-1 md:order-2">
                  <img 
                     src="https://images.unsplash.com/photo-1621293954908-eae6d5e53434?q=80&w=2560&auto=format&fit=crop" 
                     alt="Hal garderobe renovatie" 
                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
               </div>
            </div>
         </div>

         {/* Row 3: Boekenkasten (Same as Row 1) */}
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
               <div className="md:col-span-8 relative aspect-[4/3] md:aspect-[16/9] shadow-lg overflow-hidden">
                  <img 
                     src="https://images.unsplash.com/photo-1594918734289-5107e3a09726?q=80&w=2670&auto=format&fit=crop" 
                     alt="Boekenkast renovatie" 
                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
               </div>
               <div className="md:col-span-4 md:-ml-24 relative z-10 mt-8 md:mt-0">
                  <div className="bg-white p-12 shadow-2xl border-l-4 border-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
                      <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-4 block group-hover:text-dark transition-colors">03 - Woonkamer</span>
                      <h3 className="font-display text-4xl text-dark mb-6 font-serif leading-tight group-hover:text-primary transition-colors">Boekenkasten <span className="italic">&</span> TV-Meubels</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8">
                         Geef uw woonkamer character. Een open vakkenkast of tv-meubel krijgt direct allure met een chique marmerlook of stoere betonfinish.
                      </p>
                      <a href="/projecten" className="text-xs font-bold tracking-widest uppercase border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors">
                         Bekijk Inspiratie
                      </a>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Details Section (Dark) */}
      <section className="py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
         {/* Background Typography */}
         <div className="absolute top-0 right-0 pointer-events-none select-none z-0">
             <span className="text-[15rem] md:text-[20rem] font-display font-bold text-white/[0.03] leading-none tracking-tighter whitespace-nowrap translate-x-1/4 -translate-y-1/4 block">
                Details
             </span>
         </div>

         <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
            <span className="text-[#C4A47C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Kwaliteit Tot In Detail</span>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-16">
               De Kracht van <span className="italic text-[#C4A47C] font-serif">Details</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Item 1 */}
               <div className="bg-white/5 p-10 border border-white/10 group hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#C4A47C]/30 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#C4A47C]/10 flex items-center justify-center mb-6 text-[#C4A47C] group-hover:scale-110 group-hover:bg-[#C4A47C] group-hover:text-black transition-all duration-300">
                     <span className="material-symbols-outlined text-3xl">architecture</span>
                  </div>
                  <h3 className="font-display text-2xl mb-4 group-hover:text-[#C4A47C] transition-colors">Naadloze Afwerking</h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-center group-hover:text-gray-300 transition-colors">
                     Wij wrappen niet zomaar overheen; wij werken af. Randen, hoeken en grepen worden professioneel behandeld voor een resultaat dat niet van spuitwerk te onderscheiden is.
                  </p>
               </div>
               
               {/* Item 2 - Highlighted */}
               <div className="bg-[#C4A47C] p-10 border border-[#C4A47C] text-[#1A1A1A] flex flex-col items-center shadow-[0_0_40px_rgba(196,164,124,0.3)] relative -my-4 z-10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(196,164,124,0.5)] group">
                   <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center mb-6 text-black group-hover:bg-black group-hover:text-[#C4A47C] transition-all duration-300 transform group-hover:rotate-12">
                     <span className="material-symbols-outlined text-3xl">palette</span>
                  </div>
                  <h3 className="font-display text-2xl mb-4">Kleuren & Structuren</h3>
                  <p className="text-[#1A1A1A]/80 text-sm leading-relaxed text-center font-medium">
                     Ontdek onze collectie van 200+ premium folies. Voelbare houtnerven, realistische steenlooks en ultramatte kleuren die geen vingerafdrukken achterlaten.
                  </p>
               </div>
               
               {/* Item 3 */}
               <div className="bg-white/5 p-10 border border-white/10 group hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#C4A47C]/30 flex flex-col items-center">
                   <div className="w-16 h-16 rounded-full bg-[#C4A47C]/10 flex items-center justify-center mb-6 text-[#C4A47C] group-hover:scale-110 group-hover:bg-[#C4A47C] group-hover:text-black transition-all duration-300">
                     <span className="material-symbols-outlined text-3xl">shield</span>
                  </div>
                  <h3 className="font-display text-2xl mb-4 group-hover:text-[#C4A47C] transition-colors">Kras- & Stootvast</h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-center group-hover:text-gray-300 transition-colors">
                     Onze speciaal ontwikkelde interieurfolie is bestand tegen dagelijks gebruik. Krasvast, hittebestendig en eenvoudig schoon te houden. Een duurzame investering.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 5. Process: Het Verloop */}
      <section className="py-24 bg-white relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 -translate-x-1/2"></div>
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
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
                     desc: "We komen bij u langs om de situatie te bekijken. We nemen stalen mee, bespreken uw wensen en meten alles nauwkeurig op voor een offerte op maat.",
                     img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                  },
                  { 
                     step: "02", 
                     title: "Materiaalkeuze", 
                     desc: "Kies de perfecte match. We adviseren u graag over welke kleur en structuur het beste past bij uw vloer, lichtinval en persoonlijke stijl.",
                     img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
                     reverse: true
                  },
                  { 
                     step: "03", 
                     title: "Montage Zonder Sloop", 
                     desc: "Onze vakkundige monteurs gaan aan de slag. We werken schoon, stil en snel. Vaak is uw kast binnen één dag al volledig getransformeerd.",
                     img: "https://images.unsplash.com/photo-1599690963544-2f22b822d14c?q=80&w=2670&auto=format&fit=crop"
                  },
                  { 
                     step: "04", 
                     title: "Oplevering & Service", 
                     desc: "Samen lopen we het eindresultaat na. U ontvangt onderhoudstips en een garantiecertificaat. Geniet direct van uw 'nieuwe' meubel.",
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

      {/* 6. Visualizer / CTA (Dark) */}
      <section className="py-24 bg-[#111] text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
             <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" alt="" className="w-full h-full object-cover grayscale" />
         </div>
         <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <span className="border border-white/30 text-white/70 px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold mb-6 inline-block">
                  Visualizer
               </span>
               <h2 className="font-display text-5xl md:text-6xl mb-6">
                  Visualiseer Uw <br /> <span className="italic text-[#C4A47C] font-serif">Droomkast</span>
               </h2>
               <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                  Twijfelt u tussen mat zwart, warm eiken of betonlook? Gebruik onze online catalogus om de mogelijkheden te bekijken of vraag een stalenpakket aan.
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#keuzehulp" className="bg-[#C4A47C] text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors text-center">
                     Start Keuzehulp
                  </a>
                  <a href="/catalogus" className="border border-white/30 text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors text-center">
                     Bekijk Catalogus
                  </a>
               </div>
            </div>
            <div className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-md aspect-square bg-white/5 p-8 border border-white/10 backdrop-blur-sm group cursor-pointer">
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsvqwxsUEdDIcqrvI8AA5r9MWQbn24oripIYtHCqFgtwJsqwQKXhfdO40A4vJZ1FCHMKr-d3_o6z_YwiSFcaOYGoXoyLFutTLv16mojhZAkY7K5sdUVTsDKjL6tyjDLIB7k4Ab2vltriKnICg8gbouC5Ml9x4NPjZTJBRhL21YVt-l9wj8oR6roB61uKmUCKd87ZsnVtZAxEsIa6x_jKnbjPeOSHrOFXitrV91wivNE_RmlJbpgBofTlOOtBAMYmjIPrWVaDhprZM" className="w-full h-full object-cover shadow-xl transition-transform duration-500 group-hover:scale-[1.02]" alt="Kleurstaal voorbeeld" />
                   <div className="absolute top-1/2 -right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-dark shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined">chevron_right</span>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* 7. FAQ */}
      <FAQ />

      {/* 8. Keuzehulp Wizard */}
      <section className="py-16 bg-background-light border-t border-gray-200" id="keuzehulp">
        <div className="max-w-[1400px] mx-auto px-6 text-center mb-12">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Direct Inzicht</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-4">
              Uw Offerte <span className="italic text-primary">Binnen 24 Uur</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Geen lange wachttijden of ingewikkelde procedures. Beantwoord een paar vragen, upload een foto, en wij sturen u een transparant voorstel.
            </p>
        </div>
        <div className="max-w-[1400px] mx-auto px-6">
          <KeuzehulpKasten />
        </div>
      </section>
    </main>
  );
}
