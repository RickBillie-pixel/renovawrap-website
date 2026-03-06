import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import FAQ from "../components/FAQ";
import { vensterbankenFaqs } from "../data/faqs";
import KeuzehulpVensterbanken from "../components/KeuzehulpVensterbanken";

export default function VensterbankenDesktop() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/vensterbank1.webp",
    "/vensterbank2.jpg",
    "/vensterbank3.avif"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            VENSTERBANK
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Makkelijk & Snel</span>
                <p className="font-display text-lg italic text-gray-500">Geen sloopwerk, direct resultaat.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Vensterbank <br />
                Wrappen <br />
                <span className="italic font-normal text-primary">In 1 Dag Klaar</span>
              </h1>
              <p className="text-gray-500 font-light leading-relaxed max-w-md pt-4">
                Je vensterbank is een blikvanger in elke kamer. Zonde als hij kaal, beschadigd of verkleurd is. Wij wrappen je (rechte) vensterbank vakkundig in een strakke, nieuwe look met topkwaliteit folie. Binnen één dag gefixt!
              </p>
              
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                  <span className="ml-1 font-bold text-dark">4.9/5</span>
                  <span className="ml-1">Google Reviews</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">Vele</span>
                <span>Projecten</span>
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
                      <img 
                        src={heroImages[currentImageIndex]} 
                        alt="Gereedschap vensterbank wrap"
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

      {/* De Kunst van de Vensterbank */}
      <section className="py-32 bg-white relative">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
               <div className="lg:col-span-5 relative">
                  <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block separator-line flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">Nieuwe Look</span>
                  <h2 className="font-display text-5xl md:text-6xl text-dark leading-tight mb-8">
                     Blaas de Vensterbank <br/> <span className="italic text-[#D2B48C]">Nieuw Leven In</span>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                     Vergeet schuren, verven, en de troep die komt kijken bij een complete vervanging. Wij wrappen uw vensterbank met hoogwaardige, stootvaste architectuurfolie in de mooiste designs. Van warm hout naar strak matzwart, of robuust industrieel beton. Alles is mogelijk, in een dag gepiept.
                  </p>
                  <blockquote className="border-l-2 border-[#D2B48C]/30 pl-6 py-2 mb-8 italic text-gray-400 font-display text-lg">
                     "Super simpel geregeld, snel geplaatst en direct een compleet ander aanzicht."
                  </blockquote>
                  <Link to="/catalogus" className="inline-flex items-center text-xs font-bold tracking-widest uppercase border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors">
                     Bekijk alle designs <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                  </Link>
               </div>
               
               <div className="lg:col-span-7 flex gap-8 relative">
                   {/* Large Image */}
                  <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-xl mt-12">
                     <img src="/vensterbank3.avif" alt="Vensterbank wrap hout look" className="w-full h-full object-cover" />
                     <div className="absolute bottom-6 left-6 text-white text-shadow">
                        <p className="font-display italic text-lg">Kras- en Stootvast</p>
                     </div>
                  </div>
                  
                  {/* Smaller Card / Image */}
                  <div className="w-1/3 flex flex-col gap-8 hidden md:flex">
                     <div className="bg-[#1a1a1a] p-8 text-white aspect-square flex flex-col justify-between">
                        <div className="flex items-center mb-2">
                           <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                           <span className="font-bold text-white ml-1">4.9/5</span>
                        </div>
                        <span className="text-gray-400 text-xs uppercase tracking-widest">Kwaliteit</span>
                        <div className="flex items-center mt-auto">
                           <span className="font-bold text-white text-2xl">A+</span>
                           <span className="ml-2 text-gray-400 text-xs uppercase tracking-widest">Klasse</span>
                        </div>
                     </div>
                     <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-xl">
                         <img src="/vensterbank2.jpg" alt="Mooie afwerking" className="w-full h-full object-cover" />
                         <div className="absolute bottom-6 left-6 text-white text-shadow">
                           <p className="font-display italic text-lg">Stijlvol</p>
                           <p className="text-xs uppercase tracking-widest opacity-80">Volledig Strak</p>
                         </div>
                     </div>
                  </div>
                  
                  {/* Floating badge */}
                    <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-[#FFF8F0] p-8 max-w-xs shadow-lg hidden lg:block z-20">
                       <span className="material-symbols-outlined text-[#D2B48C] text-3xl mb-4">architecture</span>
                       <h4 className="font-display text-xl text-dark mb-2">Makkelijk Schoon</h4>
                       <p className="text-xs text-gray-500 leading-relaxed">Geen gedoe met verfpotten of kitranden. Onze kraswerende folie is supermakkelijk schoon te houden met een doekje.</p>
                    </div>
               </div>
            </div>
         </div>
      </section>

      {/* Strakke Afwerking */}
      <section className="py-32 bg-background-light">
          <div className="max-w-[1400px] mx-auto px-6">
             <div className="text-center mb-24">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Waarom Wrappen?</span>
                <h2 className="font-display text-4xl md:text-5xl text-dark">Sterk. Snel. <span className="italic font-light text-gray-400">Mooi.</span></h2>
                <p className="text-gray-500 mt-6 max-w-2xl mx-auto">Vergeet dure schilders of complete verbouwingen. Met folie heeft u veel sneller een beter resultaat, met superieure eigenschappen.</p>
             </div>

             {/* Feature 1 */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
                 <div className="relative aspect-square md:aspect-[4/3] bg-white p-8 shadow-sm">
                    <img src="/vensterbank1.webp" alt="Vensterbank voor dichtbij resultaat" className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 text-xs text-gray-400 border border-gray-100 shadow-sm">
                       Ideaal tegen krassen van sleutels of bloempotten!
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="font-display text-3xl md:text-4xl text-dark">Bescherming dat Staat</h3>
                    <p className="text-gray-500 leading-relaxed">
                       Onze architecturale interieurfolies hebben een speciale top-coating die krassen afweert. U kunt er gerust uw planten, decoratie of sleutelbos op neerleggen zonder zorgen over beschadigingen.
                    </p>
                    <ul className="space-y-4 pt-4">
                       {[
                          "Bestand tegen dagelijks gebruik", 
                          "Beschermt tegen slijtage", 
                          "Langdurig mooi resultaat"
                       ].map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-sm text-gray-600">
                             <span className="material-symbols-outlined text-[#D2B48C]">check_box</span>
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
             </div>

             {/* Feature 2 */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                 <div className="space-y-6 md:order-1 order-2">
                    <h3 className="font-display text-3xl md:text-4xl text-dark">Kleurvast in de Zon</h3>
                    <p className="text-gray-500 leading-relaxed">
                       Omdat uw vensterbank in de volle zon staat, verkleurt verf na verloop van tijd. Onze folies zijn UV-werend en verkleuren niet. Geen schilderwerk om de paar jaar; geniet gewoon van langdurig mooi resultaat. En dat zonder stof door het hele huis.
                    </p>
                    <ul className="space-y-4 pt-4">
                       {[
                          "Blijft jarenlang kleurvast in de zon", 
                          "Supersnel en schoon geplaatst", 
                          "Nooit meer schuren of schilderen"
                       ].map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-sm text-gray-600">
                             <span className="material-symbols-outlined text-[#D2B48C]">wb_sunny</span>
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div className="relative aspect-square md:aspect-[4/3] bg-[#1a4a40] p-8 shadow-sm md:order-2 order-1 overflow-hidden flex items-center justify-center">
                     <span className="absolute top-4 left-4 bg-[#D2B48C] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest z-10">Zonlicht Proof</span>
                     <img src="/vensterbank3.avif" alt="Zon bestendig" className="w-full h-full object-cover rounded-md shadow-2xl relative z-0" />
                 </div>
             </div>
          </div>
      </section>

      {/* Visualiseer Uw Droom Vensterbank CTA */}
      <section className="py-24 bg-[#111] text-white relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                   <span className="inline-block border border-white/20 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest mb-6 bg-white/5 backdrop-blur-sm">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Vraag & Vergelijk
                   </span>
                   <h2 className="font-display text-5xl md:text-6xl mb-6">
                      Geef Uw Ruimte <br/> <span className="italic text-[#D2B48C]">Een Makeover</span>
                   </h2>
                   <p className="text-gray-400 mb-8 max-w-md">
                      Upload foto's van uw huidige vensterbanken en zie hoe een strakke, nieuwe folie uw hele interieur opfrist.
                   </p>
                   <div className="flex gap-4">
                      <a href="#keuzehulp" className="bg-[#D2B48C] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#c1a278] transition-colors">
                         Start Keuzehulp
                      </a>
                      <a href="/projecten" className="border border-white/20 px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors">
                         Bekijk Voorbeelden
                      </a>
                   </div>
                </div>
                <div className="relative">
                   <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video border border-white/10">
                      <img src="/vensterbank1.webp" alt="Strakke look vensterbank" className="w-full h-full object-cover" />
                   </div>
                </div>
             </div>
          </div>
      </section>

      {/* FAQ Section */}
      <FAQ items={vensterbankenFaqs} />

      {/* Keuzehulp Section */}
      <section id="keuzehulp" className="py-24 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Wat Kost Het Mij?</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark mb-6">Benieuwd Naar De <span className="italic text-gray-400">Prijs?</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Geen verborgen kosten, gewoon eerlijk advies. Start de korte keuzehulp. In één minuut ingevuld en we nemen snel contact op (Onthoud: wij wrappen alleen strakke, rechte vensterbanken!).
            </p>
        </div>
        <KeuzehulpVensterbanken />
      </section>
    </main>
  );
}
