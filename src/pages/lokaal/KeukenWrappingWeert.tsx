import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";

const city = LOCAL_CITIES.find(c => c.slug === "weert")!;

export default function KeukenWrappingWeert() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Weert | Vakkundig & Voordelig | Renovawrap",
      seoDescription: "Keuken wrappen Weert? ✓ Binnen 1 dag klaar ✓ Tot 70% goedkoper ✓ 300+ kleuren ✓ 5 jaar garantie. Ook in Nederweert & Cranendonck. Vraag offerte aan!",
      heroLine1: "Keuken Wrappen",
      heroLine2: "in Weert",
      heroSubtitle: "Bent u in Weert of omgeving op zoek naar een betaalbare manier om uw keuken te vernieuwen? Keuken wrapping biedt een professioneel resultaat tegen een fractie van de prijs. Geen overlast, geen sloopwerk en klaar binnen één werkdag.",
      introParagraph: "Keuken wrapping specialist voor Weert, Nederweert en Cranendonck. Betaalbaar, professioneel en snel. Bespaar tot 70% en geniet binnen één dag van een vernieuwde keuken.",
      werkwijzeIntro: "In 4 Stappen Uw Nieuwe Keuken in Weert",
      whyTitle: "Bespaar Duizenden Euro's op Uw Keuken in Weert",
      materialenIntro: "Wij komen graag naar Weert met ons uitgebreide stalenboek. Meer dan 300 premium afwerkingen, van landelijke houttinten tot moderne betonlook. Alle folies zijn krasbestendig, hittebestendig en ontworpen voor dagelijks keukengebruik.",
      layoutVariant: 'standard',
      formTitle: "Gratis Offerte Weert",
      reviewTitle: "Wat Klanten uit Weert",
      watWeWrappenIntro: "In Weert en de Peel bedienen wij veel gezinswoningen met ruime keukens. Ideaal voor een betaalbare make-over met wrapping.",
    }} />
  );
}
