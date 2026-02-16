import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "@/hooks/useSEO";
import KeukenFrontjesDesktop from "./KeukenFrontjesDesktop";
import KeukenFrontjesMobile from "./KeukenFrontjesMobile";

export default function KeukenFrontjesDetail() {
  useSEO({
    title: "Keuken Frontjes Wrappen — Nieuwe Look, Geen Sloopwerk | Renovawrap",
    description: "Keuken frontjes wrappen met premium interieurfolie. Van mat-zwart tot warm eiken. Bespaar duizenden euro's vs. een nieuwe keuken.",
    canonical: canonicalFor("/diensten/keuken-frontjes"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Keuken Frontjes", url: canonicalFor("/diensten/keuken-frontjes") },
      ]),
      ...buildService("Keuken Frontjes Wrappen", "Keuken frontjes wrappen met premium interieurfolie in 300+ kleuren. Klaar binnen twee dagen."),
    ],
  });

  return (
    <>
      <div className="hidden md:block">
        <KeukenFrontjesDesktop />
      </div>
      <div className="block md:hidden">
        <KeukenFrontjesMobile />
      </div>
    </>
  );
}
