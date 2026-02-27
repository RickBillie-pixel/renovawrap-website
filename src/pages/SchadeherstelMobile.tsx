// import { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "../components/FadeIn";

import FAQ from "../components/FAQ";
import { repairFaqs } from "../data/faqs";
import KeuzehulpSchade from "../components/KeuzehulpSchade";
import CountUp from "../components/CountUp";


export default function SchadeherstelMobile() {



  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="hidden lg:block absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            HERSTEL
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Background text watermark (Mobile) */}
            <div className="lg:hidden absolute inset-0 flex items-start justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden pt-8">
              <span className="font-display font-bold text-[20vw] leading-none text-dark whitespace-nowrap tracking-tighter">
                HERSTEL
              </span>
            </div>

            {/* Mobile Layout (Visible only on < lg) */}
            <div className="lg:hidden flex flex-col h-[calc(100vh-140px)] justify-between pb-6 pt-5 relative z-10">
               <div className="border-b border-dark/10 pb-4 mb-6">
                 <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-dark">
                  Schadeherstel <br />
                  <span className="italic text-primary">service</span>
                </h1>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                    Krassen of schade? Wij herstellen uw keuken of meubels onzichtbaar met folie. Voordeliger dan vervangen en snel klaar.
                  </p>

                   {/* Trust Badges - Single Line */}
                  <div className="flex items-center gap-2 pt-4 text-xs text-gray-400 whitespace-nowrap overflow-hidden">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                      <span className="ml-1 font-bold text-dark">4.9/5</span>
                      <span className="ml-1">Google Reviews</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="font-bold text-dark">100%</span>
                    <span>Tevredenheid</span>
                  </div>
                </div>
               </div>

              {/* Slider (Fills remaining space) */}
              <div className="relative w-full flex-1 min-h-[200px] shadow-lg overflow-hidden bg-gray-100 mt-4 mb-4 rounded-lg">
                  <img
                    src="/schade.png"
                    alt="Schadeherstel resultaat"
                    className="w-full h-full object-cover"
                  />
              </div>

               <div className="relative z-20 flex flex-col gap-3">
                <button type="button" onClick={() => document.getElementById('keuzehulp')?.scrollIntoView({ behavior: 'smooth' })} className="bg-dark text-white px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center w-full shadow-lg cursor-pointer">
                  Gratis Offerte
                </button>
                <button type="button" onClick={() => { window.location.href = '/projecten'; }} className="flex items-center justify-center text-xs font-bold tracking-widest uppercase border border-dark px-6 py-4 hover:bg-dark hover:text-white transition-all w-full cursor-pointer bg-transparent">
                  Bekijk Voor & Na Foto's
                </button>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-6 space-y-8">
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
            <div className="hidden lg:flex lg:col-span-6 justify-center">
              <div className="relative w-full max-w-xl">
                <div className="relative z-10 w-full aspect-square shadow-2xl overflow-hidden bg-gray-100">
                  <img
                    src="/schade.png"
                    alt="Schadeherstel resultaat"
                    className="w-full h-full object-cover"
                  />
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

          
          {/* Mobile View - Animated */}
          <div className="flex flex-col gap-24 md:hidden">
            {[
              {
                title: "Diepe Krassen",
                desc: "Wij reconstrueren de structuur van het oppervlak nauwkeurig. De kras wordt onzichtbaar en uw interieur oogt weer strak.",
                image: "/diensten/schade-kras.webp"
              },
              {
                title: "Hitte & Vocht",
                desc: "Schade door hitte of vocht wordt door ons vakkundig verwijderd. Wij herstellen de ondergrond en brengen een nieuwe toplaag aan.",
                image: "/waterdicht.webp"
              }
            ].map((item, index) => (
              <FadeIn 
                key={index} 
                direction={index % 2 === 0 ? "left" : "right"} 
                className="w-full"
                threshold={0.2}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                  {/* Image Container */}
                  <div className={`relative w-[85%] aspect-[3/4] mb-8 shadow-2xl ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                     <div className="w-full h-full overflow-hidden group cursor-pointer block">
                       <img
                         alt={item.title}
                         className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                         src={item.image}
                       />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                     </div>
                     
                     {/* Number Badge */}
                     <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} bg-white p-6 shadow-xl z-20`}>
                       <span className="font-display text-4xl text-primary font-bold">0{index + 1}</span>
                     </div>
                  </div>

                  {/* Text Content */}
                  <div className={`w-[90%] ${index % 2 === 0 ? 'text-left pl-4' : 'text-right pr-4'} mt-8`}>
                    <div className="group cursor-pointer block">
                      <h3 className="font-display text-4xl text-dark mb-4 group-hover:text-primary transition-colors leading-[0.9]">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {item.desc}
                      </p>
                      <div className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-dark group-hover:gap-5 transition-all ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        Meer Info
                        <span className={`material-symbols-outlined text-sm ${index % 2 !== 0 ? 'rotate-180' : ''}`}>arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Desktop View - Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Diepe Krassen",
                desc: "Wij reconstrueren de structuur van het oppervlak nauwkeurig. De kras wordt onzichtbaar en uw interieur oogt weer strak.",
                image: "/diensten/schade-kras.webp"
              },
              {
                title: "Hitte & Vocht",
                desc: "Schade door hitte of vocht wordt door ons vakkundig verwijderd. Wij herstellen de ondergrond en brengen een nieuwe toplaag aan.",
                image: "/waterdicht.webp"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="aspect-square overflow-hidden mb-6 bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-2xl mb-2 text-dark">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
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
                  <div className="relative z-10 w-3/4 aspect-square shadow-2xl bg-gray-900 mx-auto">
                    <img 
                      src="/repair-kit.webp" 
                      alt="Repair Kit" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Secondary Image (Texture) */}
                  <div className="absolute -right-4 -top-8 z-0 w-3/4 aspect-square shadow-xl bg-[#C4A47C]">
                    <img 
                      src="/quality.webp" 
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 max-w-3xl mx-auto border-t border-white/10 pt-12 items-start justify-items-center">
               <div className="col-span-2 md:col-span-1 flex flex-col items-center">
                  <CountUp 
                    end={90} 
                    suffix="%" 
                    className="block text-4xl font-display text-white mb-2" 
                    suffixClassName="text-4xl"
                  />
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Minder CO2 Uitstoot</span>
               </div>
               <div className="col-span-1 md:col-span-1 flex flex-col items-center">
                  <CountUp 
                    end={100} 
                    suffix="%" 
                    className="block text-4xl font-display text-white mb-2" 
                    suffixClassName="text-4xl"
                  />
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Circulair Denken</span>
               </div>
               <div className="col-span-1 md:col-span-1 flex flex-col items-center">
                  <CountUp 
                    end={5} 
                    suffix=" jr" 
                    className="block text-4xl font-display text-white mb-2" 
                    suffixClassName="text-4xl"
                  />
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Garantie op Herstel</span>
               </div>
            </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={repairFaqs} />

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
