import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { InfiniteMovingCards } from "../components/InfiniteMovingCards";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { supabase } from "@/lib/supabase";
import type { KeuzehulpServiceSlug } from "@/lib/keuzehulp";
import { getWrapColors, getWrapColorById } from "@/lib/wrapColors";

function KeuzehulpWizard() {
  const [step, setStep] = useState(1);
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
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
        </div>
        <h3 className="font-display text-3xl text-dark mb-4">Bedankt voor uw aanvraag!</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Wij nemen binnen 24 uur contact met u op voor een vrijblijvend adviesgesprek en prijsopgave op maat.
        </p>
      </div>
    );
  }

  const onderdelen = [
    { id: "frontjes", label: "Keukenfrontjes & Lades", icon: "kitchen" },
    { id: "werkblad", label: "Werkblad", icon: "countertops" },
    { id: "achterwand", label: "Achterwand", icon: "grid_view" },
    { id: "zijpanelen", label: "Zijpanelen & Plinten", icon: "view_sidebar" },
    { id: "afzuigkap", label: "Afzuigkap", icon: "air" },
    { id: "apparatuur", label: "Inbouwapparatuur", icon: "microwave" },
  ];

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-12 max-w-lg mx-auto">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                s <= step ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              {s < step ? (
                <span className="material-symbols-outlined text-sm">check</span>
              ) : (
                s
              )}
            </div>
            {s < 5 && (
              <div className={`w-8 sm:w-16 h-0.5 ${s < step ? "bg-primary" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <h3 className="font-display text-2xl text-dark mb-2 text-center">Wat wilt u laten wrappen?</h3>
          <p className="text-gray-400 text-sm text-center mb-8">Selecteer alle onderdelen die u wilt vernieuwen</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {onderdelen.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleOnderdeel(item.id)}
                className={`p-6 border-2 transition-all text-left group hover:border-primary ${
                  formData.onderdelen.includes(item.id)
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className={`material-symbols-outlined text-2xl mb-3 block ${
                  formData.onderdelen.includes(item.id) ? "text-primary" : "text-gray-300 group-hover:text-primary"
                }`}>{item.icon}</span>
                <span className="text-sm font-bold text-dark block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <h3 className="font-display text-2xl text-dark mb-2 text-center">Hoeveel deurtjes en lades?</h3>
          <p className="text-gray-400 text-sm text-center mb-8">Een schatting is voldoende</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { id: "klein", label: "Klein", sub: "6–10 stuks" },
              { id: "middel", label: "Gemiddeld", sub: "11–16 stuks" },
              { id: "groot", label: "Groot", sub: "17–22 stuks" },
              { id: "xl", label: "Extra Groot", sub: "23+ stuks" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFormData((p) => ({ ...p, aantalDeurtjes: item.id }))}
                className={`p-6 border-2 transition-all text-center ${
                  formData.aantalDeurtjes === item.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white hover:border-primary"
                }`}
              >
                <span className="text-sm font-bold text-dark block">{item.label}</span>
                <span className="text-xs text-gray-400 mt-1 block">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 – Stijl:zelfde kleuren als configurator (Kleurenwrap) */}
      {step === 3 && (
        <div>
          <h3 className="font-display text-2xl text-dark mb-2 text-center">Welke stijl / kleur spreekt u aan?</h3>
          <p className="text-gray-400 text-sm text-center mb-6">Kies uit ons folie-assortiment, zoals in de configurator</p>
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <span className="material-symbols-outlined text-lg">search</span>
              </span>
              <input
                type="text"
                placeholder="Zoek op naam of code..."
                value={stijlSearch}
                onChange={(e) => setStijlSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-w-3xl mx-auto max-h-[380px] overflow-y-auto pr-2">
            {filteredWrapColors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, stijl: color.id }))}
                className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  formData.stijl === color.id ? "border-primary ring-2 ring-primary ring-offset-2" : "border-gray-200 hover:border-primary/50"
                }`}
              >
                <img src={color.image} alt={color.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="text-[10px] text-white font-medium truncate text-center">{color.name}</p>
                  {color.code && <p className="text-[9px] text-white/80 text-center">{color.code}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div>
          <h3 className="font-display text-2xl text-dark mb-2 text-center">Foto's van uw keuken</h3>
          <p className="text-gray-400 text-sm text-center mb-8">Upload foto's zodat wij een nauwkeurige offerte kunnen maken (optioneel, max 5)</p>
          <div className="max-w-xl mx-auto">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFiles(e.dataTransfer.files); }}
              className="border-2 border-dashed border-gray-300 hover:border-primary p-12 text-center cursor-pointer transition-colors bg-white"
            >
              <span className="material-symbols-outlined text-4xl text-gray-300 mb-4 block">cloud_upload</span>
              <p className="text-sm text-gray-500 mb-1">Sleep foto's hierheen of klik om te uploaden</p>
              <p className="text-xs text-gray-400">JPG, PNG — max 5 foto's</p>
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
              <div className="grid grid-cols-5 gap-3 mt-6">
                {formData.fotos.map((file, i) => (
                  <div key={i} className="relative aspect-square bg-gray-100 overflow-hidden group">
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-dark/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div>
          <h3 className="font-display text-2xl text-dark mb-2 text-center">Uw gegevens</h3>
          <p className="text-gray-400 text-sm text-center mb-8">Wij nemen binnen 24 uur contact met u op</p>
          <div className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Naam *"
              value={formData.naam}
              onChange={(e) => setFormData((p) => ({ ...p, naam: e.target.value }))}
              className="w-full border border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              placeholder="E-mailadres *"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="w-full border border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-primary"
            />
            <input
              type="tel"
              placeholder="Telefoonnummer *"
              value={formData.telefoon}
              onChange={(e) => setFormData((p) => ({ ...p, telefoon: e.target.value }))}
              className="w-full border border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-primary"
            />
            <textarea
              placeholder="Heeft u nog opmerkingen of wensen?"
              value={formData.opmerking}
              onChange={(e) => setFormData((p) => ({ ...p, opmerking: e.target.value }))}
              rows={3}
              className="w-full border border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      )}

      {/* Foutmelding bij verzenden */}
      {submitError && (
        <div className="mt-6 max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={submitting}
          className={`text-xs font-bold tracking-widest uppercase flex items-center gap-2 ${
            step === 1 ? "invisible" : "text-gray-400 hover:text-dark disabled:opacity-50"
          }`}
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Vorige
        </button>
        {step < 5 ? (
          <button
            onClick={() => canNext() && setStep((s) => s + 1)}
            className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${
              canNext()
                ? "bg-dark text-white hover:bg-primary"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Volgende
          </button>
        ) : (
          <button
            onClick={() => canNext() && !submitting && handleSubmit()}
            disabled={!canNext() || submitting}
            className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              canNext() && !submitting
                ? "bg-primary text-white hover:bg-dark"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {submitting ? "Bezig met verzenden…" : "Verstuur Aanvraag"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function KeukenWrappingDetail() {
  if (typeof document !== "undefined") {
    document.title = "Renovawrap | Keuken Wrapping — Uw Keuken Als Nieuw";
  }

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
        <div className="absolute left-0 top-1/4 opacity-[0.06] pointer-events-none select-none z-0">
          <h1 className="text-[20rem] font-display font-bold leading-none text-dark tracking-tighter whitespace-nowrap">
            KEUKEN
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-block border-l-2 border-primary pl-4">
                <span className="block text-primary font-sans text-xs font-bold tracking-widest uppercase mb-2">Keuken Renovatie Specialist</span>
                <p className="font-display text-lg italic text-gray-500">Zonder sloopwerk. Binnen één dag.</p>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-dark">
                Uw Keuken <br />
                <span className="italic font-normal text-primary">Als Nieuw</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md pt-4">
                Transformeer uw keuken tot 70% goedkoper zonder sloopwerk. Kies uit 300+ premium afwerkingen en geniet binnen één dag van een compleet nieuwe showroom-look.
              </p>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-primary text-sm">star</span>)}
                  <span className="ml-1 font-bold text-dark">4.9</span>
                  <span className="ml-1">Google Reviews</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-dark">500+</span>
                <span>Keukens Gewrapt</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a className="bg-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 text-center" href="#keuzehulp">
                  Gratis Offerte
                </a>
                <a className="flex items-center text-xs font-bold tracking-widest uppercase border-b border-transparent hover:border-dark transition-all pb-1 w-fit" href="#portfolio">
                  Bekijk Portfolio
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6 flex justify-center">
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
                    <span className="font-display text-2xl md:text-4xl text-primary">10</span>
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
              <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight">Elk Onderdeel, <span className="italic text-gray-400">Tot In Perfectie</span></h2>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                Van frontjes en werkbladen tot de afzuigkap — wij wrappen alles voor een naadloos eindresultaat.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Keukenfrontjes & Lades",
                desc: "Alle zichtbare delen worden gewrapt inclusief hoeken en randen. Kies uit hout, mat, hoogglans of een unieke twee-kleuren combinatie.",
                image: "/project-fotos/after14.webp",
                link: "/diensten/keuken-frontjes"
              },
              {
                title: "Werkbladen",
                desc: "Hittebestendig tot 180°C, waterdicht en niet van echt marmer of beton te onderscheiden. Ideaal als u het aanrechtblad wilt vernieuwen zonder te breken.",
                image: "/project-fotos/after6.webp",
                className: "md:mt-24",
                link: "/diensten/aanrechtbladen"
              },
              {
                title: "Achterwanden & Zijpanelen",
                desc: "De achterwand maakt of breekt de uitstraling. Wij wrappen deze met dezelfde nauwkeurigheid als de frontjes, inclusief stopcontacten.",
                image: "/project-fotos/after5.webp",
                link: "/diensten/achterwanden"
              }
            ].map((item, index) => (
              <Link key={index} to={item.link} className={`group cursor-pointer block ${item.className || ''}`}>
                <div className="relative overflow-hidden mb-8 aspect-[3/4]">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={item.image}
                  />
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

      {/* Waarom Keuken Wrappen */}
      <section className="py-32 bg-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Voordelen</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">Waarom Keuken <span className="italic text-primary">Wrappen?</span></h2>
          </div>
          <div className="flex flex-col antialiased bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={[
                { icon: "savings", title: "Tot 70% Goedkoper", desc: "Een nieuwe keuken kost al snel €8.000+. Wrappen kan al vanaf €895." },
                { icon: "schedule", title: "Klaar In 1 Dag", desc: "Geen wekenlange verbouwing. Wij wrappen uw keuken in slechts één werkdag." },
                { icon: "palette", title: "300+ Kleuren", desc: "Van realistische houtnerven en marmer tot ultramat en metallic finishes." },
                { icon: "verified", title: "15-20 Jaar Levensduur", desc: "Onze architecturale folies zijn kras- en stootvast, hittebestendig en antibacterieel." },
                { icon: "cleaning_services", title: "Geen Rommel", desc: "Geen sloopwerk, geen stof, geen stank. Na afloop is alles schoon." },
                { icon: "eco", title: "Duurzaam", desc: "Hergebruik uw bestaande keuken. Goed voor het milieu en uw portemonnee." },
                { icon: "shield", title: "10 Jaar Garantie", desc: "Verkleurt niet, bladdert niet af. Wij staan achter de kwaliteit van ons werk." },
                { icon: "auto_awesome", title: "Onderhoudsarm", desc: "Een natte doek is alles wat u nodig heeft. De folies zijn geurloos en hygiënisch." },
              ]}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </section>

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
                Upload een foto van uw huidige keuken en zie binnen seconden hoe onze folies de ruimte transformeren. Technologie ontmoet ambacht.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/configurator" className="group bg-primary text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-all shadow-[0_10px_30px_-10px_rgba(217,119,6,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(217,119,6,0.5)] flex items-center justify-center">
                  <span>Start Configurator</span>
                  <span className="material-symbols-outlined text-lg ml-2 group-hover:rotate-12 transition-transform">auto_fix_high</span>
                </a>
                <a href="#werkwijze" className="px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-white border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center">
                  Hoe het werkt
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
                Onze collectie omvat meer dan 300 hoogwaardige afwerkingen — van realistische houtnerven en natuursteen tot ultra-matte kleuren en metallic accenten. Elke folie is kras- en stootvast, hittebestendig, antibacterieel en ontworpen voor een levensduur van 15 tot 20 jaar.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {[
              { quote: "Voor een fractie van de prijs heb ik nu precies de look die ik wilde. De kwaliteit van de folie is echt verbluffend — het voelt als echt hout!", author: "Sophie van der Berg", detail: "Matte Black Finish — Hoekwoning Haarlem", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjRje0SsZ6X0SAG9XXaHd5PWyK25Vgb6cLKod36DBVSDPIcbnwR9MKVSjvL7-e8ksM_MVxEZ67Hao_GlVVaxvma_vapg2Zu2ZSQHAxBwoxunhpLAQaSdFgJMZ4jate1Z3qME5ZSt90NJE3BI98eyhofu9oDEU3Jk3GFE29fBhaX4pWdTqEZQrzKTE3Rgr98QIZ4xQFxr04utOCsua05sMe1fPipu441itxxVUqbTgtY96olHL6qdq11eYZ0nsh9oK0s543U7ekdw" },
              { quote: "De monteur was super professioneel. Om 9 uur begonnen, om 16 uur klaar. Geen rommel, geen stank en een compleet andere keuken. Ongelofelijk!", author: "Thomas Dekker", detail: "Betonlook — Appartement Amsterdam", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfFKBnrEzsj-7Zr7h4JHKNj9Gjf7RNssonUfw8etiL30PwABkZHpjb37OXlNE_qaSWemFUVN7gONN1uTRYbthdRhU6M_yVvQOE-E6qP8DH08u8W846K2CB6xoQjArYjghHQr8zAo363LG2tnrkOKkwwL_CmNPUhV1-3Djp1-f_1SQ7M_mZKsM8Zk1xBstP4cq_sZR61ds8HAZ1OVgizvWPvFNeAG4FSMxXoIOf6l5xkqcs1dORe7kO6dhJnqv6igtUO4x0T7nhsiY", className: "md:-mt-8" },
              { quote: "We wilden een warme houtlook voor ons kookeiland. De nerfstructuur voelt heel natuurlijk aan, en na 2 jaar ziet het er nog steeds perfect uit.", author: "Elise & Mark", detail: "Rustiek Eiken — Twee-onder-een-kap Breda", rating: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRwo0QG3cGcazJtGiKDKbSOSl5YrYgkC7bd5re6bFLjJ5RpJkUnTqxqjICK7bs7v50fEdVvEMnFOdETrAlScnkiGEwjl6xhZsJujHVw0RcucCL0boKG-95d_auEwgBO-RxhmgPfZ1CHPKk3nAkta6T3aamp6RFXn_q3-x3yOtLwx9xRVLyIOQ3EZqsBJE6Lwk9HnostG-8vZNR6nYrxqTqDXGfUUhWqw3qKOen9-ZzCBXUyKlW6Rv7DiCvDQ23oj0L82cNKdHU940" }
            ].map((item, index) => (
              <div key={index} className={`text-center group ${item.className || ''}`}>
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
      </section>

      {/* Keuzehulp Wizard */}
      <section className="py-32 bg-background-light border-t border-gray-200" id="keuzehulp">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Keuzehulp</span>
            <h2 className="font-display text-4xl md:text-5xl text-dark leading-tight mb-4">
              Ontvang Uw <span className="italic text-primary">Offerte Op Maat</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Beantwoord 5 korte vragen en wij sturen u binnen 24 uur een vrijblijvende offerte. U kunt ook foto's van uw keuken toevoegen voor een nauwkeurigere prijsindicatie.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-8 md:p-12 shadow-sm max-w-4xl mx-auto">
            <KeuzehulpWizard />
          </div>
        </div>
      </section>
    </main>
  );
}
