import FadeIn from "../components/FadeIn";
export default function Projecten() {
  if (typeof document !== "undefined") {
    document.title = "Renovawrap | Projecten";
  }
  return (
    <main className="pt-24 bg-background-light text-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden border-b border-dark/5">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04] overflow-hidden">
          <span className="font-display font-bold text-[22vw] leading-none text-dark whitespace-nowrap tracking-tighter transform rotate-1">
            PORTFOLIO
          </span>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          <div className="lg:col-span-12 flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8 pb-6 border-b border-dark/10">
            <span>[Portfolio]</span>
            <span className="hidden md:inline">[Transformaties]</span>
            <span>[2024]</span>
          </div>
          <div className="lg:col-span-9">
            <h1 className="font-display text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
              Onze <br /> <span className="italic font-serif text-primary pl-24">Projecten</span>
            </h1>
          </div>
          <div className="lg:col-span-3 flex flex-col justify-end pb-4">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light mb-8">
              Van complete keukentransformaties tot verfijnde details. Ontdek hoe wij ruimtes nieuw leven inblazen.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-dark"></div>
              <span className="text-xs uppercase tracking-widest">Scroll verder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-32 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary mb-4 block">
                [Uitgelicht Project]
              </span>
              <h2 className="font-display text-5xl md:text-6xl mb-8 leading-tight">
                Modern <span className="italic text-primary">Japandi</span> Keuken
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Een complete transformatie van een gedateerde keuken naar een serene Japandi-oase. Natuurlijke houtnerven gecombineerd met matte zwarte accenten creëren een tijdloze elegantie.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Locatie
                  </span>
                  <p className="font-display text-xl">Utrecht</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Jaar
                  </span>
                  <p className="font-display text-xl">2024</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Type
                  </span>
                  <p className="font-display text-xl">Keuken</p>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium hover:gap-4 transition-all duration-300 hover:text-primary"
                href="#"
              >
                Bekijk Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="relative aspect-[4/5]">
              <img
                alt="Modern Japandi Keuken"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaokLjJtt3THzJ0a_CuQmJrHcqhUnvD3wGFy_7xqQPM8NH4hIClvQmOX3O0rPh0jnCESr7zoZlf3c_6hFbfw9su7237uZMjmcC3cz85fTBSTPWA9GODigkJe22qVNNvpXkpw9zyaiGoeEyder6XyQEAJZk58zI_gHy9PrAfGhNEqK_v9fFZHgMU5er6CQ2LKoWeeqkl_3SeZaA45wYV9v0NA2OPyPOCAGp3WVuZ0QhtLyhK__BwsD8kpX3QLXW2VFMF-1GavW3gQs"
              />
              <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 text-xs uppercase tracking-widest backdrop-blur-sm">
                Voor/Na
              </div>
            </div>
          </div>

          {/* Before/After Slider */}
          <div className="relative w-full max-w-5xl mx-auto aspect-video bg-gray-100 overflow-hidden">
            <img
              alt="Voor transformatie"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkGVvKItR0l7kAJLFS7KEIt8lmJK2-BpnJQ-BO_jeasEtfDayH0BomYezFZWmd5uSqTyF1K0TORN2h511epab0S06AAI3n5pix5cuPDbKREWH1jNsyPiZMnnBbaKgWaRQqSl6xjCLLYrF1hFngOT-IjmLbOcwLIjgDsWdwSSxrg81vB1TglpBn6rqNlQr89kZky-K8Oh0BGgtFaTdZj3qZTt484sbj_spUAzYknjuAFVxAJYbLz4Q88GgxSrNUGYtdgtrGh2duJxg"
            />
            <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden border-r-2 border-white shadow-2xl z-10">
              <img
                alt="Na transformatie"
                className="absolute inset-0 w-[200%] max-w-none h-full object-cover object-left"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATLJwpRxfTCHkk6_9WDKTRGcCKeJCCoOFeDLZPgcnnP8W0FZa62qK0AbAHCNy0zfQHJqFd5QJ3GtAu0m37-BEXAh-6VvC3rZHj4cWU_KznSKwlp6foSFv3T5fsggpgqHpZih22KPXT5zzcfRuI5TbnUa9ImKzFgXJPjyhqZKg_GvNiJRpCNAGvOih09IeE7Ggs0hkI4JIHU5CA_LY6aO8yaGpYmGGVz2e0bELlD1dE5o7w3PB2e2qDZov0iHU8rjic1En6GUbPktw"
              />
            </div>
            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider z-20">
              Na
            </div>
            <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
              Voor
            </div>
            <div className="absolute inset-y-0 left-1/2 -ml-px w-0.5 bg-white z-20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize">
                <span className="material-symbols-outlined text-dark text-sm">code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-32 bg-white border-t border-dark/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-4">
              Meer Projecten
            </span>
            <h2 className="font-display text-5xl md:text-6xl">
              Ons <span className="italic text-primary">Portfolio</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Villa Noord",
                location: "Amsterdam",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDfL7qINi37VjLDcOpZKMO-VBKh51fQ7lAfH4cPd2OBOI3zjpg-McDwGyUd_uH5hZ3ctdbAgrxtD456rTV_KbtJ2PCbqCoKFWBtiSQU48ySaxoLR2mjLCy5Zt0VdQwBMRLFcArnt1bld6cnG1E3fc2pThWjtrYqhutTSJbUjCS9TQDIDbelwgmTLN2kzIF-CV_tJQhp0c7pAiKpK1vttq8sS3jNXmCWaonxm9fFRWnMXZSGx2FEEiS5R_0slmR7xKojP1gFSkb1PJQ",
              },
              {
                title: "Keuken Renovatie",
                location: "Rotterdam",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuC_bNep-OjxTMyszSbRUzRxrVDgcb2NZ8M2BbN_gI98vD8jqlfLapPkMJRvcoiBwhO5SNe8UJ6XG1nH_FrEevAp_nV2qBQKKezi4_K3mCLg7dBWwfmUr4f6OAc9iDkJSS6h3kQDOeUk0E_fLuCWj2ylr97lET0PacC_tQtjTZGmbwHOATbO3yPV7WE30u2jEZKPXy5DVwKcbhg6vT_jLkDGs23559bTwKiEyywXq_HUlnezVfDYt_ovGBIwiVTXwXa3r3vgRmItcuc",
              },
              {
                title: "Minimal Loft",
                location: "Den Haag",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLQfVa9fZjZPK_NK_bQzLKVSR0S0ZdJfPXanUgVC0GRKBmJcU34Ea1chqPiy9K1LJkMRghQShPyim5Nk5QKl4y4AsKFXK-K-b10GprhTkVPc-j_jOnV2cDMmYmX0R7hAVzyu6CV00XU9ycD1WyGob0yHqXNsD18vqz26epnmDfBUuil4oK8YQ2FZfpUl75081-0Pa51Wb_oQf-JIrIhBqQxGfRGTUeHKcuVFG_ylhhahXPX8eH6pr6aLsHvhm6EmSgMTZHPsSGhI",
              },
            ].map((project, index) => (
              <FadeIn key={index} delay={index * 100} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-gray-100">
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-start border-t border-dark/10 pt-4">
                  <div>
                    <h3 className="font-display text-2xl mb-1">{project.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-400">{project.location}</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-dark transition-colors">
                    arrow_outward
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
