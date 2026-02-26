import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { materials, materialsByCategory, categories } from "../data/materials";
import { useSEO, buildBreadcrumbs, canonicalFor } from "@/hooks/useSEO";

export default function Catalogus() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState(materials);

  useSEO({
    title: "Materialen Catalogus — Folies & Kleuren | Renovawrap",
    description: "Bekijk ons complete assortiment wrapping materialen, kleuren en prints. Meer dan 300 hoogwaardige afwerkingen voor uw interieur.",
    canonical: canonicalFor("/catalogus"),
    jsonLd: buildBreadcrumbs([
      { name: "Home", url: canonicalFor("/") },
      { name: "Catalogus", url: canonicalFor("/catalogus") },
    ]),
  });

  useEffect(() => {
    // Sync active category from URL
    const categoryParam = searchParams.get("category");
    if (categoryParam && (categories.includes(categoryParam) || categoryParam === "Alle")) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let currentMaterials = activeCategory === "Alle" 
      ? materials 
      : materialsByCategory[activeCategory] || [];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      currentMaterials = currentMaterials.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.id.toLowerCase().includes(query)
      );
    }
    
    setFilteredMaterials(currentMaterials);
  }, [activeCategory, searchQuery]);

  return (
    <main className="pt-24 bg-background-light text-dark font-sans antialiased min-h-screen">
      {/* Header Section */}
      <section className="py-16 lg:py-24 px-6 border-b border-dark/5">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              Collectie
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
              Onze <br />
              <span className="italic text-primary">Catalogus</span>
            </h1>
            <p className="text-gray-600 max-w-2xl text-lg font-light leading-relaxed">
              Onze collectie omvat meer dan 300 hoogwaardige afwerkingen — van realistische houtnerven 
              en natuursteen tot ultra-matte kleuren en metallic accenten. Elke folie is kras- en stootvast, 
              onderhoudsvriendelijk, antibacterieel en ontworpen voor een levensduur van 15 tot 20 jaar.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter & Gallery Section */}
      <section className="py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Category Filter & Search */}
          <div className="flex flex-col gap-6 mb-12 sticky top-24 z-20 bg-background-light py-4 border-b border-dark/5">
            {/* Search Input */}
            <div className="relative max-w-md w-full px-6 md:px-0">
              <div className="absolute inset-y-0 left-0 pl-9 md:pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-dark/20 rounded bg-transparent text-dark placeholder-gray-400 focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="Zoek op naam of code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-nowrap md:flex-wrap gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            <button
              onClick={() => setActiveCategory("Alle")}
              className={`whitespace-nowrap shrink-0 px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 rounded-full border ${
                activeCategory === "Alle"
                  ? "bg-dark text-white border-dark"
                  : "bg-transparent text-dark border-dark/20 hover:border-primary hover:text-primary"
              }`}
            >
              Alle
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap shrink-0 px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 rounded-full border ${
                  activeCategory === category
                    ? "bg-dark text-white border-dark"
                    : "bg-transparent text-dark border-dark/20 hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
            {filteredMaterials.map((material, index) => (
              <FadeIn key={material.id} delay={(index % 10) * 50} className="group cursor-pointer">
                <div className="aspect-square w-full overflow-hidden bg-gray-100 mb-4 shadow-sm border border-dark/5 relative">
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-300 z-10 pointer-events-none" />
                  <img
                    src={material.image}
                    alt={material.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl text-dark mb-1 group-hover:text-primary transition-colors">
                    {material.name}
                  </h3>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">
                      {material.id}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      {material.category}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Empty State */}
          {filteredMaterials.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-gray-400 font-light text-xl">Geen materialen gevonden in deze categorie.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
