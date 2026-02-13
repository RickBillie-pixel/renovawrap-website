import { useSEO, buildBreadcrumbs, buildService } from "@/hooks/useSEO";
import KeuzehulpFrontjes from "../components/KeuzehulpFrontjes";

export default function KeukenFrontjesDetail() {
  useSEO({
    title: "Keuken Frontjes Wrappen — Nieuwe Look, Geen Sloopwerk | Renovawrap",
    description: "Keuken frontjes wrappen met premium interieurfolie. Van mat-zwart tot warm eiken. Bespaar duizenden euro's vs. een nieuwe keuken.",
    canonical: "https://renovawrap.nl/diensten/keuken-frontjes",
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: "https://renovawrap.nl/" },
        { name: "Diensten", url: "https://renovawrap.nl/diensten" },
        { name: "Keuken Frontjes", url: "https://renovawrap.nl/diensten/keuken-frontjes" },
      ]),
      ...buildService("Keuken Frontjes Wrappen", "Keuken frontjes wrappen met premium interieurfolie in 300+ kleuren. Klaar binnen twee dagen."),
    ],
  });
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
                Uitgekeken op uw keukenfrontjes? Een nieuwe keuken kost al snel €10.000+. Wij wrappen uw bestaande frontjes met premium interieurfolie in de kleur en structuur van uw keuze — van mat-zwart tot warm eiken. Niet van echt te onderscheiden, klaar binnen twee dagen en een fractie van de kosten.
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
                  Gratis Offerte Binnen 24 Uur
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="/projecten">
                  Bekijk Voor & Na Foto's
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-xl">
                <div className="relative z-10">
                  <img
                    alt="Modern kitchen fronts transformation"
                    className="w-full aspect-square object-cover shadow-2xl"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCoeZeJo1eRqfjL0ezP8hPgoggGYmqwYG8qFrYW7rTiwYL8K0g7yL6nul0Ftevcm8dQnMuIfUWRMituneqqgSFHO2IGAne4oTTvOIVP9esFTa_Qs1f65ixmWdkCMCJcJeE9Cu11ncaI58LRjdOcVb6InflViTnrnoxZasSBcHOp-TqNvqcHpHYMNRklcJvCdercYswkeC9yvxHVbMgsLAwjiIMbOQm6ebCAzH5uPntIm89jPNVtLxr_4ljM2lsVo-IADOCGvcIfJM"
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
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw"
              },
              {
                title: "Kader & Profiel",
                desc: "Heeft u klassieke frontjes met reliëf? Geen probleem. Onze folies vormen zich perfect naar de contouren.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY",
                className: "md:mt-24"
              },
              {
                title: "Herstel & Correctie",
                desc: "Loslatende folie van de fabriek? Wij verwijderen de oude laag en brengen een duurzamere nieuwe laag aan.",
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
      </section>

      {/* 5. Keuzehulp */}
      <section id="keuzehulp" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Direct Een Prijsindicatie</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark mb-6">Stel Uw Nieuwe <br/> <span className="italic text-gray-400">Look Samen</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Gebruik onze slimme configurator om direct een beeld te krijgen van de mogelijkheden en kosten voor uw frontjes.
            </p>
        </div>
        <KeuzehulpFrontjes />
      </section>
    </main>
  );
}
