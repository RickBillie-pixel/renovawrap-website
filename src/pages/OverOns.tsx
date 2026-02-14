import CountUp from "../components/CountUp";
import { useSEO, buildBreadcrumbs, canonicalFor } from "@/hooks/useSEO";

export default function OverOns() {
  useSEO({
    title: "Over Ons — Het Verhaal Achter Renovawrap",
    description: "Maak kennis met Bram Vos en de filosofie achter Renovawrap. Waarom slopen als je kunt renoveren? Duurzaam, slim en high-end.",
    canonical: canonicalFor("/over-ons"),
    jsonLd: buildBreadcrumbs([
      { name: "Home", url: canonicalFor("/") },
      { name: "Over ons", url: canonicalFor("/over-ons") },
    ]),
  });

  return (
    <main className="pt-24 bg-background-light text-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden border-b border-dark/5">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04] overflow-hidden">
          <span className="font-display font-bold text-[22vw] leading-none text-dark whitespace-nowrap tracking-tighter transform rotate-1">
            EST. 2025
          </span>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          <div className="lg:col-span-12 flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8 pb-6 border-b border-dark/10">
            <span>[Over Ons]</span>
            <span className="hidden md:inline">[Helmond & Omstreken]</span>
            <span>[Slim Renoveren]</span>
          </div>
          <div className="lg:col-span-10">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
              Niet Slopen. <br /> <span className="italic text-primary pl-12 md:pl-24">Upgraden.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end pb-4">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light border-l-2 border-primary pl-6">
              Waarom zou je een perfect functionerende keuken weggooien alleen omdat de kleur je niet meer aanstaat? Wij geloven in een slimmere aanpak.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy / Story Section */}
      <section className="py-24 md:py-32 bg-background-light overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative aspect-[4/5] md:aspect-square w-full order-2 lg:order-1">
                {/* Abstract/Detail Image illustrating quality/texture */}
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                  alt="Detail van interieur textuur" 
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 shadow-xl max-w-xs hidden md:block border-l-4 border-primary">
                  <p className="font-display text-lg italic leading-tight">"Het is eigenlijk zonde om te vervangen wat in de basis nog goed is."</p>
                </div>
             </div>
             
             <div className="order-1 lg:order-2 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6 block">Onze Missie</span>
                <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
                  Het Nieuwe <span className="italic text-primary">Renoveren</span>
                </h2>
                <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                  <p>
                    Je kent het wel. De keuken staat er al even. De lades lopen nog soepel, de indeling werkt prima en het blad is onverwoestbaar. Maar die kleur... die glanzende vanille-tint uit 2010... daar ben je gewoon klaar mee.
                  </p>
                  <p>
                    Dan kun je twee dingen doen: Alles eruit slopen, wekenlang in de stof en herrie zitten en duizenden euro's uitgeven aan een nieuwe keuken die functioneel precies hetzelfde doet.
                  </p>
                  <p className="font-medium text-dark text-lg">
                    Of je kiest voor de logische weg.
                  </p>
                  <p>
                    Bij Renovawrap kijken we anders naar interieur. Wij toveren lelijke keukens om tot high-end design keukens. Met onze architecturale folies geven we je interieur een complete metamorfose, voor een <strong>fractie van de prijs</strong> van een verbouwing.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* The Craftsman (Bram Vos) Section */}
      <section className="py-32 bg-dark text-background-light relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-5 pt-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary mb-6 block">Het Gezicht Achter Renovawrap</span>
              <h2 className="font-display text-5xl md:text-6xl text-white mb-2">
                Bram <span className="italic text-gray-500">Vos</span>
              </h2>
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-12">Eigenaar & Specialist</p>
              
              <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg">
                <p>
                  "Ik ben geen snelle verkoper. Ik ben een maker. Iemand die pas tevreden is als een hoekje perfect is afgewerkt."
                </p>
                <p className="text-base text-gray-400">
                  Renovawrap is ontstaan vanuit een simpele frustratie: ik zag hoeveel goede materialen er bij het grofvuil belandden, puur omdat de uitstraling gedateerd was. Dat moest anders kunnen.
                </p>
                <p className="text-base text-gray-400">
                   Samen met mijn team van 2-3 vaste specialisten werken we vanuit Helmond aan projecten in de hele regio. We zijn klein genoeg om persoonlijk betrokken te blijven bij elke klus, maar groot genoeg om kwaliteit en garantie te leveren waar je op kunt bouwen.
                </p>
                <p className="text-base text-gray-400">
                  Geen gladde praatjes, maar gewoon eerlijk vakwerk. Dat is waar ik voor sta.
                </p>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                 <img src="/signature.png" alt="" className="h-12 opacity-50 invert hidden" /> {/* Placeholder for signature if needed */}
                 <p className="font-display text-2xl italic text-white/40">Bram Vos.</p>
              </div>
            </div>

            {/* Right Column: Imagery */}
            <div className="lg:col-span-7 relative">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                     <div className="aspect-[3/4] bg-gray-800 relative overflow-hidden rounded-sm">
                        {/* Action Shot 1: Detail work / Cutting */}
                        <img 
                          src="https://images.unsplash.com/photo-1581242163695-19d0acdeabe2?q=80&w=800&auto=format&fit=crop" 
                          alt="Precisie werk wrapping" 
                          className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-700"
                        />
                     </div>
                     <div className="aspect-square bg-gray-800 relative overflow-hidden rounded-sm">
                        {/* Detail Shot: Material texture */}
                         <img 
                          src="https://images.unsplash.com/photo-1620615307442-4143935d9b14?q=80&w=800&auto=format&fit=crop" 
                          alt="Materiaal detail" 
                          className="w-full h-full object-cover grayscale contrast-125 opacity-60"
                        />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="aspect-square bg-gray-800 relative overflow-hidden rounded-sm">
                        {/* Context Shot: Tools or Finished corner */}
                        <img 
                          src="https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop" 
                          alt="Werkplaats tools" 
                          className="w-full h-full object-cover grayscale contrast-125 opacity-70"
                        />
                     </div>
                     <div className="aspect-[3/4] bg-gray-800 relative overflow-hidden rounded-sm">
                        {/* Action Shot 2: Smoothing wrapper */}
                        <img 
                          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop" 
                          alt="Applicatie proces" 
                          className="w-full h-full object-cover grayscale opacity-90 hover:opacity-100 transition-opacity duration-700"
                        />
                     </div>
                  </div>
               </div>
               
               {/* Floating Badge */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full w-24 h-24 flex items-center justify-center text-dark font-display font-bold text-center leading-none p-4 shadow-2xl z-10">
                 Est. <br/> 2025
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Real Stats Section (Confirmed Data) */}
      <section className="py-24 border-t border-dark/10 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="group cursor-default text-center lg:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">Opgericht</p>
              <p className="font-display text-5xl md:text-6xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                2025
              </p>
            </div>
            <div className="group cursor-default text-center lg:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">Projecten</p>
              <p className="font-display text-5xl md:text-6xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={47} />
              </p>
            </div>
            <div className="group cursor-default text-center lg:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">Reviews</p>
              <p className="font-display text-5xl md:text-6xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={19} />
              </p>
            </div>
            <div className="group cursor-default text-center lg:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">Materialen</p>
              <p className="font-display text-5xl md:text-6xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={364} />
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
