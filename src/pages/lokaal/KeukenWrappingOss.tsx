import KeukenWrappingLokaal from "./KeukenWrappingLokaal";
import { LOCAL_CITIES } from "@/lib/localSEO";

const city = LOCAL_CITIES.find(c => c.slug === "oss")!;

export default function KeukenWrappingOss() {
  return (
    <KeukenWrappingLokaal content={{
      city,
      seoTitle: "Keuken Wrappen Oss | Snel, Strak & Voordelig | Renovawrap",
      seoDescription: "Keuken wrappen Oss? ✓ Lokale vakmensen ✓ Tot 70% goedkoper ✓ Binnen 1 dag klaar ✓ 5 jaar garantie. Ook in Uden & Veghel. Vraag nu offerte aan!",
      heroLine1: "Keuken Wrappen",
      heroLine2: "in Oss",
      heroSubtitle: "Wilt u uw keuken in Oss, Uden of Veghel vernieuwen zonder de hoofdprijs te betalen? Keuken wrapping is het antwoord. Wij plakken hoogwaardige folie over uw bestaande keukenkastjes en werkblad. Het resultaat is niet van nieuw te onderscheiden.",
      introParagraph: "Keuken wrapping specialist voor Oss, Uden en Veghel. No-nonsense aanpak, scherpe prijzen en een perfect resultaat. Binnen één dag uw vernieuwde keuken.",
      werkwijzeIntro: "In 4 Stappen Uw Nieuwe Keuken in Oss",
      whyTitle: "Bespaar Duizenden Euro's op Uw Keuken in Oss",
      materialenIntro: "Praktisch en mooi hoeft niet duur te zijn. Voor bewoners van Oss en omgeving bieden wij meer dan 300 premium wrapfolies, van stoere industriële looks tot warme houttinten. Alle folies zijn bestand tegen het dagelijks gebruik in een actieve gezinskeuken.",
      layoutVariant: 'standard',
      formTitle: "Gratis Offerte Oss",
      reviewTitle: "Wat Klanten uit Oss e.o.",
      watWeWrappenIntro: "In Oss, Uden en Veghel treffen wij veel ruime gezinskeukens die nog prima functioneren maar visueel toe zijn aan vernieuwing. De ideale kandidaten voor wrapping.",
    }} />
  );
}
