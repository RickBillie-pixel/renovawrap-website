import { useSEO, buildBreadcrumbs, buildService, canonicalFor } from "../hooks/useSEO";
import AanrechtbladenDesktop from "./AanrechtbladenDesktop";
import AanrechtbladenMobile from "./AanrechtbladenMobile";

export default function AanrechtbladenDetail() {
  useSEO({
    title: "Aanrechtblad Wrappen — Duurzaam & Krasvast | Renovawrap",
    description: "Geef uw aanrechtblad een tweede leven. Duurzame, krasvaste renovatie in Marmer, Hout of Betonlook. Binnen 1 dag klaar.",
    canonical: canonicalFor("/diensten/aanrechtbladen"),
    jsonLd: [
      ...buildBreadcrumbs([
        { name: "Home", url: canonicalFor("/") },
        { name: "Diensten", url: canonicalFor("/diensten") },
        { name: "Aanrechtbladen", url: canonicalFor("/diensten/aanrechtbladen") },
      ]),
      ...buildService("Aanrechtbladen Wrappen", "Professioneel aanrechtbladen wrappen met duurzame, krasvaste folie. Niet van echt steen te onderscheiden."),
    ],
  });

  return (
    <>
      <div className="hidden md:block">
        <AanrechtbladenDesktop />
      </div>
      <div className="block md:hidden">
        <AanrechtbladenMobile />
      </div>
    </>
  );
}
