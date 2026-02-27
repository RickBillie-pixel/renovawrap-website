import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import KitchenBenefits from "../components/KitchenBenefits";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FAQ from "../components/FAQ";
import { kitchenFaqs } from "../data/faqs";
import { supabase } from "@/lib/supabase";
import type { KeuzehulpServiceSlug } from "@/lib/keuzehulp";

import { getWrapColors, getWrapColorById } from "@/lib/wrapColors";
import FadeIn from "../components/FadeIn";

function KeuzehulpWizard() {
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
    onderdelen: [] as string[],
    aantalDeurtjes: "",
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

  const toggleOnderdeel = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      onderdelen: prev.onderdelen.includes(item)
        ? prev.onderdelen.filter((o) => o !== item)
        : [...prev.onderdelen, item],
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
    if (step === 1) return formData.onderdelen.length > 0;
    if (step === 2) return formData.aantalDeurtjes !== "";
    if (step === 3) return formData.stijl !== "";
    if (step === 4) return true;
    if (step === 5) return formData.naam && formData.email && formData.telefoon;
    return true;
  };

  const uploadKeuzehulpFoto = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop() || "jpg";
    const fileName = `keuzehulp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${fileExt}`;
    const filePath = `keuzehulp/${fileName}`;
    const { error } = await supabase.storage.from("configurator-uploads").upload(filePath, file, { cacheControl: "3600", upsert: false });
    if (error) return null;
    const { data } = supabase.storage.from("configurator-uploads").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    const serviceSlug: KeuzehulpServiceSlug = "keuken-wrapping";
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
        onderdelen: formData.onderdelen,
        aantalDeurtjes: formData.aantalDeurtjes,
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
            Wij nemen zo snel mogelijk contact met u op voor een vrijblijvend adviesgesprek en prijsopgave op maat.
          </p>
        </div>
      </div>
    );
  }

  const onderdelen = [
    { 
      id: "keukenfrontjes", 
      label: "Keukenfrontjes & Lades", 
      sub: "Oppervlakte Renovatie",
      image: "/diensten/keukenfront.webp" 
    },
    { 
      id: "werkblad", 
      label: "Werkblad", 
      sub: "Bestand tegen kookwarmte",
      image: "/diensten/werkblad.webp" 
    },
    { 
      id: "achterwand", 
      label: "Achterwand", 
      sub: "Spatwaterdicht",
      image: "/diensten/achterwand-stu.webp" 
    },
    { 
      id: "apparatuur", 
      label: "Inbouwapparatuur", 
      sub: "Uniformiteit",
      image: "/diensten/apparatuur.webp" 
    },
    { 
      id: "zijpanelen", 
      label: "Zijpanelen & Plinten", 
      sub: "Afwerking",
      image: "/diensten/zijpanelen.webp" 
    },
    { 
      id: "afzuigkap", 
      label: "Afzuigkap", 
      sub: "Detailwerk",
      image: "/diensten/afzuigkap.webp" 
    },
  ];

  const steps = [
    { id: 1, title: "Selectie", label: "Onderdelen"},
    { id: 2, title: "Aantal", label: "Details"},
    { id: 3, title: "Stijl", label: "Stijl"}, // Stitch uses "Maten" but functionally it's "Style/Color". Keeping label "Maten" to match Stitch text if that's preferred, but "Kleuren" might be better. Stick to Stitch text "Details", "Maten", "Contact".
    { id: 4, title: "Foto's", label: "Situatie"},
    { id: 5, title: "Contact", label: "Contact"},
  ];

  return (
    <div ref={sectionRef} className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-[60vh] bg-background-light text-dark font-montserrat relative scroll-mt-8">
      {/* Left Sidebar (Sticky) */}
      <div className="lg:w-1/3 flex flex-col justify-start lg:sticky lg:top-24 h-auto lg:h-[60vh] mb-12 lg:mb-0 pr-8 lg:border-r border-gray-200 border-opacity-50">
        <div className="mb-6 flex items-center space-x-4">
          <span className="font-display text-4xl text-primary italic">0{step}</span>
          <span className="h-[1px] w-12 bg-gray-300"></span>
          <span className="uppercase tracking-widest text-xs font-semibold text-gray-500">
            {step === 1 && "Onderdelen"}
            {step === 2 && "Details"}
            {step === 3 && "Stijl & Kleur"}
            {step === 4 && "Foto's"}
            {step === 5 && "Contact"}
          </span>
        </div>

        <h1 className="font-display text-3xl lg:text-4xl lg:text-5xl text-dark leading-tight mb-4">
          {step === 1 && <>Wat wilt u <br/> <span className="italic text-primary">laten wrappen?</span></>}
          {step === 2 && <>Hoeveel <br/> <span className="italic text-primary">deurtjes & lades?</span></>}
          {step === 3 && <>Welke <br/> <span className="italic text-primary">stijl zoekt u?</span></>}
          {step === 4 && <>Huidige <br/> <span className="italic text-primary">situatie</span></>}
          {step === 5 && <>Uw <br/> <span className="italic text-primary">gegevens</span></>}
        </h1>

        <p className="text-gray-500 leading-relaxed mb-8 max-w-sm">
          {step === 1 && "Selecteer de elementen van uw interieur die toe zijn aan vernieuwing. Wij zorgen voor een naadloze transformatie."}
          {step === 2 && "Geef een schatting van het aantal frontjes en lades. Dit helpt ons bij de prijsindicatie."}
          {step === 3 && "Kies een stijl die bij u past. U heeft keuze uit meer dan 300 premium afwerkingen."}
          {step === 4 && "Upload enkele foto's van uw huidige keuken voor een nauwkeurigere offerte."}
          {step === 5 && "Vul uw gegevens in zodat wij contact met u kunnen opnemen met een vrijblijvend voorstel."}
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
            {/* Step 1: Onderdelen */}
            {step === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
                {onderdelen.map((item) => (
                  <label 
                    key={item.id} 
                    className="group relative cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={formData.onderdelen.includes(item.id)}
                      onChange={() => toggleOnderdeel(item.id)}
                    />
                    <div className="bg-white p-3 md:p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 peer-checked:ring-1 peer-checked:ring-primary peer-checked:shadow-none hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] h-full flex flex-col">
                      <div className="relative h-24 md:h-40 overflow-hidden mb-2 md:mb-3">
                        <img 
                          src={item.image} 
                          alt={item.label} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-primary/0 peer-checked:bg-primary/10 transition-colors"></div>
                      </div>
                      <div className="px-2 pb-2 md:px-4 md:pb-4 flex justify-between items-end h-full">
                        <div>
                          <h3 className="font-display text-sm md:text-xl italic text-dark mb-1 leading-tight">{item.label}</h3>
                          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider hidden md:block">{item.sub}</p>
                        </div>
                        <span className={`material-symbols-outlined text-xl md:text-2xl transition-colors ${formData.onderdelen.includes(item.id) ? 'text-primary' : 'text-gray-300'}`}>
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
                  { id: "klein", label: "Klein", sub: "6–10 stuks", desc: "Geschikt voor compacte rechte keukens." },
                  { id: "middel", label: "Gemiddeld", sub: "11–16 stuks", desc: "Standaard hoekkeuken formaat." },
                  { id: "groot", label: "Groot", sub: "17–22 stuks", desc: "Ruime keuken met eiland of kastenwand." },
                  { id: "xl", label: "Extra Groot", sub: "23+ stuks", desc: "Uitgebreide woonkeuken." },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFormData((p) => ({ ...p, aantalDeurtjes: item.id }))}
                    className={`bg-white p-4 md:p-6 text-left shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-primary/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] group ${
                      formData.aantalDeurtjes === item.id ? "ring-1 ring-primary shadow-none" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 md:mb-4">
                      <h3 className="font-display text-lg md:text-2xl italic text-dark">{item.label}</h3>
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${formData.aantalDeurtjes === item.id ? 'border-primary bg-primary text-white' : 'group-hover:border-primary'}`}>
                        {formData.aantalDeurtjes === item.id && <span className="material-symbols-outlined text-[12px] md:text-[14px]">check</span>}
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
                    placeholder="Zoek op kleur, code of materiaal..."
                    value={stijlSearch}
                    onChange={(e) => setStijlSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-b border-gray-200 bg-transparent text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300 font-display italic"
                  />
                </div>
                <div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar"
                  style={{ overscrollBehavior: 'contain' }}
                  onWheel={(e) => {
                    const el = e.currentTarget;
                    const isAtTop = el.scrollTop === 0 && e.deltaY < 0;
                    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && e.deltaY > 0;
                    if (!isAtTop && !isAtBottom) {
                      e.stopPropagation();
                    }
                  }}
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
                        {color.code && <p className="text-[10px] text-white/70">{color.code}</p>}
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
                    aria-label="Foto's van uw keuken uploaden"
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
                        placeholder="Heeft u specifieke wensen?"
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

        {/* Floating Navigation Bar (Matches Stitch footer) */}
        <div className="mt-8 w-full bg-white/95 backdrop-blur-md p-6 border-t border-gray-100 lg:absolute lg:bg-transparent lg:border-none lg:p-0 lg:bottom-12 lg:right-0 lg:mt-0 flex justify-between items-center z-40 lg:w-auto lg:justify-end gap-8">
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

export default function KeukenWrappingMobile() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      before: "/project-fotos/before11.webp",
      after: "/project-fotos/after11.webp",
    },
    {
      before: "/project-fotos/before7.webp",
      after: "/project-fotos/after7.webp",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Preload images
  useEffect(() => {
    heroImages.forEach((image) => {
      const img1 = new Image();
      img1.src = image.before;
      const img2 = new Image();
      img2.src = image.after;
    });
  }, []);

  return (
    <main className="bg-background-light text-dark font-sans antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center py-24 overflow-hidden">
        <div className="hidden lg:block absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            KEUKEN
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center h-full relative">
            {/* Background text watermark (Mobile & Desktop?) - User requested it for mobile hero specifically matching Diensten */}
            <div className="lg:hidden absolute inset-0 flex items-start justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden pt-8">
              <span className="font-display font-bold text-[20vw] leading-none text-dark whitespace-nowrap tracking-tighter">
                KEUKENS
              </span>
            </div>

            {/* Mobile Layout (Visible only on < lg) */}
            <div className="lg:hidden flex flex-col h-[calc(100vh-140px)] justify-between pb-6 pt-5 relative z-10">
               <div className="border-b border-dark/10 pb-4 mb-6">
                 <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-dark">
                  Uw Keuken <br />
                  <span className="italic text-primary">Als Nieuw</span>
                </h1>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                    Uitgekeken op uw keuken? Wij wrappen deze met premium interieurfolie. Niet van echt te onderscheiden en klaar binnen één dag.
                  </p>

                   {/* Trust Badges - Single Line */}
                  <div className="flex items-center gap-2 pt-4 text-xs text-gray-400 whitespace-nowrap overflow-hidden">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                      <span className="ml-1 font-bold text-dark">4.9/5</span>
                      {/* Removing 'Google Reviews' text on mobile if needed for space, but user asked for single line, trying to keep it first */}
                      <span className="ml-1">Google Reviews</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="font-bold text-dark">10+</span>
                    <span>Keukens</span>
                  </div>
                </div>
               </div>

              {/* Slider (Fills remaining space) */}
              <div className="relative w-full flex-1 min-h-[200px] shadow-lg overflow-hidden bg-gray-100 mt-4 mb-4 rounded-lg">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <BeforeAfterSlider
                        afterImage={heroImages[currentImageIndex].after}
                        beforeImage={heroImages[currentImageIndex].before}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
              </div>

               <div className="relative z-20 flex flex-col gap-3">
                <button type="button" onClick={() => document.getElementById('keuzehulp')?.scrollIntoView({ behavior: 'smooth' })} className="bg-dark text-white px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center w-full shadow-lg cursor-pointer">
                  Gratis Offerte
                </button>
                <button type="button" onClick={() => { window.location.href = '/projecten'; }} className="flex items-center justify-center text-xs font-bold tracking-widest uppercase border border-dark px-6 py-4 hover:bg-dark hover:text-white transition-all w-full cursor-pointer bg-transparent">
                  Bekijk Voor & Na Foto's
                </button>
              </div>
            </div>

            {/* Desktop Layout (Hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Keuken Renovatie Specialist</span>
                <p className="font-display text-lg italic text-gray-500">Zonder sloopwerk. Binnen één dag.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Uw Keuken <br />
                <span className="italic font-normal text-primary">Als Nieuw</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Uitgekeken op uw keuken? Een nieuwe keuken kost al snel €8.000+. Wij wrappen uw bestaande keuken met premium interieurfolie in elke gewenste kleur en structuur. Niet van echt te onderscheiden, klaar binnen twee dagen en een fractie van de kosten.
              </p>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 text-sm">star</span>)}
                  <span className="ml-1 font-bold text-dark">4.9/5</span>
                  <span className="ml-1">Google Reviews</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">10+</span>
                <span>Keukens</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="#keuzehulp">
                  Gratis Offerte Zo Snel Mogelijk
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="#portfolio">
                  Bekijk Voor & Na Foto's
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-6 justify-center">
              <div className="relative w-full max-w-xl">
                <div className="relative z-10 w-full aspect-square shadow-2xl overflow-hidden bg-gray-100">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <BeforeAfterSlider
                        afterImage={heroImages[currentImageIndex].after}
                        beforeImage={heroImages[currentImageIndex].before}
                        className="w-full h-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-32 h-32 md:w-48 md:h-48 bg-white p-4 md:p-8 shadow-xl hidden md:block z-20">
                  <div className="h-full w-full border border-primary/20 flex flex-col justify-center items-center text-center">
                    <span className="font-display text-2xl md:text-4xl text-primary">5</span>
                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold mt-1">Jaar Garantie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Wat We Wrappen */}
      <section className="py-32 bg-white" id="portfolio">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-100 pb-12">
            <div className="max-w-xl">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Wat We Wrappen</span>
              <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">Keuken Renovatie <span className="italic text-gray-400">Zonder Sloopwerk</span></h2>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                Waarom duizenden euro’s investeren in iets nieuws? Wij wrappen uw bestaande keuken naar showroom-staat. Binnen 2 dagen geregeld!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-24">
            {[
              {
                title: "Keukenfrontjes & Lades",
                desc: "Geef uw keuken direct een nieuwe look. Wij wrappen elk paneel naadloos over de randen, zodat de folie nooit loslaat. Beschikbaar in 300+ kleuren.",
                image: "/project-fotos/after14.webp",
                link: "/diensten/keuken-frontjes"
              },
              {
                title: "Werkbladen",
                desc: "Niet van echt steen te onderscheiden. Onze industriële wrapfolie is krasvast, waterdicht en duurzaam. Voor hete pannen adviseren wij always een onderzetter voor optimaal behoud.",
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
        </div>
      </section>

      {/* Waarom Keuken Wrappen */}
      {/* Waarom Keuken Wrappen */}
      <KitchenBenefits />

      {/* Werkwijze */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Werkwijze</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">In 4 Stappen <span className="italic text-gray-400">Naar Uw Droomkeuken</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Gratis Adviesgesprek", desc: "Wij komen langs voor een vrijblijvende opmeting en bespreken uw wensen en mogelijkheden.", icon: "chat" },
              { step: "02", title: "Kleurkeuze", desc: "Kies uit ons uitgebreide stalenboek met 300+ kleuren. Wij adviseren u over de beste match.", icon: "color_lens" },
              { step: "03", title: "Professionele Montage", desc: "Onze gecertificeerde monteurs wrappen uw keuken in slechts één werkdag. Strak, snel en schoon.", icon: "construction" },
              { step: "04", title: "Oplevering & Nazorg", desc: "Na oplevering ontvangt u een garantiecertificaat en onderhoudsinstructies.", icon: "handshake" },
            ].map((item, index) => (
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

      {/* AI Visualizer Promo */}
      <section className="py-32 bg-[#1a1a1a] relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm shadow-lg">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(217,119,6,0.5)]"></span>
                <span className="text-[10px] text-white tracking-[0.2em] uppercase font-bold">Nieuw: AI Visualizer</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white leading-[1.1]">
                Visualiseer Uw <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 italic">Droomkeuken</span>
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                Upload een foto van uw huidige keuken en zie binnen enkele minuten hoe onze folies de ruimte transformeren. Technologie ontmoet ambacht.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/configurator" className="group bg-primary text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-all shadow-[0_10px_30px_-10px_rgba(217,119,6,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(217,119,6,0.5)] flex items-center justify-center">
                  <span>Start Configurator</span>
                  <span className="material-symbols-outlined text-lg ml-2 group-hover:rotate-12 transition-transform">auto_fix_high</span>
                </a>
                <a href="/projecten" className="px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-white border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center">
                  Zie Projecten
                </a>
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
                Onze collectie omvat meer dan 300 hoogwaardige afwerkingen — van realistische houtnerven en natuursteen tot ultra-matte kleuren en metallic accenten. Elke folie is kras- en stootvast, onderhoudsvriendelijk, antibacterieel en ontworpen voor een levensduur van 15 tot 20 jaar.
              </p>
              <a className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-dark border-b border-dark pb-1 hover:text-primary hover:border-primary transition-colors" href="/catalogus">
                Bekijk Catalogus
                <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
              </a>
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
                      <img
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        src={item.image}
                      />
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
             <h2 className="font-display text-4xl text-dark">Wat Onze Klanten <span className="italic text-gray-400">Zeggen</span></h2>
           </div>
           <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
             <div 
               className="flex animate-scroll gap-12 w-max items-start py-12 hover:[animation-play-state:paused]"
               style={{ "--animation-duration": "80s" } as React.CSSProperties}
             >
               {[
                 { quote: "Voor een fractie van de prijs heb ik nu precies de look die ik wilde. De kwaliteit van de folie is echt verbluffend — het voelt als echt hout!", author: "Sophie van der Berg", detail: "Matte Black Finish — Hoekwoning Haarlem", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw" },
                 { quote: "De monteur was super professioneel. Om 9 uur begonnen, om 16 uur klaar. Geen rommel, geen stank en een compleet andere keuken. Ongelofelijk!", author: "Thomas Dekker", detail: "Betonlook — Appartement Amsterdam", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY", className: "md:-mt-8" },
                 { quote: "We wilden een warme houtlook voor ons kookeiland. De nerfstructuur voelt heel natuurlijk aan, en na 2 jaar ziet het er nog steeds perfect uit.", author: "Elise & Mark", detail: "Rustiek Eiken — Twee-onder-een-kap Breda", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRwo0QG3cGcazJtGiKDKbSOSl5YrYgkC7bd5re6bFLjJ5RpJkUnTqxqjICK7bs7v50fEdVvEMnFOdETrAlScnkiGEwjl6xhZsJujHVw0RcucCL0boKG-95d_auEwgBO-RxhmgPfZ1CHPKk3nAkta6T3aamp6RFXn_q3-x3yOtLwx9xRVLyIOQ3EZqsBJE6Lwk9HnostG-8vZNR6nYrxqTqDXGfUUhWqw3qKOen9-ZzCBXUyKlW6Rv7DiCvDQ23oj0L82cNKdHU940" },
                 { quote: "Onze keuken was nog goed, maar de kleur stond ons niet meer aan. Wrappen was de perfecte oplossing. Het resultaat is niet van echt natuursteen te onderscheiden.", author: "Fam. Visser", detail: "Marmerlook — Vrijstaande Woning Utrecht", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                 { quote: "Super blij met de nieuwe kleur! De monteur dacht goed mee over de kleine details en de afwerking is echt top. Een aanrader.", author: "Lisa & Tom", detail: "Soft Touch Moss Green — Nieuwbouw Leidsche Rijn", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" },
                 { quote: "Strak, modern en snel geregeld. Binnen 2 dagen een compleet nieuwe look in ons appartement. Scheelt enorm veel geld vergeleken met een nieuwe keuken.", author: "Jeroen", detail: "Industrial Concrete — Loft Rotterdam", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                 { quote: "We waren bang dat het nep zou lijken, maar de structuur voelt echt aan. Geeft onze woonboot precies die frisse uitstraling die we zochten.", author: "Karin de Jong", detail: "Houtstructuur Licht Eiken — Woonboot Groningen", rating: 5, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80" },
                 { quote: "Zeer professioneel bedrijf. Goede communicatie vooraf en de montage verliep vlekkeloos. Het resultaat straalt luxe uit.", author: "Dhr. S. Bakker", detail: "Ultra Mat Antraciet — Penthouse Den Haag", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                 // Duplicate for smooth loop
                 { quote: "Voor een fractie van de prijs heb ik nu precies de look die ik wilde. De kwaliteit van de folie is echt verbluffend — het voelt als echt hout!", author: "Sophie van der Berg", detail: "Matte Black Finish — Hoekwoning Haarlem", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw" },
                 { quote: "De monteur was super professioneel. Om 9 uur begonnen, om 16 uur klaar. Geen rommel, geen stank en een compleet andere keuken. Ongelofelijk!", author: "Thomas Dekker", detail: "Betonlook — Appartement Amsterdam", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY", className: "md:-mt-8" },
                 { quote: "We wilden een warme houtlook voor ons kookeiland. De nerfstructuur voelt heel natuurlijk aan, en na 2 jaar ziet het er nog steeds perfect uit.", author: "Elise & Mark", detail: "Rustiek Eiken — Twee-onder-een-kap Breda", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRwo0QG3cGcazJtGiKDKbSOSl5YrYgkC7bd5re6bFLjJ5RpJkUnTqxqjICK7bs7v50fEdVvEMnFOdETrAlScnkiGEwjl6xhZsJujHVw0RcucCL0boKG-95d_auEwgBO-RxhmgPfZ1CHPKk3nAkta6T3aamp6RFXn_q3-x3yOtLwx9xRVLyIOQ3EZqsBJE6Lwk9HnostG-8vZNR6nYrxqTqDXGfUUhWqw3qKOen9-ZzCBXUyKlW6Rv7DiCvDQ23oj0L82cNKdHU940" },
                 { quote: "Onze keuken was nog goed, maar de kleur stond ons niet meer aan. Wrappen was de perfecte oplossing. Het resultaat is niet van echt natuursteen te onderscheiden.", author: "Fam. Visser", detail: "Marmerlook — Vrijstaande Woning Utrecht", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                 { quote: "Super blij met de nieuwe kleur! De monteur dacht goed mee over de kleine details en de afwerking is echt top. Een aanrader.", author: "Lisa & Tom", detail: "Soft Touch Moss Green — Nieuwbouw Leidsche Rijn", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" },
                 { quote: "Strak, modern en snel geregeld. Binnen 2 dagen een compleet nieuwe look in ons appartement. Scheelt enorm veel geld vergeleken met een nieuwe keuken.", author: "Jeroen", detail: "Industrial Concrete — Loft Rotterdam", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
                 { quote: "We waren bang dat het nep zou lijken, maar de structuur voelt echt aan. Geeft onze woonboot precies die frisse uitstraling die we zochten.", author: "Karin de Jong", detail: "Houtstructuur Licht Eiken — Woonboot Groningen", rating: 5, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80" },
                 { quote: "Zeer professioneel bedrijf. Goede communicatie vooraf en de montage verliep vlekkeloos. Het resultaat straalt luxe uit.", author: "Dhr. S. Bakker", detail: "Ultra Mat Antraciet — Penthouse Den Haag", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80", className: "md:-mt-8" },
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
                     <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{item.detail}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </section>

       {/* FAQ */}
       <FAQ items={kitchenFaqs} />

       {/* Keuzehulp Wizard */}
      <section className="py-16 bg-background-light border-t border-gray-200" id="keuzehulp">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Keuzehulp</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-4">
              Ontvang Uw <span className="italic text-primary">Offerte Op Maat</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Beantwoord 5 korte vragen en wij sturen u zo snel mogelijk een vrijblijvende offerte. U kunt ook foto's van uw keuken toevoegen voor een nauwkeurigere prijsindicatie.
            </p>
          </div>
          <div className="w-full">
            <KeuzehulpWizard />
          </div>
        </div>
      </section>
    </main>
  );
}
