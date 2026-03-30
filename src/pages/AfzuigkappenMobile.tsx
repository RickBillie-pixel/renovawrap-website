import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import { afzuigkappenFaqs } from "../data/faqs";
import KeuzehulpAfzuigkappen from "../components/KeuzehulpAfzuigkappen";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

export default function AfzuigkappenMobile() {
  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="hidden lg:block absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            AFZUIGKAP
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Background text watermark (Mobile) */}
            <div className="lg:hidden absolute inset-0 flex items-start justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden pt-8">
              <span className="font-display font-bold text-[18vw] leading-none text-dark whitespace-nowrap tracking-tighter">
                AFZUIGKAP
              </span>
            </div>

            {/* Mobile Layout (Visible only on < lg) */}
            <div className="lg:hidden flex flex-col h-[calc(100vh-140px)] justify-between pb-6 pt-5 relative z-10">
               <div className="border-b border-dark/10 pb-4 mb-6">
                 <h1 className="font-display text-5xl leading-[0.9] tracking-tight text-dark">
                  Afzuigkap <br />
                  <span className="italic text-primary">Wrappen</span>
                </h1>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                    Uw afzuigkap strak in de folie, zonder nieuwe dure aanschaf. Binnen één dag geregeld!
                  </p>

                   {/* Trust Badges - Single Line */}
                  <div className="flex items-center gap-2 pt-4 text-xs text-gray-400 whitespace-nowrap overflow-hidden">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                      <span className="ml-1 font-bold text-dark">4.9/5</span>
                      <span className="ml-1">Google Reviews</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="font-bold text-dark">Vele</span>
                    <span>Projecten</span>
                  </div>
                </div>
               </div>

              {/* Slider (Fills remaining space) */}
              <div className="relative w-full flex-1 min-h-[200px] shadow-lg overflow-hidden bg-gray-100 mt-4 mb-4 rounded-lg">
                  <BeforeAfterSlider 
                    beforeImage="/afzuigkap-before.png" 
                    afterImage="/afzuigkap-after.png"
                    objectPosition="30% center"
                  />
              </div>

               <div className="relative z-20 flex flex-col gap-3">
                <a 
                  className="bg-dark text-white px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center w-full shadow-lg" 
                  href="#keuzehulp"
                >
                  Gratis Offerte
                </a>
                <a 
                  className="flex items-center justify-center text-xs font-bold tracking-widest uppercase border border-dark px-6 py-4 hover:bg-dark hover:text-white transition-all w-full" 
                  href="/projecten"
                >
                  Bekijk Portfolio
                </a>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Makkelijk & Snel</span>
                <p className="font-display text-lg italic text-gray-500">Geen dure aanschaf, direct resultaat.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Afzuigkap <br />
                Wrappen <br />
                <span className="italic font-normal text-primary">In 1 Dag Klaar</span>
              </h1>
              <p className="text-gray-500 font-light leading-relaxed max-w-md pt-4">
                Een afzuigkap is vaak een beeldbepalend element in de keuken. Zonde als deze niet (meer) bij uw stijl past of vlekken vertoont. Wij wrappen uw afzuigkap vakkundig met premium folie voor een strakke, nieuwe look.
              </p>
              
              {/* Vele Projecten Badges (same as Desktop) ... */}
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
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="/projecten">
                   Bekijk Voor & Na Foto's
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </a>
              </div>
            </div>
            
            <div className="hidden lg:flex lg:col-span-6 justify-center">
              {/* same slide approach as desktop.. omitted to keep it brief */}
            </div>

          </div>
        </div>
      </header>

      {/* De Kunst van de afzuigkap */}
      <section className="py-32 bg-white relative">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
               <div className="lg:col-span-5 relative">
                  <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block separator-line flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">Nieuwe Look</span>
                  <h2 className="font-display text-5xl md:text-6xl text-dark leading-tight mb-8">
                     Blaas Uw Afzuigkap <br/> <span className="italic text-[#D2B48C]">Nieuw Leven In</span>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                     Heeft u een rvs afzuigkap met vlekken die u er niet meer uit krijgt? Of past uw afzuigkap niet meer bij uw (nieuwe) droomkeuken? Kies voor afzuigkap wrappen! Van warm eikenhout tot strak matzwart, of robuust industrieel beton. Alles is mogelijk, in één dag geplaatst en zonder stof- en breekwerk.
                  </p>
                  <blockquote className="border-l-2 border-[#D2B48C]/30 pl-6 py-2 mb-8 italic text-gray-400 font-display text-lg">
                     "Super simpel geregeld. De afzuigkap was eerst een doorn in het oog, en nu het mooiste deel van de keuken!"
                  </blockquote>
                  <Link to="/catalogus" className="inline-flex items-center text-xs font-bold tracking-widest uppercase border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors">
                     Bekijk alle designs <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                  </Link>
               </div>
               
               <div className="lg:col-span-7 flex gap-8 relative">
                   {/* Large Image */}
                  <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-xl mt-12 w-full">
                     <img src="/afzuigkap1.png" alt="Afzuigkap wrappen zwart" className="w-full h-full object-cover" />
                     <div className="absolute bottom-6 left-6 text-white text-shadow">
                        <p className="font-display italic text-lg">Hitte- en Stootvast</p>
                     </div>
                  </div>
                  
                  {/* Floating badge */}
                    <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-[#FFF8F0] p-8 max-w-xs shadow-lg hidden lg:block z-20">
                       <span className="material-symbols-outlined text-[#D2B48C] text-3xl mb-4">architecture</span>
                       <h4 className="font-display text-xl text-dark mb-2">Makkelijk Schoon</h4>
                       <p className="text-xs text-gray-500 leading-relaxed">Vergeet vlekken op RVS die u er nooit meer uit krijgt. Onze speciale high-end folie is supermakkelijk schoon te houden.</p>
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
                <p className="text-gray-500 mt-6 max-w-2xl mx-auto">Een nieuwe afzuigkap kopen en laten installeren is duur en chaotisch. Wrappen geeft hetzelfde nieuwe gevoel voor een fractie van de prijs en moeite.</p>
             </div>

             {/* Feature 1 */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
                 <div className="relative aspect-square md:aspect-[4/3] bg-white p-8 shadow-sm">
                    <img src="/montage-afzuig.png" alt="Afzuigkap dichtbij resultaat" className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 text-xs text-gray-400 border border-gray-100 shadow-sm">
                       Hittebestendig en Vakkundig Verwerkt
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="font-display text-3xl md:text-4xl text-dark">Bescherming & Hygiëne</h3>
                    <p className="text-gray-500 leading-relaxed">
                       Afzuigkappen vangen veel vet en kookdampen op. Onze architecturale interieurfolies hebben een speciale toplaag die vocht, vet en hitte afweert. Het nieuwe oppervlak is hierdoor ook heel eenvoudig af te nemen.
                    </p>
                    <ul className="space-y-4 pt-4">
                       {[
                          "Bestand tegen hitte en kookdampen", 
                          "Eenvoudig schoon en vetvrij te houden", 
                          "Langdurig mooi resultaat zonder vlekken"
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
                    <h3 className="font-display text-3xl md:text-4xl text-dark">Naadloos in uw Stijl</h3>
                    <p className="text-gray-500 leading-relaxed">
                       Geen RVS-doorn in uw oog meer als u voor een matwarte of houtlook keuken gaat. Een afzuigkap voorzien van interieurfolie transformeert een hinderlijk apparaat naar een design statement. Zonder uren werk en zonder vuil!
                    </p>
                    <ul className="space-y-4 pt-4">
                       {[
                          "Past perfect bij de rest van de keuken", 
                          "Supersnel binnen 1 dag geplaatst", 
                          "Ruim aanbod aan premium designs"
                       ].map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-sm text-gray-600">
                             <span className="material-symbols-outlined text-[#D2B48C]">design_services</span>
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div className="relative aspect-square md:aspect-[4/3] bg-[#1a4a40] p-8 shadow-sm md:order-2 order-1 overflow-hidden flex items-center justify-center">
                     <span className="absolute top-4 left-4 bg-[#D2B48C] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest z-10">Naadloos Getransformeerd</span>
                     <img src="/afzuigkap3.png" alt="Naadloos design afzuigkap" className="w-full h-full object-cover rounded-md shadow-2xl relative z-0" />
                 </div>
             </div>
          </div>
      </section>

      {/* Visualiseer Uw Droom afzuigkap CTA */}
      <section className="py-24 bg-[#111] text-white relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
               <span className="inline-block border border-white/20 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest mb-6 bg-white/5 backdrop-blur-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Vraag & Vergelijk
               </span>
               <h2 className="font-display text-5xl md:text-6xl mb-6">
                  Geef Uw Afzuigkap <br/> <span className="italic text-[#D2B48C]">Een Makeover</span>
               </h2>
               <p className="text-gray-400 mb-8 max-w-md">
                  Upload foto's van uw huidige afzuigkap en zie direct of dit geschikt is voor een strakke, nieuwe folie.
               </p>
               <div className="flex flex-col w-full gap-4 max-w-sm mx-auto">
                  <a href="#keuzehulp" className="bg-[#D2B48C] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#c1a278] transition-colors w-full">
                     Start Keuzehulp
                  </a>
                  <a href="/projecten" className="border border-white/20 px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors w-full">
                     Bekijk Voorbeelden
                  </a>
               </div>
          </div>
      </section>

      {/* FAQ Section */}
      <FAQ items={afzuigkappenFaqs} />

      {/* Keuzehulp Section */}
      <section id="keuzehulp" className="py-24 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Wat Kost Het Mij?</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark mb-6">Benieuwd Naar De <span className="italic text-gray-400">Prijs?</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Geen verborgen kosten, gewoon eerlijk advies. Start de korte keuzehulp. In één minuut ingevuld en we nemen snel contact op!
            </p>
        </div>
        <div className="max-w-[1400px] mx-auto px-6">
            <KeuzehulpAfzuigkappen />
        </div>
      </section>
    </main>
  );
}
