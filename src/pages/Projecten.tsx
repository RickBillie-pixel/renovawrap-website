import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import FadeIn from "../components/FadeIn";
import ProjectModal from "../components/ProjectModal";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

interface Project {
  id: string;
  name: string;
  category: string;
  before_image_url: string | null;
  after_image_url: string | null;
  Uitdaging: string | null;
  Oplossing: string | null;
  is_featured: boolean;
  date: string | null;
}

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (typeof document !== "undefined") {
    document.title = "Renovawrap | Projecten";
  }

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("is_featured", { ascending: false })
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching projects:", error);
          return;
        }
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const featuredProject = projects.find((p) => p.is_featured);
  const filteredProjects =
    activeCategory === "Alle"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
              Onze <br />{" "}
              <span className="italic font-serif text-primary pl-24">
                Projecten
              </span>
            </h1>
          </div>
          <div className="lg:col-span-3 flex flex-col justify-end pb-4">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light mb-8">
              Van complete keukentransformaties tot verfijnde details. Ontdek hoe
              wij ruimtes nieuw leven inblazen.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-dark"></div>
              <span className="text-xs uppercase tracking-widest">
                Scroll verder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="py-32 bg-background-light">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary mb-4 block">
                  [Uitgelicht Project]
                </span>
                <h2 className="font-display text-5xl md:text-6xl mb-6 leading-tight">
                  {featuredProject.name}
                </h2>
                <span className="inline-block text-xs uppercase tracking-widest text-gray-400 bg-gray-100 px-4 py-2 mb-6">
                  {featuredProject.category}
                </span>
                {featuredProject.Uitdaging && (
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredProject.Uitdaging}
                  </p>
                )}
                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium hover:gap-4 transition-all duration-300 hover:text-primary"
                >
                  Bekijk Details{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div
                className="relative cursor-pointer group"
                onClick={() => setSelectedProject(featuredProject)}
              >
                {featuredProject.before_image_url &&
                featuredProject.after_image_url ? (
                  <BeforeAfterSlider
                    beforeImage={featuredProject.before_image_url}
                    afterImage={featuredProject.after_image_url}
                    className="w-full aspect-[4/3]"
                  />
                ) : (
                  <div className="relative aspect-[4/5]">
                    <img
                      alt={featuredProject.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      src={
                        featuredProject.after_image_url ||
                        featuredProject.before_image_url ||
                        ""
                      }
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 text-xs uppercase tracking-widest backdrop-blur-sm">
                      Voor/Na
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Tabs + Portfolio Grid */}
      <section className="py-32 bg-white border-t border-dark/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-4">
              Meer Projecten
            </span>
            <h2 className="font-display text-5xl md:text-6xl">
              Ons <span className="italic text-primary">Portfolio</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "Alle"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-dark text-white border-dark"
                      : "bg-transparent text-dark border-dark/15 hover:border-dark hover:bg-dark/5"
                  }`}
                >
                  {cat}
                  {count > 0 && (
                    <span
                      className={`ml-2 text-[10px] ${
                        activeCategory === cat
                          ? "text-white/60"
                          : "text-gray-400"
                      }`}
                    >
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-dark/20 border-t-primary rounded-full animate-spin" />
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-4 block">
                photo_library
              </span>
              <p className="text-gray-400 text-sm uppercase tracking-widest">
                {activeCategory === "Alle"
                  ? "Nog geen projecten toegevoegd"
                  : `Nog geen projecten in "${activeCategory}"`}
              </p>
            </div>
          )}

          {/* Project Grid */}
          {!loading && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <FadeIn
                  key={project.id}
                  delay={index * 80}
                  className="group cursor-pointer"
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group"
                  >
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
                      <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500" />
                      {project.before_image_url &&
                        project.after_image_url && (
                          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 text-[10px] uppercase tracking-widest backdrop-blur-sm font-bold">
                            Voor / Na
                          </div>
                        )}
                    </div>
                    <div className="flex justify-between items-start border-t border-dark/10 pt-4">
                      <div>
                        <h3 className="font-display text-2xl mb-1 group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-gray-400">
                          {project.category}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300 group-hover:text-dark transition-colors">
                        arrow_outward
                      </span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
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
