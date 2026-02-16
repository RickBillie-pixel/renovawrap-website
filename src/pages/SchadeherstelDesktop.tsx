import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FAQ from "../components/FAQ";
import KeuzehulpSchade from "../components/KeuzehulpSchade";


export default function SchadeherstelDesktop() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLQfVa9fZjZPK_NK_bQzLKVSR0S0ZdJfPXanUgVC0GRKBmJcU34Ea1chqPiy9K1LJkMRghQShPyim5Nk5QKl4y4AsKFXK-K-b10GprhTkVPc-j_jOnV2cDMmYmX0R7hAVzyu6CV00XU9ycD1WyGob0yHqXNsD18vqz26epnmDfBUuil4oK8YQ2FZfpUl75081-0Pa51Wb_oQf-JIrIhBqQxGfRGTUeHKcuVFG_ylhhahXPX8eH6pr6aLsHvhm6EmSgMTZHPsSGhI",
      alt: "Schadeherstel resultaat",
    },
  ];

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            HERSTEL
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Specialist in Schadeherstel</span>
                <p className="font-display text-lg italic text-gray-500">Vakkundig. Snel. Voordelig.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Uw interieur weer <br />
                <span className="italic font-normal text-primary">als nieuw</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Heeft u krassen, deuken of waterschade? Wij herstellen uw keuken of meubels onzichtbaar met hoogwaardige folie. U bespaart kosten en vermijdt een dure verbouwing.
              </p>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                  <span className="ml-1 font-bold text-dark">4.9/5</span>
                  <span className="ml-1">Google Reviews</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">100%</span>
                <span>Tevredenheid</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="#keuzehulp">
                  Vraag uw offerte aan
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="/projecten">
                  Zie het resultaat
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
                      <img
                        src={heroImages[currentImageIndex].src}
                        alt={heroImages[currentImageIndex].alt}
                        className="w-full h-full object-cover"
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

      {/* De Kunst van Herstel */}
      <section className="py-24 bg-background-light" id="herstel">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-dark">
              Vakkundig <span className="italic text-[#C4A47C]">Herstel</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-light">
              Of het nu gaat om kleine krassen of hitteschade, onze specialisten herstellen uw oppervlakken zodat u het verschil niet ziet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group">
              <div className="aspect-square overflow-hidden mb-6 bg-gray-100">
                <img 
                  src="https://placehold.co/600x600?text=Diepe+Krassen" 
                  alt="Diepe Krassen" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-2xl mb-2 text-dark">Diepe Krassen</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Wij reconstrueren de structuur van het oppervlak nauwkeurig. De kras wordt onzichtbaar en uw interieur oogt weer strak.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group">
              <div className="aspect-square overflow-hidden mb-6 bg-gray-100">
                <img 
                  src="https://placehold.co/600x600?text=Hitte+%26+Vocht" 
                  alt="Hitte en Vocht" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-2xl mb-2 text-dark">Hitte & Vocht</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Schade door hitte of vocht wordt door ons vakkundig verwijderd. Wij herstellen de ondergrond en brengen een nieuwe toplaag aan.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group">
              <div className="aspect-square overflow-hidden mb-6 bg-gray-100">
                <img 
                  src="https://placehold.co/600x600?text=Loslatende+Folie" 
                  alt="Loslatende Folie" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-2xl mb-2 text-dark">Loslatende Folie</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Laat de folie los? Wij herstellen de hechting met krachtige industriële technieken, zodat uw keuken of meubel weer jaren mee kan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Precisie in elk detail */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-12">
              <div>
                <span className="text-[#C4A47C] font-sans text-xs font-bold tracking-widest uppercase mb-2 block">Onze Werkwijze</span>
                <h2 className="font-display text-5xl md:text-6xl text-dark leading-[1.1]">
                  Zorgvuldig tot in <br/>
                  <span className="italic text-gray-400">elk detail.</span>
                </h2>
              </div>

              <div className="space-y-10">
                {/* Step 1 */}
                <div className="flex gap-6 group">
                  <span className="font-display text-3xl text-[#C4A47C]/40 group-hover:text-[#C4A47C] transition-colors">01</span>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-dark">Grondige Inspectie</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-light max-w-sm">
                      We bekijken de schade nauwkeurig om de juiste aanpak te bepalen. Zo garanderen we een duurzaam herstel dat standhoudt.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6 group">
                  <span className="font-display text-3xl text-[#C4A47C]/40 group-hover:text-[#C4A47C] transition-colors">02</span>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-dark">Nauwkeurige Correctie</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-light max-w-sm">
                      Met gespecialiseerde vulmiddelen egaliseren we de ondergrond volledig. Elke oneffenheid werken we zorgvuldig weg.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6 group">
                  <span className="font-display text-3xl text-[#C4A47C]/40 group-hover:text-[#C4A47C] transition-colors">03</span>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-dark">Hoogwaardige Afwerking</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-light max-w-sm">
                      We brengen de nieuwe toplaag strak aan, exact passend bij uw interieur. Het resultaat is een oppervlak dat weer als nieuw oogt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="relative h-full min-h-[500px] flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-md">
                  {/* Main Image (Repair Kit) */}
                  <div className="relative z-10 w-3/4 aspect-square shadow-2xl bg-gray-900">
                    <img 
                      src="https://placehold.co/600x600/1a1a1a/FFF?text=Repair+Kit" 
                      alt="Repair Kit" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Secondary Image (Texture) */}
                  <div className="absolute -right-12 -top-12 z-0 w-3/4 aspect-square shadow-xl bg-[#C4A47C]">
                    <img 
                      src="https://placehold.co/600x600/C4A47C/000?text=Texture" 
                      alt="Texture Detail" 
                      className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                    />
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sustainable Banner */}
      <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
            <div className="inline-block border border-[#C4A47C] px-4 py-1 rounded-full text-[#C4A47C] text-[10px] uppercase tracking-widest mb-8">
              Duurzaamheid
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-4xl mx-auto mb-16">
              "Repareren is <span className="italic text-[#C4A47C] font-light">90% beter</span> voor het milieu dan vervangen. Kies voor waardebehoud en voorkom verspilling."
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto border-t border-white/10 pt-12">
               <div>
                  <span className="block text-4xl font-display text-white mb-2">90%</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Minder CO2 Uitstoot</span>
               </div>
               <div>
                  <span className="block text-4xl font-display text-white mb-2">100%</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Circulair Denken</span>
               </div>
               <div>
                  <span className="block text-4xl font-display text-white mb-2">5 jr</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Garantie op Herstel</span>
               </div>
            </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Keuzehulp (Wizard) */}
      <section className="py-16 bg-background-light" id="keuzehulp">
         <div className="max-w-[1400px] mx-auto px-6 text-center mb-12">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Gratis & Vrijblijvend</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-4">
              Meld Uw <span className="italic text-primary">Schade</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Beschrijf de schade aan uw interieur en ontvang een vrijblijvende offerte voor het herstel.
            </p>
         </div>
         <div className="max-w-[1400px] mx-auto px-6">
            <KeuzehulpSchade />
         </div>
      </section>
    </main>
  );
}
