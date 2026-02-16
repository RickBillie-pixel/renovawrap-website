import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";


const city = LOCAL_CITIES.find(c => c.slug === "utrecht")!;

export default function KeukenWrappingUtrecht() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Utrecht | Duurzaam & Betaalbaar | Renovawrap",
      seoDescription: "Keuken wrappen Utrecht? ✓ Duurzame renovatie ✓ Tot 70% goedkoper ✓ Binnen 1 dag klaar ✓ 5 jaar garantie. Ook in Nieuwegein & De Bilt. Gratis offerte!",
      heroLine1: "Duurzaam Keuken",
      heroLine2: "Wrappen in Utrecht",
      heroSubtitle: "Utrecht loopt voorop in duurzaamheid, en keuken wrapping past daar perfect bij. In plaats van slopen en afvoeren, geven wij bestaande materialen een nieuw leven. Goed voor uw portemonnee én het milieu.",
      introParagraph: "Keuken wrapping in Utrecht en omgeving. De duurzame keuze voor keukenrenovatie. Bespaar tot 70% en verminder afval. Uw keuken als nieuw binnen één dag.",
      werkwijzeIntro: "In 4 Stappen Uw Droomkeuken in Utrecht",
      whyTitle: "Bespaar tot 70% én Kies Duurzaam in Utrecht",
      materialenIntro: "Utrechters kiezen steeds vaker voor bewuste renovatie. Onze collectie van 300+ wrapfolies biedt voor iedere Utrechtse woning de perfecte match, of het nu gaat om een karakteristiek grachtenpand of een modern nieuwbouwappartement. Kras- en stootvast, hittebestendig en jaren mooi.",
      layoutVariant: 'benefits_first',
      formTitle: "Gratis Offerte Utrecht",
      reviewTitle: "Wat Utrechters",
      extraSection: (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Duurzaam Renoveren</span>
                <h2 className="font-display text-3xl md:text-4xl text-dark mb-6 leading-tight">
                  Keuken Wrapping: De <span className="italic text-primary">Circulaire</span> Oplossing
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  In een stad die vooroploopt in duurzaamheid is keuken wrapping de logische keuze. In plaats van uw keuken te slopen, met alle afval en CO₂-uitstoot van dien, verlengen wij de levensduur van uw bestaande keuken met minimaal 10 jaar. Dat bespaart gemiddeld 200 kg afval per keuken.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: "recycling", text: "200 kg minder afval per keuken" },
                    { icon: "eco", text: "Geen productie van nieuwe materialen nodig" },
                    { icon: "local_shipping", text: "Korte aanvoerlijnen, minder transport" },
                    { icon: "timer", text: "In 1 dag klaar, minimale overlast" },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">{item.icon}</span>
                      <span className="text-dark text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-12 text-center">
                  <span className="font-display text-6xl text-primary block mb-4">70%</span>
                  <p className="text-lg text-dark font-display mb-2">Lagere Ecologische Voetafdruk</p>
                  <p className="text-sm text-gray-500">Vergeleken met een volledig nieuwe keuken</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-6 text-center">
                    <span className="font-display text-2xl text-dark block">Nieuwegein</span>
                    <p className="text-xs text-gray-400 mt-1">Actief</p>
                  </div>
                  <div className="bg-gray-50 p-6 text-center">
                    <span className="font-display text-2xl text-dark block">De Bilt</span>
                    <p className="text-xs text-gray-400 mt-1">Actief</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    }} />
  );
}
