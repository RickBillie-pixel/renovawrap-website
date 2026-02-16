import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";

const city = LOCAL_CITIES.find(c => c.slug === "roosendaal")!;

export default function KeukenWrappingRoosendaal() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Roosendaal | Betaalbaar Renoveren | Renovawrap",
      seoDescription: "Keuken wrappen Roosendaal? ✓ 300+ kleuren ✓ Tot 70% goedkoper ✓ Binnen 1 dag klaar ✓ 5 jaar garantie. Specialist in West-Brabant. Gratis offerte!",
      heroLine1: "Keuken Wrappen",
      heroLine2: "in Roosendaal",
      heroSubtitle: "Woont u in Roosendaal of omgeving en bent u toe aan een nieuwe uitstraling voor uw keuken? Met keuken wrapping bespaart u tot 70% ten opzichte van een volledig nieuwe keuken. Geen sloopwerk, geen weken wachten. Wij realiseren uw vernieuwde keuken in slechts één dag.",
      introParagraph: "Keuken wrapping in Roosendaal en omgeving West-Brabant. Bespaar tot 70% op uw keukenrenovatie. Geen sloopwerk, geen overlast. Binnen één dag een compleet vernieuwde keuken.",
      werkwijzeIntro: "In 4 Stappen Uw Droomkeuken in Roosendaal",
      whyTitle: "Bespaar tot 70% op Uw Keukenrenovatie in West-Brabant",
      materialenIntro: "Wij brengen een uitgebreide selectie wrapfolies mee naar uw woning in Roosendaal. Met meer dan 300 afwerkingen vindt u gegarandeerd de perfecte match. Van strakke matte kleuren tot authentieke houtstructuren, alles kras- en stootvast, ontworpen voor jarenlang gebruik.",
      layoutVariant: 'benefits_first',
      formTitle: "Gratis Offerte Roosendaal",
      reviewTitle: "Wat Klanten uit West-Brabant",
      watWeWrappenIntro: "Roosendaal en omgeving Bergen op Zoom en Etten-Leur: wij bedienen heel West-Brabant.",
    }} />
  );
}
