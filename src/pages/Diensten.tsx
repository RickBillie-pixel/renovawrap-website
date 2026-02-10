import ServiceCard from "../components/ServiceCard";
import { services } from "../data/mockData";

export default function Diensten() {
  if (typeof document !== "undefined") {
    document.title = "Renovawrap | Diensten";
  }
  return (
    <main className="pt-24 min-h-screen bg-background-light text-dark">
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background text watermark */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden pt-12">
          <span className="font-display font-bold text-[18vw] leading-none text-dark whitespace-nowrap tracking-tighter">
            DIENSTEN
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          {/* Page header */}
          <div className="flex flex-col md:flex-row items-end justify-between border-b border-dark/10 pb-12 mb-20">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
              Onze <br />
              <span className="italic font-serif text-primary ml-12">Diensten.</span>
            </h1>
            <div className="md:max-w-xs text-right mt-8 md:mt-0">
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Van complete transformaties tot verfijnde details. Wij bieden hoogwaardige interieur wrapping oplossingen op maat.
              </p>
              <span className="text-[10px] uppercase tracking-[0.2em] text-dark">[ Variant 01 ]</span>
            </div>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                {...service}
                offset={index % 3 === 1}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
