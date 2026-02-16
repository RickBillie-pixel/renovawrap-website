import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";

const city = LOCAL_CITIES.find(c => c.slug === "tilburg")!;

export default function KeukenWrappingTilburg() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Tilburg | Snel & Professioneel | Renovawrap",
      seoDescription: "Keuken wrappen Tilburg? ✓ Professionele montage ✓ Tot 70% goedkoper ✓ Binnen 1 dag klaar ✓ 5 jaar garantie. Specialist in Midden-Brabant. Vraag offerte aan!",
      heroLine1: "Professioneel",
      heroLine2: "Keuken Wrappen Tilburg",
      heroSubtitle: "Tilburg groeit en moderniseert, en uw keuken kan dat ook. Of u nu in het bruisende centrum woont of in een van de buitenwijken, met keuken wrapping geeft u uw keuken een compleet nieuwe uitstraling. Duurzaam, betaalbaar en klaar binnen één dag.",
      introParagraph: "Keuken wrapping specialist voor Tilburg en Midden-Brabant. Van moderne matte designs tot warme houttinten. Transformeer uw keuken in één dag zonder sloopwerk.",
      werkwijzeIntro: "In 4 Stappen Uw Droomkeuken in Tilburg",
      whyTitle: "Bespaar Duizenden Euro's op Uw Keuken in Tilburg",
      materialenIntro: "Voor bewoners van Tilburg en omgeving presenteren wij een collectie van meer dan 300 premium wrapfolies. Van industriële betonlook tot Scandinavisch houtdesign, voor iedere interieurstijl de perfecte afwerking. Hittebestendig, krasbestendig en ontworpen voor het dagelijks leven.",
      layoutVariant: 'standard',
      formTitle: "Gratis Offerte Tilburg",
      reviewTitle: "Wat Tilburgers",
      watWeWrappenIntro: "Tilburg kent veel jaren '60 en '70 woningen met prima keukens die alleen qua uitstraling verouderd zijn. Wij geven ze een compleet nieuwe look, zonder onnodige sloop.",
      extraSection: (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Midden-Brabant</span>
              <h2 className="font-display text-3xl md:text-4xl text-dark mb-4">
                Actief in Heel <span className="italic text-primary">Midden-Brabant</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Vanuit Helmond bedienen wij heel Midden-Brabant. Naast Tilburg ook in Waalwijk, Goirle, Oisterwijk en omstreken. Wij komen altijd gratis bij u langs voor advies.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {["Tilburg-Noord", "Oud-Zuid", "Berkel-Enschot", "Waalwijk", "Goirle"].map(loc => (
                <div key={loc} className="bg-white p-5 text-center border border-gray-100 hover:border-primary transition-colors">
                  <p className="font-display text-base text-dark">{loc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    }} />
  );
}
