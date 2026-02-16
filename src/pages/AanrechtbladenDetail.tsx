import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FAQ from "../components/FAQ";
import { getWrapColors } from "../lib/wrapColors";
import KeuzehulpAanrechtbladen from "../components/KeuzehulpAanrechtbladen";
import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "../hooks/useSEO";
import { materials } from "../data/materials";

export default function AanrechtbladenDetail() {
  useSEO({
    title: "Aanrechtblad Wrappen — Hittebestendig & Krasvast | Renovawrap",
    description: "Geef uw aanrechtblad een tweede leven. Hittebestendige, krasvaste renovatie in Marmer, Hout of Betonlook. Binnen 1 dag klaar.",
    canonical: canonicalFor("/diensten/aanrechtbladen"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Aanrechtbladen", url: canonicalFor("/diensten/aanrechtbladen") },
      ]),
      ...buildService("Aanrechtbladen Wrappen", "Professioneel aanrechtbladen wrappen met hittebestendige, krasvaste folie. Niet van echt steen te onderscheiden."),
    ],
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Using specific countertop before/after images
  const heroImages = [
    {
      before: "/project-fotos/before6.webp", 
      after: "/project-fotos/after6.webp",
    },
    {
      before: "/project-fotos/before3.webp",
      after: "/project-fotos/after3.webp",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const allWrapColors = getWrapColors();
  const [, setColorIndices] = useState([0, 1, 2]);

  useEffect(() => {
    // interval for circle 1 (3s)
    const i1 = setInterval(() => {
        setColorIndices(prev => [Math.floor(Math.random() * allWrapColors.length), prev[1], prev[2]]);
    }, 3000);

    // interval for circle 2 (3.5s - asymmetrical)
    const i2 = setInterval(() => {
        setColorIndices(prev => [prev[0], Math.floor(Math.random() * allWrapColors.length), prev[2]]);
    }, 3500);

    // interval for circle 3 (4s - asymmetrical)
    const i3 = setInterval(() => {
        setColorIndices(prev => [prev[0], prev[1], Math.floor(Math.random() * allWrapColors.length)]);
    }, 4000);

    return () => { clearInterval(i1); clearInterval(i2); clearInterval(i3); };
  }, [allWrapColors.length]);

  const woodMaterials = materials.filter(m => m.category === "Hout");
  const [woodImageIndex, setWoodImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWoodImageIndex((prev) => (prev + 1) % woodMaterials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [woodMaterials.length]);

  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      
      {/* 1. Hero Section (Replica of KeukenWrapping) */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            BLADEN
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Specialist in Werkbladen</span>
                <p className="font-display text-lg italic text-gray-500">Hittebestendig, Krasvast & Waterdicht.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Aanrechtblad <br />
                <span className="italic font-normal text-primary">Als Nieuw</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Is uw werkblad beschadigd, verkleurd of gedateerd? Wij toveren het om met industriële interieurfolie. Niet van echt natuursteen of hout te onderscheiden en bestand tegen intensief gebruik.
              </p>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                  <span className="font-bold text-dark">4.9/5</span>
                  <span className="ml-1">Google Reviews</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">10+</span>
                <span>Bladen Vernieuwd</span>
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

      {/* 2. Wat We Wrappen */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-100 pb-12">
            <div className="max-w-xl">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Mogelijkheden</span>
              <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">Geschikt Voor <span className="italic text-gray-400">Elk Type Blad</span></h2>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                Of het nu gaat om een recht blad, een hoekopstelling of een groot kookeiland. Onze folies vormen zich naadloos naar elke ondergrond.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Rechte Bladen",
                desc: "Eenvoudig en snel. Wij wrappen uw rechte aanrechtblad vaak binnen een halve dag. Geen naden, strakke afwerking en direct weer te gebruiken.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeAl7EgmXSRq_9kwP0fgkb1f9lgoWzOSgPOLKS2TA8LqwdAMieqI_gUV1nNcKf8XU6fxqe9Wihvo69V0Z00vRnv_Q8DP4Db37_TZabKKxZ9WuP2SketmgjvoyPqTjqL40IptSEfGtD0qKnc7Z0rO00-3l1vGAnVLD7LpuhWRXZ2l5V0DqKxUmGwWSHPnaCT2hclf_MF_n8j_ZF92JmxEBewcmvXKAdTDhS8W-eVUsNjTNZ93REZ-fpogn91grqCUQjp_DFW9wP3yc",
              },
              {
                title: "L-Vorm & U-Vorm",
                desc: "Complexe vormen zijn geen probleem. Wij zorgen voor een perfecte overgang in de hoeken en rondom uw spoelbak en kookplaat. Volledig waterdicht geseald.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKhIWAwOIuMsTga_L53C5Mrs5legO69zx6OfvSm7FfspFeloadDJnQfI_f_eJEWz2_bcCPloyk-2pwM42OgHHsnLXOOl90qbPTBVDf7cEUJMRBl3lnuSekfuYKGlU4MXLZg1BO6cnxL64PnBU33cqqgNV0DTvOQQAkSUn6fx3ckR3h6L7CWPIsfR-wBf33HPApzaSXSAyid5JaPm4o3vC2-4532HjTot6W3bb6iyzwjjHP7n_f_QXW0_f4YccWa-nKm4GGVGqpxQc",
                className: "md:mt-24"
              },
              {
                title: "Kookeilanden",
                desc: "Maak van uw eiland weer de eyecatcher van de keuken. Wij kunnen grote oppervlakken wrappen en zelfs de zijwangen meenemen voor een luxe blok-effect.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY"
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

      {/* 3. Asymmetrical Cards (Based on KitchenBenefits) */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F5F5F5] dark:bg-[#1A1A1A]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C4A47C] opacity-10 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#C4A47C] opacity-5 blur-3xl rounded-full transform translate-x-1/2"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full border border-[#C4A47C]/30 text-[#C4A47C] text-xs font-medium tracking-widest uppercase mb-4 dark:border-[#C4A47C]/30">
              Voordelen
            </span>
            <h2 className="text-4xl md:text-6xl font-display text-gray-900 dark:text-[#FFF9F0] leading-tight">
              Waarom Uw Blad <span className="text-[#C4A47C] italic">Wrappen?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
            
            {/* Card 1: Hittebestendig */}
            <div className="md:col-span-7 relative group">
              <div className="h-full bg-white dark:bg-[#242424] rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-white/5 transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden">
                <span className="absolute -right-4 -bottom-12 text-[180px] font-display font-bold text-gray-100 dark:text-white/5 leading-none select-none z-0 pointer-events-none">
                  01
                </span>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#C4A47C]/10 flex items-center justify-center mb-6 text-[#C4A47C]">
                    <span className="material-symbols-outlined text-2xl">local_fire_department</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display text-gray-900 dark:text-[#FFF9F0] mb-4">
                    Hittebestendig
                  </h3>
                  <p className="text-gray-600 dark:text-[rgba(255,249,240,0.7)] leading-relaxed text-lg max-w-md">
                    Onze speciale aanrechtblad-folies zijn bestand tegen temperaturen tot 90 graden. Een hete pan of kokend water is geen probleem, maar we raden een onderzetter aan voor extreme hitte.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Kras- & Stootvast */}
            <div className="md:col-span-5 row-span-2 relative group">
              <div className="h-full bg-[#C4A47C] text-white rounded-2xl p-8 md:p-10 shadow-lg border border-[#C4A47C]/20 transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
                <span className="absolute -right-8 -top-8 text-[200px] font-display font-bold text-white/10 leading-none select-none z-0 pointer-events-none">
                  02
                </span>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6 text-white backdrop-blur-sm">
                    <span className="material-symbols-outlined text-2xl">diamond</span>
                  </div>
                  <h3 className="text-3xl font-display text-white mb-4">Kras- & Stootvast</h3>
                  <p className="text-white/90 leading-relaxed text-lg">
                    Ontwikkeld voor intensief dagelijks gebruik. De toplaag is extreem hard en beschermt tegen krassen van messen, pannen en servies.
                  </p>
                </div>
                <div className="relative z-10 mt-12 pt-8 border-t border-white/20">
                  <p className="font-display italic text-xl opacity-90">"Industriële kwaliteit voor in huis"</p>
                </div>
              </div>
            </div>

            {/* Card 3: Waterdicht */}
            <div className="md:col-span-7 relative group">
              <div className="h-full bg-white dark:bg-[#242424] rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 dark:border-white/5 transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden">
                <span className="absolute right-4 top-4 text-[120px] font-display font-bold text-gray-100 dark:text-white/5 leading-none select-none z-0 pointer-events-none">
                  03
                </span>
                <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#C4A47C]/10 flex items-center justify-center text-[#C4A47C]">
                    <span className="material-symbols-outlined text-2xl">water_drop</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display text-gray-900 dark:text-[#FFF9F0] mb-3">100% Waterdicht</h3>
                    <p className="text-gray-600 dark:text-[rgba(255,249,240,0.7)] leading-relaxed">
                      Vocht en vlekken maken geen kans. In tegenstelling tot echt natuursteen of hout, trekt wijn, koffie of olie niet in het materiaal. Een doekje erover en het is schoon.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Hygiënisch */}
            <div className="md:col-span-4 relative group">
              <div className="h-full bg-gray-50 dark:bg-[#1f1f1f] rounded-2xl p-8 shadow-md border border-gray-100 dark:border-white/5 transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden">
                <span className="absolute -left-4 -bottom-8 text-[140px] font-display font-bold text-gray-200 dark:text-white/5 leading-none select-none z-0 pointer-events-none">
                  04
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C4A47C]/10 flex items-center justify-center text-[#C4A47C]">
                      <span className="material-symbols-outlined text-xl">sanitizer</span>
                    </div>
                    <h3 className="text-xl font-display text-gray-900 dark:text-[#FFF9F0]">Hygiënisch</h3>
                  </div>
                  <p className="text-gray-600 dark:text-[rgba(255,249,240,0.7)] text-sm leading-relaxed">
                    De antibacteriële toplaag remt de groei van bacteriën en schimmels. Ideaal voor waar voedsel wordt bereid.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5: Duurzaam */}
            <div className="md:col-span-4 relative group">
              <div className="h-full bg-gray-50 dark:bg-[#1f1f1f] rounded-2xl p-8 shadow-md border border-gray-100 dark:border-white/5 transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden">
                <span className="absolute right-0 top-0 text-[140px] font-display font-bold text-gray-200 dark:text-white/5 leading-none select-none z-0 pointer-events-none transform rotate-12">
                  05
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C4A47C]/10 flex items-center justify-center text-[#C4A47C]">
                      <span className="material-symbols-outlined text-xl">recycling</span>
                    </div>
                    <h3 className="text-xl font-display text-gray-900 dark:text-[#FFF9F0]">Circulair</h3>
                  </div>
                  <p className="text-gray-600 dark:text-[rgba(255,249,240,0.7)] text-sm leading-relaxed">
                    Uw oude blad hoeft niet naar de stort. We hergebruiken het materiaal als basis voor een compleet nieuwe look.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6: Garantie */}
            <div className="md:col-span-4 relative group">
              <div className="h-full bg-gray-900 dark:bg-black rounded-2xl p-8 shadow-lg border border-gray-800 dark:border-white/10 transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-center">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[160px] font-display font-bold text-white/10 leading-none select-none z-0 pointer-events-none">
                  06
                </span>
                <div className="relative z-10 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#C4A47C] flex items-center justify-center text-white mb-4 shadow-lg shadow-[#C4A47C]/30">
                    <span className="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <h3 className="text-xl font-display text-white mb-2">5 Jaar Garantie</h3>
                  <p className="text-gray-400 text-sm">Op het loslaten van de folie (niet door eigen beschadigingen).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. Duurzaamheid & Kwaliteit Gallery Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <div>
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Technische Specificaties</span>
              <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">
                Duurzaamheid & <span className="italic text-gray-400 font-serif">Kwaliteit</span>
              </h2>
            </div>
            <div className="mt-6 md:mt-0 max-w-sm text-right">
                <p className="text-gray-500 leading-relaxed text-sm">
                  Onze folies zijn speciaal ontwikkeld voor <br/> intensief gebruik in de keuken.
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
             {/* Top Row */}
             {/* Card 1: Ultra Mat (Large Image) - Spans 2 cols */}
            <div className="md:col-span-2 relative rounded-[2rem] overflow-hidden group min-h-[500px]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqUtBVZB4jfDKg40sM8nu8elmT9aC71nACxdbMGxI8RvNDGV_X7djngTbvar8z45btnMmc4Oq4t5yguRYvbTUzxDNKjCK6iNWSmlzDEkwPr66di0YivmeUe9O3oKDjGDE5xuXeDUP7mAiBSGtHl85Xt1sdTpU7jpi94JnrQfu1BTPQ0CindwQ2qdRA2KcLc12RBPBPkd5hcXFgsveOOW_q_rCd0KMn7XnSJEH2i64BsClk-dHIT58vFA40Fm_HxK5ks_ittzJN9Jo" 
                alt="Plant en kopje op aanrechtblad" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="font-display text-3xl mb-2 font-serif">Ultra Mat <span className="italic">&</span> Soft Touch</h3>
                <p className="text-white/80 text-sm font-light">Voelt zacht aan, maar is keihard tegen krassen.</p>
              </div>
            </div>

             {/* Card 2: Hittebestendig - Spans 1 col */}
             <div className="md:col-span-1 bg-[#FFF9F0] rounded-[2rem] p-10 flex flex-col justify-center min-h-[400px]">
                <h3 className="font-display text-5xl text-[#C4A47C] mb-4 font-serif">90 graden</h3>
                <h4 className="font-bold text-dark mb-3 text-lg">Hittebestendig</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Bestand tegen hete pannen en kokend water. Geen kringen of vervorming.</p>
             </div>

             {/* Bottom Row */}
             {/* Card 3: Waterdicht - Spans 1 col */}
              <div className="md:col-span-1 bg-[#FFF9F0] rounded-[2rem] p-10 flex flex-col justify-center min-h-[300px]">
                <h3 className="font-display text-5xl text-[#C4A47C] mb-4 font-serif">100%</h3>
                <h4 className="font-bold text-dark mb-3 text-lg">Waterdicht</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Naadloze afwerking rondom de spoelbak. Vocht krijgt geen kans.</p>
             </div>

             {/* Card 4: Materiaal Focus - Spans 2 cols */}
             <div className="md:col-span-2 bg-[#F9F9F9] rounded-[2rem] p-10 md:px-12 flex flex-col md:flex-row items-center gap-12 min-h-[300px]">
               <div className="flex-1">
                  <h3 className="font-display text-3xl text-dark mb-4 font-serif">Materiaal Focus</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                     Of u nu kiest voor de luxe van marmer, de warmte van hout of de strakheid van metaal. Onze materialen zijn kleurvast en onderhoudsvrij.
                  </p>
                  <ul className="space-y-2">
                     <li className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4A47C]"></span>
                        Natuursteen Look
                     </li>
                     <li className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4A47C]"></span>
                        Houtstructuur (met voelbare nerf)
                     </li>
                     <li className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4A47C]"></span>
                        Metallic Finishes
                     </li>
                  </ul>
               </div>
               <div className="flex-1 flex justify-end items-center">
                  <div className="relative w-64 h-32">
                      <div className="absolute right-32 z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#E6B98D] to-[#D4986A] shadow-lg border-[3px] border-white"></div>
                      <div className="absolute right-16 z-20 w-24 h-24 rounded-full bg-gradient-to-br from-[#D8B4A6] to-[#C08A7D] shadow-lg border-[3px] border-white"></div>
                      <div className="absolute right-0 z-30 w-24 h-24 rounded-full bg-gradient-to-br from-[#D0C0B0] to-[#A09080] shadow-lg border-[3px] border-white"></div>
                  </div>
               </div>
             </div>

          </div>
        </div>
      </section>

      {/* 5. 4 Stappen (Werkwijze) */}
      <section className="py-32 bg-[#FFF9F0]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#C4A47C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Werkwijze</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">
              In 4 Stappen <span className="italic text-gray-400 font-serif">Naar Uw Nieuwe Keuken</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                step: "01",
                icon: "chat_bubble_outline",
                title: "Gratis Adviesgesprek",
                desc: "Wij komen langs voor een vrijblijvende opmeting en bespreken uw wensen en mogelijkheden."
              },
              {
                step: "02",
                icon: "palette",
                title: "Kleurkeuze",
                desc: "Kies uit ons uitgebreide stalenboek met 300+ kleuren. Wij adviseren u over de beste match."
              },
              {
                step: "03",
                icon: "construction",
                title: "Professionele Montage",
                desc: "Onze gecertificeerde monteurs wrappen uw aanrechtblad in slechts één werkdag. Strak en schoon."
              },
              {
                step: "04",
                icon: "verified_user",
                title: "Oplevering & Nazorg",
                desc: "Na oplevering ontvangt u een garantiecertificaat en onderhoudsinstructies."
              }
            ].map((item, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                 <div className="mb-8 flex items-center justify-center w-20 h-20 border border-gray-200 bg-white hover:border-[#C4A47C] transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl text-gray-400">{item.icon}</span>
                 </div>
                 <span className="block text-[10px] font-bold text-[#C4A47C] mb-3 uppercase tracking-widest">{item.step}</span>
                 <h3 className="font-display text-lg text-dark mb-4 font-bold">{item.title}</h3>
                 <p className="text-[13px] text-gray-500 leading-relaxed max-w-[200px]">
                    {item.desc}
                 </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Materialen Section (Moved Here - Image 2 Style) */}
      <section className="py-24 bg-background-light">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Materiaal</span>
                  <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-6">
                     Niet Van Echt <br/><span className="italic text-primary">Te Onderscheiden</span>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                     Onze folies zijn geen simpele stickers, maar hoogwaardig architecturaal laminaat. Ze hebben een voelbare structuur die overeenkomt met het dessin. Een houtnerf voelt als hout, en natuursteen heeft die authentieke ruwheid of juist zijdezachte glans.
                  </p>
                  <ul className="space-y-4 mb-8">
                     {[
                        "Voelbare structuur (haptische feedback)",
                        "Lichtechtheid klasse 7 (verkleurt niet)",
                        "Antibacteriële toplaag",
                        "Milieuvriendelijk geproduceerd"
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-dark font-medium">
                           <span className="material-symbols-outlined text-primary">check_circle</span>
                           {item}
                        </li>
                     ))}
                  </ul>
                  <a className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-dark border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors" href="/over-ons">
                     Meer Over Onze Materialen
                     <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                  </a>
               </div>
               <div className="relative">
                  <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl bg-gray-100 relative">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={woodMaterials[woodImageIndex]?.image}
                        src={woodMaterials[woodImageIndex]?.image}
                        alt={woodMaterials[woodImageIndex]?.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                  {/* Floating detail box */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl max-w-xs hidden md:block">
                     <p className="font-display text-lg italic text-dark mb-2">"Is dit echt folie?"</p>
                     <p className="text-xs text-gray-500 uppercase tracking-widest">— De meest gehoorde reactie</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 7. FAQ */}
      <FAQ />

      {/* 8. Keuzehulp Wizard */}
      <section className="py-16 bg-background-light border-t border-gray-200" id="keuzehulp">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Keuzehulp</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-4">
              Ontvang Uw <span className="italic text-primary">Offerte Op Maat</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Beantwoord 5 korte vragen over uw werkblad en wij sturen u zo snel mogelijk een vrijblijvende offerte.
            </p>
          </div>
          <div className="w-full">
            <KeuzehulpAanrechtbladen />
          </div>
        </div>
      </section>
    </main>
  );
}
