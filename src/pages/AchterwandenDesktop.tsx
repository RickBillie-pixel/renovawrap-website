
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FAQ from "../components/FAQ";
import { backsplashFaqs } from "../data/faqs";
import KeuzehulpAchterwanden from "../components/KeuzehulpAchterwanden";


export default function AchterwandenDesktop() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Using specific backsplash or fitting before/after images
  const heroImages = [
    {
      before: "/project-fotos/before5.webp",
      after: "/project-fotos/after5.webp", 
    },
    {
       before: "/project-fotos/before11.webp",
       after: "/project-fotos/after11.webp",
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
      {/* Hero Section - Direct Clone from KeukenWrapping with updated text */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            ACHTERWAND
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Wie Wil Wrappen</span>
                <p className="font-display text-lg italic text-gray-500">Zonder sloopwerk. Binnen één dag.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Achterwanden <br />
                Renovatie <br />
                <span className="italic font-normal text-primary">Zonder Sloopwerk</span>
              </h1>
              <p className="text-gray-500 font-light leading-relaxed max-w-md pt-4">
                Waarom veel geld investeren in nieuwe tegels? Wij wrappen je bestaande achterwand naar een hygiënische, naadloze showroom staat. Binnen 1 dag geregeld.
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

      {/* De Kunst van de Achterwand */}
      <section className="py-32 bg-white relative">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
               <div className="lg:col-span-5 relative">
                  <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block separator-line flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">Collectie</span>
                  <h2 className="font-display text-5xl md:text-6xl text-dark leading-tight mb-8">
                     De Kunst van <br/> <span className="italic text-[#D2B48C]">de Achterwand</span>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                     Een achterwand bepaalt de sfeer in je keuken. Onze collectie heeft exclusieve marmer, natuursteen en betonlooks die niet van echt te onderscheiden zijn. Maar dan zonder de voegen waar vuil zich ophoopt.
                  </p>
                  <blockquote className="border-l-2 border-[#D2B48C]/30 pl-6 py-2 mb-8 italic text-gray-400 font-display text-lg">
                     "Een blikvanger in je keuken, waterdicht en bestand tegen kookwarmte."
                  </blockquote>
                  <Link to="/catalogus" className="inline-flex items-center text-xs font-bold tracking-widest uppercase border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors">
                     Bekijk alle designs <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                  </Link>
               </div>
               
               <div className="lg:col-span-7 flex gap-8 relative">
                   {/* Large Image */}
                  <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-xl mt-12">
                     <img src="/waterdicht-2.webp" alt="Marmer look achterwand" className="w-full h-full object-cover" />
                     <div className="absolute bottom-6 left-6 text-white text-shadow">
                        <p className="font-display italic text-lg">Calacatta Gold</p>
                     </div>
                  </div>
                  
                  {/* Smaller Card / Image */}
                  <div className="w-1/3 flex flex-col gap-8 hidden md:flex">
                     <div className="bg-[#1a1a1a] p-8 text-white aspect-square flex flex-col justify-between">
                        <div className="flex items-center mb-2">
                           <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                           <span className="font-bold text-white ml-1">4.9/5</span>
                        </div>
                        <span className="text-gray-400 text-xs uppercase tracking-widest">Google Reviews</span>
                        <div className="flex items-center mt-auto">
                           <span className="font-bold text-white text-2xl">10+</span>
                           <span className="ml-2 text-gray-400 text-xs uppercase tracking-widest">Wanden</span>
                        </div>
                     </div>
                     <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-xl">
                         <img src="/project-fotos/after5.webp" alt="Betonlook" className="w-full h-full object-cover" />
                         <div className="absolute bottom-6 left-6 text-white text-shadow">
                           <p className="font-display italic text-lg">Beton & Steen</p>
                           <p className="text-xs uppercase tracking-widest opacity-80">Puur Karakter</p>
                         </div>
                     </div>
                  </div>
                  
                  {/* Floating badge */}
                   <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-[#FFF8F0] p-8 max-w-xs shadow-lg hidden lg:block">
                      <span className="material-symbols-outlined text-[#D2B48C] text-3xl mb-4">opacity</span>
                      <h4 className="font-display text-xl text-dark mb-2">Natuurlijke Look</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Perfecte structuur voelbaar. Geen patroonherhaling in meters.</p>
                   </div>
               </div>
            </div>
         </div>
      </section>



      {/* Naadloze Bescherming */}
      <section className="py-32 bg-background-light">
          <div className="max-w-[1400px] mx-auto px-6">
             <div className="text-center mb-24">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Technologie</span>
                <h2 className="font-display text-4xl md:text-5xl text-dark">Naadloze <span className="italic font-light text-gray-400">Bescherming</span></h2>
                <p className="text-gray-500 mt-6 max-w-2xl mx-auto">Onze architecturale folies zijn speciaal ontwikkeld voor zware belasting in keukens. Hitte, vocht en krassen hebben geen vat op het materiaal.</p>
             </div>

             {/* Feature 1 */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
                 <div className="relative aspect-square md:aspect-[4/3] bg-white p-8 shadow-sm">
                    {/* Placeholder for Basket Image */}
                    <img src="/warmte.webp" alt="Duurzaam materiaal" className="w-full h-full object-cover mix-blend-multiply" />
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 text-xs text-gray-400 border border-gray-100 shadow-sm">
                       Uitstekend bestand tegen de warmte van uw fornuis of kookplaat.
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="font-display text-3xl md:text-4xl text-dark">Duurzaam & Veilig</h3>
                    <p className="text-gray-500 leading-relaxed">
                       Koken brengt warmte met zich mee. Onze folies zijn industrieel ontwikkeld en uitstekend bestand tegen de warmte van kookplaten. Of u nu kookt op gas of inductie, uw nieuwe achterwand blijft strak en veilig.
                    </p>
                    <ul className="space-y-4 pt-4">
                       {[
                          "Brandvertragend gecertificeerd", 
                          "Bestand tegen kokend water en stoom", 
                          "Geen kromtrekken door warmte"
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
                    <h3 className="font-display text-3xl md:text-4xl text-dark">Waterdicht & Naadloos</h3>
                    <p className="text-gray-500 leading-relaxed">
                       Traditionele tegels hebben voegen die verkleuren en waar schimmel kan ontstaan. Wrapping creëert een volledig naadloos oppervlak dat 100% waterdicht is. Ideaal rondom de spoelbak en kraan.
                    </p>
                    <ul className="space-y-4 pt-4">
                       {[
                          "Schimmelwerende toplaag", 
                          "Volledig afwasbaar", 
                          "Geen vuilophoping in randen"
                       ].map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-sm text-gray-600">
                             <span className="material-symbols-outlined text-[#D2B48C]">water_drop</span>
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div className="relative aspect-square md:aspect-[4/3] bg-[#1a4a40] p-8 shadow-sm md:order-2 order-1 overflow-hidden flex items-center justify-center">
                     <span className="absolute top-4 left-4 bg-[#D2B48C] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">Schoon in 1 keer afvegen</span>
                     {/* Placeholder for Lime/Water image */}
                     <img src="/waterdicht-2.webp" alt="Waterdicht" className="w-[80%] h-[80%] object-cover rounded-full shadow-2xl border-4 border-white/10" />
                 </div>
             </div>
          </div>
      </section>

      {/* Visualiseer Uw Droom Achterwand CTA */}
      <section className="py-24 bg-[#111] text-white relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                   <span className="inline-block border border-white/20 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest mb-6 bg-white/5 backdrop-blur-sm">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Vraag & Vergelijk
                   </span>
                   <h2 className="font-display text-5xl md:text-6xl mb-6">
                      Visualiseer Uw <br/> <span className="italic text-[#D2B48C]">Droom Achterwand</span>
                   </h2>
                   <p className="text-gray-400 mb-8 max-w-md">
                      Upload een foto van uw huidige keuken en zie direct hoe een marmeren, betonnen of gouden achterwand eruit zou zien.
                   </p>
                   <div className="flex gap-4">
                      <a href="#keuzehulp" className="bg-[#D2B48C] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#c1a278] transition-colors">
                         Upload Uw Keuken
                      </a>
                      <a href="/projecten" className="border border-white/20 px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors">
                         Bekijk Voorbeelden
                      </a>
                   </div>
                </div>
                <div className="relative">
                   <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video border border-white/10 bg-black/50">
                      <BeforeAfterSlider
                        beforeImage="/project-fotos/before11.webp"
                        afterImage="/project-fotos/after11.webp"
                        className="w-full h-full"
                      />
                   </div>
                </div>
             </div>
          </div>
      </section>

      {/* FAQ Section */}
      <FAQ items={backsplashFaqs} />

      {/* Keuzehulp Section */}
      <section id="keuzehulp" className="py-24 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Direct Een Prijsindicatie</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark mb-6">Wat Kost Een <br/> <span className="italic text-gray-400">Achterwand?</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Beantwoord een paar korte vragen en ontvang zo snel mogelijk een vrijblijvende prijsopgave voor jouw situatie.
            </p>
        </div>
        <KeuzehulpAchterwanden />
      </section>
    </main>
  );
}
