import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";
import CountUp from "../../components/CountUp";


const city = LOCAL_CITIES.find(c => c.slug === "eindhoven")!;

export default function KeukenWrappingEindhoven() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Eindhoven | Professioneel & Betaalbaar | Renovawrap",
      seoDescription: "Keuken wrappen Eindhoven? ✓ Binnen 1 dag klaar ✓ Tot 70% goedkoper ✓ 300+ kleuren ✓ 5 jaar garantie. Specialist in Brabant. Vraag gratis offerte aan!",
      heroLine1: "Keuken Wrappen",
      heroLine2: "in Eindhoven",
      heroSubtitle: "Eindhoven staat bekend als innovatiestad, en dat geldt ook voor keukenrenovatie. Steeds meer Eindhovenaren kiezen voor wrapping als slim alternatief. Bespaar tot 70% op de kosten, zonder sloopwerk en overlast.",
      introParagraph: "Transformeer uw keuken in Eindhoven tot 70% goedkoper dan een nieuwe keuken. Geen sloopwerk, geen overlast. Binnen één dag een compleet vernieuwde look met 300+ premium afwerkingen.",
      werkwijzeIntro: "In 3 Stappen Uw Droomkeuken in Eindhoven",
      whyTitle: "Bespaar tot 70% op Uw Keukenrenovatie in Eindhoven",
      materialenIntro: "Voor onze klanten in Eindhoven en de Brainport-regio bieden wij een uitgebreide collectie van meer dan 300 hoogwaardige afwerkingen. Van realistische houtnerven en natuursteen tot ultra-matte kleuren en metallic accenten. Elke folie is kras- en stootvast, onderhoudsvriendelijk en ontworpen voor jarenlang gebruik.",
      layoutVariant: 'benefits_first',
      formTitle: "Gratis Offerte Eindhoven",
      reviewTitle: "Wat Eindhovenaren",
      extraSection: (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Brainport Regio</span>
                <h2 className="font-display text-3xl md:text-4xl text-dark mb-6 leading-tight">
                  Innovatief Renoveren in de <span className="italic text-primary">Slimste Regio</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Eindhoven en de Brainport-regio staan synoniem voor innovatie. Keuken wrapping past perfect bij die mentaliteit: slimmer, sneller en duurzamer dan traditionele renovatie. Wij bedienen klanten in heel Eindhoven, van Strijp tot Woensel, van Tongelre tot Gestel, en de omliggende gemeenten Veldhoven, Best en Son.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Strijp", "Woensel", "Tongelre", "Gestel", "Stratum", "Best", "Veldhoven", "Son"].map(w => (
                    <span key={w} className="text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-3 bg-gray-50 text-gray-400 border border-gray-100 text-center hover:border-primary/30 transition-colors">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-8 text-center">
                  <span className="font-display text-4xl text-primary block">
                    <CountUp end={12} suffix="+" suffixClassName="" />
                  </span>
                  <p className="text-sm text-gray-500 mt-2">Projecten in Eindhoven</p>
                </div>
                <div className="bg-gray-50 p-8 text-center">
                  <span className="font-display text-4xl text-dark block">4.9</span>
                  <p className="text-sm text-gray-500 mt-2">Google Reviews score</p>
                </div>
                <div className="bg-gray-50 p-8 text-center">
                  <span className="font-display text-4xl text-dark block">
                    <CountUp end={1} suffix=" dag" suffixClassName="" />
                  </span>
                  <p className="text-sm text-gray-500 mt-2">Gemiddelde doorlooptijd</p>
                </div>
                <div className="bg-primary/5 p-8 text-center">
                  <span className="font-display text-4xl text-primary block">
                    <CountUp end={5} suffix=" jaar" suffixClassName="" />
                  </span>
                  <p className="text-sm text-gray-500 mt-2">Garantie op alle folies</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    }} />
  );
}
