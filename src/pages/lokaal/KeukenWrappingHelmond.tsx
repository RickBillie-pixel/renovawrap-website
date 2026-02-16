import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";


const city = LOCAL_CITIES.find(c => c.slug === "helmond")!;

export default function KeukenWrappingHelmond() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Helmond | Uw Keuken Als Nieuw | Renovawrap",
      seoDescription: "Keuken wrappen Helmond? ✓ Lokale specialist ✓ Tot 70% goedkoper ✓ Binnen 1 dag klaar ✓ 5 jaar garantie. Gevestigd in Helmond. Vraag gratis offerte aan!",
      heroLine1: "Keuken Wrappen",
      heroLine2: "in Helmond",
      heroSubtitle: "Als Helmondse onderneming kennen wij de stad als onze broekzak. Van Brandevoort tot Binnenstad, wij zijn snel ter plaatse voor een vrijblijvend adviesgesprek. Bespaar tot 70% ten opzichte van een nieuwe keuken.",
      introParagraph: "Gevestigd in Helmond, zijn wij dé lokale specialist voor keuken wrapping. Persoonlijke aanpak, snelle service en een resultaat dat u versteld doet staan. Binnen één dag een compleet vernieuwde keuken.",
      werkwijzeIntro: "In 4 Stappen Uw Nieuwe Keuken in Helmond",
      whyTitle: "Bespaar Duizenden Euro's op Uw Keuken in Helmond",
      materialenIntro: "Vanuit onze vestiging in Helmond hebben wij een uitgebreide collectie folies beschikbaar die u ter plaatse kunt bekijken. Meer dan 300 hoogwaardige afwerkingen, van moderne matte kleuren tot warme houttinten.",
      layoutVariant: 'standard',
      formTitle: "Gratis Offerte Helmond",
      reviewTitle: "Wat Klanten uit Helmond",
      werkwijzeSteps: [
        { step: "01", title: "Afspraak bij U Thuis", desc: "Wij komen bij u langs in Helmond voor een persoonlijk adviesgesprek en opmeting. Gratis en vrijblijvend.", icon: "home" },
        { step: "02", title: "Stalenboek Bekijken", desc: "Bekijk ons uitgebreide stalenboek met 300+ kleuren. Wij nemen het mee naar uw woning zodat u de kleuren in uw eigen keuken kunt zien.", icon: "color_lens" },
        { step: "03", title: "Vakkundige Montage", desc: "Onze monteurs komen bij u in Helmond voor de installatie. Binnen 1 dag compleet afgerond.", icon: "construction" },
        { step: "04", title: "Nazorg & Garantie", desc: "Na oplevering ontvangt u een garantiecertificaat. Wij staan altijd voor u klaar, want wij zitten om de hoek.", icon: "verified" },
      ],
      extraSection: (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Uw Buurt, Onze Service</span>
              <h2 className="font-display text-3xl md:text-4xl text-dark mb-6">
                Lokale Service in Heel <span className="italic text-primary">Helmond</span>
              </h2>
              <p className="text-gray-600">
                Als lokaal bedrijf kennen wij Helmond door en door. Wij bedienen alle wijken en buurten, van nieuwbouw tot karakteristieke woningen. Onze monteurs zijn vertrouwd met de meest voorkomende keukenindelingen in de regio.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { wijk: "Brandevoort", type: "Nieuwbouwwijken" },
                { wijk: "Binnenstad", type: "Stadscentrum" },
                { wijk: "Rijpelberg", type: "Woonwijken" },
                { wijk: "Brouwhuis", type: "Gezinswijken" },
                { wijk: "Mierlo", type: "Omliggende kernen" },
                { wijk: "Stiphout", type: "Dorpskernen" },
                { wijk: "Deurne", type: "Regio Peelland" },
                { wijk: "Asten", type: "Regio Peelland" },
              ].map(w => (
                <div key={w.wijk} className="p-4 border border-gray-100 hover:border-primary transition-colors text-center">
                  <p className="font-display text-lg text-dark">{w.wijk}</p>
                  <p className="text-xs text-gray-400 mt-1">{w.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    }} />
  );
}
