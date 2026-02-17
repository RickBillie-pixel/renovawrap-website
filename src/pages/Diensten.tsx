import ServiceCard from "../components/ServiceCard";
import { services } from "../data/mockData";
import { useSEO, buildBreadcrumbs, canonicalFor } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import FadeIn from "../components/FadeIn";

export default function Diensten() {
  useSEO({
    title: "Onze Diensten — Wrapping & Renovatie | Renovawrap",
    description: "Alle wrapping diensten: keukens, kasten, deuren, kozijnen en meer. Bekijk het volledige aanbod van Renovawrap.",
    canonical: canonicalFor("/diensten"),
    jsonLd: buildBreadcrumbs([
      { name: "Home", url: canonicalFor("/") },
      { name: "Diensten", url: canonicalFor("/diensten") },
    ]),
  });
  return (
    <main className="pt-24 min-h-screen bg-background-light text-dark">
      <section className="relative pt-8 md:pt-32 pb-20 overflow-hidden">
        {/* Background text watermark */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden pt-8 md:pt-32">
          <span className="font-display font-bold text-[20vw] leading-none text-dark whitespace-nowrap tracking-tighter">
            DIENSTEN
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          {/* Page header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-dark/10 pb-4 md:pb-12 mb-6 md:mb-20">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
              Onze <br />
              <span className="italic text-primary md:ml-12">Diensten.</span>
            </h1>
            <div className="w-full md:w-auto md:max-w-xs text-left md:text-right mt-6 md:mt-0">
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Van complete transformaties tot verfijnde details. Wij bieden hoogwaardige interieur wrapping oplossingen op maat.
              </p>
              {/* Mobile CTA */}
              <Link
                to="/contact"
                className="inline-block md:hidden bg-dark text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300"
              >
                Start Uw Transformatie
              </Link>
            </div>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {services.map((service, index) => (
              <div key={service.id} className="contents">
                {/* Mobile: Animated */}
                <FadeIn 
                  direction={index % 2 !== 0 ? "left" : "right"}
                  delay={index * 100}
                  className="md:hidden"
                >
                  <ServiceCard
                    {...service}
                    offset={index % 2 === 1} 
                  />
                </FadeIn>

                {/* Desktop: Static */}
                <div className="hidden md:block">
                  <ServiceCard
                    {...service}
                    offset={index % 2 === 1} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
