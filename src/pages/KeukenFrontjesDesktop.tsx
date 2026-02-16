import { useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import KeuzehulpFrontjes from "../components/KeuzehulpFrontjes";
import KitchenBenefits from "../components/KitchenBenefits";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FAQ from "../components/FAQ";

export default function KeukenFrontjesDesktop() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      before: "/project-fotos/before14.webp",
      after: "/project-fotos/after14.webp",
    },
    {
      before: "/project-fotos/before12.webp",
      after: "/project-fotos/after12.webp",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Preload images
  useEffect(() => {
    heroImages.forEach((image) => {
      const img1 = new Image();
      img1.src = image.before;
      const img2 = new Image();
      img2.src = image.after;
    });
  }, []);

  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            FRONTJES
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Bespaar Duizenden Euro's Op Een Nieuwe Keuken</span>
                <p className="font-display text-lg italic text-gray-500">Uw droomkeuken, zonder de verbouwing.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Keuken <br />
                <span className="italic font-normal text-primary">Frontjes</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Uitgekeken op uw keukenfrontjes? Een nieuwe keuken kost al snel €8.000+. Wij wrappen uw bestaande frontjes met premium interieurfolie in elke gewenste kleur en structuur. Niet van echt te onderscheiden, klaar binnen twee dagen en een fractie van de kosten.
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
                <span>Frontjes</span>
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

      {/* Applications Section */}
      <section className="py-32 bg-white" id="portfolio">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-100 pb-12">
            <div className="max-w-xl">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Mogelijkheden</span>
              <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">Meer Dan Alleen <span className="italic text-gray-400">Een Kleurtje</span></h2>
            </div>
             <p className="text-gray-500 max-w-sm mt-6 md:mt-0 text-sm leading-relaxed">
                Wij wrappen niet zomaar overheen; wij transformeren. Van strakke moderne lak-looks tot voelbare houtstructuren.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Vlakke Fronten",
                desc: "Ideaal voor een moderne, minimalistische 'Soft Touch' of hoogglans afwerking. Strak en tijdloos.",
                image: "/project-fotos/after11.webp"
              },
              {
                title: "Kader & Profiel",
                desc: "Heeft u klassieke frontjes met reliëf? Geen probleem. Onze folies vormen zich perfect naar de contouren.",
                image: "/project-fotos/after12.webp",
                className: "md:mt-24"
              },
              {
                title: "Herstel & Correctie",
                desc: "Loslatende folie van de fabriek? Wij verwijderen de oude laag en brengen een duurzamere nieuwe laag aan.",
                image: "/project-fotos/after13.webp"
              }
            ].map((item, index) => (
              <div key={index} className={`group cursor-pointer ${item.className || ''}`}>
                <div className="relative overflow-hidden mb-8 aspect-[3/4]">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-start border-t border-gray-200 pt-6">
                  <div>
                    <span className="text-xs text-primary font-mono mb-2 block">0{index + 1}</span>
                    <h3 className="font-display text-2xl text-dark mb-2 group-hover:italic transition-all">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                      {item.desc}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-dark transition-colors">arrow_outward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom Keuken Wrappen */}
      <KitchenBenefits />

      {/* Werkwijze */}
      <section className="py-32 bg-white" id="werkwijze">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Werkwijze</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">In 4 Stappen <span className="italic text-gray-400">Naar Uw Nieuwe Keuken</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Gratis Adviesgesprek", desc: "Wij komen langs voor een vrijblijvende opmeting en bespreken uw wensen en mogelijkheden.", icon: "chat" },
              { step: "02", title: "Kleurkeuze", desc: "Kies uit ons uitgebreide stalenboek met 300+ kleuren. Wij adviseren u over de beste match.", icon: "color_lens" },
              { step: "03", title: "Professionele Montage", desc: "Onze gecertificeerde monteurs wrappen uw frontjes in slechts één werkdag.", icon: "construction" },
              { step: "04", title: "Oplevering & Nazorg", desc: "Na oplevering ontvangt u een garantiecertificaat en onderhoudsinstructies.", icon: "handshake" },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-gray-200 group-hover:border-primary transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-primary transition-colors">{item.icon}</span>
                </div>
                <span className="text-primary font-mono text-xs font-bold block mb-3">{item.step}</span>
                <h3 className="font-display text-xl text-dark mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Visualizer Promo */}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 italic">Droomkeuken</span>
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                Upload een foto van uw huidige keuken en zie binnen seconden hoe onze folies de ruimte transformeren.
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
                    beforeImage="/project-fotos/before15.webp"
                    afterImage="/project-fotos/after14.webp"
                    className="w-full h-full"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
       <section className="py-32 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Onze Collectie</span>
              <h2 className="font-display text-4xl text-dark mb-6">Materialen <br /><span className="italic font-light">Van Wereldklasse</span></h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Wij werken uitsluitend met A-merken zoals 3M en Avery Dennison. Krasvast, kleurvast en met een voelbare structuur die niet van echt te onderscheiden is.
              </p>
              <a className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-dark border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors" href="/catalogus">
                Bekijk Alle Kleuren
                <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
              </a>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { title: "Hout Looks", count: "Eiken, Noten, Essen", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqUtBVZB4jfDKg40sM8nu8elmT9aC71nACxdbMGxI8RvNDGV_X7djngTbvar8z45btnMmc4Oq4t5yguRYvbTUzxDNKjCK6iNWSmlzDEkwPr66di0YivmeUe9O3oKDjGDE5xuXeDUP7mAiBSGtHl85Xt1sdTpU7jpi94JnrQfu1BTPQ0CindwQ2qdRA2KcLc12RBPBPkd5hcXFgsveEOW_q_rCd0KMn7XnSJEH2i64BsClk-dHIT58vFA40Fm_HxK5ks_ittzJN9Jo" },
                  { title: "Uni Kleuren", count: "Mat, Satijn, Hoogglans", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsvqwxsUEdDIcqrvI8AA5r9MWQbn24oripIYtHCqFgtwJsqwQKXhfdO40A4vJZ1FCHMKr-d3_o6z_YwiSFcaOYGoXoyLFutTLv16mojhZAkY7K5sdUVTsDKjL6tyjDLIB7k4Ab2vltriKnICg8gbouC5Ml9x4NPjZTJBRhL21YVt-l9wj8oR6roB61uKmUCKd87ZsnVtZAxEsIa6x_jKnbjPeOSHrOFXitrV91wivNE_RmlJbpgBofTlOOtBAMYmjIPrWVaDhprZM" },
                  { title: "Steen & Beton", count: "Marmer, Betonlook", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeAl7EgmXSRq_9kwP0fgkb1f9lgoWzOSgPOLKS2TA8LqwdAMieqI_gUV1nNcKf8XU6fxqe9Wihvo69V0Z00vRnv_Q8DP4Db37_TZabKKxZ9WuP2SketmgjvoyPqTjqL40IptSEfGtD0qKnc7Z0rO00-3l1vGAnVLD7LpuhWRXZ2l5V0DqKxUmGwWSHPnaCT2hclf_MF_n8j_ZF92JmxEBewcmvXKAdTDhS8W-eVUsNjTNZ93REZ-fpogn91grqCUQjp_DFW9wP3yc" },
                  { title: "Specials", count: "Leer, Metallic, Textiel", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2ikwTkRZPr3ERP5NrmRMOHehJai4aLEDwVFxBsYqNxZ3XuGalDfO6iBhHgFkAQGk4_CeHmHCSWl0jTnr7MNULmck1Mz5aj5W1zORqO5kJa4Yg_bUduJIU_dpC5JHNNzhs5uryM5QbiUvrgjnZ96gCqiqR3l-rVmY2H9506zUHp576tylDtFZTuk3_SZsO4vR5zMXjoTI6Q3wJUbSiM-RpOB9Xgs7pls9vxbtLWcXRjzatW0CadkSFOdCH5m82JPelkDFCA-R7HKI" },
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

      {/* 5. Keuzehulp */}
      <section id="keuzehulp" className="py-24 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Direct Een Prijsindicatie</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark mb-6">Stel Uw Nieuwe <br/> <span className="italic text-gray-400">Look Samen</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Gebruik onze slimme configurator om direct een beeld te krijgen van de mogelijkheden en kosten voor uw frontjes.
            </p>
        </div>
        <KeuzehulpFrontjes />
      </section>

      {/* 6. FAQ */}
      <FAQ />
    </main>
  );
}
