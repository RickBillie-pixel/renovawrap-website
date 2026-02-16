import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "../hooks/useSEO";
import KastenDesktop from "./KastenDesktop";
import KastenMobile from "./KastenMobile";

export default function KastenDetail() {
  useSEO({
    title: "Inbouwkasten Wrappen — Premium Renovatie Zonder Sloop | Renovawrap",
    description: "Geef uw inbouwkast, kledingkast of dressoir een hoogwaardige design-look. Duurzaam, stofvrij en voordeliger dan nieuw.",
    canonical: canonicalFor("/diensten/kasten"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Kasten", url: canonicalFor("/diensten/kasten") },
      ]),
      ...buildService("Kasten Wrappen", "Kasten en inbouwkasten wrappen met premium interieurfolie. Hoogwaardige afwerking zonder sloopwerk."),
    ],
  });

  return (
    <>
      <div className="hidden md:block">
        <KastenDesktop />
      </div>
      <div className="block md:hidden">
        <KastenMobile />
      </div>
    </>
  );
}
