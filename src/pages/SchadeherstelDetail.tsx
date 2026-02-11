export default function SchadeherstelDetail() {
  if (typeof document !== "undefined") {
    document.title = "Renovawrap | Schadeherstel";
  }
  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            SCHADEHERSTEL
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Stuur Een Foto, Wij Lossen Het Op</span>
                <p className="font-display text-lg italic text-gray-500">Niet alles hoeft opnieuw — vaak is reparatie genoeg.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Schade <br />
                <span className="italic font-normal text-primary">Herstel</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Een kras in uw blad, een loslatende hoek of een scheur in de folie? Alles opnieuw laten doen is onnodig duur. Wij herstellen schade lokaal en onzichtbaar — met dezelfde kleur, dezelfde structuur. Binnen een dagdeel opgelost, voor een fractie van de kosten.
              </p>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-primary text-sm">star</span>)}
                  <span className="ml-1 font-bold text-dark">4.9</span>
                  <span className="ml-1">Google Reviews</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">500+</span>
                <span>Projecten</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="/contact">
                  Stuur Foto & Ontvang Offerte
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="/projecten">
                  Bekijk Herstelresultaten
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-xl">
                <div className="relative z-10">
                  <img
                    alt="Repairing wrapped surface"
                    className="w-full aspect-square object-cover shadow-2xl"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYn791KOT13rsJDS46AqrZVUi_QO4_7Rfdo2VkGC38Tc_yBJu8D0YarWfW77JRNDRV87flBxpsO39iQ20kDhvL6OUHT3jqpMNbTSEXsXZjFczMvtWJ3nb-qLB21l0cW9TAqmCUE2sKeRsHlV50AGwRcVOQ2Z8UKQy5PQbxxbTTna07PT4QBdkQVnITxv7rT6F9b12RVxiStk3QGb-A690KbJPqkggCBmYABejtuzmP5YvP9hI_KFzpIDKQho_nz5ez4oZA5Y4vy9w"
                  />
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

      {/* Applications Section */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-100 pb-12">
            <div className="max-w-xl">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Services</span>
              <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">Reparatie <span className="italic text-gray-400">Technieken</span></h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Spot Repair",
                desc: "Kleine beschadigingen vullen wij op met speciale wax en reparatiemiddelen, exact op kleur gemengd.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY"
              },
              {
                title: "Paneel Vervanging",
                desc: "Is de schade te groot? Dan wrappen we enkel het beschadigde paneel opnieuw. Geen kleurverschil dankzij kleurstabiele folies.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw",
                className: "md:mt-24"
              },
              {
                title: "Ondergrond Herstel",
                desc: "Waterschade of uitgezette spaanplaat? Wij herstellen eerst de kern voordat we de nieuwe toplaag aanbrengen.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRwo0QG3cGcazJtGiKDKbSOSl5YrYgkC7bd5re6bFLjJ5RpJkUnTqxqjICK7bs7v50fEdVvEMnFOdETrAlScnkiGEwjl6xhZsJujHVw0RcucCL0boKG-95d_auEwgBO-RxhmgPfZ1CHPKk3nAkta6T3aamp6RFXn_q3-x3yOtLwx9xRVLyIOQ3EZqsBJE6Lwk9HnostG-8vZNR6nYrxqTqDXGfUUhWqw3qKOen9-ZzCBXUyKlW6Rv7DiCvDQ23oj0L82cNKdHU940"
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
    </main>
  );
}
