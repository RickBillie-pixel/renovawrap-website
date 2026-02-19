import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { KeuzehulpServiceSlug } from "@/lib/keuzehulp";
import { getWrapColors, getWrapColorById } from "@/lib/wrapColors";

export default function KeuzehulpDeuren() {
  const [step, setStep] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    setTimeout(() => {
      const lenis = (window as any).__lenis;
      if (sectionRef.current) {
        if (lenis) {
          lenis.scrollTo(sectionRef.current, { offset: -72, immediate: true });
        } else {
          const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: 'auto' });
        }
      }
    }, 50);
  };

  const [formData, setFormData] = useState({
    type: [] as string[],
    aantal: "",
    stijl: "",
    fotos: [] as File[],
    naam: "",
    email: "",
    telefoon: "",
    opmerking: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [stijlSearch, setStijlSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allWrapColors = getWrapColors();
  const filteredWrapColors = allWrapColors.filter(
    (c) =>
      c.name.toLowerCase().includes(stijlSearch.toLowerCase()) ||
      (c.code?.toLowerCase().includes(stijlSearch.toLowerCase()) ?? false)
  );

  const toggleType = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      type: prev.type.includes(item)
        ? prev.type.filter((t) => t !== item)
        : [...prev.type, item],
    }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setFormData((prev) => ({
      ...prev,
      fotos: [...prev.fotos, ...Array.from(files)].slice(0, 5),
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index),
    }));
  };

  const canNext = () => {
    if (step === 1) return formData.type.length > 0;
    if (step === 2) return formData.aantal !== "";
    if (step === 3) return formData.stijl !== "";
    if (step === 4) return true;
    if (step === 5) return formData.naam && formData.email && formData.telefoon;
    return true;
  };

  const uploadKeuzehulpFoto = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop() || "jpg";
    const fileName = `keuzehulp-deuren-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${fileExt}`;
    const filePath = `keuzehulp/${fileName}`;
    const { error } = await supabase.storage.from("configurator-uploads").upload(filePath, file, { cacheControl: "3600", upsert: false });
    if (error) return null;
    const { data } = supabase.storage.from("configurator-uploads").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    const serviceSlug: KeuzehulpServiceSlug = "deuren" as any; // Using generic or casting if strict
    try {
      const contact_name = formData.naam.trim() || null;
      const contact_email = formData.email.trim();
      const contact_phone = formData.telefoon.trim() || null;
      const opmerking = formData.opmerking.trim() || null;

      const foto_urls: string[] = [];
      for (const file of formData.fotos) {
        const url = await uploadKeuzehulpFoto(file);
        if (url) foto_urls.push(url);
      }

      const selectedColor = getWrapColorById(formData.stijl);
      const wizard_data = {
        type: formData.type,
        aantal: formData.aantal,
        stijl: formData.stijl,
        stijl_naam: selectedColor?.name ?? null,
        stijl_code: selectedColor?.code ?? null,
        fotos_aantal: formData.fotos.length,
        fotos_namen: formData.fotos.map((f) => f.name),
        opmerking,
      };

      const { error } = await supabase.from("keuzehulp_submissions").insert({
        service_slug: serviceSlug,
        contact_name,
        contact_email,
        contact_phone,
        contact_address: null,
        wizard_data,
        foto_urls: foto_urls,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Aanvraag kon niet worden verzonden. Probeer het later opnieuw.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-12 bg-surface text-dark">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
          </div>
          <h3 className="font-display text-4xl text-dark mb-4 italic">Bedankt voor uw aanvraag!</h3>
          <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
            Wij nemen zo snel mogelijk contact met u op voor een vrijblijvend adviesgesprek en prijsopgave op maat voor uw deuren.
          </p>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: "Type", label: "Type Deur"},
    { id: 2, title: "Aantal", label: "Aantal"},
    { id: 3, title: "Stijl", label: "Stijl"},
    { id: 4, title: "Foto's", label: "Situatie"},
    { id: 5, title: "Contact", label: "Contact"},
  ];

  const types = [
    { 
      id: "vlakke-deur", 
      label: "Vlakke Deur", 
      sub: "Strak & Modern",
      image: "/diensten/deur-vlak.webp" 
    },
    { 
      id: "paneeldeur", 
      label: "Paneeldeur", 
      sub: "Klassiek & Tijdloos",
      image: "/diensten/deur.webp" 
    },
    { 
      id: "deur-glas", 
      label: "Deur met Glas", 
      sub: "Licht & Ruimtelijk",
      image: "/diensten/deurraam.webp" 
    },
    { 
      id: "kozijn", 
      label: "Kozijnen", 
      sub: "Deurlijsten & Architraven",
      image: "/diensten/deurkozijn.webp" 
    },
  ];

  return (
    <div ref={sectionRef} className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-[60vh] bg-background-light text-dark font-montserrat relative scroll-mt-8">
      {/* Left Sidebar (Sticky) */}
      <div className="lg:w-1/3 flex flex-col justify-start lg:sticky lg:top-24 h-auto lg:h-[60vh] mb-12 lg:mb-0 pr-8 lg:border-r border-gray-200 border-opacity-50">
        <div className="mb-6 flex items-center space-x-4">
          <span className="font-display text-4xl text-primary italic">0{step}</span>
          <span className="h-[1px] w-12 bg-gray-300"></span>
          <span className="uppercase tracking-widest text-xs font-semibold text-gray-500">
            {step === 1 && "Type"}
            {step === 2 && "Aantal"}
            {step === 3 && "Stijl & Kleur"}
            {step === 4 && "Foto's"}
            {step === 5 && "Contact"}
          </span>
        </div>

        <h1 className="font-display text-3xl lg:text-4xl lg:text-5xl text-dark leading-tight mb-4">
          {step === 1 && <>Wat wilt u <br/> <span className="italic text-primary">laten wrappen?</span></>}
          {step === 2 && <>Hoeveel <br/> <span className="italic text-primary">deuren?</span></>}
          {step === 3 && <>Welke <br/> <span className="italic text-primary">look zoekt u?</span></>}
          {step === 4 && <>Huidige <br/> <span className="italic text-primary">situatie</span></>}
          {step === 5 && <>Uw <br/> <span className="italic text-primary">gegevens</span></>}
        </h1>

        <p className="text-gray-500 leading-relaxed mb-8 max-w-sm">
          {step === 1 && "Selecteer het type deur of kozijn dat u wilt renoveren."}
          {step === 2 && "Geef een indicatie van het aantal deuren en/of kozijnen."}
          {step === 3 && "Kies een kleur of structuur. Van houtnerf tot solid color."}
          {step === 4 && "Upload fotos van uw huidige deuren voor een nauwkeurige offerte."}
          {step === 5 && "Ontvang zo snel mogelijk een vrijblijvend voorstel."}
        </p>

        {/* Progress Timeline (Desktop) */}
        <div className="relative flex-grow hidden lg:block ml-2">
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200"></div>
          <div 
            className="absolute left-0 top-0 w-[1px] bg-primary transition-all duration-1000 ease-in-out" 
            style={{ height: `${(step / 5) * 100}%` }}
          ></div>
          <div className="relative flex flex-col space-y-8 py-2">
            {steps.map((s, i) => (
              <div 
                key={s.id}
                className={`flex items-center group cursor-pointer transition-opacity ${step === s.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                onClick={() => { if (i + 1 < step) { setStep(i + 1); scrollToSection(); } }}
              >
                <div className={`w-2 h-2 rounded-full -ml-[3.5px] transition-colors ${step >= s.id ? 'bg-primary ring-4 ring-background-light' : 'bg-gray-400'}`}></div>
                <span className={`ml-6 text-sm font-semibold transition-colors ${step >= s.id ? 'text-primary' : 'text-gray-500'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="lg:w-2/3 lg:pl-16 relative pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Step 1: Type */}
            {step === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
                {types.map((item) => (
                  <label 
                    key={item.id} 
                    className="group relative cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={formData.type.includes(item.id)}
                      onChange={() => toggleType(item.id)}
                    />
                    <div className="bg-white p-2 md:p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 peer-checked:ring-1 peer-checked:ring-primary peer-checked:shadow-none hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] h-full flex flex-col">
                      <div className="relative h-24 md:h-40 overflow-hidden mb-2 md:mb-3">
                        <img 
                          src={item.image} 
                          alt={item.label} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-primary/0 peer-checked:bg-primary/10 transition-colors"></div>
                      </div>
                      <div className="px-2 pb-2 md:px-4 md:pb-4 flex justify-between items-end">
                        <div className="w-full">
                          <h3 className="font-display text-sm md:text-xl italic text-dark mb-1 leading-tight">{item.label}</h3>
                          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider hidden md:block">{item.sub}</p>
                        </div>
                        <span className={`material-symbols-outlined text-lg md:text-2xl transition-colors ${formData.type.includes(item.id) ? 'text-primary' : 'text-gray-300'}`}>
                          check_circle
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Step 2: Aantal */}
            {step === 2 && (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
                 {[
                  { id: "1-3", label: "1 - 3 Deuren", sub: "Klein project", desc: "Bijv. toilet of badkamerdeur." },
                  { id: "4-8", label: "4 - 8 Deuren", sub: "Gemiddeld", desc: "Bijv. een hele verdieping." },
                  { id: "8-plus", label: "8+ Deuren", sub: "Groot", desc: "Volledige woningrenovatie." },
                  { id: "zakelijk", label: "Zakelijk", sub: "Projectmatig", desc: "Kantoorpand of hotel." },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFormData((p) => ({ ...p, aantal: item.id }))}
                    className={`bg-white p-4 md:p-6 text-left shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-primary/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] group ${
                      formData.aantal === item.id ? "ring-1 ring-primary shadow-none" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 md:mb-4">
                      <h3 className="font-display text-lg md:text-2xl italic text-dark">{item.label}</h3>
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${formData.aantal === item.id ? 'border-primary bg-primary text-white' : 'group-hover:border-primary'}`}>
                        {formData.aantal === item.id && <span className="material-symbols-outlined text-[12px] md:text-[14px]">check</span>}
                      </div>
                    </div>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-1 md:mb-2">{item.sub}</p>
                    <p className="text-sm text-gray-500 leading-relaxed hidden md:block">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Stijl */}
            {step === 3 && (
              <div>
                <div className="relative mb-8">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <span className="material-symbols-outlined text-lg">search</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Zoek op look (bijv. Eiken, Zwart, Beton)..."
                    value={stijlSearch}
                    onChange={(e) => setStijlSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-b border-gray-200 bg-transparent text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300 font-display italic"
                  />
                </div>
                <div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar"
                >
                  {filteredWrapColors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, stijl: color.id }))}
                      className={`group relative aspect-square overflow-hidden bg-gray-100 transition-all ${
                        formData.stijl === color.id ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-90"
                      }`}
                    >
                      <img src={color.image} alt={color.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-xs text-white font-bold truncate">{color.name}</p>
                      </div>
                      {formData.stijl === color.id && (
                        <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full shadow-lg">
                          <span className="material-symbols-outlined text-sm block">check</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Foto's */}
            {step === 4 && (
              <div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFiles(e.dataTransfer.files); }}
                  className="border border-dashed border-gray-300 hover:border-primary bg-white hover:bg-primary/5 p-8 text-center cursor-pointer transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-primary transition-colors">add_a_photo</span>
                  </div>
                  <h4 className="font-display text-xl text-dark mb-2">Sleep foto's hierheen</h4>
                  <p className="text-sm text-gray-500 mb-6">of klik om te uploaden vanaf uw apparaat</p>
                  <span className="px-6 py-2 bg-dark text-white text-xs font-bold tracking-widest uppercase group-hover:bg-primary transition-colors">
                    Kies Bestanden
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>

                {formData.fotos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    {formData.fotos.map((file, i) => (
                      <div key={i} className="relative aspect-square bg-gray-100 overflow-hidden group shadow-md">
                        <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => removeFile(i)}
                            className="w-8 h-8 bg-white text-dark rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Contact */}
            {step === 5 && (
              <div className="space-y-6 max-w-xl">
                 <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Naam</label>
                      <input
                        type="text"
                        value={formData.naam}
                        onChange={(e) => setFormData((p) => ({ ...p, naam: e.target.value }))}
                        className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300 font-display text-lg"
                        placeholder="Uw volledige naam"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">E-mailadres</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300 font-display text-lg"
                        placeholder="bijv. naam@email.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Telefoonnummer</label>
                      <input
                        type="tel"
                        value={formData.telefoon}
                        onChange={(e) => setFormData((p) => ({ ...p, telefoon: e.target.value }))}
                        className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300 font-display text-lg"
                        placeholder="06 12345678"
                      />
                    </div>
                    <div className="space-y-1 pt-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Opmerkingen (Optioneel)</label>
                      <textarea
                        value={formData.opmerking}
                        onChange={(e) => setFormData((p) => ({ ...p, opmerking: e.target.value }))}
                        rows={3}
                        className="w-full border border-gray-200 bg-white p-4 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300 resize-none text-sm"
                        placeholder="Heeft u specifieke wensen of vragen?"
                      />
                    </div>
                 </div>
                 {submitError && (
                    <div className="p-4 bg-red-50 text-red-600 text-sm border border-red-100 flex items-center gap-2">
                       <span className="material-symbols-outlined text-lg">error</span>
                       {submitError}
                    </div>
                 )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating Navigation Bar */}
        <div className="mt-8 w-full bg-white p-6 border-t border-gray-100 lg:absolute lg:bg-transparent lg:border-none lg:p-0 lg:bottom-12 lg:right-0 lg:mt-0 flex justify-between items-center z-40 lg:w-auto lg:justify-end gap-8">
            <span className="text-sm text-gray-400 hidden lg:block font-mono">Stap {step} van 5</span>
            
            <div className="flex gap-4 w-full lg:w-auto">
              {step > 1 && (
                <button
                onClick={() => { setStep((s) => s - 1); scrollToSection(); }}
                disabled={submitting}
                className="flex-1 lg:flex-none py-3 px-6 text-xs font-bold tracking-widest uppercase border border-gray-200 hover:border-primary hover:text-primary transition-all disabled:opacity-50"
              >
                Vorige
              </button>
              )}
              
              {step < 5 ? (
                <button 
                  onClick={() => { if (canNext()) { setStep((s) => s + 1); scrollToSection(); } }}
                  disabled={!canNext()}
                  className="group flex-1 lg:flex-none flex items-center justify-center space-x-4 pl-8 py-3 pr-2 text-dark hover:text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Volgende</span>
                  <span className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </span>
                </button>
              ) : (
                <button 
                  onClick={() => canNext() && !submitting && handleSubmit()}
                  disabled={!canNext() || submitting}
                  className="group flex-1 lg:flex-none flex items-center justify-center space-x-4 pl-8 py-3 pr-2 text-dark hover:text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">{submitting ? "Verzenden..." : "Aanvragen"}</span>
                  <span className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-xl">send</span>
                  </span>
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
