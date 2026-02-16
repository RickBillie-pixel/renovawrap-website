import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "@/hooks/useSEO";
import DeurenDesktop from "./DeurenDesktop";
import DeurenMobile from "./DeurenMobile";

export default function DeurenDetail() {
  useSEO({
    title: "Deuren Wrappen — Van Standaard Naar Showroom | Renovawrap",
    description: "Deuren en kozijnen wrappen in mat-zwart, eikenhout of beton. Inclusief kozijnen, binnen een halve dag per deur.",
    canonical: canonicalFor("/diensten/deuren"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Deuren", url: canonicalFor("/diensten/deuren") },
      ]),
      ...buildService("Deuren Wrappen", "Deuren en kozijnen wrappen naar mat-zwart, eikenhout of beton. Compleet ander huis binnen een halve dag."),
    ],
  });

  return (
    <>
      <div className="hidden md:block">
        <DeurenDesktop />
      </div>
      <div className="block md:hidden">
        <DeurenMobile />
      </div>
    </>
  );
}
