import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { projects, testimonials, processSteps } from "../data/mockData";
import FadeIn from "../components/FadeIn";

export default function Home() {
  // Update document title
  if (typeof document !== "undefined") {
    document.title = "Renovawrap | Home";
  }
  return (
    <main className="pt-24 bg-background-light text-dark font-sans antialiased transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-[85vh] flex flex-col justify-center overflow-hidden">
        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
          <span className="font-display font-bold text-[22vw] leading-none text-dark whitespace-nowrap tracking-tighter">
            INTERIEUR
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 lg:mt-0">
          {/* Top labels */}
          <div className="lg:col-span-12 flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8 lg:mb-10 border-b border-dark/10 pb-4 lg:pb-5">
            <span>[01 — Esthetiek]</span>
            <span>[02 — Renovatie]</span>
            <span>[03 — Perfectie]</span>
          </div>

          {/* Main content */}
          <div className="lg:col-span-8">
            <FadeIn>
              <h1 className="font-display text-6xl md:text-8xl lg:text-[7rem] xl:text-9xl leading-[0.9] mb-8 lg:mb-10 tracking-tight">
                Prachtig Geregelde <br />
                <span className="italic font-serif text-primary pl-16">Slimme</span> Ruimtes.
              </h1>
              <div className="flex items-center gap-6 group cursor-pointer">
                <Link
                  to="/projecten"
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-dark/20 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500"
                >
                  <ArrowDown className="rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                </Link>
                <span className="text-xs uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform duration-300">
                  Ontdek Onze Stijl
                </span>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end pb-4 pl-0 lg:pl-12">
            <p className="text-base lg:text-lg text-gray-600 mb-8 lg:mb-10 max-w-sm leading-relaxed font-light">
              De perfecte combinatie van esthetiek en innovatie. Wij ontwerpen interieurs die zowel mooi als briljant functioneel zijn—ideaal voor modern wonen.
            </p>
            <Link
              to="/diensten"
              className="inline-block border-b border-dark pb-1 text-xs uppercase tracking-[0.2em] hover:text-primary hover:border-primary transition-all w-fit"
            >
              Bekijk Diensten
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-background-light overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
            <div className="lg:col-span-2 hidden lg:block">
              <div className="flex flex-col gap-4 sticky top-32">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] text-gray-400 rotate-180"
                  style={{ writingMode: "vertical-rl" }}
                >
                  Over ons — 2024
                </span>
              </div>
            </div>
            <div className="lg:col-span-10">
              <FadeIn delay={200}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] max-w-5xl indent-24">
                  Onze moderne interieurs weerspiegelen uw levensstijl—we creëren prachtige ruimtes die uniek van u zijn. Wij ontwerpen met hart en precisie.
                </h2>
              </FadeIn>
            </div>
          </div>

          {/* Image Collage */}
          <div className="relative w-full max-w-[1200px] mx-auto h-auto min-h-[800px] md:min-h-[700px] mb-24">
            <div className="absolute top-[15%] left-[5%] z-20 max-w-[300px] mix-blend-difference text-white pointer-events-none">
              <h3 className="font-display text-5xl md:text-7xl italic leading-none opacity-90">Eenvoud</h3>
            </div>
            <div className="absolute top-0 left-[20%] w-[40%] md:w-[28%] aspect-[3/4] z-10 shadow-2xl">
              <div className="w-full h-full overflow-hidden relative">
                <img
                  alt="Minimalistisch interieur detail"
                  className="w-full h-full object-cover grayscale contrast-125"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0xp4zXhxN9OCy1GHjHZUMYQS1ywwcVQs5Nz8ZarRP4evqb8UkZflerz4LuvbXbtPiiGcXnEFo88C1_bbwc1-1-hYyrNv0Lzs5jKdJ6gWrpKWgLCeFSVjJSQ3MFwMQ-4E7GA85ZI3OD58RpSOQ06W6bBV8wm1Mmru44ojWNGsrJxptEeVYRhFD47qxkYPBZeoh-9PttZ7b7Du1D2RUIPIxAeTKVXwvJ482jfZnKLlNWbp66-GvN3OJPv1mjsWrim797aB3HDNhs8"
                />
              </div>
              <span className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.3em] text-gray-400 origin-center whitespace-nowrap">
                Minimalisme
              </span>
            </div>
            <div className="absolute top-[35%] left-[40%] z-30 pointer-events-none">
              <h3 className="font-display text-5xl md:text-7xl leading-none text-dark bg-background-light/50 backdrop-blur-sm px-4 py-2">
                Ontwerpen
              </h3>
            </div>
            <div className="absolute top-[25%] left-[45%] w-[25%] md:w-[18%] aspect-square z-20 shadow-xl border-4 border-background-light">
              <div className="w-full h-full overflow-hidden">
                <img
                  alt="Keuken wrapping detail"
                  className="w-full h-full object-cover grayscale contrast-125 hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx5WR-hMnWMtZbqI_cg2HAjl9r0Cwt3U9UhDBROjPH5wx7Nj-uKMNQTsFkB15cSgFfAaQ2aXzJNtJx8hdTleOIoJeqW62mYtqOxCZCIwjdWnJnQJJ3JbNG7Zekf2tqaajugaIvzUmQmWOJvwwGs3eZ20QSVXHlR47HrijbKSf5EyUI5BRFX9Rx9jFEBUJBtYlBmIYiY7VHoF2dPP_Wkp4ngKHAMPzVJ9uk4BAXh4edaXlbHDcY6by9hdDcSZGfkHBIBFwTVvZyOp0"
                />
              </div>
            </div>
            <div className="absolute top-[50%] right-[5%] w-[55%] md:w-[45%] aspect-[4/3] z-0 opacity-80">
              <div className="w-full h-full overflow-hidden">
                <img
                  alt="Smart space interieur"
                  className="w-full h-full object-cover grayscale brightness-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlQ7CZma-nwhJXHzmQ0OFtElMNDapKx-kKUaGd6kErk-h4r9FRMhkoxkxuhIWOynOp0L3JjCFlF1FOOloizTflsrqmXGLFF2Hp34OusR76JqsT6CTXZnXuXfGCkf6usIw0nA8louiyUXbYJyDiIFJgI9D58QqZEMkqA88QRvN-gtr8v3oMNhjeR3mTHSvnIWDEVI7FfKZpICpW-ybem4EZysHMOg5Y-mN5FK7lacvZonQUgns77wQe8Dj58hlO8DegZQbFc-c99Tw"
                />
              </div>
            </div>
            <div className="absolute bottom-[10%] right-[10%] z-30 text-right">
              <h3 className="font-display text-5xl md:text-7xl italic text-primary leading-none">Met Een Ziel</h3>
              <p className="text-xs uppercase tracking-[0.2em] mt-4 mr-2 text-gray-500">Exclusief Design</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-dark/10 pt-16 mt-32">
            <FadeIn className="group cursor-default">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">
                Projecten
              </p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                126<span className="text-4xl align-top">+</span>
              </p>
            </FadeIn>
            <FadeIn delay={100} className="group cursor-default">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">
                Klanten
              </p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                926<span className="text-4xl align-top">+</span>
              </p>
            </FadeIn>
            <FadeIn delay={200} className="group cursor-default">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">
                Materialen
              </p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                364<span className="text-4xl align-top">+</span>
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Renovawrap Section - Converted to Light Theme */}
      <section className="py-32 bg-background-light text-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-dark/10 pb-12">
            <h2 className="font-display text-6xl md:text-8xl text-dark">
              Waarom <br />
              <span className="italic font-serif text-primary ml-12">Renovawrap?</span>
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 md:mb-2">
              Kwaliteit zonder compromis
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-24">
            <FadeIn className="group">
              <div className="flex items-baseline justify-between mb-8 border-b border-dark/10 pb-4 group-hover:border-primary transition-colors duration-500">
                <h3 className="font-display text-3xl text-dark">Lifestyle Design</h3>
                <span className="font-mono text-sm text-primary">[01]</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm mb-8">
                Wij ontwerpen op basis van u—uw gewoonten, routines en dromen—zodat uw ruimte moeiteloos functioneel en prachtig persoonlijk aanvoelt. Renovatie zonder sloop, maar met karakter.
              </p>
            </FadeIn>
            <FadeIn delay={200} className="group lg:mt-32">
              <div className="flex items-baseline justify-between mb-8 border-b border-dark/10 pb-4 group-hover:border-primary transition-colors duration-500">
                <h3 className="font-display text-3xl text-dark">Tijdloze Esthetiek</h3>
                <span className="font-mono text-sm text-primary">[02]</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Onze stijl is strak, verfijnd en raakt nooit uit de mode. Wij richten ons op tijdloze elementen die sierlijk ouder worden met uw huis. Kwaliteitsfolies die jarenlang meegaan.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 bg-background-light overflow-hidden" id="projecten">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 flex flex-col md:flex-row items-end justify-between">
          <h2 className="font-display text-6xl md:text-8xl text-dark leading-none">
            Geselecteerde <br /> <span className="italic text-primary ml-4">Werken</span>
          </h2>
          <Link
            to="/projecten"
            className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-primary transition-colors mb-4"
          >
            Bekijk alle projecten <span className="material-symbols-outlined text-sm">→</span>
          </Link>
        </div>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <FadeIn
                key={project.id}
                delay={index * 100}
                className="relative group overflow-hidden bg-gray-100 aspect-[4/3]"
              >
                <img
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={project.image}
                />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <div className="border-t border-white/30 pt-4 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div>
                      <h3 className="text-white text-3xl font-display italic">{project.title}</h3>
                      <p className="text-white/80 text-xs uppercase tracking-widest mt-2">
                        {project.location}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-white border-t border-dark/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4 sticky top-32 h-fit">
              <h2 className="font-display text-5xl md:text-6xl mb-8 leading-none">
                Hoe het <br /> <span className="italic text-primary">werkt</span>
              </h2>
              <p className="text-gray-500 max-w-xs mb-12 text-sm leading-relaxed">
                Het ontwerpen van uw droomruimte hoeft niet ingewikkeld te zijn. Wij maken het simpel, transparant en volledig op maat.
              </p>
              <Link
                to="/contact"
                className="inline-block border border-dark px-8 py-3 text-xs uppercase tracking-widest hover:bg-dark hover:text-white transition-all"
              >
                Start uw project
              </Link>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-0">
              {processSteps.map((step, index) => (
                <FadeIn
                  key={step.number}
                  delay={index * 100}
                  className="group border-b border-dark/10 py-12 hover:bg-gray-50 transition-colors px-4 -mx-4 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row gap-8 md:items-start">
                    <span className="font-mono text-xs text-primary mt-2">
                      {step.number}.
                    </span>
                    <div className="flex-grow">
                      <h3 className="font-display text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 max-w-md text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Testimonials</p>
            <h2 className="font-display text-4xl md:text-5xl">
              Luister Naar Wat <span className="italic text-primary border-b border-primary/20">Zij Zeggen.</span>
            </h2>
          </div>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative bg-white p-8 md:p-16 shadow-sm border border-dark/5 max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                <div className="md:col-span-7 order-1 md:order-2">
                  <p className="text-xl md:text-2xl text-dark font-display italic mb-10 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <img
                        alt="Portret"
                        className="w-full h-full object-cover"
                        src={testimonial.image}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest">{testimonial.author}</h4>
                      <p className="text-xs text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
