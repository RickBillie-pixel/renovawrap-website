import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "@/hooks/useSEO";
import KozijnenDesktop from "./KozijnenDesktop";
import KozijnenMobile from "./KozijnenMobile";

export default function KozijnenDetail() {
  useSEO({
    title: "Kozijnen Wrappen — Zwarte Kozijnen Zonder Schilderwerk | Renovawrap",
    description: "Kozijnen, ramen en schuifpuien wrappen met UV-bestendige buitenfolie. Niet van gepoedercoat aluminium te onderscheiden.",
    canonical: canonicalFor("/diensten/kozijnen"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Kozijnen", url: canonicalFor("/diensten/kozijnen") },
      ]),
      ...buildService("Kozijnen Wrappen", "Kozijnen, ramen en schuifpuien wrappen met UV-bestendige buitenfolie. Zonder steigers, zonder sloopwerk."),
    ],
  });

  return (
    <>
      <div className="hidden md:block">
        <KozijnenDesktop />
      </div>
      <div className="block md:hidden">
        <KozijnenMobile />
      </div>
    </>
  );
}
