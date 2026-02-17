import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";

const city = LOCAL_CITIES.find(c => c.slug === "limburg")!;

export default function KeukenWrappingLimburg() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Limburg | Heel Limburg Bediend | Renovawrap",
      seoDescription: "Keuken wrappen Limburg? ✓ Van Maastricht tot Venlo ✓ Tot 70% goedkoper ✓ Binnen 1 dag klaar ✓ 5 jaar garantie. Specialist voor heel Limburg. Gratis offerte!",
      heroLine1: "Keuken Wrappen",
      heroLine2: "in Limburg",
      heroSubtitle: "Van Maastricht tot Venlo, van Heerlen tot Roermond. Wij bedienen heel Limburg. Met keuken wrapping bespaart u tot 70% op uw keukenrenovatie. Geen sloopwerk, professioneel vakmanschap en opgeleverd binnen één werkdag.",
      introParagraph: "Keuken wrapping voor heel Limburg. Van Maastricht tot Venlo, wij komen bij u langs. Bespaar tot 70%, geen sloopwerk en klaar binnen één dag.",
      werkwijzeIntro: "In 3 Stappen Uw Droomkeuken in Limburg",
      whyTitle: "Bespaar tot 70% op Uw Keukenrenovatie in Limburg",
      materialenIntro: "Voor onze Limburgse klanten hebben wij een uitgebreide selectie van meer dan 300 wrapfolies. Of u nu in een Limburgse hoeve woont of een stadsappartement, wij hebben de perfecte afwerking. Van rustieke houttinten tot ultra-moderne designs.",
      layoutVariant: 'benefits_first',
      formTitle: "Gratis Offerte Limburg",
      reviewTitle: "Wat Limburgse Klanten",
      extraSection: (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Werkgebied</span>
              <h2 className="font-display text-3xl md:text-4xl text-dark mb-4">
                Actief in <span className="italic text-primary">Heel Limburg</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Wij rijden door heel Limburg voor onze klanten. Van Zuid-Limburg tot Noord-Limburg, u kunt altijd rekenen op dezelfde topkwaliteit.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stad: "Maastricht", regio: "Zuid-Limburg" },
                { stad: "Heerlen", regio: "Parkstad" },
                { stad: "Venlo", regio: "Noord-Limburg" },
                { stad: "Roermond", regio: "Midden-Limburg" },
                { stad: "Sittard", regio: "Westelijke Mijnstreek" },
                { stad: "Weert", regio: "Midden-Limburg" },
                { stad: "Kerkrade", regio: "Parkstad" },
                { stad: "Geleen", regio: "Westelijke Mijnstreek" },
              ].map(item => (
                <div key={item.stad} className="bg-white p-5 text-center border border-gray-100 hover:border-primary transition-colors">
                  <p className="font-display text-base text-dark">{item.stad}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.regio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    }} />
  );
}
