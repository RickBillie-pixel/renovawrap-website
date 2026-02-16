import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";

const city = LOCAL_CITIES.find(c => c.slug === "veldhoven")!;

export default function KeukenWrappingVeldhoven() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Veldhoven | Topkwaliteit & Service | Renovawrap",
      seoDescription: "Keuken wrappen Veldhoven? ✓ Lokale specialist ✓ Tot 70% goedkoper ✓ Binnen 1 dag klaar ✓ 5 jaar garantie. Ook in Waalre & Eersel. Vraag gratis offerte aan!",
      heroLine1: "Keuken Wrappen",
      heroLine2: "in Veldhoven",
      heroSubtitle: "Woont u in Veldhoven, Waalre of Eersel en is uw keuken toe aan een upgrade? Keuken wrapping is dé oplossing. Geen dure verbouwing, maar een snelle en duurzame make-over met hoogwaardige interieurfolie. Binnen één dag geniet u van een vernieuwde keuken.",
      introParagraph: "Keuken wrapping specialist voor Veldhoven en de Kempen. Hoogwaardige kwaliteit, lokale service en een eerlijke prijs. Bespaar tot 70% op uw keukenrenovatie.",
      werkwijzeIntro: "In 4 Stappen Uw Droomkeuken in Veldhoven",
      whyTitle: "Bespaar Duizenden Euro's op Uw Keuken in Veldhoven",
      materialenIntro: "Als lokale specialist brengen wij onze complete foliecollectie mee naar uw woning in Veldhoven. Meer dan 300 premium afwerkingen om uit te kiezen, van stijlvol mat zwart tot natuurgetrouwe houtdessins. Alle folies zijn speciaal ontwikkeld voor intensief keukengebruik.",
      layoutVariant: 'standard',
      formTitle: "Gratis Offerte Veldhoven",
      reviewTitle: "Wat Klanten uit de Kempen",
      watWeWrappenIntro: "In Veldhoven en de Kempengemeenten zien wij veel keukens die technisch nog prima zijn maar visueel een opfrisbeurt nodig hebben. Wij geven ze een nieuwe look.",
    }} />
  );
}
