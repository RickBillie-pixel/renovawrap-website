import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import FadeIn from "../../components/FadeIn";

import KitchenBenefits from "../../components/KitchenBenefits";
import CountUp from "../../components/CountUp";
import BeforeAfterSlider from "../../components/BeforeAfterSlider";
import FAQ from "../../components/FAQ";
import { kitchenFaqs } from "../../data/faqs";
import { useSEO, canonicalFor } from "@/hooks/useSEO";
import type { CityData } from "@/lib/localSEO";
import { buildLocalServiceSchema, buildLocalBreadcrumbs } from "@/lib/localSEO";
import { supabase } from "@/lib/supabase";

/* ─── Types ─────────────────────────────────────────────────────── */

export interface LocalPageContent {
  city: CityData;
  seoTitle: string;
  seoDescription: string;
  heroLine1: string;
  heroLine2: string;
  heroSubtitle: string;
  introParagraph: string;
  werkwijzeIntro: string;
  whyTitle: string;
  materialenIntro: string;
  layoutVariant?: 'standard' | 'benefits_first';
  formTitle?: string;
  /** Extra unique section rendered between werkwijze and AI visualizer */
  extraSection?: React.ReactNode;
  /** Custom werkwijze steps override */
  werkwijzeSteps?: { step: string; title: string; desc: string; icon: string }[];
  /** Custom "wat we wrappen" intro text */
  watWeWrappenIntro?: string;
  /** Custom review title */
  reviewTitle?: string;
}

/* ─── Photo Upload Helper ───────────────────────────────────────── */

async function uploadContactPhoto(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const name = `contact-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const path = `contact/${name}`;
  const { error } = await supabase.storage
    .from("configurator-uploads")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) return null;
  const { data } = supabase.storage.from("configurator-uploads").getPublicUrl(path);
  return data.publicUrl;
}

/* ─── Main Component ────────────────────────────────────────────── */

export default function KeukenWrappingLokaal({ content }: { content: LocalPageContent }) {
  const { city, layoutVariant = 'standard' } = content;
  const formTitle = content.formTitle || "Gratis Offerte Aanvragen";
  const pageSlug = `/diensten/keuken-wrapping/${city.slug}`;

  useSEO({
    title: content.seoTitle,
    description: content.seoDescription,
    canonical: canonicalFor(pageSlug),
    jsonLd: [
      ...buildLocalBreadcrumbs(city),
      ...buildLocalServiceSchema(city),
    ],
  });

  /* ── Hero images (background rotation) ── */



  /* ── Form state ── */
  const [formData, setFormData] = useState({ naam: "", email: "", telefoon: "", bericht: "" });
  const [fotos, setFotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setFotos((prev) => [...prev, ...Array.from(files)].slice(0, 5));
  };
  const removeFile = (i: number) => setFotos((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.naam.trim() || !formData.email.trim() || !formData.telefoon.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const photo_urls: string[] = [];
      for (const file of fotos) {
        const url = await uploadContactPhoto(file);
        if (url) photo_urls.push(url);
      }
      const { error } = await supabase.from("contact_requests").insert({
        name: formData.naam.trim(),
        email: formData.email.trim(),
        phone: formData.telefoon.trim() || null,
        type: `lokaal-${city.slug}`,
        message: formData.bericht.trim() || null,
        photo_urls,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };


  /* ─── CONTACT FORM (Reusable) ────────────────────────────────── */

      const renderContactForm = () => (
        submitted ? (
          <div className="bg-white p-10 md:p-14 shadow-2xl rounded-sm w-full max-w-2xl relative z-20 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
            </div>
            <h3 className="font-display text-3xl mb-3">Aanvraag Ontvangen!</h3>
            <p className="text-gray-500 text-sm mb-6">
              Bedankt voor uw aanvraag. Wij nemen zo snel mogelijk contact met u op voor een vrijblijvend adviesgesprek.
            </p>
            <Link to="/diensten/keuken-wrapping" className="text-primary text-sm font-bold uppercase tracking-widest hover:underline">
              Bekijk Onze Diensten →
            </Link>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm w-full max-w-2xl relative z-20">
            <h3 className="font-display text-2xl md:text-3xl mb-2">{formTitle}</h3>
            <p className="text-gray-500 text-sm mb-8">
              Wij komen gratis bij u langs in {city.name} voor advies en een scherpe offerte.
            </p>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-6 rounded">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold group-focus-within:text-primary transition-colors">Naam *</label>
                  <input
                    type="text"
                    required
                    value={formData.naam}
                    onChange={(e) => setFormData(p => ({ ...p, naam: e.target.value }))}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                    placeholder="Uw naam"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold group-focus-within:text-primary transition-colors">Telefoon *</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefoon}
                    onChange={(e) => setFormData(p => ({ ...p, telefoon: e.target.value }))}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                    placeholder="06 12345678"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold group-focus-within:text-primary transition-colors">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-gray-50 border-b-2 border-gray-200 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                  placeholder="uw@email.nl"
                />
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold group-focus-within:text-primary transition-colors">Bericht</label>
                <textarea
                  value={formData.bericht}
                  onChange={(e) => setFormData(p => ({ ...p, bericht: e.target.value }))}
                  rows={3}
                  className="w-full bg-gray-50 border-b-2 border-gray-200 p-3 text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Vertel ons kort over uw wensen (optioneel)"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Foto's van uw keuken</label>
                <div
                  className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors ${
                    dragOver ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                >
                  <span className="material-symbols-outlined text-3xl text-gray-300 mb-2 block">add_photo_alternate</span>
                  <p className="text-sm text-gray-400">
                    Sleep foto's hierheen of <span className="text-primary font-medium">klik om te uploaden</span>
                  </p>
                  <p className="text-[10px] text-gray-300 mt-1">Max. 5 foto's (JPG, PNG, WEBP)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                {fotos.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {fotos.map((f, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={URL.createObjectURL(f)}
                          alt={`Preview ${i + 1}`}
                          className="w-16 h-16 object-cover rounded border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-colors mt-2 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Versturen...</span>
                  </>
                ) : (
                  <>
                    <span>Verstuur Aanvraag</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-3">
                Wij respecteren uw privacy. Uw gegevens worden veilig verwerkt conform ons <Link to="/privacy-policy" className="underline">privacybeleid</Link>.
              </p>
            </form>
          </div>
        )
      );

      return (
        <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
    
          {/* Breadcrumbs – hidden in UI, present for SEO structure */}
          <nav className="hidden">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/diensten" itemProp="item"><span itemProp="name">Diensten</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/diensten/keuken-wrapping" itemProp="item"><span itemProp="name">Keuken Wrapping</span></Link>
                <meta itemProp="position" content="3" />
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">{city.name}</span>
                <meta itemProp="position" content="4" />
              </li>
            </ol>
          </nav>
    
          {/* 
              ╔══════════════════════════════════════════════════════════╗
              ║  MOBILE HERO (New Standard)                              ║
              ║  Matches KeukenWrappingMobile Layout                     ║
              ╚══════════════════════════════════════════════════════════╝ 
          */}
          {/* 
              ╔══════════════════════════════════════════════════════════╗
              ║  MOBILE HERO (New Standard)                              ║
              ║  Matches KeukenWrappingMobile Layout                     ║
              ╚══════════════════════════════════════════════════════════╝ 
          */}
          <header className="lg:hidden relative min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-32 pb-8">
             
             {/* Background Watermark - Matches KeukenWrappingMobile position */}
             <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden pt-32">
               <span className="font-display font-bold text-[18vw] leading-none text-dark whitespace-nowrap tracking-tighter">
                 {city.name.toUpperCase()}
               </span>
             </div>
    
             <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex-1 flex flex-col justify-between">
                 <div>
                   <div className="border-b border-dark/10 pb-4 mb-6">
                       <h1 className="font-display text-5xl leading-[0.9] tracking-tight text-dark">
                        {content.heroLine1} <br />
                        <span className="italic text-primary">{content.heroLine2}</span>
                      </h1>
                      
                      <div className="mt-6">
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                          {content.introParagraph}
                        </p>
      
                         {/* Trust Badges - Single Line */}
                        <div className="flex items-center gap-2 pt-4 text-xs text-gray-400 whitespace-nowrap overflow-hidden">
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                            <span className="ml-1 font-bold text-dark">4.9/5</span>
                            <span className="ml-1">Google Reviews</span>
                          </div>
                          <span className="text-gray-300">|</span>
                          <span className="font-bold text-dark">10+</span>
                          <span>Projecten</span>
                        </div>
                      </div>
                  </div>
      
                  {/* Visuals - Slider */}
                  <div className="relative w-full aspect-[4/3] shadow-lg overflow-hidden bg-gray-100 mt-2 mb-4 rounded-lg">
                      <BeforeAfterSlider
                          beforeImage="/project-fotos/before15.webp"
                          afterImage="/project-fotos/after14.webp"
                          className="w-full h-full"
                      />
                  </div>
                 </div>
    
                {/* CTA - Scrolls to Form */}
                <div className="flex flex-col gap-3 mt-auto">
                    <a href="#contact-form-mobile" className="w-full bg-primary text-white py-4 text-center text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-colors shadow-lg">
                        Gratis Offerte
                    </a>
                </div>
             </div>
          </header>
    
          {/* Mobile Contact Form Container - Just below the fold */}
          <div id="contact-form-mobile" className="lg:hidden px-6 py-24 bg-white relative z-20 border-t border-gray-100">
             {renderContactForm()}
          </div>
    
    
          {/* 
              ╔══════════════════════════════════════════════════════════╗
              ║  DESKTOP HERO (Original)                                 ║
              ║  Visible only on lg+                                     ║
              ╚══════════════════════════════════════════════════════════╝ 
          */}
          <header className="hidden lg:flex relative min-h-screen items-center py-24 overflow-hidden">
            <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
              <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
                {city.name.toUpperCase()}
              </h1>
            </div>
            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
    
                {/* Left: Text */}
                <div className="lg:col-span-5 space-y-8 pt-8">
                  <div className="inline-block border-l-2 border-primary pl-4">
                    <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Keuken Wrapping {city.name}</span>
                    <p className="font-display text-lg italic text-gray-500">Zonder sloopwerk. Binnen één dag.</p>
                  </div>
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                    {content.heroLine1} <br />
                    <span className="italic font-normal text-primary">{content.heroLine2}</span>
                  </h1>
                  <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                    {content.introParagraph}
                  </p>
                  <div className="flex items-center gap-6 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                      <span className="font-bold text-dark">4.9/5</span>
                      <span>Google Reviews</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="font-bold text-dark">Projecten</span>
                    <span>in {city.name} e.o.</span>
                  </div>
                </div>
    
                {/* Right: Large Contact Form */}
                <div id="contact-form-desktop" className="lg:col-span-7 flex justify-center lg:justify-end">
                   {renderContactForm()}
                </div>
    
              </div>
            </div>
          </header>

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  CONTENT SECTIONS — Layout Variants                     ║
          ╚══════════════════════════════════════════════════════════╝ */}
      {layoutVariant === 'standard' ? (
        <>
          {/* Lokale Intro */}
          <section className="py-20 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Keuken Wrappen in {city.name}</span>
                  <h2 className="font-display text-3xl md:text-4xl text-dark leading-tight mb-6">
                    {content.whyTitle}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {content.heroSubtitle}
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border-l-2 border-primary pl-4">
                      <span className="font-display text-3xl text-primary block">
                        <CountUp end={70} suffix="%" suffixClassName="" />
                      </span>
                      <p className="text-sm text-gray-500 mt-1">Goedkoper dan nieuw</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                      <span className="font-display text-3xl text-primary">1-2</span>
                      <p className="text-sm text-gray-500 mt-1">Dagen montage</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                      <span className="font-display text-3xl text-primary block">
                        <CountUp end={300} suffix="+" suffixClassName="" />
                      </span>
                      <p className="text-sm text-gray-500 mt-1">Kleuren & afwerkingen</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                      <span className="font-display text-3xl text-primary block">
                        <CountUp end={5} suffix="" />
                      </span>
                      <p className="text-sm text-gray-500 mt-1">Jaar garantie</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden shadow-2xl bg-gray-100">
                    <img
                      src="/project-fotos/after14.webp"
                      alt={`Keuken wrapping resultaat ${city.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 shadow-lg hidden md:block">
                    <p className="font-display text-lg italic">Actief in {city.name}</p>
                    <p className="text-xs text-white/80 mt-1">& omgeving {city.region}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Wat We Wrappen */}
          <section className="py-32 bg-background-light" id="portfolio">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-100 pb-12">
                <div className="max-w-xl">
                  <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Wat We Wrappen</span>
                  <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">Keuken Renovatie <span className="italic text-gray-400">Zonder Sloopwerk</span></h2>
                </div>
                <div className="mt-8 md:mt-0">
                  <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                    {content.watWeWrappenIntro || `Waarom duizenden euro's investeren in iets nieuws? Wij wrappen uw bestaande keuken in ${city.name} naar showroom-staat. Binnen 2 dagen geregeld!`}
                  </p>
                </div>
              </div>
              {/* Mobile Layout */}
              <div className="flex md:hidden flex-col gap-24">
                {[
                  {
                    title: "Keukenfrontjes & Lades",
                    desc: `Geef uw keuken in ${city.name} direct een nieuwe look. Wij wrappen elk paneel naadloos over de randen, zodat de folie nooit loslaat. Beschikbaar in 300+ kleuren.`,
                    image: "/project-fotos/after14.webp",
                    link: "/diensten/keuken-frontjes"
                  },
                  {
                    title: "Werkbladen",
                    desc: "Niet van echt steen te onderscheiden. Onze industriële wrapfolie is krasvast, waterdicht en duurzaam. Voor hete pannen adviseren wij altijd een onderzetter voor optimaal behoud.",
                    image: "/project-fotos/after6.webp",
                    link: "/diensten/aanrechtbladen"
                  },
                  {
                    title: "Achterwanden & Zijpanelen",
                    desc: "Maak het plaatje compleet. Wij wrappen uw spatwand en zijpanelen strak mee. Onderhoudsvriendelijk en perfect afgewerkt rondom stopcontacten.",
                    image: "/project-fotos/after5.webp",
                    link: "/diensten/achterwanden"
                  }
                ].map((item, index) => (
                  <FadeIn 
                    key={index} 
                    direction={index % 2 === 0 ? "left" : "right"} 
                    className="w-full"
                    threshold={0.2}
                  >
                    <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                      {/* Image Container */}
                      <div className={`relative w-[85%] aspect-[3/4] mb-8 shadow-2xl ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                        <Link to={item.link} className="block w-full h-full overflow-hidden group">
                          <img
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            src={item.image}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                        </Link>
                        
                        {/* Number Badge - Overlapping Bottom Corner */}
                        <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} bg-white p-6 shadow-xl z-20`}>
                          <span className="font-display text-4xl text-primary font-bold">0{index + 1}</span>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className={`w-[90%] ${index % 2 === 0 ? 'text-left pl-4' : 'text-right pr-4'} mt-8`}>
                        <Link to={item.link} className="block group">
                          <h3 className="font-display text-4xl text-dark mb-4 group-hover:text-primary transition-colors leading-[0.9]">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            {item.desc}
                          </p>
                          <div className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-dark group-hover:gap-5 transition-all ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                            Bekijk
                            <span className={`material-symbols-outlined text-sm ${index % 2 !== 0 ? 'rotate-180' : ''}`}>arrow_forward</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {[
                  {
                    title: "Keukenfrontjes & Lades",
                    desc: `Geef uw keuken in ${city.name} direct een nieuwe look. Wij wrappen elk paneel naadloos over de randen, zodat de folie nooit loslaat. Beschikbaar in 300+ kleuren.`,
                    image: "/project-fotos/after14.webp",
                    link: "/diensten/keuken-frontjes"
                  },
                  {
                    title: "Werkbladen",
                    desc: "Niet van echt steen te onderscheiden. Onze industriële wrapfolie is krasvast, waterdicht en duurzaam. Voor hete pannen adviseren wij altijd een onderzetter voor optimaal behoud.",
                    image: "/project-fotos/after6.webp",
                    className: "md:mt-24",
                    link: "/diensten/aanrechtbladen"
                  },
                  {
                    title: "Achterwanden & Zijpanelen",
                    desc: "Maak het plaatje compleet. Wij wrappen uw spatwand en zijpanelen strak mee. Onderhoudsvriendelijk en perfect afgewerkt rondom stopcontacten.",
                    image: "/project-fotos/after5.webp",
                    link: "/diensten/achterwanden"
                  }
                ].map((item, index) => (
                  <Link key={index} to={item.link} className={`group cursor-pointer block ${item.className || ''}`}>
                    <div className="relative overflow-hidden mb-8 aspect-[3/4]">
                      <img alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={item.image} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                    </div>
                    <div className="flex justify-between items-start border-t border-gray-200 pt-6">
                      <div>
                        <span className="text-xs text-primary font-mono mb-2 block">0{index + 1}</span>
                        <h3 className="font-display text-2xl text-dark mb-2 group-hover:italic transition-all">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300 group-hover:text-dark transition-colors">arrow_outward</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <KitchenBenefits />

          {/* Werkwijze */}
          <section className="py-32 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="text-center mb-20">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Werkwijze</span>
                <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">
                  {content.werkwijzeIntro}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {(content.werkwijzeSteps || [
                  { step: "01", title: "Gratis Adviesgesprek", desc: `Wij komen bij u langs in ${city.name} voor een vrijblijvende opmeting en bespreken uw wensen en mogelijkheden.`, icon: "chat" },
                  { step: "02", title: "Kleurkeuze", desc: "Kies uit ons uitgebreide stalenboek met 300+ kleuren. Wij adviseren u over de beste match.", icon: "color_lens" },
                  { step: "03", title: "Professionele Montage", desc: `Onze gecertificeerde monteurs wrappen uw keuken in ${city.name} in slechts één werkdag. Strak, snel en schoon.`, icon: "construction" },
                  { step: "04", title: "Oplevering & Nazorg", desc: "Na oplevering ontvangt u een garantiecertificaat en onderhoudsinstructies.", icon: "handshake" },
                ]).map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-6 border-2 border-gray-200 group-hover:border-primary transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-primary transition-colors">{item.icon}</span>
                    </div>
                    <span className="text-primary font-mono text-xs font-bold block mb-3">{item.step}</span>
                    <h3 className="font-display text-xl text-dark mb-3">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* VARIANT: BENEFITS FIRST */
        <>
           <KitchenBenefits />

           {/* Lokale Intro (Variant) */}
           <section className="py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                 <div className="relative w-full lg:w-1/2">
                  <div className="aspect-square overflow-hidden shadow-xl rounded-lg">
                     <BeforeAfterSlider
                        beforeImage="/project-fotos/before11.webp"
                        afterImage="/project-fotos/after11.webp"
                        className="h-full"
                     />
                  </div>
                 </div>
                 <div className="w-full lg:w-1/2">
                    <h2 className="font-display text-4xl md:text-5xl text-dark mb-6 leading-tight">{content.whyTitle}</h2>
                    <p className="text-lg text-gray-600 font-light mb-8">{content.heroSubtitle}</p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        <span className="text-dark font-medium">Actief in heel {city.name} en {city.region}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        <span className="text-dark font-medium">Bespaar duizenden euro's op renovatie</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        <span className="text-dark font-medium">Geen sloopwerk, geen puin</span>
                      </li>
                    </ul>
                 </div>
              </div>
            </div>
           </section>

           {/* Werkwijze Variant */}
           <section className="py-12 md:py-32 bg-background-light relative overflow-hidden">
             {/* Background Element */}
             <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white rounded-full blur-3xl opacity-40 -mr-16 -mt-16 md:-mr-32 md:-mt-32 pointer-events-none"></div>

             <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  {/* Left Column: Intro & Desktop CTA */}
                  <div className="lg:col-span-4 lg:sticky lg:top-32">
                    <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Werkwijze</span>
                    <h2 className="font-display text-3xl md:text-5xl text-dark mb-4 md:mb-6 leading-[1.1]">{content.werkwijzeIntro}</h2>
                    <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">Onze werkwijze is simpel en transparant. Wij geloven in duidelijke afspraken en vakmanschap zonder verrassingen achteraf.</p>
                    
                    {/* Desktop Button (Hidden on Mobile) */}
                    <div className="hidden lg:block">
                      <a href="#contact-form-desktop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                        Start uw aanvraag <span className="material-symbols-outlined text-sm">arrow_downward</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Right Column: Steps Cards */}
                  <div className="lg:col-span-8 lg:pl-12">
                     <div className="space-y-4 md:space-y-6">
                        {(content.werkwijzeSteps || [
                           { step: "01", title: "Advies aan Huis", text: `Wij komen kosteloos naar ${city.name} voor een persoonlijk advies en het opmeten van uw keuken.`, icon: "home_pin" },
                           { step: "02", title: "Offerte op Maat", text: "U ontvangt direct een heldere prijsopgave. Geen kleine lettertjes, gewoon een eerlijke prijs.", icon: "request_quote" },
                           { step: "03", title: "Realisatie", text: "Na akkoord plannen we de montage. Binnen 1-2 dagen is uw keuken getransformeerd.", icon: "construction" },
                        ]).map((s, i) => (
                          <FadeIn key={i} delay={i * 100} direction="up" className="w-full">
                            <div className="group relative bg-white p-6 md:p-10 rounded-sm border border-gray-100 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                              <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start">
                                  <div className="shrink-0 relative mb-2 md:mb-0">
                                    <span className="font-display text-5xl md:text-6xl text-gray-100 group-hover:text-primary/10 transition-colors font-bold leading-none select-none">
                                      {s.step}
                                    </span>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                      <span className="material-symbols-outlined text-3xl text-primary">{'icon' in s ? s.icon : 'check_circle'}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-display text-lg md:text-2xl text-dark mb-2 md:mb-3 group-hover:text-primary transition-colors">{s.title}</h4>
                                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-lg">{'desc' in s ? s.desc : (s as any).text}</p>
                                  </div>
                              </div>
                            </div>
                          </FadeIn>
                        ))}
                     </div>

                     {/* Mobile Button (Visible below cards) */}
                     <div className="mt-8 lg:hidden flex justify-center">
                        <a href="#contact-form-mobile" className="w-full bg-white border border-gray-200 text-dark py-4 text-xs font-bold tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 shadow-sm">
                          Start uw aanvraag <span className="material-symbols-outlined text-base">arrow_downward</span>
                        </a>
                     </div>
                  </div>
                </div>
             </div>
           </section>
        </>
      )}

      {/* Optional Extra Section (for unique city content) */}
      {content.extraSection}

      {/* AI Configurator Promo */}
      <section className="py-32 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm shadow-lg">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(217,119,6,0.5)]"></span>
                <span className="text-[10px] text-white tracking-[0.2em] uppercase font-bold">Nieuw: AI Configurator</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white leading-[1.1]">
                Bekijk Uw <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 italic">Nieuwe Look</span>
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                Upload een foto van uw huidige keuken en zie binnen enkele minuten hoe onze folies de ruimte transformeren. Technologie ontmoet ambacht.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/configurator" className="group bg-primary text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-all shadow-[0_10px_30px_-10px_rgba(217,119,6,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(217,119,6,0.5)] flex items-center justify-center">
                  <span>Start Configurator</span>
                  <span className="material-symbols-outlined text-lg ml-2 group-hover:rotate-12 transition-transform">auto_fix_high</span>
                </Link>
              </div>
            </div>
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-black/50">
                <BeforeAfterSlider
                  beforeImage="/project-fotos/before15.webp"
                  afterImage="/project-fotos/after14.webp"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materialen */}
      <section className="py-32 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Collectie</span>
              <h2 className="font-display text-4xl text-dark mb-6">Premium <br /><span className="italic font-light">Materialen</span></h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {content.materialenIntro}
              </p>
              <Link className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-dark border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors" to="/catalogus">
                Bekijk Catalogus
                <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
              </Link>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { title: "Hout", count: "50+ Variaties", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqUtBVZB4jfDKg40sM8nu8elmT9aC71nACxdbMGxI8RvNDGV_X7djngTbvar8z45btnMmc4Oq4t5yguRYvbTUzxDNKjCK6iNWSmlzDEkwPr66di0YivmeUe9O3oKDjGDE5xuXeDUP7mAiBSGtHl85Xt1sdTpU7jpi94JnrQfu1BTPQ0CindwQ2qdRA2KcLc12RBPBPkd5hcXFgsveEOW_q_rCd0KMn7XnSJEH2i64BsClk-dHIT58vFA40Fm_HxK5ks_ittzJN9Jo", link: "/catalogus?category=Hout" },
                  { title: "Ultra Mat", count: "60+ Variaties", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsvqwxsUEdDIcqrvI8AA5r9MWQbn24oripIYtHCqFgtwJsqwQKXhfdO40A4vJZ1FCHMKr-d3_o6z_YwiSFcaOYGoXoyLFutTLv16mojhZAkY7K5sdUVTsDKjL6tyjDLIB7k4Ab2vltriKnICg8gbouC5Ml9x4NPjZTJBRhL21YVt-l9wj8oR6roB61uKmUCKd87ZsnVtZAxEsIa6x_jKnbjPeOSHrOFXitrV91wivNE_RmlJbpgBofTlOOtBAMYmjIPrWVaDhprZM", link: "/catalogus?category=Uni%20Kleuren" },
                  { title: "Natuursteen", count: "25+ Variaties", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeAl7EgmXSRq_9kwP0fgkb1f9lgoWzOSgPOLKS2TA8LqwdAMieqI_gUV1nNcKf8XU6fxqe9Wihvo69V0Z00vRnv_Q8DP4Db37_TZabKKxZ9WuP2SketmgjvoyPqTjqL40IptSEfGtD0qKnc7Z0rO00-3l1vGAnVLD7LpuhWRXZ2l5V0DqKxUmGwWSHPnaCT2hclf_MF_n8j_ZF92JmxEBewcmvXKAdTDhS8W-eVUsNjTNZ93REZ-fpogn91grqCUQjp_DFW9wP3yc", link: "/catalogus?category=Natuursteen" },
                  { title: "Metallic", count: "15+ Variaties", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2ikwTkRZPr3ERP5NrmRMOHehJai4aLEDwVFxBsYqNxZ3XuGalDfO6iBhHgFkAQGk4_CeHmHCSWl0jTnr7MNULmck1Mz5aj5W1zORqO5kJa4Yg_bUduJIU_dpC5JHNNzhs5uryM5QbiUvrgjnZ96gCqiqR3l-rVmY2H9506zUHp576tylDtFZTuk3_SZsO4vR5zMXjoTI6Q3wJUbSiM-RpOB9Xgs7pls9vxbtLWcXRjzatW0CadkSFOdCH5m82JPelkDFCA-R7HKI", link: "/catalogus?category=Metaal" },
                ].map((item, index) => (
                  <Link key={index} to={item.link} className="group cursor-pointer block">
                    <div className="aspect-square overflow-hidden mb-4 bg-gray-100">
                      <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" src={item.image} />
                    </div>
                    <h3 className="font-display text-xl text-dark">{item.title}</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">{item.count}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">format_quote</span>
            <h2 className="font-display text-4xl text-dark">{content.reviewTitle || `Wat Klanten in ${city.name}`} <span className="italic text-gray-400">Zeggen</span></h2>
          </div>
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className="flex animate-scroll gap-12 w-max items-start py-12 hover:[animation-play-state:paused]"
              style={{ "--animation-duration": "80s" } as React.CSSProperties}
            >
              {[
                { quote: "Voor een fractie van de prijs heb ik nu precies de look die ik wilde. De kwaliteit van de folie is echt verbluffend, het voelt als echt hout!", author: "Sophie van der Berg", detail: "Matte Black Finish", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw" },
                { quote: "De monteur was super professioneel. Om 9 uur begonnen, om 16 uur klaar. Geen rommel, geen stank en een compleet andere keuken.", author: "Thomas Dekker", detail: "Betonlook", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY", className: "md:-mt-8" },
                { quote: "We wilden een warme houtlook voor ons kookeiland. De nerfstructuur voelt heel natuurlijk aan, en na 2 jaar ziet het er nog steeds perfect uit.", author: "Elise & Mark", detail: "Rustiek Eiken", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRwo0QG3cGcazJtGiKDKbSOSl5YrYgkC7bd5re6bFLjJ5RpJkUnTqxqjICK7bs7v50fEdVvEMnFOdETrAlScnkiGEwjl6xhZsJujHVw0RcucCL0boKG-95d_auEwgBO-RxhmgPfZ1CHPKk3nAkta6T3aamp6RFXn_q3-x3yOtLwx9xRVLyIOQ3EZqsBJE6Lwk9HnostG-8vZNR6nYrxqTqDXGfUUhWqw3qKOen9-ZzCBXUyKlW6Rv7DiCvDQ23oj0L82cNKdHU940" },
                { quote: "Onze keuken was nog goed, maar de kleur stond ons niet meer aan. Wrappen was de perfecte oplossing.", author: "Fam. Visser", detail: "Marmerlook", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                // Duplicate for scroll loop
                { quote: "Voor een fractie van de prijs heb ik nu precies de look die ik wilde. De kwaliteit van de folie is echt verbluffend, het voelt als echt hout!", author: "Sophie van der Berg", detail: "Matte Black Finish", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw" },
                { quote: "De monteur was super professioneel. Om 9 uur begonnen, om 16 uur klaar. Geen rommel, geen stank en een compleet andere keuken.", author: "Thomas Dekker", detail: "Betonlook", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY", className: "md:-mt-8" },
                { quote: "We wilden een warme houtlook voor ons kookeiland. De nerfstructuur voelt heel natuurlijk aan, en na 2 jaar ziet het er nog steeds perfect uit.", author: "Elise & Mark", detail: "Rustiek Eiken", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRwo0QG3cGcazJtGiKDKbSOSl5YrYgkC7bd5re6bFLjJ5RpJkUnTqxqjICK7bs7v50fEdVvEMnFOdETrAlScnkiGEwjl6xhZsJujHVw0RcucCL0boKG-95d_auEwgBO-RxhmgPfZ1CHPKk3nAkta6T3aamp6RFXn_q3-x3yOtLwx9xRVLyIOQ3EZqsBJE6Lwk9HnostG-8vZNR6nYrxqTqDXGfUUhWqw3qKOen9-ZzCBXUyKlW6Rv7DiCvDQ23oj0L82cNKdHU940" },
                { quote: "Onze keuken was nog goed, maar de kleur stond ons niet meer aan. Wrappen was de perfecte oplossing.", author: "Fam. Visser", detail: "Marmerlook", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
              ].map((item, index) => (
                <div key={index} className={`text-center group w-[400px] shrink-0 ${item.className || ''}`}>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img alt="Customer" className="w-full h-full object-cover" src={item.image} />
                  </div>
                  <div className="flex justify-center gap-0.5 mb-4">
                    {Array.from({length: item.rating}).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-primary text-sm">star</span>
                    ))}
                  </div>
                  <p className="font-display text-lg italic text-gray-600 mb-6 leading-relaxed">"{item.quote}"</p>
                  <div className="border-t border-gray-100 pt-4 inline-block w-full">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-dark">{item.author}</h4>
                    <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={kitchenFaqs} />

      {/* Lokale SEO Footer + Internal Links */}
      <section className="py-16 bg-background-light border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="font-display text-2xl text-dark mb-4">Keuken Wrapping Specialist in {city.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Renovawrap is dé specialist voor keuken wrapping in {city.name} en omgeving {city.region}.
                Wij transformeren uw bestaande keuken met hoogwaardige wrapfolies, zonder sloopwerk en
                tegen een fractie van de kosten van een nieuwe keuken. Met meer dan 300 premium
                afwerkingen realiseren wij iedere stijl. Van modern mat tot klassiek houtdesign.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-dark mb-4">Werkgebied {city.region}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Vanuit onze vestiging in Helmond bedienen wij klanten in heel {city.region} en daarbuiten.
                Of u nu in {city.name} centrum woont of in de buitenwijken, wij komen graag
                vrijblijvend langs voor een opmeting en advies. <Link to="/contact" className="text-primary font-medium hover:underline">Neem contact op</Link> voor een afspraak.
              </p>
            </div>
          </div>

          {/* Service links */}
          <div className="mb-12 pt-10 border-t border-gray-100">
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 flex items-center gap-3">
              <span>Onze Diensten</span>
              <div className="h-px flex-1 bg-gray-100" />
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Keuken Wrapping", to: "/diensten/keuken-wrapping" },
                { name: "Keuken Frontjes", to: "/diensten/keuken-frontjes" },
                { name: "Aanrechtbladen", to: "/diensten/aanrechtbladen" },
                { name: "Achterwanden", to: "/diensten/achterwanden" },
                { name: "Kasten", to: "/diensten/kasten" },
                { name: "Deuren", to: "/diensten/deuren" },
                { name: "Kozijnen", to: "/diensten/kozijnen" },
                { name: "Schadeherstel", to: "/diensten/schadeherstel" },
              ].map(s => (
                <Link 
                  key={s.to} 
                  to={s.to} 
                  className="group relative px-6 py-4 bg-white border border-gray-200 rounded-sm hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-hover:text-primary transition-colors mb-1">Dienst</span>
                    <span className="text-sm font-display text-dark">
                      {s.name}
                    </span>
                  </div>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-200 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all text-lg group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* City links */}
          <div className="mt-12 pt-10 border-t border-gray-100">
             <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-8 items-center flex gap-3">
                <span>Keuken Wrapping in andere regio's</span>
                <div className="h-px flex-1 bg-gray-100" />
             </h4>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
               {[
                 { name: "Eindhoven", slug: "eindhoven" },
                 { name: "Helmond", slug: "helmond" },
                 { name: "Roosendaal", slug: "roosendaal" },
                 { name: "Tilburg", slug: "tilburg" },
                 { name: "Utrecht", slug: "utrecht" },
                 { name: "Veldhoven", slug: "veldhoven" },
                 { name: "Weert", slug: "weert" },
                 { name: "Limburg", slug: "limburg" },
                 { name: "Nijmegen", slug: "nijmegen" },
                 { name: "Oss", slug: "oss" },
               ].map(c => {
                 const isCurrent = c.slug === city.slug;
                 return (
                  <Link
                    key={c.slug}
                    to={`/diensten/keuken-wrapping/${c.slug}`}
                    className={`relative px-5 py-4 text-center transition-all duration-300 rounded-sm border-2 ${
                       isCurrent
                       ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02] z-10"
                       : "border-gray-50 bg-white text-gray-500 hover:border-primary/20 hover:text-primary hover:shadow-md"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">
                      {c.name}
                    </span>
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                    )}
                  </Link>
                 );
               })}
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
