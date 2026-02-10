export default function AanrechtbladenDetail() {
  if (typeof document !== "undefined") {
    document.title = "Renovawrap | Aanrechtbladen";
  }
  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            AANRECHTBLAD
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Renovatie & Bescherming</span>
                <p className="font-display text-lg italic text-gray-500">Luxe uitstraling, krachtige prestaties</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Aanrecht <br />
                <span className="italic font-normal text-primary">Bladen</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Is uw keukenblad beschadigd, vergeeld of gewoon niet meer uw smaak? Vervangen is ingrijpend en kostbaar. Wij wrappen uw bestaande blad met een extreem sterke interieurfolie die bestand is tegen dagelijks gebruik.
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
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="#contact">
                  Offerte Aanvragen
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="#portfolio">
                  Bekijk Voorbeelden
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-xl">
                <div className="relative z-10">
                  <img
                    alt="Countertop wrapped in marble look"
                    className="w-full aspect-square object-cover shadow-2xl"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5XJn_yCQ2MdQswfLz5RXt8SKMKQbkydPzTMnpanPXPYiDhZEdVvHdTRu1v8521wGgC8-v7qK3fu08-VpD0KVZZszHUgUvShsK6crsz--K9KqL3G_NF1UWNYr6-zUmFTpNWZHTq1X9eOZQFgkILwG8V64P3wozkDAZ8NeyN3wHxEaMeDolingjig0OeIJyqqRCQRjYzCmlaa5duPA-F8YdZN_W-whcrk3cfOMDOlnEPKo4zUHk9JQJpxJyZk4TWO3LmpWU3K5kzns"
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
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Voordelen</span>
              <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">Slimme Keuze <span className="italic text-gray-400">Voor Werkbladen</span></h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Natuurgetrouw",
                desc: "Of u nu kiest voor hout, marmer of beton: onze folies hebben een voelbare structuur en zijn visueel niet van echt te onderscheiden.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeAl7EgmXSRq_9kwP0fgkb1f9lgoWzOSgPOLKS2TA8LqwdAMieqI_gUV1nNcKf8XU6fxqe9Wihvo69V0Z00vRnv_Q8DP4Db37_TZabKKxZ9WuP2SketmgjvoyPqTjqL40IptSEfGtD0qKnc7Z0rO00-3l1vGAnVLD7LpuhWRXZ2l5V0DqKxUmGwWSHPnaCT2hclf_MF_n8j_ZF92JmxEBewcmvXKAdTDhS8W-eVUsNjTNZ93REZ-fpogn91grqCUQjp_DFW9wP3yc"
              },
              {
                title: "Bestendig",
                desc: "Onze premium folies zijn krasvast, stootvast en bestand tegen vocht en normale keukentemperaturen.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqUtBVZB4jfDKg40sM8nu8elmT9aC71nACxdbMGxI8RvNDGV_X7djngTbvar8z45btnMmc4Oq4t5yguRYvbTUzxDNKjCK6iNWSmlzDEkwPr66di0YivmeUe9O3oKDjGDE5xuXeDUP7mAiBSGtHl85Xt1sdTpU7jpi94JnrQfu1BTPQ0CindwQ2qdRA2KcLc12RBPBPkd5hcXFgsveEOW_q_rCd0KMn7XnSJEH2i64BsClk-dHIT58vFA40Fm_HxK5ks_ittzJN9Jo",
                className: "md:mt-24"
              },
              {
                title: "Snel Resultaat",
                desc: "Geen weken in de troep. In de meeste gevallen is uw aanrechtblad binnen één dag als nieuw, zonder hak- en breekwerk.",
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

      {/* Materials */}
      <section className="py-32 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Kleuren & Prints</span>
              <h2 className="font-display text-4xl text-dark mb-6">Design <br /><span className="italic font-light">Mogelijkheden</span></h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Van klassiek marmer tot strak beton en warm hout. Wij hebben de perfecte match voor uw interieur.
              </p>
              <a className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-dark border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors" href="/catalogus">
                Bekijk Alle Opties
                <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
              </a>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { title: "Marmer", count: "Wit, Zwart, Goudader", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeAl7EgmXSRq_9kwP0fgkb1f9lgoWzOSgPOLKS2TA8LqwdAMieqI_gUV1nNcKf8XU6fxqe9Wihvo69V0Z00vRnv_Q8DP4Db37_TZabKKxZ9WuP2SketmgjvoyPqTjqL40IptSEfGtD0qKnc7Z0rO00-3l1vGAnVLD7LpuhWRXZ2l5V0DqKxUmGwWSHPnaCT2hclf_MF_n8j_ZF92JmxEBewcmvXKAdTDhS8W-eVUsNjTNZ93REZ-fpogn91grqCUQjp_DFW9wP3yc" },
                  { title: "Hout", count: "Eiken, Teak, Walnoot", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqUtBVZB4jfDKg40sM8nu8elmT9aC71nACxdbMGxI8RvNDGV_X7djngTbvar8z45btnMmc4Oq4t5yguRYvbTUzxDNKjCK6iNWSmlzDEkwPr66di0YivmeUe9O3oKDjGDE5xuXeDUP7mAiBSGtHl85Xt1sdTpU7jpi94JnrQfu1BTPQ0CindwQ2qdRA2KcLc12RBPBPkd5hcXFgsveEOW_q_rCd0KMn7XnSJEH2i64BsClk-dHIT58vFA40Fm_HxK5ks_ittzJN9Jo" },
                  { title: "Beton", count: "Grijs, Antraciet", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY" },
                  { title: "Terrazzo", count: "Modern, Klassiek", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2ikwTkRZPr3ERP5NrmRMOHehJai4aLEDwVFxBsYqNxZ3XuGalDfO6iBhHgFkAQGk4_CeHmHCSWl0jTnr7MNULmck1Mz5aj5W1zORqO5kJa4Yg_bUduJIU_dpC5JHNNzhs5uryM5QbiUvrgjnZ96gCqiqR3l-rVmY2H9506zUHp576tylDtFZTuk3_SZsO4vR5zMXjoTI6Q3wJUbSiM-RpOB9Xgs7pls9vxbtLWcXRjzatW0CadkSFOdCH5m82JPelkDFCA-R7HKI" },
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
    </main>
  );
}
