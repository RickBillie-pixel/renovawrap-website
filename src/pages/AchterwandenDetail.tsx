import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "@/hooks/useSEO";
import AchterwandenDesktop from "./AchterwandenDesktop";
import AchterwandenMobile from "./AchterwandenMobile";

export default function AchterwandenDetail() {
  useSEO({
    title: "Achterwanden Wrappen — Spatwaterdicht & Hittebestendig | Renovawrap",
    description: "Achterwand wrappen over bestaande tegels. Spatwaterdicht, hittebestendig en in elke stijl. Binnen één dag geplaatst.",
    canonical: canonicalFor("/diensten/achterwanden"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Achterwanden", url: canonicalFor("/diensten/achterwanden") },
      ]),
      ...buildService("Achterwanden Wrappen", "Keuken achterwand wrappen over bestaande tegels. Spatwaterdicht, hittebestendig en in elke denkbare stijl."),
    ],
  });

  return (
    <>
      <div className="hidden md:block">
        <AchterwandenDesktop />
      </div>
      <div className="block md:hidden">
        <AchterwandenMobile />
      </div>
    </>
  );
}
