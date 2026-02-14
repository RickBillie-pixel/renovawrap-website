import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import ProjectModal from "../components/ProjectModal";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { projectService } from "@/lib/projectService";
import type { Project } from "@/lib/projectService";
import { useSEO, buildBreadcrumbs, canonicalFor } from "@/hooks/useSEO";

const CATEGORIES = [
  "Alle",
  "Keuken Wrapping",
  "Keuken Frontjes",
  "Aanrechtbladen",
  "Achterwanden",
  "Kasten",
  "Deuren",
  "Kozijnen",
  "Schadeherstel",
];

export default function Projecten() {
  // Initialize with cached data if available (Sync render!)
  const [projects, setProjects] = useState<Project[]>(() => projectService.getCachedProjects() || []);
  // Loading is only true if we don't have projects yet
  const [loading, setLoading] = useState(() => !projectService.getCachedProjects());
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [activeStyle, setActiveStyle] = useState("Alle");
  const [activeColor, setActiveColor] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derive unique styles and colors from projects
  const styles = ["Alle", ...new Set(projects.map((p) => p.style).filter(Boolean) as string[])].sort();
  const colors = ["Alle", ...new Set(projects.map((p) => p.color).filter(Boolean) as string[])].sort();

  useSEO({
    title: "Projecten — Voor & Na Foto's | Renovawrap",
    description: "Bekijk onze voltooide wrapping projecten met voor en na foto's. Keuken, kasten, deuren en meer transformaties.",
    canonical: canonicalFor("/projecten"),
    jsonLd: buildBreadcrumbs([
      { name: "Home", url: canonicalFor("/") },
      { name: "Projecten", url: canonicalFor("/projecten") },
    ]),
  });

  useEffect(() => {
    async function fetchProjects() {
      try {
        // If we already have data (from cache init), we technically don't need to re-fetch 
        // unless we want to ensure freshness. The service handles deduplication of promises.
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Top 3 featured projects (or just first 3 if none explicit)
  const featuredProjects = projects.slice(0, 3);
  
  // The rest of the projects for the grid
  const gridProjects = projects.slice(3);

  const filteredGridProjects = gridProjects.filter((p) => {
    const categoryMatch = activeCategory === "Alle" || p.category === activeCategory;
    const styleMatch = activeStyle === "Alle" || p.style === activeStyle;
    const colorMatch = activeColor === "Alle" || p.color === activeColor;
    return categoryMatch && styleMatch && colorMatch;
  });

  return (
    <main className="pt-24 bg-background-light text-dark min-h-screen">
      
      {/* 
        --------------------------------------------------
        HERO & ASYMMETRICAL FEATURED SECTION 
        Matching Stitch Design "Uitgelichte Projecten"
        --------------------------------------------------
      */}
      <section className="relative flex flex-col justify-center overflow-hidden pb-24">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden pt-32">
          <span className="font-display font-bold text-[20vw] leading-none text-dark whitespace-nowrap tracking-tighter">
            PROJECTEN
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 pt-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-dark/10 pb-8">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
              Uitgelichte <br />
              <span className="italic text-primary ml-4">
                Projecten
              </span>
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-8 md:mt-0 max-w-xs text-right">
              Een selectie van onze meest recente transformaties in keukens en interieurs.
            </p>
          </div>

          {/* Asymmetrical Grid */}
          {!loading && featuredProjects.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px]">
              
              {/* Left Column (Primary Feature) - Span 7 */}
              {featuredProjects[0] && (
                <div 
                  className="lg:col-span-7 relative group cursor-pointer"
                  onClick={() => setSelectedProject(featuredProjects[0])}
                >
                  <div className="w-full h-[500px] lg:h-[700px] overflow-hidden relative">
                    <img
                      alt={featuredProjects[0].name}
                      src={featuredProjects[0].after_image_url || featuredProjects[0].before_image_url || ""}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-8 left-8 z-20">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white bg-dark/30 backdrop-blur-sm px-3 py-1 mb-2 inline-block">
                        {featuredProjects[0].category}
                      </span>
                      <h3 className="text-white text-4xl md:text-5xl font-display italic leading-none">
                        {featuredProjects[0].name}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Column (Secondary Features) - Span 5 */}
              <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-12">
                
                {/* Top Right */}
                {featuredProjects[1] && (
                  <div 
                    className="relative group cursor-pointer flex-1"
                    onClick={() => setSelectedProject(featuredProjects[1])}
                  >
                    <div className="w-full h-[300px] lg:h-[320px] overflow-hidden relative">
                      <img
                        alt={featuredProjects[1].name}
                        src={featuredProjects[1].after_image_url || featuredProjects[1].before_image_url || ""}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-dark bg-white/80 backdrop-blur-sm px-3 py-1">
                          {featuredProjects[1].category}
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 z-20">
                        <h3 className="text-white text-2xl md:text-3xl font-display">
                          {featuredProjects[1].name}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Right */}
                {featuredProjects[2] && (
                  <div 
                    className="relative group cursor-pointer flex-1"
                    onClick={() => setSelectedProject(featuredProjects[2])}
                  >
                    <div className="w-full h-[300px] lg:h-[340px] overflow-hidden relative">
                      <img
                        alt={featuredProjects[2].name}
                        src={featuredProjects[2].after_image_url || featuredProjects[2].before_image_url || ""}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-white border border-white px-6 py-2 uppercase text-xs tracking-[0.2em]">
                          Bekijk Project
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 z-20">
                        <h3 className="text-white text-2xl md:text-3xl font-display italic">
                          {featuredProjects[2].name}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </section>

      {/* 
        --------------------------------------------------
        PORTFOLIO GRID & TABS
        --------------------------------------------------
      */}
      <section className="py-24 bg-white" id="portfolio">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Tabs */}
          <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center items-center gap-8 md:gap-12 mb-20 border-b border-gray-200 pb-1 scrollbar-hide snap-x">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm md:text-xs uppercase tracking-[0.2em] pb-4 border-b-2 font-medium transition-colors whitespace-nowrap snap-start flex-shrink-0 ${
                    isActive
                      ? "border-primary text-dark"
                      : "border-transparent text-gray-400 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Filters: Style & Color */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            
            {/* Style Filter */}
            {styles.length > 2 && (
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-gray-400">Stijl:</span>
                <select 
                  value={activeStyle}
                  onChange={(e) => setActiveStyle(e.target.value)}
                  className="bg-transparent border-b border-gray-300 py-1 pr-8 text-sm focus:outline-none focus:border-primary uppercase tracking-wider cursor-pointer"
                  aria-label="Filter op stijl"
                >
                  {styles.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}

            {/* Color Filter */}
            {colors.length > 2 && (
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-gray-400">Kleur:</span>
                <select 
                  value={activeColor}
                  onChange={(e) => setActiveColor(e.target.value)}
                  className="bg-transparent border-b border-gray-300 py-1 pr-8 text-sm focus:outline-none focus:border-primary uppercase tracking-wider cursor-pointer"
                  aria-label="Filter op kleur"
                >
                  {colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

          </div>

          {/* Grid Projects */}
          {!loading && filteredGridProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
               {filteredGridProjects.map((project, index) => (
                <FadeIn
                  key={project.id}
                  delay={index * 80}
                  className="group cursor-pointer"
                >
                  <div onClick={() => setSelectedProject(project)}>
                    <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-gray-100">
                      <img
                        alt={project.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        src={
                          project.after_image_url ||
                          project.before_image_url ||
                          "https://placehold.co/600x750/f5f5f5/cccccc?text=Geen+foto"
                        }
                      />
                      <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500" />
                      {project.before_image_url && project.after_image_url && (
                        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 text-[10px] uppercase tracking-widest backdrop-blur-sm font-bold">
                          Voor / Na
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="font-display text-2xl mb-1 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 mb-32">
               <p className="text-gray-400 text-sm uppercase tracking-widest">
                Geen projecten gevonden met deze filters.
              </p>
              <button 
                onClick={() => { setActiveCategory("Alle"); setActiveStyle("Alle"); setActiveColor("Alle"); }}
                className="mt-4 text-primary underline text-xs uppercase tracking-widest"
              >
                Reset filters
              </button>
            </div>
          )}

        </div>
      </section>


      {/* 
        --------------------------------------------------
        STATIC BEFORE & AFTER SECTION ("Voor & Na")
        Hardcoded as per request
        --------------------------------------------------
      */}
      <section className="py-32 bg-background-light overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 z-0 pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-display text-5xl md:text-7xl mb-6">
              Voor & <span className="italic text-primary">Na</span>
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 max-w-lg mx-auto leading-loose">
              Het bewijs van transformatie. Versleep de slider om het verschil te zien dat Renovawrap maakt in sfeer en uitstraling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Amstelveen */}
            <div className="group">
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 shadow-2xl">
                 <BeforeAfterSlider 
                    beforeImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCLTPz2wOk-BW9C7-E3c_mneEHkQr-vNeI4rG3aITIkKapzO24UIJOdrzKNreViOcLSZgCL94V5IuEHt54ZpCNraj5r2dPjXok-3mGr-zQMSnIDAAXCJvKtO998I866VBBHj2KRHS9tZeFdKXwKwdofQWy6WTvmpMEaAOKOovEsDNMIc1T_3NihnIaIj2UDtjED4s_OR0Lr7nbPf-QRUzeFN-dMwdzmVGjt0__Wam_-1oDlMxA4Dkh381ln15C37fqmHh2rAMPckTA"
                    afterImage="https://lh3.googleusercontent.com/aida-public/AB6AXuC_bNep-OjxTMyszSbRUzRxrVDgcb2NZ8M2BbN_gI98vD8jqlfLapPkMJRvcoiBwhO5SNe8UJ6XG1nH_FrEevAp_nV2qBQKKezi4_K3mCLg7dBWwfmUr4f6OAc9iDkJSS6h3kQDOeUk0E_fLuCWj2ylr97lET0PacC_tQtjTZGmbwHOATbO3yPV7WE30u2jEZKPXy5DVwKcbhg6vT_jLkDGs23559bTwKiEyywXq_HUlnezVfDYt_ovGBIwiVTXwXa3r3vgRmItcuc"
 className="h-full"
                 />
              </div>
              <div className="flex justify-between items-baseline px-2">
                <h3 className="font-display text-2xl">Project Amstelveen</h3>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Keuken Renovatie</span>
              </div>
            </div>

             {/* Project Den Haag */}
            <div className="group mt-12 lg:mt-0">
               <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 shadow-2xl">
                 <BeforeAfterSlider 
                    beforeImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAlQ7CZma-nwhJXHzmQ0OFtElMNDapKx-kKUaGd6kErk-h4r9FRMhkoxkxuhIWOynOp0L3JjCFlF1FOOloizTflsrqmXGLFF2Hp34OusR76JqsT6CTXZnXuXfGCkf6usIw0nA8louiyUXbYJyDiIFJgI9D58QqZEMkqA88QRvN-gtr8v3oMNhjeR3mTHSvnIWDEVI7FfKZpICpW-ybem4EZysHMOg5Y-mN5FK7lacvZonQUgns77wQe8Dj58hlO8DegZQbFc-c99Tw"
                    afterImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCYn791KOT13rsJDS46AqrZVUi_QO4_7Rfdo2VkGC38Tc_yBJu8D0YarWfW77JRNDRV87flBxpsO39iQ20kDhvL6OUHT3jqpMNbTSEXsXZjFczMvtWJ3nb-qLB21l0cW9TAqmCUE2sKeRsHlV50AGwRcVOQ2Z8UKQy5PQbxxbTTna07PT4QBdkQVnITxv7rT6F9b12RVxiStk3QGb-A690KbJPqkggCBmYABejtuzmP5YvP9hI_KFzpIDKQho_nz5ez4oZA5Y4vy9w"
                    className="h-full"
                 />
              </div>
              <div className="flex justify-between items-baseline px-2">
                <h3 className="font-display text-2xl">Appartement Den Haag</h3>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Interieur Wrap</span>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <Link
              to="/contact"
              className="inline-block border border-dark px-12 py-4 text-xs uppercase tracking-[0.2em] hover:bg-dark hover:text-white transition-all duration-300"
            >
              Start Uw Transformatie
            </Link>
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
