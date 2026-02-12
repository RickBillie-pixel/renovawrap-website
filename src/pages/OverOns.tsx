import CountUp from "../components/CountUp";
import { useSEO, buildBreadcrumbs } from "@/hooks/useSEO";

export default function OverOns() {
  useSEO({
    title: "Over Ons — Vakmanschap & Visie | Renovawrap",
    description: "Leer het Renovawrap team kennen. Vakmanschap en passie voor duurzame interieur wrapping in Nederland sinds 2024.",
    canonical: "https://renovawrap.nl/over-ons",
    jsonLd: buildBreadcrumbs([
      { name: "Home", url: "https://renovawrap.nl/" },
      { name: "Over Ons", url: "https://renovawrap.nl/over-ons" },
    ]),
  });
  return (
    <main className="pt-24 bg-background-light text-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden border-b border-dark/5">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04] overflow-hidden">
          <span className="font-display font-bold text-[22vw] leading-none text-dark whitespace-nowrap tracking-tighter transform rotate-1">
            EST. 2024
          </span>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          <div className="lg:col-span-12 flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8 pb-6 border-b border-dark/10">
            <span>[Over Ons]</span>
            <span className="hidden md:inline">[Visie & Vakmanschap]</span>
            <span>[Amsterdam]</span>
          </div>
          <div className="lg:col-span-9">
            <h1 className="font-display text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
              Ons <br /> <span className="italic text-primary pl-24">Verhaal</span>
            </h1>
          </div>
          <div className="lg:col-span-3 flex flex-col justify-end pb-4">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light mb-8">
              Van een passie voor duurzaam hergebruik naar de leidende kracht in hoogwaardige interieurtransformaties.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-dark"></div>
              <span className="text-xs uppercase tracking-widest">Lees verder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-background-light overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
            <div className="lg:col-span-3 hidden lg:block sticky top-32">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Hoofdstuk 01</span>
                <h3 className="font-display text-2xl italic text-primary">Slimme <br />Renovatie</h3>
              </div>
            </div>
            <div className="lg:col-span-9">
              <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.3] text-dark indent-16 md:indent-32">
                Nieuwe keuken in <span className="italic text-primary">1 dag</span>. Zonder hak- of breekwerk, voor een fractie van de nieuwprijs. Wij transformeren uw interieur met hoogwaardige architecturale folie. Niet van echt te onderscheiden, stoot- en krasvast, en binnen 24 uur gerealiseerd.
              </p>
            </div>
          </div>
          
          {/* Collage */}
          <div className="relative w-full max-w-[1200px] mx-auto h-auto min-h-[800px] md:min-h-[900px]">
            <div className="absolute top-0 right-[10%] w-[35%] md:w-[28%] aspect-[3/5] z-10 shadow-xl group">
              <div className="w-full h-full overflow-hidden relative">
                <img
                  alt="Architecturaal detail"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx5WR-hMnWMtZbqI_cg2HAjl9r0Cwt3U9UhDBROjPH5wx7Nj-uKMNQTsFkB15cSgFfAaQ2aXzJNtJx8hdTleOIoJeqW62mYtqOxCZCIwjdWnJnQJJ3JbNG7Zekf2tqaajugaIvzUmQmWOJvwwGs3eZ20QSVXHlR47HrijbKSf5EyUI5BRFX9Rx9jFEBUJBtYlBmIYiY7VHoF2dPP_Wkp4ngKHAMPzVJ9uk4BAXh4edaXlbHDcY6by9hdDcSZGfkHBIBFwTVvZyOp0"
                />
              </div>
              <span className="absolute -right-12 top-12 rotate-90 text-[10px] uppercase tracking-[0.3em] text-gray-400 origin-top-left whitespace-nowrap">Klaar in 1 dag</span>
            </div>
            
            <div className="absolute top-[15%] left-[5%] z-20 max-w-[280px] bg-white p-8 shadow-lg border-l-2 border-primary">
              <h4 className="font-display text-xl mb-3">Duurzame Luxe</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Geen luchtbellen, geen loslatende randen. Onze gecertificeerde wrappers leveren een finish die oogt en voelt als nieuw. Inclusief garantie.</p>
            </div>

            <div className="absolute top-[35%] left-[15%] w-[45%] md:w-[35%] aspect-square z-0 shadow-lg border-8 border-background-light">
              <div className="w-full h-full overflow-hidden relative">
                <img
                  alt="Materiaal applicatie"
                  className="w-full h-full object-cover grayscale brightness-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaokLjJtt3THzJ0a_CuQmJrHcqhUnvD3wGFy_7xqQPM8NH4hIClvQmOX3O0rPh0jnCESr7zoZlf3c_6hFbfw9su7237uZMjmcC3cz85fTBSTPWA9GODigkJe22qVNNvpXkpw9zyaiGoeEyder6XyQEAJZk58zI_gHy9PrAfGhNEqK_v9fFZHgMU5er6CQ2LKoWeeqkl_3SeZaA45wYV9v0NA2OPyPOCAGp3WVuZ0QhtLyhK__BwsD8kpX3QLXW2VFMF-1GavW3gQs"
                />
              </div>
            </div>

            <div className="absolute top-[45%] right-[25%] z-30 pointer-events-none mix-blend-difference text-white">
              <h3 className="font-display text-6xl md:text-8xl italic leading-none opacity-90">Premium Finish</h3>
            </div>

            <div className="absolute bottom-[5%] right-[5%] w-[60%] md:w-[45%] aspect-[16/9] z-10 shadow-2xl">
              <div className="w-full h-full overflow-hidden relative group">
                <img
                  alt="Eindresultaat keuken"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlQ7CZma-nwhJXHzmQ0OFtElMNDapKx-kKUaGd6kErk-h4r9FRMhkoxkxuhIWOynOp0L3JjCFlF1FOOloizTflsrqmXGLFF2Hp34OusR76JqsT6CTXZnXuXfGCkf6usIw0nA8louiyUXbYJyDiIFJgI9D58QqZEMkqA88QRvN-gtr8v3oMNhjeR3mTHSvnIWDEVI7FfKZpICpW-ybem4EZysHMOg5Y-mN5FK7lacvZonQUgns77wQe8Dj58hlO8DegZQbFc-c99Tw"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>

            <div className="absolute bottom-[25%] left-[10%] z-20 max-w-[240px]">
              <span className="font-mono text-xs text-primary mb-2 block">02.</span>
              <p className="text-sm font-medium leading-relaxed bg-background-light/90 backdrop-blur-sm p-4">
                Kostenbesparend. Tot 70% goedkoper dan een nieuwe keuken. Behoud het goede, upgrade de uitstraling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-dark text-background-light relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-4">Onze Filosofie</span>
              <h2 className="font-display text-5xl md:text-7xl text-white">
                Bewuste <span className="italic text-secondary">Transformatie</span>
              </h2>
            </div>
            <div className="mt-8 md:mt-0 max-w-sm">
              <p className="text-sm text-gray-400 leading-relaxed">
                Wij streven naar een circulaire toekomst waarin interieurdesign niet betekent dat we moeten vernietigen om te creëren.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mt-16">
            <div className="group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:border-secondary group-hover:bg-secondary group-hover:text-dark transition-all duration-300">
                <span className="material-symbols-outlined text-xl">recycling</span>
              </div>
              <h3 className="font-display text-2xl mb-4 text-white">Duurzaamheid</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Door bestaande oppervlakken te hergebruiken voorkomen we onnodig afval. Een keuken wrappen bespaart gemiddeld 85% CO2 ten opzichte van vervanging.
              </p>
            </div>
            <div className="group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:border-secondary group-hover:bg-secondary group-hover:text-dark transition-all duration-300">
                <span className="material-symbols-outlined text-xl">diamond</span>
              </div>
              <h3 className="font-display text-2xl mb-4 text-white">Kwaliteit</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Wij werken uitsluitend met premium architecturale folies die voelen en ogen als echt hout, steen of metaal. Krasvast, hittebestendig en kleurvast.
              </p>
            </div>
            <div className="group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:border-secondary group-hover:bg-secondary group-hover:text-dark transition-all duration-300">
                <span className="material-symbols-outlined text-xl">style</span>
              </div>
              <h3 className="font-display text-2xl mb-4 text-white">Esthetiek</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Minimalisme is onze taal. We strippen de ruis weg en focussen op lijnenspel, textuur en harmonie in uw leefomgeving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-4">De Gezichten</span>
            <h2 className="font-display text-5xl md:text-6xl text-dark">Het <span className="italic text-primary">Team</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
                <img
                  alt="Sander de Vries"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDluw3O0aajDHbHuNsQFp0l4_bOw7hiUhD7g9bVSbfBF1WAHJwE3d7Al5oEBx8TYbGKpsAg0_EkqjjMaL7XtiWBtJ6QV3ztvGAWTz8H29qmTQ5FwhBsAhstwT-CAcXNsIMRxQvbVc2wdn0N8kc-YHQbdm5Z9IRBz92VfKKsceJg3ezdXan9sSTTZJ3I0-dcfP3i_QT2FnGIni-TYhcwAWRKaaEPiVpbTGA25PcX0MIYJoNg2Bu6RngNYs4AC4G4iLHrmtcjZmR1P38"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500"></div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-display text-xl text-dark mb-1">Sander de Vries</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Oprichter & Lead Design</p>
                <p className="text-xs text-gray-500 text-center max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  "Design moet niet alleen gezien worden, maar gevoeld."
                </p>
              </div>
            </div>
            <div className="group cursor-pointer lg:translate-y-12">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
                <img
                  alt="Lisa Jansen"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_bNep-OjxTMyszSbRUzRxrVDgcb2NZ8M2BbN_gI98vD8jqlfLapPkMJRvcoiBwhO5SNe8UJ6XG1nH_FrEevAp_nV2qBQKKezi4_K3mCLg7dBWwfmUr4f6OAc9iDkJSS6h3kQDOeUk0E_fLuCWj2ylr97lET0PacC_tQtjTZGmbwHOATbO3yPV7WE30u2jEZKPXy5DVwKcbhg6vT_jLkDGs23559bTwKiEyywXq_HUlnezVfDYt_ovGBIwiVTXwXa3r3vgRmItcuc"
                />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-display text-xl text-dark mb-1">Lisa Jansen</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Senior Stylist</p>
                <p className="text-xs text-gray-500 text-center max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  "Kleur en textuur zijn de stem van een ruimte."
                </p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
                <img
                  alt="Mark van den Berg"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPcLm88EZIii81NbJDEpM5shG9_P48Prv65flTEbxmmrePpA_8iFA6jB9FLg0DywZnTt0K4TJdonZ-x1uQ-tAmzhgOg-EdlemjLmwitpY9yIRkk6nKYjQxdvGkxuEcdhKclU4VM9fPW46OZhXL6JvG2T0-oZFjy2sbYh8jMcID8LMuR0JJtDCUbw_1GI3Odv9EPIEfW1VvWUwPWtlSmxN67G6Q7Qj9OE4Q8S1LWdqb166zg1nHNovsf4i0NFTr8ux7lH4wQGZqYLc"
                />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-display text-xl text-dark mb-1">Mark van den Berg</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Installatie Expert</p>
                <p className="text-xs text-gray-500 text-center max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  "Perfectie zit in de details die niemand ziet, maar iedereen ervaart."
                </p>
              </div>
            </div>
            <div className="group cursor-pointer lg:translate-y-12">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
                <img
                  alt="Sophie Bakker"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYn791KOT13rsJDS46AqrZVUi_QO4_7Rfdo2VkGC38Tc_yBJu8D0YarWfW77JRNDRV87flBxpsO39iQ20kDhvL6OUHT3jqpMNbTSEXsXZjFczMvtWJ3nb-qLB21l0cW9TAqmCUE2sKeRsHlV50AGwRcVOQ2Z8UKQy5PQbxxbTTna07PT4QBdkQVnITxv7rT6F9b12RVxiStk3QGb-A690KbJPqkggCBmYABejtuzmP5YvP9hI_KFzpIDKQho_nz5ez4oZA5Y4vy9w"
                />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-display text-xl text-dark mb-1">Sophie Bakker</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Project Manager</p>
                <p className="text-xs text-gray-500 text-center max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  "Van eerste schets tot oplevering, ik zorg voor rust."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-dark/10 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group cursor-default text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">Projecten</p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={47} />
              </p>
            </div>
            <div className="group cursor-default text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">Reviews</p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={19} />
              </p>
            </div>
            <div className="group cursor-default text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">Materialen</p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={364} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is handled by main layout */}
    </main>
  );
}
