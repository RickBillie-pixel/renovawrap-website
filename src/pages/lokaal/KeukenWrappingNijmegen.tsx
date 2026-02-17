import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";

const city = LOCAL_CITIES.find(c => c.slug === "nijmegen")!;

export default function KeukenWrappingNijmegen() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Nijmegen | Vakmanschap & Kwaliteit | Renovawrap",
      seoDescription: "Keuken wrappen Nijmegen? ✓ Vakkundige monteurs ✓ Tot 70% goedkoper ✓ Binnen 1 dag klaar ✓ 5 jaar garantie. Ook in Arnhem & Wijchen. Vraag offerte aan!",
      heroLine1: "Keuken Wrappen",
      heroLine2: "in Nijmegen",
      heroSubtitle: "Nijmegen, de oudste stad van Nederland, verdient keukens die bij haar karakter passen. Met keuken wrapping geeft u uw keuken een nieuwe uitstraling die past bij uw woning, of het nu gaat om een monumentaal pand of een moderne nieuwbouwwoning.",
      introParagraph: "Keuken wrapping specialist voor Nijmegen en heel Gelderland. Van klassieke houttinten voor historische panden tot strakke moderne looks. Bespaar tot 70% op keukenrenovatie.",
      werkwijzeIntro: "In 3 Stappen Uw Droomkeuken in Nijmegen",
      whyTitle: "Bespaar tot 70% op Uw Keukenrenovatie in Nijmegen",
      materialenIntro: "Voor woningen in Nijmegen, van vooroorlogs tot modern, bieden wij de perfecte foliecollectie. Meer dan 300 afwerkingen waaronder klassieke houttinten die passen bij een karakteristiek pand, en strakke matte kleuren voor moderne appartementen. Alles krasbestendig en duurzaam.",
      layoutVariant: 'benefits_first',
      formTitle: "Gratis Offerte Nijmegen",
      reviewTitle: "Wat Nijmegenaren",
      extraSection: (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Monumentale Panden", desc: "Klassieke houttinten die het karakter behouden" },
                    { label: "Jaren '30 Woningen", desc: "Warme tinten voor authentieke sfeer" },
                    { label: "Nieuwbouw", desc: "Strakke matte of hoogglans afwerkingen" },
                    { label: "Appartementen", desc: "Compacte keukens maximaal benutten" },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 p-6">
                      <h4 className="font-display text-base text-dark mb-2">{item.label}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Regio Gelderland</span>
                <h2 className="font-display text-3xl md:text-4xl text-dark mb-6 leading-tight">
                  Passend bij Elk <span className="italic text-primary">Woningtype</span> in Nijmegen
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Nijmegen heeft een divers woningbestand, van monumentale panden in het centrum tot moderne wijken in Lent en Dukenburg. Wij stemmen onze aanpak af op uw specifieke keuken en woonstijl. Onze monteurs zijn ervaren met alle gangbare keukentypes.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Nijmegen-centrum", "Lent", "Dukenburg", "Lindenholt", "Wijchen", "Arnhem"].map(w => (
                    <span key={w} className="text-xs uppercase tracking-wider px-3 py-1.5 bg-gray-50 text-gray-500 border border-gray-100">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    }} />
  );
}
