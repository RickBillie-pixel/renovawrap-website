import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSEO, buildBreadcrumbs, canonicalFor } from "@/hooks/useSEO";
import { supabase } from "@/lib/supabase";
import { testimonials, processSteps } from "../data/mockData";
import FAQ from "../components/FAQ";
import FadeIn from "../components/FadeIn";

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

export default function Contact() {
  useSEO({
    title: "Contact — Gratis Offerte | Renovawrap",
    description: "Neem contact op met Renovawrap voor een vrijblijvende offerte. Reactie zo snel mogelijk. Bel, mail of vul het formulier in.",
    canonical: canonicalFor("/contact"),
    jsonLd: buildBreadcrumbs([
      { name: "Home", url: canonicalFor("/") },
      { name: "Contact", url: canonicalFor("/contact") },
    ]),
  });

  /* ─── Form State ─── */
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
        type: "contact-page",
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

  return (
    <main className="pt-32 flex-grow bg-background-light text-dark min-h-screen">
      <section className="max-w-[1400px] mx-auto px-6 pb-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 pt-12">
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white p-12 shadow-2xl rounded-sm border border-gray-100 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
                </div>
                <h3 className="font-display text-4xl mb-4 italic text-dark">Aanvraag Ontvangen!</h3>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
                  Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-dark hover:border-dark transition-colors"
                >
                  Nog een bericht sturen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-gray-100 space-y-8">
                <div>
                  <h2 className="font-display text-3xl mb-2">Neem Contact Op</h2>
                  <p className="text-gray-500 text-sm">Vul het formulier in en wij reageren binnen 24 uur.</p>
                </div>

                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-3">
                    <span className="material-symbols-outlined">error</span>
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold group-focus-within:text-primary transition-colors">Naam *</label>
                    <input
                      className="w-full bg-gray-50 border-b-2 border-gray-200 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                      id="name"
                      placeholder="Uw naam"
                      type="text"
                      required
                      value={formData.naam}
                      onChange={(e) => setFormData(p => ({ ...p, naam: e.target.value }))}
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold group-focus-within:text-primary transition-colors">Email *</label>
                    <input
                      className="w-full bg-gray-50 border-b-2 border-gray-200 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                      id="email"
                      placeholder="uw@email.nl"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold group-focus-within:text-primary transition-colors">Telefoonnummer *</label>
                  <input
                    className="w-full bg-gray-50 border-b-2 border-gray-200 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                    id="phone"
                    placeholder="06 12345678"
                    type="tel"
                    required
                    value={formData.telefoon}
                    onChange={(e) => setFormData(p => ({ ...p, telefoon: e.target.value }))}
                  />
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold group-focus-within:text-primary transition-colors">Bericht (Optioneel)</label>
                  <textarea
                    className="w-full bg-gray-50 border-b-2 border-gray-200 p-3 text-sm focus:border-primary focus:outline-none transition-colors min-h-[120px] resize-none"
                    id="message"
                    placeholder="Vertel ons kort over uw wensen"
                    value={formData.bericht}
                    onChange={(e) => setFormData(p => ({ ...p, bericht: e.target.value }))}
                  ></textarea>
                </div>

                {/* Photo Upload Section */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Foto's toevoegen (Optioneel)</label>
                  <div
                    className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-300 ${
                      dragOver 
                        ? "border-primary bg-primary/5" 
                        : "border-gray-200 hover:border-primary/50 hover:bg-white"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-2xl text-gray-400">add_photo_alternate</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Sleep foto's hierheen of <span className="text-primary font-bold hover:underline">klik om te uploaden</span>
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      Max. 5 foto's (JPG, PNG, WEBP)
                    </p>
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      {fotos.map((f, i) => (
                        <div key={i} className="relative group aspect-square bg-gray-100 border border-gray-200">
                          <img
                            src={URL.createObjectURL(f)}
                            alt={`Preview ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    className="w-full bg-primary text-white py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                       <>
                         <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                         <span>Verzenden...</span>
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
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 lg:pl-12 lg:border-l border-dark/10 flex flex-col justify-between">
            <div className="space-y-16">
              <div>
                <h3 className="font-display text-2xl mb-6">Onze Locatie</h3>
                <p className="text-gray-600 leading-relaxed font-light mb-4">
                  Bezoek onze showroom om de materialen te voelen en de mogelijkheden te bespreken. Op afspraak geopend.
                </p>
                <address className="not-italic text-sm uppercase tracking-widest text-dark border-l-2 border-primary pl-4">
                  Braakweg 22b<br />
                  5708 JK, Helmond<br />
                  Nederland
                </address>
              </div>

              <div>
                <h3 className="font-display text-2xl mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <div className="group">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Email Ons</span>
                    <a className="text-xl font-light hover:text-primary transition-colors" href="mailto:info@renovawrap.nl">
                      info@renovawrap.nl
                    </a>
                  </div>
                  <div className="group">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Bel Ons</span>
                    <a className="text-xl font-light hover:text-primary transition-colors" href="tel:+31201234567">
                      +31 (0)20 123 4567
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl mb-6">Volg Ons</h3>
                <div className="flex gap-4">
                  <a
                    className="w-10 h-10 border border-dark/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    href="#"
                  >
                    <span className="text-xs font-bold">IG</span>
                  </a>
                  <a
                    className="w-10 h-10 border border-dark/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    href="#"
                  >
                    <span className="text-xs font-bold">FB</span>
                  </a>
                  <a
                    className="w-10 h-10 border border-dark/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    href="#"
                  >
                    <span className="text-xs font-bold">LI</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-dark/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                KVK: 12345678 — BTW: NL123456789B01
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps - Wat te verwachten */}
      <section className="py-24 bg-white border-y border-dark/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 block animate-fade-in">Transparant</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark">
              Wat kunt u <span className="italic text-primary">verwachten?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 100} className="relative group p-8 border border-gray-100 hover:border-primary/20 transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-lg rounded-sm">
                <span className="absolute top-4 right-4 text-4xl font-display text-gray-100 group-hover:text-primary/10 transition-colors">
                  {step.number}
                </span>
                <h3 className="font-display text-2xl mb-4 text-dark">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {step.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Social Proof */}
      <section className="py-24 bg-background-light overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
               {/* Decorative dots grid */}
               <div className="absolute -top-12 -left-12 w-24 h-24 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
               
               <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
                 Onze klanten aan <br />
                 <span className="italic text-primary">het woord.</span>
               </h2>
               <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                 Wij zijn pas tevreden als u dat bent. Lees de ervaringen van mensen die u voorgingen bij Renovawrap.
               </p>
               <Link 
                 to="/projecten" 
                 className="inline-flex items-center text-xs uppercase tracking-widest font-bold border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors"
               >
                 Bekijk onze projecten
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.slice(0, 2).map((t, i) => (
                <div key={i} className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm">
                   <div className="flex gap-1 mb-4">
                     {[...Array(5)].map((_, starI) => (
                       <span key={starI} className="material-symbols-outlined text-[16px] text-[#C4A47C]">star</span>
                     ))}
                   </div>
                   <p className="text-dark font-light italic text-sm mb-6 leading-relaxed">
                     "{t.quote}"
                   </p>
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                       <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                     </div>
                     <div>
                       <p className="text-xs font-bold uppercase tracking-widest">{t.author}</p>
                       <p className="text-[10px] text-gray-400">{t.location}</p>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Image gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-80 w-full overflow-hidden">
        <div className="relative group h-full">
          <img
            alt="Detail 1"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0xp4zXhxN9OCy1GHjHZUMYQS1ywwcVQs5Nz8ZarRP4evqb8UkZflerz4LuvbXbtPiiGcXnEFo88C1_bbwc1-1-hYyrNv0Lzs5jKdJ6gWrpKWgLCeFSVjJSQ3MFwMQ-4E7GA85ZI3OD58RpSOQ06W6bBV8wm1Mmru44ojWNGsrJxptEeVYRhFD47qxkYPBZeoh-9PttZ7b7Du1D2RUIPIxAeTKVXwvJ482jfZnKLlNWbp66-GvN3OJPv1mjsWrim797aB3HDNhs8"
          />
        </div>
        <div className="relative group h-full">
          <img
            alt="Detail 2"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx5WR-hMnWMtZbqI_cg2HAjl9r0Cwt3U9UhDBROjPH5wx7Nj-uKMNQTsFkB15cSgFfAaQ2aXzJNtJx8hdTleOIoJeqW62mYtqOxCZCIwjdWnJnQJJ3JbNG7Zekf2tqaajugaIvzUmQmWOJvwwGs3eZ20QSVXHlR47HrijbKSf5EyUI5BRFX9Rx9jFEBUJBtYlBmIYiY7VHoF2dPP_Wkp4ngKHAMPzVJ9uk4BAXh4edaXlbHDcY6by9hdDcSZGfkHBIBFwTVvZyOp0"
          />
        </div>
        <div className="relative group h-full">
          <img
            alt="Detail 3"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLTPz2wOk-BW9C7-E3c_mneEHkQr-vNeI4rG3aITIkKapzO24UIJOdrzKNreViOcLSZgCL94V5IuEHt54ZpCNraj5r2dPjXok-3mGr-zQMSnIDAAXCJvKtO998I866VBBHj2KRHS9tZeFdKXwKwdofQWy6WTvmpMEaAOKOovEsDNMIc1T_3NihnIaIj2UDtjED4s_OR0Lr7nbPf-QRUzeFN-dMwdzmVGjt0__Wam_-1oDlMxA4Dkh381ln15C37fqmHh2rAMPckTA"
          />
        </div>
        <div className="relative group h-full">
          <img
            alt="Detail 4"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYn791KOT13rsJDS46AqrZVUi_QO4_7Rfdo2VkGC38Tc_yBJu8D0YarWfW77JRNDRV87flBxpsO39iQ20kDhvL6OUHT3jqpMNbTSEXsXZjFczMvtWJ3nb-qLB21l0cW9TAqmCUE2sKeRsHlV50AGwRcVOQ2Z8UKQy5PQbxxbTTna07PT4QBdkQVnITxv7rT6F9b12RVxiStk3QGb-A690KbJPqkggCBmYABejtuzmP5YvP9hI_KFzpIDKQho_nz5ez4oZA5Y4vy9w"
          />
        </div>
      </section>
    </main>
  );
}
