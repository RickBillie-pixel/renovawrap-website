import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { testimonials, processSteps } from "../data/mockData";
import FadeIn from "../components/FadeIn";
import CountUp from "../components/CountUp";
import ProjectModal from "../components/ProjectModal";
import HorizontalServices from "../components/HorizontalServices";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { projectService } from "@/lib/projectService";
import type { Project } from "@/lib/projectService";
import { useSEO, buildBreadcrumbs, canonicalFor } from "@/hooks/useSEO";
import { BASE_URL } from "@/config/nav";
import ProcessStepsMobile from "../components/ProcessStepsMobile";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(() => projectService.getCachedProjects() || []);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Carousel cycling indices
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [smallTopIndex, setSmallTopIndex] = useState(0);
  const [smallBottomIndex, setSmallBottomIndex] = useState(1);

  useSEO({
    title: "Keuken Wrapping & Interieur Folie | Renovawrap",
    description: "Transformeer uw keuken en interieur met premium wrapping. Zonder sloopwerk, binnen 1 dag klaar. Vraag gratis offerte aan bij Renovawrap.",
    canonical: canonicalFor("/"),
    jsonLd: [
      ...buildBreadcrumbs([{ name: "Home", url: canonicalFor("/") }]),
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Renovawrap",
        url: BASE_URL,
        logo: `${BASE_URL}/favicon.png`,
        description: "Renovawrap is specialist in architecturale keuken- en interieurwrapping in Nederland.",
        areaServed: { "@type": "Country", name: "NL" },
      },
    ],
  });

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);

  // Split projects into featured and non-featured
  const featuredProjects = useMemo(() => {
    // Filter for projects that actually have an image
    const validProjects = projects.filter(p => p.after_image_url || p.before_image_url);
    
    const featured = validProjects.filter(p => p.is_featured);
    // Fallback: if no projects are marked as featured, use the first 5 valid projects
    return featured.length > 0 ? featured : validProjects.slice(0, 5);
  }, [projects]);
  const nonFeaturedProjects = useMemo(() => projects.filter(p => !p.is_featured), [projects]);

  // Cycling: large box (featured) every 10s
  useEffect(() => {
    if (featuredProjects.length <= 1) return;
    const timer = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredProjects.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  // Cycling: hero image every 6s (Desktop only)
  useEffect(() => {
    // Check if we are on mobile (lg breakpoint is 1024px)
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) return;

    if (featuredProjects.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  // Cycling: top-right box (non-featured) every 12s, starts after 3s delay
  useEffect(() => {
    if (nonFeaturedProjects.length <= 1) return;
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        setSmallTopIndex(prev => (prev + 1) % nonFeaturedProjects.length);
      }, 12000);
      return () => clearInterval(timer);
    }, 3000);
    return () => clearTimeout(delay);
  }, [nonFeaturedProjects.length]);

  // Cycling: bottom-right box (non-featured) every 14s, starts after 6s delay
  useEffect(() => {
    if (nonFeaturedProjects.length <= 2) return;
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        setSmallBottomIndex(prev => {
          let next = (prev + 1) % nonFeaturedProjects.length;
          // Avoid showing same project as top-right at the moment of transition
          return next;
        });
      }, 14000);
      return () => clearInterval(timer);
    }, 6000);
    return () => clearTimeout(delay);
  }, [nonFeaturedProjects.length]);

  // Get the current project for each slot
  const currentFeatured = featuredProjects[featuredIndex % Math.max(featuredProjects.length, 1)] || null;
  const currentSmallTop = nonFeaturedProjects[smallTopIndex % Math.max(nonFeaturedProjects.length, 1)] || null;
  const currentSmallBottom = nonFeaturedProjects[smallBottomIndex % Math.max(nonFeaturedProjects.length, 1)] || null;

  return (
    <main className="bg-background-light text-dark font-sans antialiased transition-colors duration-300">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        {/* Background watermark */}
        <div className="absolute left-0 top-[115px] md:top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[18vw] md:text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            INTERIEUR
          </h1>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          
          <div className="lg:hidden flex flex-col h-[calc(100vh-140px)] justify-between pb-6 pt-5 relative z-10">
              <div className="border-b border-dark/10 pb-4 mb-6 relative">
                <h1 className="font-display text-[2.35rem] leading-[0.9] tracking-tight text-dark relative z-10">
                  Geef Uw Keuken & Interieur
                  <span className="italic font-normal text-primary block mt-1">Een Tweede Leven.</span>
                </h1>
                
                <div className="mt-4 relative z-10">
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                    Transformeer uw woning in 1 dag met high-end interieurfolie. Geen sloopwerk, direct resultaat en tot 80% goedkoper dan nieuw.
                  </p>
                </div>
              </div>

              {/* Slider (Fills remaining space) */}
              <div className="relative w-full flex-1 min-h-[200px] shadow-lg overflow-hidden bg-gray-100 mt-4 mb-4 rounded-lg">
                  {featuredProjects.length > 0 ? (
                    featuredProjects.map((project, i) => {
                      const hasBeforeAfter = project.before_image_url && project.after_image_url;
                      const isActive = i === heroIndex % featuredProjects.length;
                      
                      return (
                        <div
                          key={`hero-mobile-${project.id}`}
                          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                          style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
                        >
                          {hasBeforeAfter ? (
                             <div 
                               className="w-full h-full"
                               onClick={(e) => e.stopPropagation()} 
                             >
                               <BeforeAfterSlider
                                 beforeImage={project.before_image_url!}
                                 afterImage={project.after_image_url!}
                                 className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                               />
                             </div>
                          ) : (
                            <img 
                             src={project.after_image_url || project.before_image_url || ""} 
                             alt={project.name} 
                             className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                            />
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <img 
                     src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                     alt="Modern Kitchen Renovation" 
                     className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    />
                  )}
              </div>

               <div className="flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="bg-dark text-white px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center w-full shadow-lg"
                >
                  Bereken Uw Prijs
                </Link>
                <Link
                  to="/projecten"
                  className="flex items-center justify-center text-xs font-bold tracking-widest uppercase border border-dark px-6 py-4 hover:bg-dark hover:text-white transition-all w-full"
                >
                  Bekijk Voorbeelden
                </Link>
              </div>
          </div>

          {/* Desktop Layout (Hidden on mobile) */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Left Content: Text & CTA */}
            <div className="lg:col-span-6 space-y-8">
              <FadeIn>
                <div className="hidden lg:block border-l-2 border-primary pl-4 mb-8">
                  <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Renovatie & Interieur Specialist</span>
                  <p className="font-display text-lg italic text-gray-500">Zonder sloopwerk. Binnen één dag.</p>
                </div>

                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                  Geef Uw Keuken <br /> & Interieur
                  <span className="italic font-normal text-primary block mt-2">Een Tweede Leven.</span>
                </h1>
                
                <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                  Transformeer uw woning in 1 dag met high-end interieurfolie. Geen sloopwerk, direct resultaat en tot 80% goedkoper dan nieuw.
                </p>

                <div className="hidden lg:flex flex-col sm:flex-row gap-6 pt-4">
                  <Link
                    to="/contact"
                    className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center inline-block"
                  >
                    Bereken Uw Prijs
                  </Link>
                  <Link
                    to="/projecten"
                    className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit"
                  >
                    Bekijk Voorbeelden
                    <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right Content: Visual & Interaction */}
            <div className="lg:col-span-6 flex justify-center">
              <FadeIn delay={200}>
                <div className="relative w-full max-w-3xl">
                    <div className="relative z-10 w-full aspect-square md:min-h-[600px] shadow-2xl overflow-hidden bg-gray-100">
                       {featuredProjects.length > 0 ? (
                         featuredProjects.map((project, i) => {
                           const hasBeforeAfter = project.before_image_url && project.after_image_url;
                           const isActive = i === heroIndex % featuredProjects.length;
                           
                           return (
                             <div
                               key={`hero-${project.id}`}
                               className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                               style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
                             >
                               {hasBeforeAfter ? (
                                  <div 
                                    className="w-full h-full"
                                    onClick={(e) => e.stopPropagation()} 
                                  >
                                    <BeforeAfterSlider
                                      beforeImage={project.before_image_url!}
                                      afterImage={project.after_image_url!}
                                      className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                    />
                                  </div>
                               ) : (
                                 <img 
                                  src={project.after_image_url || project.before_image_url || ""} 
                                  alt={project.name} 
                                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                 />
                               )}
                             </div>
                           );
                         })
                       ) : (
                         <img 
                          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                          alt="Modern Kitchen Renovation" 
                          className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                         />
                       )}
                    </div>

                    {/* Floating Badge (Price) - matching style */}
                    <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-white p-6 md:p-8 shadow-xl border border-dark/5 z-20 hidden md:block">
                      <span className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Vanaf</span>
                      <span className="block font-display text-4xl text-primary">€750,-</span>
                    </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </header>

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
                  Slimme Renovatie — 2026
                </span>
              </div>
            </div>
            <div className="lg:col-span-10">
              <FadeIn delay={200}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] max-w-5xl indent-24">
                  Waarom kiezen voor wrapping? Bespaar kosten, geen sloopwerk en geniet van een high-end resultaat dat niet van echt te onderscheiden is.
                </h2>
              </FadeIn>
            </div>
          </div>

          {/* Image Collage - Desktop */}
          <div className="hidden md:block relative w-full max-w-[1200px] mx-auto h-auto min-h-[800px] md:min-h-[700px] mb-24">
            <div className="absolute top-[15%] left-[5%] z-20 max-w-[300px] mix-blend-difference text-white pointer-events-none">
              <h3 className="font-display text-5xl md:text-7xl italic leading-none opacity-90">Snel & Schoon</h3>
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
                Kwaliteit
              </span>
            </div>
            <div className="absolute top-[35%] left-[40%] z-30 pointer-events-none">
              <h3 className="font-display text-5xl md:text-7xl leading-none text-dark bg-background-light/50 backdrop-blur-sm px-4 py-2">
                Duurzaam
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
              <h3 className="font-display text-5xl md:text-7xl italic text-primary leading-none">High-End Design</h3>
              <p className="text-xs uppercase tracking-[0.2em] mt-4 mr-2 text-gray-500">Premium Folies</p>
            </div>
          </div>

          {/* Mobile Specific - Enterprise Layout */}
          <div className="md:hidden space-y-6 mb-24">
            {/* Card 1: Snel & Schoon */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50"
            >
              <div className="flex h-32">
                <div className="w-[40%] relative overflow-hidden">
                  <div className="absolute inset-0 bg-dark/10 z-10"></div>
                  <img
                    alt="Snel en schoon werken"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0xp4zXhxN9OCy1GHjHZUMYQS1ywwcVQs5Nz8ZarRP4evqb8UkZflerz4LuvbXbtPiiGcXnEFo88C1_bbwc1-1-hYyrNv0Lzs5jKdJ6gWrpKWgLCeFSVjJSQ3MFwMQ-4E7GA85ZI3OD58RpSOQ06W6bBV8wm1Mmru44ojWNGsrJxptEeVYRhFD47qxkYPBZeoh-9PttZ7b7Du1D2RUIPIxAeTKVXwvJ482jfZnKLlNWbp66-GvN3OJPv1mjsWrim797aB3HDNhs8"
                  />
                </div>
                <div className="w-[60%] p-5 flex flex-col justify-center relative">
                   <span className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    Kwaliteit
                  </span>
                  <h3 className="font-display text-2xl leading-none italic mb-1">Snel & <br/> Schoon</h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">Geen stof, geen puin, direct resultaat.</p>
                </div>
              </div>
            </motion.div>

             {/* Card 2: Duurzaam */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50"
            >
              <div className="flex h-32 flex-row-reverse">
                <div className="w-[40%] relative overflow-hidden">
                  <div className="absolute inset-0 bg-dark/10 z-10"></div>
                   <img
                    alt="Duurzaam en sterk"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx5WR-hMnWMtZbqI_cg2HAjl9r0Cwt3U9UhDBROjPH5wx7Nj-uKMNQTsFkB15cSgFfAaQ2aXzJNtJx8hdTleOIoJeqW62mYtqOxCZCIwjdWnJnQJJ3JbNG7Zekf2tqaajugaIvzUmQmWOJvwwGs3eZ20QSVXHlR47HrijbKSf5EyUI5BRFX9Rx9jFEBUJBtYlBmIYiY7VHoF2dPP_Wkp4ngKHAMPzVJ9uk4BAXh4edaXlbHDcY6by9hdDcSZGfkHBIBFwTVvZyOp0"
                  />
                </div>
                <div className="w-[60%] p-5 flex flex-col justify-center relative text-right">
                   <h3 className="font-display text-2xl leading-none bg-background-light/50 backdrop-blur-sm self-end px-2 whitespace-nowrap">
                    Duurzaam
                  </h3>
                   <p className="text-xs text-gray-500 mt-2 line-clamp-2">Kras- en stootvast voor dagelijks gebruik.</p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: High-End Design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50"
            >
              <div className="flex h-32">
                <div className="w-[40%] relative overflow-hidden">
                   <div className="absolute inset-0 bg-dark/5 z-10"></div>
                   <img
                    alt="High-end design resultaat"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlQ7CZma-nwhJXHzmQ0OFtElMNDapKx-kKUaGd6kErk-h4r9FRMhkoxkxuhIWOynOp0L3JjCFlF1FOOloizTflsrqmXGLFF2Hp34OusR76JqsT6CTXZnXuXfGCkf6usIw0nA8louiyUXbYJyDiIFJgI9D58QqZEMkqA88QRvN-gtr8v3oMNhjeR3mTHSvnIWDEVI7FfKZpICpW-ybem4EZysHMOg5Y-mN5FK7lacvZonQUgns77wQe8Dj58hlO8DegZQbFc-c99Tw"
                  />
                </div>
                <div className="w-[60%] p-5 flex flex-col justify-center relative">
                   <span className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.2em] text-primary font-bold">
                    Premium
                  </span>
                  <h3 className="font-display text-2xl leading-none italic text-primary mb-1">High-End <br/> Design</h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">Niet van echt te onderscheiden.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 border-t border-dark/10 pt-16 mt-32">
            <FadeIn className="group cursor-default col-span-2 md:col-span-1 flex flex-col items-center md:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">
                Projecten
              </p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={47} />
              </p>
            </FadeIn>
            <FadeIn delay={100} className="group cursor-default col-span-1 flex flex-col items-center md:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">
                Reviews
              </p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={19} />
              </p>
            </FadeIn>
            <FadeIn delay={200} className="group cursor-default col-span-1 flex flex-col items-center md:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">
                Materialen
              </p>
              <p className="font-display text-7xl md:text-8xl text-dark group-hover:translate-x-2 transition-transform duration-500">
                <CountUp end={364} />
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <HorizontalServices />

      {/* Why Renovawrap Section */}
      <section className="py-32 bg-background-light text-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-dark/10 pb-12">
            <h2 className="font-display text-6xl md:text-8xl text-dark leading-none tracking-tight">
              Waarom <br />
              <span className="italic text-primary ml-4">Renovawrap?</span>
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 md:mb-2">
              Het Alternatief Voor Nieuw
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-24">
            {/* Item 01 */}
            <FadeIn className="group">
              <div className="flex items-baseline justify-between mb-8 border-b border-dark/10 pb-4 group-hover:border-primary transition-colors duration-500">
                <h3 className="font-display text-3xl text-dark">Industriële Kwaliteit</h3>
                <span className="font-mono text-sm text-primary">[01]</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Vergeet dunne stickers. Wij werken met industriële interieurfolie die voelt als echt hout, steen of staal. Niet van nieuw te onderscheiden en een blijvende upgrade voor uw woning.
              </p>
            </FadeIn>

            {/* Item 02 - Staggered Down */}
            <FadeIn delay={100} className="group lg:mt-32">
              <div className="flex items-baseline justify-between mb-8 border-b border-dark/10 pb-4 group-hover:border-primary transition-colors duration-500">
                <h3 className="font-display text-3xl text-dark">Slimme Investering</h3>
                <span className="font-mono text-sm text-primary">[02]</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Waarom €15.000 investeren als u voor €2.500 hetzelfde resultaat haalt? Wij behouden de basis en upgraden de esthetiek. Geen stof, geen puin, wel de waarde-vermeerdering.
              </p>
            </FadeIn>

            {/* Item 03 */}
            <FadeIn delay={200} className="group">
              <div className="flex items-baseline justify-between mb-8 border-b border-dark/10 pb-4 group-hover:border-primary transition-colors duration-500">
                <h3 className="font-display text-3xl text-dark">Kras- & Stootvast</h3>
                <span className="font-mono text-sm text-primary">[03]</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Gemaakt om in te leven. Onze architecturale folies zijn kras- en stootvast. Voor hitte direct van het vuur adviseren wij een onderzetter, maar verder zijn vocht en dagelijks gebruik geen enkel probleem.
              </p>
            </FadeIn>

            {/* Item 04 - Staggered Down */}
            <FadeIn delay={300} className="group lg:mt-32">
              <div className="flex items-baseline justify-between mb-8 border-b border-dark/10 pb-4 group-hover:border-primary transition-colors duration-500">
                <h3 className="font-display text-3xl text-dark">Vakmanschap</h3>
                <span className="font-mono text-sm text-primary">[04]</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Geen handige harries, maar getrainde specialisten. Wij wrappen naadloos over randen en hoeken. Wij zijn pas tevreden als u moet voelen om te geloven dat het wrap is.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* Featured Projects Section (Asymmetrical Layout with Auto-Rotate) */}
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
          {projects.length > 0 && (
            <>
              {/* Mobile Specifc Layout (Abstract / Enterprise) */}
              <div className="md:hidden flex flex-col gap-24 relative mb-24">
                 {/* Decorative Background Elements */}
                 <div className="absolute top-[10%] left-[-20%] w-[60%] h-[30%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                 <div className="absolute bottom-[20%] right-[-20%] w-[60%] h-[30%] bg-dark/5 rounded-full blur-3xl pointer-events-none" />

                 {/* 01. Featured Project */}
                 {currentFeatured && (
                   <div 
                     className="relative group"
                     onClick={() => setSelectedProject(currentFeatured)}
                   >
                     <div className="flex items-baseline justify-between mb-4 border-b border-dark/10 pb-2">
                        <span className="font-mono text-xs text-primary">[01]</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{currentFeatured.category}</span>
                     </div>
                     
                     <div className="aspect-[4/5] w-full overflow-hidden relative mb-6">
                        <motion.div
                           initial={{ scale: 1.2 }}
                           whileInView={{ scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="w-full h-full"
                        >
                           <img 
                             src={currentFeatured.after_image_url || currentFeatured.before_image_url || ""} 
                             alt={currentFeatured.name}
                             className="w-full h-full object-cover grayscale contrast-110" // Always grayscale for abstract feel
                           />
                        </motion.div>
                         {/* Reveal Overlay */}
                        <motion.div 
                            initial={{ scaleY: 1 }}
                            whileInView={{ scaleY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                            className="absolute inset-0 bg-background-light origin-bottom"
                        />
                     </div>

                     <h3 className="font-display text-5xl italic leading-[0.9] text-dark mix-blend-multiply">
                       {currentFeatured.name.split(" ").map((word, i) => (
                         <span key={i} className={i % 2 !== 0 ? "text-transparent stroke-text" : ""}>{word} </span>
                       ))}
                     </h3>
                     <p className="text-xs text-gray-400 mt-2 line-clamp-2 max-w-[80%]">
                        High-end renovatie op maat.
                     </p>
                   </div>
                 )}

                 {/* 02. Top Secondary Project */}
                 {currentSmallTop && (
                   <div 
                     className="relative group pl-12" // Indented for staggered feel
                     onClick={() => setSelectedProject(currentSmallTop)}
                   >
                     <div className="flex items-baseline justify-between mb-4 border-b border-dark/10 pb-2">
                        <span className="font-mono text-xs text-primary">[02]</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{currentSmallTop.category}</span>
                     </div>
                     
                     <div className="aspect-square w-full overflow-hidden relative mb-6">
                        <motion.img 
                           initial={{ opacity: 0, x: 20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.8 }}
                           src={currentSmallTop.after_image_url || currentSmallTop.before_image_url || ""} 
                           alt={currentSmallTop.name}
                           className="w-full h-full object-cover grayscale brightness-110"
                         />
                     </div>

                     <h3 className="font-display text-4xl text-right leading-[0.9] text-dark">
                       {currentSmallTop.name}
                     </h3>
                   </div>
                 )}

                 {/* 03. Bottom Secondary Project */}
                 {currentSmallBottom && (
                   <div 
                     className="relative group pr-8"
                     onClick={() => setSelectedProject(currentSmallBottom)}
                   >
                     <div className="flex items-baseline justify-between mb-4 border-b border-dark/10 pb-2">
                        <span className="font-mono text-xs text-primary">[03]</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{currentSmallBottom.category}</span>
                     </div>
                     
                     <div className="aspect-[3/4] w-full overflow-hidden relative mb-6">
                        <div className="absolute inset-0 bg-dark/20 mix-blend-multiply z-10 pointer-events-none"></div>
                        <motion.img 
                           initial={{ scale: 1.1 }}
                           whileInView={{ scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.2 }}
                           src={currentSmallBottom.after_image_url || currentSmallBottom.before_image_url || ""} 
                           alt={currentSmallBottom.name}
                           className="w-full h-full object-cover grayscale contrast-125"
                         />
                         <div className="absolute bottom-4 left-4 z-20">
                            <span className="text-white text-xs tracking-widest uppercase border border-white/30 px-3 py-1 bg-white/10 backdrop-blur-md">
                              Bekijk Project
                            </span>
                         </div>
                     </div>

                     <h3 className="font-display text-4xl italic text-gray-400">
                       {currentSmallBottom.name}
                     </h3>
                   </div>
                 )}
              </div>

              {/* Desktop Layout (Existing) */}
              <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px]">
              
              {/* Left Column (Primary Feature — cycles through featured projects) - Span 7 */}
              <div 
                className="lg:col-span-7 relative group cursor-pointer"
                onClick={() => currentFeatured && setSelectedProject(currentFeatured)}
              >
                <div className="w-full h-[500px] lg:h-[700px] overflow-hidden relative">
                  {/* Stack all featured images; only the active one is fully visible */}
                  {featuredProjects.map((project, i) => {
                    const hasBeforeAfter = project.before_image_url && project.after_image_url;
                    const isActive = i === featuredIndex % featuredProjects.length;

                    return (
                      <div
                        key={project.id}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
                      >
                        {hasBeforeAfter ? (
                          <div 
                            className="w-full h-full"
                            onClick={(e) => e.stopPropagation()} 
                          >
                            <BeforeAfterSlider
                              beforeImage={project.before_image_url!}
                              afterImage={project.after_image_url!}
                              className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                            />
                          </div>
                        ) : (
                          <img
                            alt={project.name}
                            src={project.after_image_url || project.before_image_url || ""}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                          />
                        )}
                      </div>
                    );
                  })}
                  <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors z-10"></div>
                  {/* Text overlay for current featured */}
                  {currentFeatured && (
                    <div className="absolute bottom-8 left-8 z-20">
                      <span
                        key={`cat-${currentFeatured.id}`}
                        className="text-[10px] uppercase tracking-[0.2em] text-white bg-dark/30 backdrop-blur-sm px-3 py-1 mb-2 inline-block animate-fade-up"
                      >
                        {currentFeatured.category}
                      </span>
                      <h3
                        key={`name-${currentFeatured.id}`}
                        className="text-white text-4xl md:text-5xl font-display italic leading-none animate-fade-up"
                      >
                        {currentFeatured.name}
                      </h3>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (Secondary — cycles through non-featured projects) - Span 5 */}
              <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-12">
                
                {/* Top Right */}
                <div 
                  className="relative group cursor-pointer flex-1"
                  onClick={() => currentSmallTop && setSelectedProject(currentSmallTop)}
                >
                  <div className="w-full h-[300px] lg:h-[320px] overflow-hidden relative">
                    {nonFeaturedProjects.map((project, i) => (
                      <div
                        key={project.id}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{ opacity: i === smallTopIndex % nonFeaturedProjects.length ? 1 : 0, zIndex: i === smallTopIndex % nonFeaturedProjects.length ? 1 : 0 }}
                      >
                        <img
                          alt={project.name}
                          src={project.after_image_url || project.before_image_url || ""}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                        />
                      </div>
                    ))}
                    {/* Category badge */}
                    {currentSmallTop && (
                      <div className="absolute top-4 right-4 z-20">
                        <span
                          key={`cat-top-${currentSmallTop.id}`}
                          className="text-[10px] uppercase tracking-[0.2em] text-dark bg-white/80 backdrop-blur-sm px-3 py-1 animate-fade-up"
                        >
                          {currentSmallTop.category}
                        </span>
                      </div>
                    )}
                    {currentSmallTop && (
                      <div className="absolute bottom-6 left-6 z-20">
                        <h3
                          key={`name-top-${currentSmallTop.id}`}
                          className="text-white text-2xl md:text-3xl font-display animate-fade-up"
                        >
                          {currentSmallTop.name}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Right */}
                <div 
                  className="relative group cursor-pointer flex-1"
                  onClick={() => currentSmallBottom && setSelectedProject(currentSmallBottom)}
                >
                  <div className="w-full h-[300px] lg:h-[340px] overflow-hidden relative">
                    {nonFeaturedProjects.map((project, i) => (
                      <div
                        key={project.id}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{ opacity: i === smallBottomIndex % nonFeaturedProjects.length ? 1 : 0, zIndex: i === smallBottomIndex % nonFeaturedProjects.length ? 1 : 0 }}
                      >
                        <img
                          alt={project.name}
                          src={project.after_image_url || project.before_image_url || ""}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                        />
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="text-white border border-white px-6 py-2 uppercase text-xs tracking-[0.2em]">
                        Bekijk Project
                      </span>
                    </div>
                    {currentSmallBottom && (
                      <div className="absolute bottom-6 left-6 z-20">
                        <h3
                          key={`name-bot-${currentSmallBottom.id}`}
                          className="text-white text-2xl md:text-3xl font-display italic animate-fade-up"
                        >
                          {currentSmallBottom.name}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
            </>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-white border-t border-dark/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4 sticky top-32 h-fit">
              <h2 className="font-display text-5xl md:text-6xl mb-8 leading-none">
                Hoe wij <br /> <span className="italic text-primary">werken</span>
              </h2>
              <p className="text-gray-500 max-w-xs mb-12 text-sm leading-relaxed">
                Uw interieur vernieuwen was nog nooit zo simpel. Transparant in kosten, meesterlijk in uitvoering.
              </p>
              <Link
                to="/contact"
                className="inline-block border border-dark px-8 py-3 text-xs uppercase tracking-widest hover:bg-dark hover:text-white transition-all"
              >
                Vraag offerte aan
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

          {/* Mobile View */}
          <div className="lg:hidden">
            <div className="mb-12">
              <h2 className="font-display text-4xl mb-4 leading-none">
                Hoe wij <br /> <span className="italic text-primary">werken</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Uw interieur vernieuwen was nog nooit zo simpel. Transparant in kosten, meesterlijk in uitvoering.
              </p>
              <Link
                to="/contact"
                className="inline-block border border-dark px-8 py-3 text-xs uppercase tracking-widest hover:bg-dark hover:text-white transition-all shadow-sm w-full text-center"
              >
                VRAAG OFFERTE AAN
              </Link>
            </div>
            
            <ProcessStepsMobile 
              steps={processSteps.map(step => ({
                step: step.number,
                title: step.title,
                desc: step.description,
                img: step.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" // Fallback
              }))}
            />
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

          <div className="relative max-w-6xl mx-auto overflow-hidden md:overflow-visible">
            {/* Navigation Buttons - Visible on Desktop */}
            <button 
              onClick={() => setTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:text-primary transition-colors focus:outline-none hidden md:flex"
              aria-label="Previous testimonial"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            
            <button 
              onClick={() => setTestimonialIndex(prev => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:text-primary transition-colors focus:outline-none hidden md:flex"
              aria-label="Next testimonial"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            {/* Desktop View (Toggle based) */}
            <div className="hidden md:block bg-white shadow-xl border border-dark/5 overflow-hidden">
               {testimonials.map((testimonial, index) => (
                 <div 
                   key={`desktop-${testimonial.author}`}
                   className={`${index === testimonialIndex ? 'block' : 'hidden'} transition-opacity duration-500`}
                 >
                   <div className="grid grid-cols-1 lg:grid-cols-2">
                     <div className="p-8 md:p-16 flex flex-col justify-center relative order-2 lg:order-1">
                        <div className="absolute top-8 left-8 md:top-12 md:left-12 text-9xl leading-none text-gray-100 font-serif select-none pointer-events-none">
                          "
                        </div>
                       <div className="relative z-10">
                         <p className="text-xl md:text-2xl text-dark font-display italic mb-10 leading-relaxed">
                           "{testimonial.quote}"
                         </p>
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                             <img
                               alt={testimonial.author}
                               className="w-full h-full object-cover"
                               src={testimonial.image}
                             />
                           </div>
                           <div>
                             <h4 className="font-bold text-sm uppercase tracking-widest text-dark">{testimonial.author}</h4>
                             <p className="text-xs text-primary">{testimonial.location}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="relative h-[300px] lg:h-auto lg:min-h-[500px] order-1 lg:order-2">
                       <img
                         src={testimonial.decorativeImage}
                         alt="Project Resultaat"
                         className="absolute inset-0 w-full h-full object-cover"
                       />
                     </div>
                   </div>
                 </div>
               ))}
            </div>

            {/* Mobile View (Swipeable Slider) */}
            <div className="md:hidden">
              <motion.div
                drag="x"
                dragElastic={0.1}
                animate={{ x: `-${testimonialIndex * 100}%` }}
                onDragEnd={(_, info) => {
                  const shift = info.offset.x;
                  const velocity = info.velocity.x;
                  const threshold = 50;
                  
                  if ((shift < -threshold || velocity < -500) && testimonialIndex < testimonials.length - 1) {
                    setTestimonialIndex(prev => prev + 1);
                  } else if ((shift > threshold || velocity > 500) && testimonialIndex > 0) {
                    setTestimonialIndex(prev => prev - 1);
                  }
                }}
                className="flex cursor-grab active:cursor-grabbing"
              >
                {testimonials.map((testimonial) => (
                  <div key={`mobile-${testimonial.author}`} className="min-w-full px-2">
                    <div className="bg-white shadow-xl border border-dark/5 overflow-hidden rounded-xl">
                      <div className="relative h-[250px]">
                        <img
                          src={testimonial.decorativeImage}
                          alt="Project Resultaat"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                         <div className="absolute top-4 left-4 text-6xl leading-none text-white/40 font-serif select-none pointer-events-none">
                          "
                        </div>
                      </div>
                      <div className="p-8 pb-10">
                        <p className="text-lg text-dark font-display italic mb-8 leading-relaxed">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                            <img
                              alt={testimonial.author}
                              className="w-full h-full object-cover"
                              src={testimonial.image}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-[10px] uppercase tracking-widest text-dark">{testimonial.author}</h4>
                            <p className="text-[10px] text-primary">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === testimonialIndex ? 'bg-primary w-6' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
