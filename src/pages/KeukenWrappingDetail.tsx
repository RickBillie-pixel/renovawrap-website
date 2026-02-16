import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "@/hooks/useSEO";
import KeukenWrappingDesktop from "./KeukenWrappingDesktop";
import KeukenWrappingMobile from "./KeukenWrappingMobile";

export default function KeukenWrappingDetail() {
  useSEO({
    title: "Keuken Wrapping — Uw Keuken Als Nieuw | Renovawrap",
    description: "Keuken wrapping specialist. Transformeer uw keuken tot 70% goedkoper zonder sloopwerk. 300+ premium afwerkingen, 5 jaar garantie.",
    canonical: canonicalFor("/diensten/keuken-wrapping"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Keuken Wrapping", url: canonicalFor("/diensten/keuken-wrapping") },
      ]),
      ...buildService("Keuken Wrapping", "Transformeer uw keuken tot 70% goedkoper zonder sloopwerk. Kies uit 300+ premium afwerkingen."),
    ],
  });

  return (
    <>
      <div className="hidden md:block">
        <KeukenWrappingDesktop />
      </div>
      <div className="block md:hidden">
        <KeukenWrappingMobile />
      </div>
    </>
  );
}
