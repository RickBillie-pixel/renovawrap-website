import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "@/hooks/useSEO";
import SchadeherstelDesktop from "./SchadeherstelDesktop";
import SchadeherstelMobile from "./SchadeherstelMobile";

export default function SchadeherstelDetail() {
  useSEO({
    title: "Schadeherstel & Reparatie — Folieschade Vakkundig Hersteld | Renovawrap",
    description: "Schadeherstel aan keukens, deuren en interieur. Krassen, deuken en beschadigingen vakkundig hersteld met architecturale folie. Snel, schoon en betaalbaar.",
    canonical: canonicalFor("/diensten/schadeherstel"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Schadeherstel", url: canonicalFor("/diensten/schadeherstel") },
      ]),
      ...buildService("Schadeherstel & Reparatie", "Vakkundig schadeherstel aan keukens, deuren en interieur met architecturale folie."),
    ],
  });

  return (
    <>
      <div className="hidden md:block">
        <SchadeherstelDesktop />
      </div>
      <div className="block md:hidden">
        <SchadeherstelMobile />
      </div>
    </>
  );
}
